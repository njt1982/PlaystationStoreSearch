<template>
  <div id="wrapper"
       v-bind:class="{ sidebarToggled: sidebarExpanded }"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="busy"
       infinite-scroll-listen-for-event="doCheck"
       infinite-scroll-distance="10">
    <Sidebar
      v-on:toggleSidebar="toggleSidebar"
      v-on:runSearch="updateQuery"
      v-on:toggleFacet="toggleFacet"
      :aggregations="aggregations"
      />
    <MainPageWrapper :hits="hits" :searchInProgress="searchInProgress" />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar/Sidebar';
import MainPageWrapper from '@/components/MainPageWrapper/MainPageWrapper';
import ES from '@/elasticsearch';

export default {
  components: {
    Sidebar,
    MainPageWrapper,
  },
  data() {
    return {
      sidebarExpanded: false,
      hits: null,
      aggregations: null,
      page: 0,
      loadMoreEnabled: false,
      searchInProgress: false,
    };
  },
  methods: {
    loadMore() {
      if (this.loadMoreEnabled && !this.searchInProgress) {
        this.page += 1;
        this.searchInProgress = true;

        ES.search(this.page)
          .then((response) => {
            this.hits.push(...response.hits.hits);
            this.aggregations = response.aggregations;
            this.loadMoreEnabled = (ES.pageLength === response.hits.hits.length);
          })
          .finally(() => { this.searchInProgress = false; });
      }
    },
    toggleSidebar() {
      this.sidebarExpanded = !this.sidebarExpanded;
    },
    updateQuery(query) {
      ES.query = query;
      this.updateRoute();
    },
    updateRoute() {
      // Params starts with query.
      const params = { query: ES.query };
      if (params.query === undefined || params.query.length === 0) {
        params.query = '-';
      }

      // Now add a param for each of the facetMap. Each param will be at least '-'.
      Object.keys(ES.facetMap).forEach((key) => {
        params[key] = '-';
        if (ES.activeFacets[key] && ES.activeFacets[key].length) {
          params[key] = ES.activeFacets[key].join(',');
        }
      });

      // Strip any trailing - placeholders from the URL
      ['query', ...Object.keys(ES.facetMap)].reverse().some((key) => {
        if (params[key] === '-') {
          // Remove key
          delete params[key];
          return false;
        }
        return true;
      });

      // Set the route. This event will cause the properties on this component to get set via the
      // router. This triggers the watched route params.
      this.$router.push({
        name: 'PsStoreSearch',
        params,
      });
    },
    toggleFacet(key, value) {
      ES.activeFacets[key] = ES.activeFacets[key] || [];

      // If this value exists in the array, splice it out.
      const existingIndex = ES.activeFacets[key].indexOf(value);
      if (existingIndex !== -1) {
        ES.activeFacets[key].splice(existingIndex, 1);
      } else {
        // Otherwise push it in.
        ES.activeFacets[key].push(value);
      }

      this.updateRoute();
    },
  },
  watch: {
    'searchInProgress': {
      handler(isInProgress) {
        if (!isInProgress) {
          this.$emit('doCheck')
        }
      }
    },
    '$route.params': {
      immediate: true,
      handler(routeParams) {
        Object.keys(ES.facetMap).forEach((key) => {
          if (routeParams[key] && routeParams[key] !== '-') {
            ES.activeFacets[key] = routeParams[key].split(',');
          } else {
            ES.activeFacets[key] = null;
          }
        });

        if (routeParams.query === undefined || routeParams.query.length === 0 || routeParams.query === '-') {
          ES.query = undefined;
        } else {
          ES.query = routeParams.query;
        }

        this.page = 0;
        this.searchInProgress = true;

        ES.search(0)
          .then((response) => {
            this.hits = response.hits.hits;
            this.aggregations = response.aggregations;
            this.loadMoreEnabled = (ES.pageLength === response.hits.hits.length);
          })
          .finally(() => { this.searchInProgress = false; });
      },
    },
  },
};
</script>
