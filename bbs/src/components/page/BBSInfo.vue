<template>
  <div class="bbs-info">
    <MHeader>
      <router-link
        tag="i"
        class="iconfont icon-left-arrow"
        :to="{path: '/?', query:{tcourseId:tcourseId,uid:user_id,ip:user_ip,equipment:equipment,bcourseid:bcourseid,projectid:projectid}}"
      ></router-link>
      <span>帖子详情</span>
      <i class="iconfont icon-ai22" @click="refresh"></i>
    </MHeader>
    <div class="main">
      <div class="main-box">
        <div class="user">
          <div class="img">
            <img :src="userPhoto||imgError()" alt>
          </div>
          <div class="info">
            <h4>{{userName}}</h4>
            <p>{{createTime}}</p>
          </div>
        </div>
        <h3 v-html="title">{{title}}</h3>
        <article v-html="content"></article>
      </div>
      <Comment
        :restore-list="restoreList"
        :user-name="userName"
        ref="commentList"
        @sendUser="sendUser"
      ></Comment>
      <!-- 提示消息组件 -->
    </div>
    <div class="input">
      <div class="img">
        <img :src="nowUserPhoto||imgError()" :alt="nowUserName">
      </div>
      <input type="text" v-model="reply" title="回复" placeholder="回复">
      <button
        @click.stop.prevent="addInfo(reply,topic_id,user_id,pid,idPid)"
        :disabled="isDisabled"
      >发表</button>
    </div>
    <AlertMessage v-if="AlertMessage"></AlertMessage>
    <AlertMsg v-show="alertModal" @close="closeAlert">
      <span slot="body">请输入回复内容。</span>
    </AlertMsg>
    <AlertMsg v-show="replyModal" @close="closeReply">
      <span slot="body">评论发表成功。</span>
    </AlertMsg>
    <AlertMsg v-show="replyContentModal" @close="closeAlert">
      <span slot="body">回复内容最多为1000字符!!!</span>
    </AlertMsg>
  </div>
</template>

<script>
import MHeader from "../../components/base/MHeader";
import Comment from "../../components/base/Comment";
import AlertMsg from "../../components/base/AlertMsg";
import AlertMessage from "../../components/base/AlertMessage";

export default {
  name: "BBS-info",
  components: {
    MHeader,
    Comment,
    AlertMsg,
    AlertMessage
  },
  data() {
    return {
      AlertMessage: false,
      isDisabled: false,
      alertModal: false,
      replyModal: false,
      replyContentModal: false,
      userPhoto: "",
      userName: "",
      createTime: "",
      content: "",
      title: "",

      reply: "",
      restoreList: [],

      topic_id: "",
      tcourseId: "",
      user_id: "",
      pid: "",
      idPid: "",
      user_ip: "",
      equipment: "",
      operation_code: "16010016",
      opertation_name: "读贴",
      id: "",
      course_id: "",
      resTitle: "",
      forum_id: "",
      topicId: "",
      message: "",
      creatorid: "",
      createdtime: "",
      bcourseid: "",
      projectid: "",
      // 当前用户头像
      nowUserPhoto: "",
      nowUserName: ""
    };
  },
  created() {
    this.firstGetData();
  },
  inject: ["reload"],
  methods: {
    refresh() {
      this.reload();
    },
    imgError() {
      return require("../../assets/images/userdefault_1.png");
    },
    sendUser(sendUser, pid, create_by, id) {
      this.reply = "";
      this.reply = "回复 " + sendUser + ": ";
      this.create_by = create_by;
      this.pid = pid;
      this.idPid = id;
    },
    firstGetData() {
      this.tcourseId = this.$route.query.tcourseId;
      this.topic_id = this.$route.query.topic_id;
      this.user_id = this.$route.query.user_id;
      this.user_ip = this.$route.query.user_ip;
      this.equipment = this.$route.query.equipment;
      this.bcourseid = this.$route.query.bcourseid;
      this.projectid = this.$route.query.projectid;
      // console.log(this.bcourseid, this.projectid);
      let url =
        "/forum-comment-list&topic_id=" +
        this.topic_id +
        "&user_id=" +
        this.user_id;
      this.$http({
        url: url,
        timeout: 10000
      })
        .then(res => {
          // 楼主信息
          this.userPhoto = res.topic.photo;
          this.userName = res.topic.pet_name;
          this.createTime = res.topic.create_time;
          this.content = res.topic.content;
          this.title = res.topic.title;
          this.id = res.topic.id;
          this.nowUserPhoto =
            res.active_user === null ? "" : res.active_user.url_image;
          this.nowUserName =
            res.active_user === null ? "" : res.active_user.pet_name;
          // 回复列表信息
          this.restoreList = res.list;
          // console.log(res);
        })
        .then(() => {
          let url = "http://10.5.231.161:1940/index.php?r=mongo/log-info";
          this.$http({
            method: "post",
            url: url,
            data: {
              time: this.nowTime,
              operation_code: this.operation_code,
              opertation_name: this.opertation_name,
              coursed: this.topic_id,
              equipment: this.equipment,
              ip: this.user_ip,
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
          });
        })
        .then(() => {
          console.log("bbsInfo log is successful...");
        })
        .catch(err => {
          if (err.message.indexOf("timeout") !== -1) {
            this.AlertMessage = true;
          }
        });
    },
    addInfo(reply, topic_id, create_by, pid, idPid) {
      if (reply === "") {
        this.alertModal = true;
        return;
      }
      if (reply !== "" && reply.length >= 1000) {
        this.replyContentModal = true;
        return false;
      }
      this.isDisabled = true;
      this.$http({
        method: "post",
        url: "/forum-comment-add&",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          content: reply,
          topic_id: topic_id,
          create_by: create_by,
          pid: pid || idPid
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
        ]
      })
        .then(res => {
          this.course_id = res.course_id;
          this.id = res.id;
          this.resTitle = res.topic_title;
          this.forum_id = res.forum_id;
          this.topicId = res.topic_id;
          this.message = res.content;
          this.creatorid = res.create_by;
          this.createdtime = res.create_time;
        })
        .then(() => {
          // 成功后写入备份回复
          let url =
            "http://10.5.231.161:1940/index.php?r=mongo/forum-reply-info";
          this.$http({
            method: "post",
            url: url,
            data: {
              postsid: this.id,
              subject: this.resTitle,
              selectionCourseid: this.course_id,
              forumid: this.forum_id,
              parentid: this.topicId,
              message: this.message,
              creatorid: this.creatorid,
              createdtime: this.createdtime,
              type: 2,
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
            .then(() => {
              // 提交成功后发送日志
              let url = "http://10.5.231.161:1940/index.php?r=mongo/log-info";
              this.$http({
                method: "post",
                url: url,
                data: {
                  time: this.createdtime,
                  operation_code: "15010012",
                  opertation_name: "回复帖子",
                  coursed: this.topic_id,
                  equipment: this.equipment,
                  ip: this.user_ip,
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
              }).then(() => console.log("list comment log is successful..."));
            })
            .then(() => console.log("list comment is successful..."))
            .catch(err => console.log(err));
        })
        .then(() => {
          this.replyModal = true;
        })
        .catch(err => console.log(err));
    },
    closeAlert() {
      this.alertModal = false;
      this.replyContentModal = false;
    },
    closeReply() {
      this.replyModal = false;
      this.reply = "";
      this.reload();
    }
  },
  computed: {
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
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/page/bbs-info.less";
</style>
