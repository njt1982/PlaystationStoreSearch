/* eslint-disable no-console */

// require('events').EventEmitter.defaultMaxListeners = 205

require('dotenv').config({
  path: require('path').resolve(process.cwd(), 'sync', '.env')
});
const API_BASE_URI = 'https://store.playstation.com/valkyrie-api/en/GB/19/container/';
// STORE-MSF75508-FULLGAMES?size=30&bucket=games&start=30
const MAX_PAGES = parseInt(process.env.MAX_PAGES, 10) || 3;
// const LIMIT = parseInt(process.env.LIMIT, 10) || 10;
const START_PAGE = parseInt(process.env.START_PAGE, 10) || 0;
const PER_PAGE = parseInt(process.env.PER_PAGE, 10) || 30;

const got = require('got');
const gotClient = got.extend({
  prefixUrl: API_BASE_URI,
  responseType: 'json',
  resolveBodyOnly: true,
});



const { Client } = require('@elastic/elasticsearch');
const elasticClient = new Client({
  node: process.env.ELASTIC_HOST,
  auth: {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASS
  }
});

const Keyv = require('keyv');
const KeyvFile = require('keyv-file');
const store = new KeyvFile({ filename: './sync/cache.msgpack' });
const cache = new Keyv({ store });

function get(url, params) {
  return gotClient(url, { ...params, ...{ cache } });
}

function getGameListing(page) {
  return get('STORE-MSF75508-FULLGAMES', {
    searchParams: {
      size: PER_PAGE,
      bucket: 'games',
      start: page * PER_PAGE
    }
  });
}

function buildObj(data) {
  const attr = data.attributes
  console.log(`${data.id} : ${attr.name}`)

  const doc = {
    name: attr.name,
    genres: attr.genres,
    gameContentType: attr['game-content-type'],
    platforms: attr.platforms
  }

  return [
    { index: { _index: process.env.ELASTIC_INDEX, _id: data.id } },
    doc
  ]
}


(async () => {
  let lastPage = undefined;
  console.log('Starting Sync')

  console.log('Deleting old index')
  await elasticClient.indices.delete({
    index: process.env.ELASTIC_INDEX,
    ignoreUnavailable: true,
    allowNoIndices: true
  }).catch(error => console.log(error.body))

  console.log('Creating new index')
  await elasticClient.indices.create({
    index: process.env.ELASTIC_INDEX,
    body: {
      mappings : {
        properties : {
          name : { type : 'text' },
          genres : { type : 'keyword' },
          gameContentType : { type: 'keyword' },
          platforms : { type : 'keyword' }
        }
      }
    }
  }).catch(error => console.log(error.body))

  for (let page = START_PAGE; page < MAX_PAGES; page += 1) {
    console.log(`Processing page ${page}...`);

    let startTime = new Date().getTime();
    let queryTime = 0, indexTime = 0, indexed = 0;

    await getGameListing(page)
      .then(response => {
        if (lastPage === undefined) {
          lastPage = Math.ceil(response.data.attributes['total-results'] / PER_PAGE)
        }
        queryTime = (new Date().getTime()) - startTime

        return Promise.all(
          response.data.relationships.children.data.map(
            item => buildObj(response.included.find(
              inc_item => inc_item.id === item.id && inc_item.type === item.type
            ))
          )
        )
      })
      .then(data => [].concat(...data)) // Flatten the array
      .then(data => {
        startTime = new Date().getTime()
        return elasticClient.bulk({
          index: process.env.ELASTIC_INDEX,
          body: data
        })
      })
      .then(clientResponse => {
        indexTime = (new Date().getTime()) - startTime;
        indexed = clientResponse.body.items.length
      })
      .catch(error => {
        if (error.statusCode === 404) {
          console.log('API 404, end of results');
        }
        else {
          console.log(error.body)
        }
      })
      .finally(() => {
        console.log(`Page ${page} / ${lastPage} done! API Took ${queryTime}ms. Index took ${indexTime}. Indexed ${indexed}`);
      })
  }
  console.log('Finished Sync')


})();