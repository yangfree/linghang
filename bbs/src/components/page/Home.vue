<template>
  <div class="app-home">
    <!--页头说明-->
    <MHeader>
      <i class="iconfont icon-left-arrow" @click="backHome" v-show="backIcon"></i>
      <span :class="{center: center}">论坛</span>
      <div class="icon-list">
        <i class="iconfont icon-ai22" @click="refresh"></i>
        <i class="iconfont icon-guanbi" @click="closeForum"></i>
      </div>
      <div class="search" v-show="show">
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
      <!--导航展示-->
      <section>
        <ul>
          <li>
            <div class="left">
              <div class="img">
                <img src="../../assets/images/answer.png" alt>
              </div>
            </div>
            <div class="right">
              <h3>答疑讨论区</h3>
              <p>
                <span>主题: {{topic}}</span>
                <span>贴子: {{comment}}</span>
              </p>
            </div>
          </li>
          <li>
            <div class="left">
              <div class="img">
                <img src="../../assets/images/seminar.png" alt>
              </div>
            </div>
            <div class="right">
              <h3>投票信息区</h3>
              <p>
                <span>主题: {{discussion}}</span>
                <span>贴子: {{answer}}</span>
              </p>
            </div>
          </li>
        </ul>
      </section>
      <!--搜索结果展示-->
      <div class="search-list" v-if="list">
        <h3 class="search-result">搜索结果展示:</h3>
        <ul>
          <li
            v-for="(item,index) in listResult"
            :key="index"
            @click="jumpInfo(tCourseId,item.id,item.type,user_ip,equipment,bcourseid,projectid)"
          >
            <b v-if="searchContent">{{index+1}}</b>
            <span>{{item.title | trim}}</span>
          </li>
        </ul>
        <p class="no-result" v-show="listResult.length===0">--- 没有搜索到相关结果 ---</p>
        <p class="no-result" v-show="searchContent===''">--- 请输入搜索内容---</p>
        <p class="finish-search">已完成</p>
      </div>
      <!--页面列表组件-->
      <List
        v-show="List"
        :list-data="myListData"
        :t-course-id="tCourseId"
        :user-id="myUserId"
        :user-ip="user_ip"
        :equipment="equipment"
        :bcourseid="bcourseid"
        :projectid="projectid"
      ></List>
    </div>
    <!--底部按钮选项-->
    <MyBtn
      :user-id="myUserId"
      :t-course-id="tCourseId"
      :user-ip="user_ip"
      :equipment="equipment"
      :bcourseid="bcourseid"
      :projectid="projectid"
    ></MyBtn>
    <!-- 弹框测试 -->
    <AlertMsg v-show="isModalVisible">
      <span slot="body">确定要退出论坛吗？</span>
      <span slot="footer">
        <button type="button" class="btn-green" @click="closeId">取消</button>
        <button type="button" class="btn-green" aria-label="Close modal" @click="closeModal">确定</button>
      </span>
    </AlertMsg>
    <AlertMsg v-show="idCourse" @close="closeId">
      <span slot="body">帖子ID或者用户ID不能为空。</span>
    </AlertMsg>
    <AlertMsg v-show="idProject" @close="closeId">
      <span slot="body">模板课ID或者联盟ID不能为空。</span>
    </AlertMsg>
    <AlertMessage v-if="AlertMessage"></AlertMessage>
  </div>
</template>

<script>
import MHeader from "../../components/base/MHeader";
import List from "../../components/base/List";
import MyBtn from "../../components/base/MyBtn";
import AlertMsg from "../../components/base/AlertMsg";
import AlertMessage from "../../components/base/AlertMessage";

