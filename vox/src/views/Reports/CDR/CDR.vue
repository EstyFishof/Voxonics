<template>
  <div v-if="this.userInfoViewCDR" class="mt main-wrapper-cdr">
    <Filters/>
    <ViewCDR/>
    <div class="no-results-block">
      <span class="no-results" v-if="!getCDR.length">No results, use filters to see more</span>
      <span class="no-results-block-paginator">
        <Paginator v-if="getPaginatorCDR.recordsPerPage" :paginator="getPaginatorCDR" :methods="{page: 'pageCDRMutation', peerPage: 'peerPageCDRMutation'}" perPage="12"/>
      </span>
    </div>
  </div>
</template>


<script>
import Filters from './components/Filters'
import Paginator from '@/components/Paginator'
import ViewCDR from './components/View'
import { mapGetters } from "vuex"

export default {
  name: "CDR",
  components: { Filters, Paginator, ViewCDR },
  computed: {
    ...mapGetters(['getPaginatorCDR', 'userInfoViewCDR', 'getCDR'])
  },
  beforeDestroy() {
    this.$store.commit('resetReportsCDR')
  }
}
</script>

<style scoped lang="scss">
@import "vue-ctk-date-time-picker.css";
.no-results-block {
  display: flex;
  height: 35px;
  justify-content: center;
  text-align: center;
  font-size: 18px;
  font-weight: 300;
  line-height: 34px;
  color: var(--font-panel);
  position: relative;

  .no-results-block-paginator {
    position: absolute;
    right: 5px;
    bottom: -3px;
  }
}

@media (max-width: 1920px) {
  .main-wrapper-cdr {
    width: calc(1479.41px + 5%);
    padding-right: 5%;
  }
}
</style>
