import Vue from 'vue';
import Router from 'vue-router';
import PsStoreSearch from '@/components/PsStoreSearch';
import ES from '@/elasticsearch';

Vue.use(Router);

const pathParams = ['query'].concat(Object.keys(ES.facetMap)).map((key) => `:${key}?`).join('/');
export default new Router({
  routes: [
    {
      path: `/${pathParams}`,
      name: 'PsStoreSearch',
      component: PsStoreSearch,
      props: true,
    },
  ],
});
