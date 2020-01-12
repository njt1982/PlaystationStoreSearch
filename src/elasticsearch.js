import es from 'elasticsearch-browser/elasticsearch';

const client = new es.Client({
  host: 'https://elastic.thingy-ma-jig.co.uk/',
});

const facetMap = {
  genres: { fieldName: 'genres', title: 'Genres' },
  gameContentType: { fieldName: 'gameContentType', title: 'Game Type' },
  platforms: { fieldName: 'platforms', title: 'Platforms' },
};
const activeFacets = {};
const query = '';
const pageLength = 18;

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
                const data = { terms: {} };
                data.terms[facetMap[key].fieldName] = facet;
                return data;
              }
              return null;
            })
            .filter((v) => !!v),
        },
      },
      // explain: true,
      highlight: {
        fields: { body: {} },
      },
      aggregations: Object.keys(facetMap).reduce((previous, key) => {
        // eslint-disable-next-line no-param-reassign
        previous[key] = {
          terms: { field: facetMap[key].fieldName },
        };
        return previous;
      }, {}),
    },
  }).then((resp) => ({
    hits: resp.hits,
    aggregations: Object.keys(resp.aggregations).map((key) => ({
      key,
      name: facetMap[key].title,
      items: resp.aggregations[key].buckets.map((bucket) => {
        const newBucket = bucket;
        // Add in a 'refined' key to buckets which exist in our facet list.
        newBucket.refined = false;
        if (activeFacets[key]) {
          newBucket.refined = activeFacets[key].indexOf(bucket.key) !== -1;
        }
        return newBucket;
      }),
      isRefined: !!activeFacets[key] && activeFacets[key].length,
    })),
  }));
}

export default {
  search, facetMap, activeFacets, query, pageLength,
};
