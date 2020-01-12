import es from 'elasticsearch-browser/elasticsearch';

const client = new es.Client({
  host: 'https://elastic.thingy-ma-jig.co.uk/',
});

const facetMap = {
  genres: { fieldName: 'genres', title: 'Genres', labels: {
    'Role-Playing Games (RPG)': 'RPG',
    'MUSIC/RHYTHM': 'Music'
  }},
  gameContentType: { fieldName: 'gameContentType', title: 'Game Type' },
  platforms: { fieldName: 'platforms', title: 'Platforms' },
  minLocalPlayers: { fieldName: 'minLocalPlayers', title: 'Min Players' },
  maxLocalPlayers: { fieldName: 'maxLocalPlayers', title: 'Max Players' },
  minNetworkPlayers: { fieldName: 'minNetworkPlayers', title: 'Min Online Players' },
  maxNetworkPlayers: { fieldName: 'maxNetworkPlayers', title: 'Max Online Players' },
  rating: { fieldName: 'rating', title: 'Rating', facetType: 'range', facetOptions: {
    keyed: true,
    ranges: [
      { key: '1-star', from: 0.0, to: 1.5 },
      { key: '2-star', from: 1.5, to: 2.5 },
      { key: '3-star', from: 2.5, to: 3.5 },
      { key: '4-star', from: 3.5, to: 4.5 },
      { key: '5-star', from: 4.5, to: 5.0 }
    ]
  }}
};
const activeFacets = {};
const query = '';
const pageLength = 18  ;

function search(page) {
  let queryString = '*';
  if (this.query !== undefined && this.query.length > 0 && this.query !== '-') {
    queryString = this.query;
  }

  return client.search({
    index: 'local_ps_store',
    body: {
      from: page * pageLength,
      size: pageLength,
      query: {
        bool: {
          must: {
            simple_query_string: {
              query: queryString,
              fields: ['name^10'],
            },
          },
          filter: Object.keys(activeFacets)
            .map((key) => {
              const facet = activeFacets[key];
              if (facet !== null && facet !== undefined && facet.length > 0) {
                const facetType = facetMap[key].facetType || 'terms'
                const data = {};
                data[facetType] = {}
                if (facetType === 'range') {
                  data[facetType][facetMap[key].fieldName] = {}
                  const r = data[facetType][facetMap[key].fieldName]
                  facet.forEach(rangeKey => {
                    const selectedRangeFacet = facetMap[key].facetOptions.ranges.find(range => range.key === rangeKey)
                    if (selectedRangeFacet.from !== undefined) {
                      if (r.gte === undefined || r.gte > selectedRangeFacet.from) {
                        r.gte = selectedRangeFacet.from
                      }
                    }

                    if (selectedRangeFacet.to !== undefined) {
                      if (r.lte === undefined || r.lte < selectedRangeFacet.to) {
                        r.lte = selectedRangeFacet.to
                      }
                    }
                  })
                }
                else {
                  data[facetType][facetMap[key].fieldName] = facet;
                }
                return data;
              }
              return null;
            })
            .filter((v) => !!v),
        },
      },
      // explain: true,
      aggregations: Object.keys(facetMap).reduce((previous, key) => {
        // eslint-disable-next-line no-param-reassign
        const facetType = facetMap[key].facetType || 'terms'
        previous[key] = {}
        previous[key][facetType] = {
          field: facetMap[key].fieldName,
          ...(facetMap[key].facetOptions || {})
        };
        return previous;
      }, {}),
    },
  }).then((resp) => ({
    hits: resp.hits,
    aggregations: Object.keys(resp.aggregations).map((key) => {
      const buckets = Array.isArray(resp.aggregations[key].buckets)
        ? resp.aggregations[key].buckets
        : Object.keys(resp.aggregations[key].buckets).map(bucketKey => ({
          key: bucketKey,
          ...resp.aggregations[key].buckets[bucketKey]
        }))
      return {
        key,
        name: facetMap[key].title,
        items: buckets.map((bucket) => {
          const newBucket = bucket;
          // Add in a 'refined' key to buckets which exist in our facet list.
          newBucket.refined = false;
          if (activeFacets[key]) {
            newBucket.refined = activeFacets[key].indexOf(bucket.key) !== -1;
          }
          return newBucket;
        }),
        isRefined: !!activeFacets[key] && activeFacets[key].length,
      }
    }),
  }));
}

export default {
  search, facetMap, activeFacets, query, pageLength,
};
