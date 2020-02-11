<template>
  <div class="resultWrapper">
    <div class="result">
      <a :href="'https://store.playstation.com/en-gb/product/' + hit._id" v-bind:title="hit._source.name" target="_blank">
        <img v-bind:src="hit._source.thumbnailBaseUrl + '?w=400'" v-bind:alt="hit._source.name">
        <p class="title">{{ hit._source.name }}</p>
      </a>
      <p class="badge-group">
        <span v-if="hit._source.development_status" class="badge badge-pill badge-secondary">
          <i class="fa fa-code"></i> {{ hit._source.development_status | formatFacetKey('development_status') }}
        </span>
        <span
          v-for="genre in hit._source.genres"
          :key="genre"
          class="badge badge-pill badge-secondary">
          <i class="fa fa-tag"></i> {{ genre | formatFacetKey('genres') }}
        </span>
        <span
          v-for="platform in hit._source.platforms"
          :key="platform"
          class="badge badge-pill badge-secondary">
          <i class="fa fa-tag"></i> {{ platform }}
        </span>
        <span v-if="hit._source.rating" class="badge badge-pill badge-secondary">
          <i class="fa fa-star"></i> {{ hit._source.rating }}
        </span>
        <span v-if="hit._source.maxLocalPlayers" class="badge badge-pill badge-secondary">
          <i class="fa fa-user"></i>&nbsp;<i class="fa fa-home"></i> {{ hit._source.maxLocalPlayers }}
        </span>
        <span v-if="hit._source.maxNetworkPlayers" class="badge badge-pill badge-secondary">
          <i class="fa fa-user"></i>&nbsp;<i class="fa fa-globe"></i> {{ hit._source.maxNetworkPlayers }}
        </span>
      </p>
      <p class="small body" v-if="hit.highlight">{{ hit.highlight.body[0] | striphtml }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['hit'],
  filters: {
    formatLongNumber(number) {
      const decimalPlaces = 1;
      const base = Math.floor(Math.log(Math.abs(number)) / Math.log(1000));
      const suffix = 'kmbt'[base - 1];
      return suffix ? (number / (1000 ** base)).toFixed(decimalPlaces) + suffix : number;
    },
  },
};
</script>
