<template>
  <div class="create-vote">
    <!-- 头部 -->
    <MHeader>
      <router-link
        tag="i"
        class="iconfont icon-left-arrow"
        :to="{path: '/?', query:{tcourseId:tcourseId,uid:user_id,ip:ip,equipment:equipment,bcourseid:bcourseid,projectid:projectid}}"
      ></router-link>
      <span>发布投票</span>
      <button
        class="complete"
        @click="complete(tcourseId,type,title,content,user_id,defaultChoice,startTime,endTime,optionsList)"
        :disabled="isDisabled"
      >发布</button>
    </MHeader>
    <!-- 主要内容 -->
    <div class="main">
      <!--投票标题 -->
      <div class="main-title">
        <input type="text" v-model="title" title="投票主题" placeholder="请输入投票标题" ref="title">
      </div>
      <!-- 富文本插件 -->
      <template>
        <div id="father">
          <WangEditor :catchData="catchData" :tcourseId="tcourseId" :equipment="equipment"></WangEditor>
        </div>
      </template>
      <!-- 输入框提示文字 -->
      <div class="placeholder-words">不支持表情输入</div>
      <div class="editor-info" v-if="equipment < 'Android5'">您的系统版本过低，暂不支持图片上传功能。</div>
      <!-- 投票列表选项 -->
      <div class="options-list">
        <ul>
          <li v-for="(item,index) in optionsList" :key="index">
            <b>{{item.sort}}</b>
            <input type="text" v-model="item.content" title="输入投票选项" placeholder="请输入投票选项">
            <i class="iconfont icon-shanchu" @click="del(item.sort)"></i>
          </li>
        </ul>
        <div class="last" @click="addOptions">
          <em class="iconfont icon-jiahao"></em>
          <button :disabled="isButtonDisabled">添加选项</button>
          <p>
            <span>最多支持10个选项，每个选项不超过30个字。</span>
          </p>
        </div>
      </div>
      <!-- 类型 -->
      <div class="type">
        <span class="left">投票类型</span>
        <div class="right">
          <span>
            <input
              type="radio"
              title="投票类型单选"
              checked
              value="单选"
              v-model="defaultChoice"
              id="radio0"
            >
            <label for="radio0">单选</label>
          </span>
          <span>
            <input type="radio" title="投票类型多选" value="多选" v-model="defaultChoice" id="radio1">
            <label for="radio1">多选</label>
          </span>
        </div>
      </div>
      <!-- 判断时间提示信息 -->
      <div class="alert-info" v-show="alertInfoBox">{{alertInfo}}</div>
      <!-- 开始时间 -->
      <div class="start-time">
        <span class="left">设置开始时间</span>
        <span class="right">
          <el-date-picker
            v-model="startTime"
            type="datetime"
            align="right"
            placeholder="选择开始日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="formatStartDate"
          ></el-date-picker>
        </span>
      </div>
      <!-- 结束时间 -->
      <div class="end-time">
        <span class="left">设置结束时间</span>
        <span class="right">
          <el-date-picker
            v-model="endTime"
            type="datetime"
            align="right"
            placeholder="选择结束日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="formatEndDate"
          ></el-date-picker>
        </span>
      </div>
    </div>
    <!-- 公共弹框 -->
    <AlertMsg v-show="isModalVisible" @close="closeModal">
      <span slot="body">发表成功，可去首页查看~</span>
      <span slot="footer">
        <button type="button" class="btn-green" @click="closeModal">去首页</button>
      </span>
    </AlertMsg>

    <AlertMsg v-show="mostWord" @close="closeWord">
      <span slot="body">最多可以输入30个字。</span>
    </AlertMsg>

    <AlertMsg v-show="voteMessageTitle" @close="closeVote">
      <span slot="body">请输入投票标题。</span>
    </AlertMsg>
    <AlertMsg v-show="voteMessageContent" @close="closeVote">
      <span slot="body">请输入投票内容。</span>
    </AlertMsg>
    <AlertMsg v-show="voteMessage" @close="closeVote">
      <span slot="body">请输入投票选项。</span>
    </AlertMsg>

    <AlertMsg v-show="timeStart" @close="closeSTime">
      <span slot="body">请设置开始时间。</span>
    </AlertMsg>
    <AlertMsg v-show="timeEnd" @close="closeETime">
      <span slot="body">请设置结束时间。</span>
    </AlertMsg>
    <AlertMsg v-show="mostList" @close="closeList">
      <span slot="body">最多可以设置十个选项。</span>
    </AlertMsg>
    <AlertMsg v-show="delModal" @close="closeList">
      <span slot="body">投票至少要有两个选项。</span>
    </AlertMsg>
  </div>
