import Vue from 'vue';
import infiniteScroll from 'vue-infinite-scroll';
import App from './App';
import router from './router';
import ES from '@/elasticsearch';

Vue.use(infiniteScroll);

Vue.config.productionTip = false;

Vue.filter('striphtml', function (value) {
  var div = document.createElement("div");
  div.innerHTML = value;
  var text = div.textContent || div.innerText || "";
  return text;
});

Vue.filter('formatFacetKey', function (key, aggregationKey) {
  if (ES.facetMap[aggregationKey].labels && ES.facetMap[aggregationKey].labels[key]) {
    return ES.facetMap[aggregationKey].labels[key]
  }
  return key;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
});
