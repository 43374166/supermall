<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view />
    <tab-control class="tab-control"
    :titles="['流行', '新款', '精选']" />
    <good-list :goods="goods['pop'].list"/>

    <ul>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
      <li>hhh</li>
    </ul>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList.vue'

import HomeSwiper from './Childcomps/HomeSwiper'
import RecommendView from './Childcomps/RecommendView'
import FeatureView from './Childcomps/FeatureView'

import {getHomeMultidata, getHomeGoods} from 'network/home'


export default {
  components: { 
    NavBar,
    TabControl,
    GoodList,
    HomeSwiper,
    RecommendView,
    FeatureView

  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      }
    }
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata()
    
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // this.result = res
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    }
  }
}
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>