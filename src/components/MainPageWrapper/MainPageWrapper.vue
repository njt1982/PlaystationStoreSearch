<template>
  <div id="page-content-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <h3 class="text-muted">PS Store Search</h3>
        </div>
      </div>
      <div class="row">
        <p v-if="hits == null">Lets do a search!</p>
        <Result v-for="hit in hits" :hit="hit" :key="hit._id"/>
        <Spinner v-if="searchInProgress" />
        <div id="pager"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Result from './Result/Result';
import Spinner from './Spinner/Spinner';

export default {
  props: ['hits', 'searchInProgress'],
  components: {
    Result,
    Spinner,
  },
};
</script>
