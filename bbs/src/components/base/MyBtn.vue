<template>
  <div class="dialogs">
    <ul>
      <li>
        <router-link
          tag="em"
          class="iconfont icon-tubiaozhizuomobanyihuifu-"
          :to="{path: 'message?', query:{tcourseId:tCourseId,uid:userId,ip:userIp,equipment:equipment,bcourseid:bcourseid,projectid:projectid}}"
        ></router-link>
      </li>
      <li>
        <router-link
          :to="{path: 'createvote?', query:{tcourseId:tCourseId,uid:userId,ip:userIp,equipment:equipment,bcourseid:bcourseid,projectid:projectid}}"
          tag="em"
          class="iconfont icon-toupiao"
        ></router-link>
      </li>
    </ul>
    <div class="last">
      <a href="javascript:void 0" @click.stop="fn()">
        <i :class="['iconfont', {'icon-hao': isIconHao},{'icon-X': isIconX}]"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyBtn",
  props: {
    tCourseId: {
      type: String,
      required: true,
      default: ""
    },
    userId: {
      type: String,
      required: true,
      default: ""
    },
    userIp: {
      type: String,
      required: true,
      default: ""
    },
    equipment: {
      type: String,
      required: true,
      default: ""
    },

    bcourseid: {
      type: String,
      default: ""
    },
    projectid: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      isIconHao: true,
      isIconX: false
      // homeCourseId: this.tCourseId,
      // homeUserId: this.userId
    };
  },
  created() {
    console.log();
  },
  methods: {
    fn: function() {
      if (this.isIconHao === true) {
        this.isIconHao = false;
        this.isIconX = true;
        this.$el.firstChild.style.display = "block";
      } else {
        this.isIconHao = true;
        this.isIconX = false;
        this.$el.firstChild.style.display = "none";
      }
    }
  }
};
</script>

<style scoped lang="less">
.dialogs {
  position: absolute;
  bottom: 2rem;
  right: 1rem;
  z-index: 100;
  ul {
    position: absolute;
    bottom: 3.2rem;
    right: 0;
    list-style: none;
    display: none;
    li {
      width: 3rem;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      background-color: #25b7fa;
      border-radius: 50%;
      overflow: hidden;
      em {
        font-size: 1.5rem;
        color: #fff;
      }
    }
  }
  div.last {
    width: 3rem;
    height: 3rem;
    overflow: hidden;
    a {
      text-decoration: none;
      display: block;
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      line-height: 3rem;
      text-align: center;
      border-radius: 50%;
      background-color: #1ae881;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      i {
        color: #fff;
        font-size: 1.5rem;
      }
    }
  }
}
</style>