</template>

<script>
import MHeader from "../../components/base/MHeader";
import VueQuillEditor from "../../components/base/MyEditor";
import AlertMsg from "../../components/base/AlertMsg";
import WangEditor from "../../components/base/WangEditor";
// import DatePicker from "../../components/base/DatePicker";

export default {
  name: "CreateVote",
  data() {
    return {
      isDisabled: false,
      delModal: false,
      number: "30",
      voteMain: false,
      mostList: false,
      timeStart: false,
      timeEnd: false,
      voteMessage: false,
      voteMessageTitle: false,
      voteMessageContent: false,
      mostWord: false,
      isModalVisible: false,
      tcourseId: "",
      user_id: "",
      ip: "",
      equipment: "",
      bcourseid: "",
      projectid: "",
      type: 3,
      title: "",
      optionsList: [{ sort: "A", content: "" }, { sort: "B", content: "" }],
      isButtonDisabled: null, // undefined    false
      defaultChoice: "单选",
      startTime: "",
      endTime: "",
      content: null,
      contentNull: null,
      alertInfo: "",
      alertInfoBox: false,
      //  mongo params
      id: "",
      subject: "",
      forumid: "",
      message: "",
      creatorid: "",
      createdtime: ""
    };
  },
  components: {
    MHeader,
    VueQuillEditor,
    AlertMsg,
    WangEditor
    // DatePicker
    // MyDate,
  },
  created() {
    // 获取参数
    this.tcourseId = this.$route.query.tcourseId;
    this.user_id = this.$route.query.uid;
    this.ip = this.$route.query.ip;
    this.equipment = this.$route.query.equipment;
    this.bcourseid = this.$route.query.bcourseid;
    this.projectid = this.$route.query.projectid;
    // 进入页面 自动获取焦点
    this.$nextTick(() => {
      this.$refs["title"].focus();
    });
  },
  methods: {
    formatEndDate() {
      if (this.startTime !== "" && this.endTime < this.startTime) {
        this.alertInfo = "结束时间不能小于开始时间";
        this.alertInfoBox = true;
      } else {
        this.alertInfoBox = false;
      }
    },
    formatStartDate() {
      if (this.endTime !== "" && this.startTime > this.endTime) {
        this.alertInfo = "开始时间不能大于结束时间";
        this.alertInfoBox = true;
      } else {
        this.alertInfoBox = false;
      }
    },
    catchData(value) {
      this.content = value; //在这里接受子组件传过来的参数，赋值给data里的参数
    },
    closeList() {
      this.mostList = false;
      this.delModal = false;
    },
    closeSTime() {
      this.timeStart = false;
    },
    closeETime() {
      this.timeEnd = false;
    },
    closeVote() {
      this.voteMessage = false;
      this.voteMessageTitle = false;
      this.voteMessageContent = false;
    },
    closeWord() {
      this.mostWord = false;
    },
    closeModal() {
      this.isModalVisible = false;
      // // 跳转路由到主页
      this.$router.push({
        path: "/?",
        query: {
          tcourseId: this.tcourseId,
          uid: this.user_id,
          ip: this.ip,
          equipment: this.equipment,
          bcourseid: this.bcourseid,
          projectid: this.projectid
        }
      });
    },
    send(send) {
      this.content = send;
    },
    addOptions() {
      let ary = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
      if (this.optionsList.length <= 9) {
        this.optionsList.push({
          sort: ary[this.optionsList.length],
          content: ""
        });
      } else {
        this.mostList = true;
      }
    },
    del(item) {
      let ary = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
      // console.log(this.optionsList.length);
      if (this.optionsList.length > 2) {
        this.optionsList = this.optionsList.filter(a => a.sort !== item);
      } else {
        this.delModal = true;
      }
      let currentLen = this.optionsList.length;
      ary = ary.splice(0, currentLen);
      for (let i = 0; i < ary.length; i++) {
        this.optionsList[i]["sort"] = ary[i];
      }
    },
    complete(
      tcourseId,
      type,
      title,
      content,
      user_id,
      vote_type,
      beginTime,
      endTime,
      vote_list
    ) {
      // 标题不能为空
      if (title === "") {
        this.voteMessageTitle = true;
        return;
      }
      // 内容不能为空
      if (content === null || content === "<p><br></p>") {
        this.voteMessageContent = true;
        return;
      }
      // 投票选项不能为空
      this.contentNull = vote_list.filter(item => {
        return item.content === "";
      });
      if (this.contentNull.length > 0) {
        this.voteMessage = true;
        return;
      }
      // 投票开始时间不能为空
      if (beginTime === "") {
        this.timeStart = true;
        return;
      }
      // 投票结束时间不能为空
      if (endTime === "") {
        this.timeEnd = true;
        return;
      }
      vote_list = JSON.stringify(this.optionsList);
      // console.log(JSON.parse(vote_list));
      vote_type === "单选" ? (vote_type = 1) : (vote_type = 2);
      // 限制快速点击可以发帖多次的情况
      this.isDisabled = true;
      // 基础url
      let url = "/forum-topic-add&";

      // 发送请求
      this.$http({
        method: "post",
        url: url,
        data: {
          tcourseId: tcourseId,
          type: type,
          title: title,
          content: content,
          create_by: user_id,
          vote_type: vote_type,
          begin_time: beginTime,
          end_time: endTime,
          vote_list: vote_list
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
        timeout: 3000
      })
        .then(res => {
          this.isModalVisible = true;
          //  创建完成后备份给mongo  参数
          // console.log(res);
          this.id = res.id;
          this.subject = res.title;
          this.forumid = res.forum_id;
          this.message = res.content;
          this.creatorid = res.create_by;
          this.createdtime = res.create_time;
        })
        .then(() => {
          // 发送post请求
          let url =
            "http://10.5.231.161:1940/index.php?r=mongo/forum-reply-info";
          this.$http({
            method: "post",
            url: url,
            data: {
              postsid: this.id,
              subject: this.subject,
              selectionCourseid: this.tcourseId,
              forumid: this.forumid,
              parentid: "0",
              message: this.message,
              creatorid: this.creatorid,
              createdtime: this.createdtime,
              type: "1",
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
            .then(() => console.log("create vote is successful..."))
            .catch(err => console.log(err));
        })
        .then(() => {
          //  发送日志
          // 发送post请求   1讨论帖 2答疑帖
          if (this.optionValue === "1") {
            this.operation_code = "16010004";
            this.opertation_name = "发布讨论贴";
          } else {
            this.operation_code = "15010013";
            this.opertation_name = "发布答疑帖";
          }
          // console.log(this.opertation_name, this.operation_code);
          let url = "http://10.5.231.161:1940/index.php?r=mongo/log-info";
          this.$http({
            method: "post",
            url: url,
            data: {
              time: this.createdtime,
              operation_code: "15010015",
              opertation_name: "发布投票贴",
              coursed: this.tcourseId,
              equipment: this.equipment,
              ip: this.ip,
              objected: this.id,
              userid: this.user_id,
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
            .then(() => console.log("create vote log is successful..."))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  },
  computed: {},
  watch: {
    title() {
      if (this.title.length > this.number) {
        this.title = String(this.title).slice(0, this.number);
        this.mostWord = true;
      }
    },
    optionsList: {
      handler: function(newVal, oldVal) {
        newVal.map(item => {
          if (item.content.length > this.number) {
            item.content = String(item.content).slice(0, this.number);
            this.mostWord = true;
          }
        });
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/page/create-vote.less";
</style>
