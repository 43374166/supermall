<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick" 
                   ref="tabControl1"
                   class="tab-control"
                   v-show="isTabFixed" />
    <scroll class="wrapper"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUP="loadMore">
      <home-swiper :banners="banners"
                    @swiperImageLoad="swiperLoadFinish" />
      <recommend-view :recommends="recommends"
                      @recommendImageLoad="recomLoadFinish"/>
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick" 
                   ref="tabControl2" />
      <good-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop.vue'

import HomeSwiper from './Childcomps/HomeSwiper'
import RecommendView from './Childcomps/RecommendView'
import FeatureView from './Childcomps/FeatureView'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'



export default {
  components: { 
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
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
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  // 离开时销毁
  // destroyed() {
  //   console.log('没有keep-live就会销毁');
  // },
  activated() {
    this.$refs.scroll && this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll && this.$refs.scroll.refresh()
    // console.log(this.saveY);
    // console.log(this.$refs.scroll.scroll);
  },
  deactivated() {
    this.saveY = this.$refs.scroll && this.$refs.scroll.getScrollY()
    // console.log(this.saveY);
    // console.log(this.$refs.scroll.getScrollY());
  },
  // 组件创建完成时开始调用
  created() {
    // 请求多个数据
    this.getHomeMultidata()
    
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },

  mounted() {
    // 监听goods里面照片的加载完成
    const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh, 200)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },

  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },

  methods: {
    // 监听事件
    // 点击切换tab
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 返回顶部函数
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    // 监听返回顶部图标函数
    contentScroll(position) {
      // 判断回到顶部是否显示
      this.isShowBackTop = (-position.y) > 800

      // 判断TabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    // 加载更多函数
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    // 防抖函数的封装封装到common文件里面

    recomLoadFinish() {
      // 获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    swiperLoadFinish() {
      this.recomLoadFinish()
    },
    


    // 网络请求
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

        // 因为scroll这个工具默认最多只是加载一次 所以需要调用finishPullUp函数
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .wrapper {
    position: absolute;
    overflow: hidden;

    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .active {
    position: fixed;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>