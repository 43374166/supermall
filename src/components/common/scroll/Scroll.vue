<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 单独安装插件
// import BScroll from '@better-scroll/core'
// import ObserveDom  from '@better-scroll/observe-dom'
// import PullUp from '@better-scroll/pull-up'
// import PullDown from '@better-scroll/pull-down'
// import ObserveImage from '@better-scroll/observe-image'
// BScroll.use(ObserveDom)
// BScroll.use(PullUp)
// BScroll.use(PullDown)
// BScroll.use(ObserveImage)

// 全部插件的better-scroll
import BScroll from 'better-scroll'

export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 2.x版本之后需要这个才能加载better-scrool
      observeDOM: true,
      // 设置可以点击滚动部分
      click: true,
      // 滚动时监听滚动的0/1/2/3 0 1不可以滚动监听 2 手指再上面滚动时  3  放下手指惯性仍然可以监听位置
      probeType: this.probeType,
      // 下拉加载很多
      pullUpLoad: this.pullUpLoad,
      // 上拉刷新
      pullDownRefresh: {
        threshold: 50,// 触发pullingDown事件的位置
        stop:0 // 停止的位置
      },
      // 监听照片是否加载完成
      // observeImage: true,
      // 设置滚动时不模糊
      useTransition: false
    })

    // 监听移动位置
    if(this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })
    }
    
    // 监听上拉更多
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUP')  
      })
    }
    
    // 监听下拉更新
    this.scroll.on('pullingDown', () => {
      // console.log('下拉刷新');
    })

    
    // console.log(this.scroll);
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
      // console.log('..');
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : this.scroll.y
    }
  }
}
</script>

<style scoped>

</style>