export default {
  name: "Home",
  created() {
    this.getData();
  },
  mounted() {
    // this.getParams();
  },
  components: {
    MHeader,
    List,
    MyBtn,
    AlertMsg,
    AlertMessage
  },
  data() {
    return {
      AlertMessage: false,
      center: true,
      backIcon: false,
      idCourse: false,
      idProject: false,
      isModalVisible: false,
      show: true,
      list: false,
      List: true,
      searchContent: "",
      notFound: [{ content: { word: "没有找到" } }],
      myList: [],
      myListData: [],
      myNavData: null,
      comment: "",
      topic: "",
      answer: "",
      discussion: "",
      myUserId: "",
      tCourseId: "",
      user_ip: "",
      equipment: "",
      operation_code: "16010001",
      operation_name: "打开互动论坛",
      objected: "",
      bcourseid: "",
      projectid: ""
    };
  },
  methods: {
    refresh() {
      this.$router.go(0);
    },
    closeId() {
      this.idCourse = false;
      this.idProject = false;
      this.isModalVisible = false;
    },
    getParams(url) {
      url = url == null ? window.location.href : url;
      let search = url.substring(url.lastIndexOf("?") + 1);
      let obj = {};
      let reg = /([^?&=]+)=([^?&=]*)/g;
      search.replace(reg, function(rs, $1, $2) {
        let name = decodeURIComponent($1);
        let val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;

        return rs;
      });

      return obj;
    },
    getData() {
      // let baseUrl = http://218.249.45.162:1942/?tcourseId=a549eb72-44c0-3e61-83a6-98bf8ee69bb5&uid=a6594bf2-6b18-34c3-83a2-3a22e80fda91&ip=10.5.231.134&equipment=Android&bcourseid=0827e733-d3dd-3789-8481-c7428e98ce3f&projectid=1
      //  返回url参数对象
      let res = this.getParams(url);
      // console.log(res.equipment);

      //  获取移动端参数存储起来
      this.myUserId = res.uid;
      this.tCourseId = res.tcourseId;
      this.user_ip = res.ip;
      this.equipment = res.equipment;
      this.bcourseid = res.bcourseid;
      this.projectid = res.projectid;
      // console.log(this.user_ip, this.equipment, this.projectid);
      //做判断  合理的跳转路由
      if (this.tCourseId === "" && this.bcourseid === "") {
        this.$router.push({
          path: "/about?",
          query: {
            tcourseId: this.tCourseId,
            uid: this.myUserId,
            ip: this.user_ip,
            equipment: this.equipment,
            bcourseid: this.bcourseid,
            projectid: this.projectid
          }
        });
        return false;
      } else {
        this.$router.push({
          path: "/?",
          query: {
            tcourseId: this.tCourseId,
            uid: this.myUserId,
            ip: this.user_ip,
            equipment: this.equipment,
            bcourseid: this.bcourseid,
            projectid: this.projectid
          }
        });
      }
      //  判断参数为空,返回错误，直接return.
      if (
        this.tCourseId === "" ||
        this.myUserId === "" ||
        this.equipment === ""
      ) {
        this.idCourse = true;
        return;
      }
      if (this.bcourseid === "") {
        this.idProject = true;
        return;
      }
      // 拼接后的url
      let url = "/topic-course-list&tcourseId=" + this.tCourseId;
      this.$http({
        method: "get",
        url: url,
        timeout: 10000
      })
        .then(res => {
          this.myList = res;
          this.myNavData = res.activityType;
          this.myListData = res.list;
          this.objected = res.forum_id;
          // // 给导航动态渲染值
          this.topic = this.myNavData.not_vote.topic;
          this.comment = this.myNavData.not_vote.comment;

          this.discussion = this.myNavData.vote.topic;
          this.answer = this.myNavData.vote.comment;
        })
        .then(() => {
          let url = "http://10.5.231.161:1940/index.php?r=mongo/log-info";
          this.$http({
            method: "post",
            url: url,
            data: {
              time: this.nowTime,
              operation_code: this.operation_code,
              operation_name: this.operation_name,
              coursed: this.tCourseId,
              equipment: this.equipment,
              ip: this.user_ip,
              objected: this.objected,
              userid: this.myUserId,
              bcourseid: this.bcourseid,
              projectid: this.projectid
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
            }
          })
            .then(res => {
              console.log("log is successful...");
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          if (err.message.indexOf("timeout") !== -1) {
            this.AlertMessage = true;
          }
        });
    },
    homeSearch() {
      this.list = true;
      this.List = false;
      this.backIcon = true;
      this.center = false;
    },
    backHome() {
      this.list = false;
      this.List = true;
      this.searchContent = "";
      this.backIcon = false;
      this.center = true;
    },
    closeForum() {
      // 提示
      this.isModalVisible = true;
    },
    closeModal() {
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
    jumpInfo(
      tcourseId,
      topic_id,
      type,
      user_ip,
      equipment,
      bcourseid,
      projectid
    ) {
      // console.log(bcourseid,projectid);
      if (type === 3) {
        this.$router.push({
          path: "/vote?",
          query: {
            tcourseId: tcourseId,
            topic_id: topic_id,
            user_id: this.myUserId,
            user_ip: user_ip,
            equipment: equipment,
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
            user_id: this.myUserId,
            user_ip: user_ip,
            equipment: equipment,
            bcourseid: bcourseid,
            projectid: projectid
          }
        });
      }
    }
  },
  computed: {
    listResult() {
      // 判断输入
      if (this.searchContent === "") {
        return false;
      } else {
        // 输入返回结果
        return this.myListData.filter(item => {
          if (
            item.content.word.indexOf(this.searchContent) !== -1 ||
            item.title.indexOf(this.searchContent) !== -1
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
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/page/home.less";
</style>
