<template>
  <div class="about-me">
    <!--页头说明-->
    <MHeader>
      <i class="iconfont icon-left-arrow" v-show="isSearch" @click="backHome"></i>
      <span :class="{center:center}">我的帖子</span>
      <div class="icon-list">
        <i class="iconfont icon-guanbi" @click="closeAbout"></i>
      </div>
      <div class="search">
        <em class="iconfont icon-search" @click="homeSearch"></em>
        <input
          type="text"
          v-model.trim.lazy="searchContent"
          title
          placeholder="请输入您要查找的内容..."
          @keyup.enter="homeSearch"
        >
      </div>
    </MHeader>
    <div class="main">
      <!--搜索结果展示-->
      <div class="search-list" v-if="searchList">
        <h3 class="search-result">搜索结果展示:</h3>
        <ul>
          <li
            v-for="(item,index) in listResult"
            :key="index"
            @click="jumpInfo(tcourseId,item.topic_id,item.type,ip,equipment,bcourseid,projectid)"
          >
            <b v-if="searchContent">{{index+1}}</b>
            <span>{{item.title | trim}}</span>
          </li>
        </ul>
        <p class="no-result" v-show="listResult.length===0">--- 没有搜索到相关结果 ---</p>
        <p class="no-result" v-show="searchContent===''">--- 请输入搜索内容---</p>
      </div>
      <!--列表开始-->
      <div class="wrapper list" ref="wrapper" v-show="myList">
        <ul class="content">
          <li
            class="list-item"
            v-for="(item,index) in topicListInfo"
            :key="index"
            @click="jumpInfo(tcourseId,item.topic_id,item.type,ip,equipment,bcourseid,projectid)"
          >
            <div class="list-title" v-html="item.course_name">{{item.course_name}}</div>
            <p v-html="item.title">{{item.title | trim}}</p>
            <div class="images" v-if="item.content.img.length>0" ref="imgList">
              <ul>
                <li v-for="(imgList,index) in item.content.img" v-show="index<3" :key="index">
                  <img :src="imgList" alt>
                </li>
              </ul>
            </div>
            <div class="info">
              <span class="left">
                <i class="iconfont icon-dingdanxiangqing-chuangjianshijian"></i>
                {{item.create_time}}
              </span>
              <span class="center">
                <i class="iconfont icon-liuyan"></i>
                {{item.comment_count}}
              </span>
              <span class="right">
                <i class="iconfont icon-chakan"></i>
                {{item.hits}}
              </span>
            </div>
            <div class="mark">{{item.type | filterMark}}</div>
          </li>
        </ul>
      </div>
    </div>
    <AlertMsg v-show="isModalVisible" @close="closeModal">
      <span slot="body">确定要退出个人帖子页面吗？</span>
      <span slot="footer">
        <button type="button" class="btn-green" @click="closeId">取消</button>
        <button type="button" class="btn-green" aria-label="Close modal" @click="closeModal">确定</button>
      </span>
    </AlertMsg>
    <AlertMessage v-if="AlertMessage"></AlertMessage>
  </div>
</template>

<script>
import MHeader from "../../components/base/MHeader";
import AlertMsg from "../../components/base/AlertMsg";
import AlertMessage from "../../components/base/AlertMessage";
import Bscroll from "better-scroll";

