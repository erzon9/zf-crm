<template>
  <div>
    sider
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  props: {
    activeIndex: {
      type: String,
      required: true,
    }
  }, 
  computed: {
    ...mapState(['powers']),
    routeList() {
      return this.screenRoutes(this.$router.options.routes);
    }
  },
  methods: {
    screenRoutes(routes) {

    }
  }
}
</script>

<style>

</style>