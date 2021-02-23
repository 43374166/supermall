<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import ObserveDom  from '@better-scroll/observe-dom'
import PullUp from '@better-scroll/pull-up'
import PullDown from '@better-scroll/pull-down'
BScroll.use(ObserveDom)
BScroll.use(PullUp)
BScroll.use(PullDown)

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
      click: true,
      observeDOM: true,
      probeType: this.probeType,
      // 下拉加载很多
      pullUpLoad: this.pullUpLoad,
      // 上拉刷新
      pullDownRefresh: {
        threshold: 50,//触发pullingDown事件的位置
        stop:0 // 停止的位置
      }
    })
    // 监听移动位置
    this.scroll.on('scroll', position => {
      this.$emit('scroll', position)
    })
    // 监听上拉更多
    this.scroll.on('pullingUp', () => {
      // console.log('上啦加载');
      this.$emit('pullingUP')  
    })
    // 监听下拉更新
    this.scroll.on('pullingDown', () => {
      // console.log('下拉刷新');
    })
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    refinish() {
      this.scroll.refinish()
    }
  }
}
</script>

<style scoped>

</style>