<template>
  <div class="resultWrapper">
    <div class="result">
      <h3><a :href="hit._source.url">{{ hit._source.name }}</a></h3>
      <p class="badge-group">
        <span v-if="hit._source.development_status" class="badge badge-pill badge-secondary">
          <i class="fa fa-code"></i> {{ hit._source.development_status | formatFacetKey('development_status') }}
        </span>
        <span
          v-for="genre in hit._source.genres"
          :key="genre"
          class="badge badge-pill badge-secondary">
          <i class="fa fa-tag"></i> {{ genre | formatFacetKey('genre') }}
        </span>
        <span
          v-for="platform in hit._source.platform"
          :key="platform"
          class="badge badge-pill badge-secondary">
          <i class="fa fa-tag"></i> {{ platform | formatFacetKey('platform') }}
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
