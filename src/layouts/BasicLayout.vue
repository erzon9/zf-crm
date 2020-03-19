<template>
  <div>
    <Header></Header>
    <Sider></Sider>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './Footer';
import Header from './Header';
import Sider from './SiderMenu';
export default {
  components: {
    Footer,
    Header,
    Sider
  }
}
</script>

<style>

</style>