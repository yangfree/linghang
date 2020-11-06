<template>
  <div class="alert-message" v-show="hide" @click="hideModule">
    <div class="alert-bg"></div>
    <span class="alert-words">请求超时...</span>
  </div>
</template>

<script>
export default {
  name: "AlertMessge",
  data() {
    return {
      hide: true
    };
  },
  methods: {
    hideModule() {
      this.hide = false;
    }
  }
};
</script>

<style scoped lang="less">
.alert-message {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  .alert-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    top: 0;
    left: 0;
    z-index: 99;
  }
  .alert-words {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30%;
    margin-left: -15%;
    text-align: center;
    height: 2rem;
    line-height: 2rem;
    color: #ebebeb;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.8);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    font-size: 0.625rem;
  }
}
</style>
