<template>
  <div class="home-list">
    <nav>
      <span class="bg">全部</span>
    </nav>
    <div class="wrapper" ref="wrapper">
      <ul class="scroller-box content">
        <li
          v-for="item in listData"
          :key="item.id"
          ref="list"
          @click="jumpInfo(tCourseId,item.id,item.type,userIp,equipment,bcourseid,projectid)"
        >
          <div class="user">
            <div class="left">
              <div class="img">
                <img :src="item.photo" @error="imgError(item)" :alt="item.pet_name">
              </div>
            </div>
            <div class="right">
              <h4>{{item.pet_name}}</h4>
              <i class="mesage-type">{{item.type | formatType}}</i>
              <em class="top-posts" v-if="item.preposition_status==='yesOrNo.yes'">置顶</em>
            </div>
          </div>
          <p class="content" v-html="item.title">{{item.title | trim}}</p>
          <div class="images" v-if="item.content.img.length>0" ref="imgList">
            <ul>
              <li v-for="(imgList,index) in item.content.img" v-show="index<3" :key="index">
                <img :src="imgList" alt>
              </li>
            </ul>
          </div>
          <div class="info">
            <span class="left">{{item.create_time | formatCreateTime}}</span>
            <span class="center">
              <i class="iconfont icon-liuyan"></i>
              {{item.count_num}}
            </span>
            <span class="right">
              <i class="iconfont icon-chakan"></i>
              {{item.hits}}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";

export default {
  name: "List",
  mounted() {
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, {
        click: true
      });
    });
  },
  props: {
    listData: {
      default() {
        return {
          items: this.items
        };
      }
    },
    userId: this.parenUserId,
    userIp: this.user_ip,
    equipment: this.childEquipment,
    bcourseid: this.bcourseid,
    projectid: this.projectid,
    tCourseId: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      items: [],
      parenUserId: "",
      busy: false,
      user_ip: "",
      childEquipment: "",
      childBcourseid: "",
      childProjectid: ""
    };
  },
  methods: {
    imgError(item) {
      item.photo = require("../../assets/images/userdefault_1.png");
    },
    jumpInfo(
      tcourseId,
      topic_id,
      type,
      user_ip,
      childEquipment,
      bcourseid,
      projectid
    ) {
      // console.log(tcourseId);
      if (type === 3) {
        this.$router.push({
          path: "/vote?",
          query: {
            tcourseId: tcourseId,
            topic_id: topic_id,
            user_id: this.userId,
            user_ip: user_ip,
            equipment: childEquipment,
            bcourseid: bcourseid,
            projectid: projectid
          }
        });
      } else {
        this.$router.push({
          path: "/info?",
          query: {
            tcourseId: tcourseId,
            topic_id: topic_id,
            user_id: this.userId,
            user_ip: user_ip,
            equipment: childEquipment,
            bcourseid: bcourseid,
            projectid: projectid
          }
        });
      }
    }
  },
  filters: {
    formatting(value) {
      let val = Number(value);
      switch (val) {
        case 0:
          val = "A";
          break;
        case 1:
          val = "B";
          break;
        case 2:
          val = "C";
          break;
        case 3:
          val = "D";
          break;
        case 4:
          val = "E";
          break;
        case 5:
          val = "F";
          break;
        case 6:
          val = "G";
          break;
        case 7:
          val = "H";
          break;
        case 8:
          val = "I";
          break;
        case 9:
          val = "J";
          break;
        default:
          val = "";
      }
      return val;
    },
    trim(value) {
      // filter htmlTag
      value = value.replace(/<[^>]+>/g, "");
      // filter tabs lineBreak space
      value = value.replace(/[\r\n\s]/g, "");

      // console.log(value);
      return value;
    },
    formatType(value) {
      switch (value) {
        case 1:
          value = "讨论帖";
          break;
        case 2:
          value = "答疑帖";
          break;
        case 3:
          value = "投票贴";
          break;
      }
      return value;
    },
    formatCreateTime(val) {
      return val.slice(0, 16);
    }
  },
  computed: {},
  watch: {
    listData(val) {
      return val;
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/base/list.less";
</style>
