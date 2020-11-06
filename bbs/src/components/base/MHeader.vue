<template>
  <header>
    <slot>默认导航</slot>
  </header>
</template>

<script>
export default {
  name: "MHeader"
};
</script>

<style scoped lang="less">
header {
  width: 100%;
  height: 10rem;
  line-height: 2.5rem;
  background: -webkit-linear-gradient(#00479d, #fff); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#00479d, #fff); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(#00479d, #fff); /* Firefox 3.6 - 15 */
  background: linear-gradient(#00479d 20%, #fff); /* 标准的语法 */
  color: #fff;
  text-align: center;
  letter-spacing: 0.1rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  i {
    font-size: 1.2rem;
  }
}
</style>
