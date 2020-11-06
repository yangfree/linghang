<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            提示:
            <!--<button type="button" class="btn-close" @click="close" aria-label="Close modal"> x</button>-->
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            This is the default message...
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn-green" @click="close" aria-label="Close modal">关闭</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "modal",
    methods: {
      close() {
        this.$emit('close');
      }
    }
  }
</script>

<style scoped lang="less">
  .modal-backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .6);
    z-index: 9999;
    .modal {
      background-color: #fff;
      box-shadow: 2px 2px 20px 1px;
      border-radius: 0.8rem;
      width: 70%;
      height: max-content;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      .modal-header, .modal-footer {
        padding: 15px 15px 0 15px;
        display: flex;
      }
      .modal-header {
        border-bottom: 1px solid #eee;
        color: #4aae9b;
        justify-content: space-between;
        line-height: 2.5rem;
        .btn-close {
          border: none;
          font-size: 20px;
          cursor: pointer;
          font-weight: bold;
          color: #4aae9b;
          background: transparent;
        }
      }
      .modal-footer {
        border-top: 1px solid #eee;
        justify-content: flex-end;
        padding-bottom: 15px;
        .btn-green {
          color: white;
          background: #4aae9b;
          border: 1px solid #4aae9b;
          border-radius: 2px;
        }
      }
      .modal-body {
        position: relative;
        text-align: center;
        padding: 1rem 2rem;
      }
    }
  }

  /*  动画效果 */
  .modal-fade-enter, .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active, .modal-fade-leave-active {
    transition: opacity 0.5s ease-in-out;
  }
</style>
