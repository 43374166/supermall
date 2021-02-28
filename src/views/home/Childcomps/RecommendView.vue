<template>
  <div class="recommend">
    <div v-for="(item, id) in recommends" :key="id" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="recommendImageLoad">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    recommendImageLoad() {
      if(!this.isLoad) {
        this.$emit('recommendImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style>
  .recommend {
    display: flex;
    padding: 10px 0 15px;
    border-bottom: 8px solid rgba(180, 180, 180, 0.2);
  }
  .recommend-item {
    text-align: center;
    flex: 1;
  }
  .recommend-item img{
    width: 65px;
    margin-bottom: 10px;
  }
</style>