export default {
  name: "AboutMe",
  components: {
    MHeader,
    AlertMsg,
    AlertMessage
  },
  data() {
    return {
      AlertMessage: false,
      isModalVisible: false,
      isSearch: false,
      center: true,
      myList: true,
      searchContent: "",
      user_id: "",
      topicListInfo: [],
      operation_code: "",
      searchList: false,
      tcourseId: "",
      ip: "",
      equipment: "",
      bcourseid: "",
      projectid: ""
    };
  },
  created() {
    // 获取参数
    this.user_id = this.$route.query.uid;
    this.tcourseId = this.$route.query.tcourseId;
    this.ip = this.$route.query.ip;
    this.equipment = this.$route.query.equipment;
    this.bcourseid = this.$route.query.bcourseid;
    this.projectid = this.$route.query.projectid;
    // console.log(this.$route.query);
    // 获取数据
    this.getData();
  },
  mounted() {
    // 初始化滑动插件
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, {
        click: true
      });
    });
  },
  methods: {
    closeId() {
      this.isModalVisible = false;
    },
    // 关闭弹框
    closeModal() {
      this.isModalVisible = false;
      // 判断终端是安卓 IOS
      if (this.equipment.startsWith("Android")) {
        // 安卓
        window.apps.close();
      } else {
        // 苹果
        try {
          window.webkit.messageHandlers.jsToOcNoPrams.postMessage({});
        } catch (err) {
          console.log(err);
        }
      }
    },
    // 页面跳转
    jumpInfo(
      tcourseId,
      topic_id,
      type,
      user_ip,
      childEquipment,
      bcourseid,
      projectid
    ) {
      // console.log(tcourseId, topic_id, type, user_ip, childEquipment, bcourseid, projectid);
      // return;
      if (type === 3) {
        this.$router.push({
          path: "/vote?",
          query: {
            tcourseId: tcourseId,
            topic_id: topic_id,
            user_id: this.user_id,
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
            user_id: this.user_id,
            user_ip: user_ip,
            equipment: childEquipment,
            bcourseid: bcourseid,
            projectid: projectid
          }
        });
      }
    },
    // 关闭我的帖子页面
    closeAbout() {
      this.isModalVisible = true;
    },
    // 回到首页
    backHome() {
      this.myList = true;
      this.searchList = false;
      this.isSearch = false;
      this.center = true;
      this.searchContent = "";
    },
    // 搜索
    homeSearch() {
      this.searchList = true;
      this.myList = false;
      this.isSearch = true;
      this.center = false;
    },
    // 请求数据
    getData() {
      let url = "/person-topic-list";
      this.$http({
        method: "GET",
        url: url,
        params: {
          user_id: this.user_id
        },
        timeout: 10000
      })
        .then(res => {
          // console.log(res);
          this.topicListInfo = res.topicListInfo;
          this.operation_code = res.operation_code;
        })
        .then(() => {
          let url = "http://10.5.231.161:1940/index.php?r=mongo/log-info";
          this.$http({
            method: "post",
            url: url,
            data: {
              time: this.nowTime,
              operation_code: "16010022",
              operation_name: "打开个人帖子列表",
              coursed: "",
              equipment: this.equipment,
              ip: this.ip,
              objected: "",
              userid: this.user_id,
              bcourseid: "",
              projectid: ""
            },
            transformRequest: [
              function(data, headers) {
                let ret = "";
                for (let attr in data) {
                  ret += `${encodeURIComponent(attr)}=${encodeURIComponent(
                    data[attr]
                  )}&`;
                }
                return ret;
              }
            ],
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            timeout: 5000
          })
            .then(res => {
              // console.log(res);
            })
            .catch(err => console.log(err));
        })
        .catch(err => {
          if (err.message.indexOf("timeout") !== -1) {
            this.AlertMessage = true;
          }
        });
    }
  },
  computed: {
    listResult() {
      // 判断输入
      if (this.searchContent === "") {
        return false;
      } else {
        // 输入返回结果
        return this.topicListInfo.filter(item => {
          if (
            item.content.word.indexOf(this.searchContent) !== -1 ||
            item.title.indexOf(this.searchContent) !== -1 ||
            item.course_name.indexOf(this.searchContent) !== -1
          ) {
            return item;
          }
        });
      }
    },
    nowTime() {
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth();
      let day = time.getDate();
      let hour = time.getHours();
      let minutes = time.getMinutes();
      let second = time.getSeconds();
      return (
        year +
        "-" +
        (month + 1) +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        second
      );
    }
  },
  filters: {
    trim(value) {
      // filter htmlTag
      value = value.replace(/<[^>]+>/g, "");
      // filter tabs lineBreak space
      value = value.replace(/[\r\n\s]/g, "");

      // console.log(value);
      return value;
    },
    filterMark(val) {
      switch (val) {
        case 1:
          val = "讨论贴";
          break;
        case 2:
          val = "答疑帖";
          break;
        case 3:
          val = "投票贴";
          break;
        default:
          val = "";
          break;
      }
      return val;
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/page/about.less";
</style>
