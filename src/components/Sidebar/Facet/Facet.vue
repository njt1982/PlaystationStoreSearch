<template>
  <div class="card card-default facet">
    <div class="card-header" v-b-toggle="'collapse_' + aggregation.key">
      <span class="icon"></span>
      <span class="card-title small">{{ aggregation.name }}</span>
    </div>

    <b-collapse :id="'collapse_' + aggregation.key" :visible="!!aggregation.isRefined">
      <ul class="list-group list-group-flush pre-scrollable">
        <li
          v-for="item in aggregation.items"
          :key="item.key"
          class="list-group-item d-flex justify-content-between align-items-center"
          :class="{refined: item.refined}"
          :data-facet-key="aggregation.key"
          :data-facet-value="item.key"
          v-on:click="refine"
        >
          <div class="value small">{{ item.key | formatFacetKey(aggregation.key) }}</div>
          <span class="badge badge-secondary badge-pill">{{ item.doc_count }}</span>
        </li>
      </ul>
    </b-collapse>
  </div>
</template>

<script>
import Vue from 'vue';

import { BCollapse, VBToggle } from 'bootstrap-vue'

Vue.component('b-collapse', BCollapse);
Vue.directive('b-toggle', VBToggle);


export default {
  props: {
    aggregation: {
      type: Object,
    },
  },
  methods: {
    refine(e) {
      this.$emit('toggleFacet', e.currentTarget.dataset.facetKey, e.currentTarget.dataset.facetValue);
    },
  }
};
</script>
