<template>
  <div class="container-outbound">
    <TableOutBoundCalls :listRoutesProp="getLeftListRoutes" :initialListRoutesProp="initialLeftList" :obj="{left: true, right: false}"
      :paginatorProp="{paginator: getPaginatorLeftRoutes, methods: {page: 'setLeftRoutesPage', perPage: 'setLeftRoutesPerPage'}}" />
    <TableOutBoundCalls :listRoutesProp="getRightListRoutes" :initialListRoutesProp="initialRightList" :obj="{left: false, right: true}"
      :paginatorProp="{paginator: getPaginatorRightRoutes, methods: {page: 'setRightRoutesPage', perPage: 'setRightRoutesPerPage'}}" />
  </div>
</template>
<script>
import {UsersGettersApi} from '@/API/getters'
import observables from '@/store/observable.mutations'
import { mapGetters } from "vuex"
import TableOutBoundCalls from './components/TableOutBoundCalls'
export default {
  name: 'OutboundCalls',
  components: {TableOutBoundCalls},
  data() {
    return {
      initialLeftList: [],
      initialRightList: []
    }
  },
  computed: {
    ...mapGetters(['getLeftListRoutes', 'getRightListRoutes', 'getPaginatorLeftRoutes', 'getInitialLeftListRoutes', 'getPaginatorRightRoutes', 'getInitialRightListRoutes']),
  },
  watch: {
    getInitialLeftListRoutes() {
      this.initialLeftList = JSON.parse(JSON.stringify(this.getInitialLeftListRoutes))
    },
    getInitialRightListRoutes() {
      this.initialRightList = JSON.parse(JSON.stringify(this.getInitialRightListRoutes))
    }
  },
  mounted() {
    // UsersGettersApi.getRoutes({left: true, right: true})
    this.$store.dispatch('getListOfUsersForOutboundRoutes', {left: true, right: true, config: {}})

    this.initialLeftList = JSON.parse(JSON.stringify(this.getInitialLeftListRoutes))
    this.initialRightList = JSON.parse(JSON.stringify(this.getInitialRightListRoutes))

    this.$store.subscribe((mutation) => {
      if (observables.paginator.leftRoutes.includes(mutation.type)) {
        this.$store.dispatch('getListOfUsersForOutboundRoutes', {left: true, right: false, config: {peerPage: this.getPaginatorLeftRoutes.peerPage, page: this.getPaginatorLeftRoutes.page}})
        // UsersGettersApi.getRoutes({left: true, right: false}, this.getPaginatorLeftRoutes.peerPage, this.getPaginatorLeftRoutes.page)
      } else if (observables.paginator.rightRoutes.includes(mutation.type)) {
        this.$store.dispatch('getListOfUsersForOutboundRoutes', {left: false, right: true, config: {peerPage: this.getPaginatorRightRoutes.peerPage, page: this.getPaginatorRightRoutes.page}})
        // UsersGettersApi.getRoutes({left: false, right: true}, this.getPaginatorRightRoutes.peerPage, this.getPaginatorRightRoutes.page)
      }
    })
  }
}
</script>
<style lang="scss" scoped>
  .container-outbound {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 1479.41px;
  }

  @media (max-width: 1920px) {
    .container-outbound {
      width: calc(1479.41px + 5%);
      padding-right: 5%;
    }
  }
</style>
