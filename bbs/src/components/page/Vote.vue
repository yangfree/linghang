<template>
  <div class="vote-page">
    <MHeader>
      <router-link
        tag="i"
        class="iconfont icon-left-arrow"
        :to="{path: '/', query:{tcourseId:tcourseId,uid:user_id,ip:user_ip,equipment:equipment,bcourseid:bcourseid,projectid:projectid}}"
      ></router-link>
      <span>帖子详情</span>
      <i class="iconfont icon-ai22" @click="refresh"></i>
    </MHeader>
    <div class="vote-contentall">
      <div class="vote-main">
        <div class="vote-title">
          <span v-html="title">{{title}}</span>
        </div>
        <div class="choose">
          <span class="left">{{voteType | moreOrOne}}</span>
        </div>
        <div class="vote-content" v-html="voteContent"></div>
        <div class="vote">
          <ul>
            <li
              @click="clickActive(index,item.id)"
              :class="{'actived': activeName === index,active:classItem[index]}"
              v-for="(item,index) in voteList"
              :key="item.id"
            >
              <div class="title">
                <span class="left">
                  <b>{{index | formatting}}</b>
                  {{item.content}}
                </span>
                <span class="right">
                  <b>{{item.count}}票</b>
                  <i>{{item.percentage*100+'%'}}</i>
                </span>
              </div>
              <div class="progress">
                <div class="inner" :style="{width: item.percentage*100+'%'}"></div>
              </div>
            </li>
          </ul>
          <p>
            <span>
              截止时间:
              <b>{{endTime}}</b>
            </span>
          </p>
        </div>
        <div class="btn">
          <button @click="vote(myTopicId,user_id,voteType,chooseItems)" :disabled="pastTime">投票</button>
        </div>
      </div>
      <CommentVote :commentList="commentList" :userName="userName" @sendUser="sendUser"></CommentVote>
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
    <!-- 提示信息弹框 -->
    <AlertMsg v-show="isModalVisible" @close="closeModal">
      <span slot="body">投票成功，感谢您投宝贵的一票！</span>
    </AlertMsg>
    <AlertMsg v-show="alertModal" @close="closeAlert">
      <span slot="body">请输入回复内容。</span>
    </AlertMsg>
    <AlertMsg v-show="replyModal" @close="closeReply">
      <span slot="body">评论发表成功！</span>
    </AlertMsg>
    <AlertMsg v-show="voteModal" @close="closeAlert">
      <span slot="body">请选择投票选项。</span>
    </AlertMsg>
    <AlertMsg v-show="replyContentModal" @close="closeAlert">
      <span slot="body">回复内容最多为1000字符!!!</span>
    </AlertMsg>
  </div>
</template>

<script>
import MHeader from "../../components/base/MHeader";
import CommentVote from "../../components/base/CommentVote";
import AlertMsg from "../../components/base/AlertMsg";
import AlertMessage from "../../components/base/AlertMessage";

export default {
  name: "forum",
  data() {
    return {
      AlertMessage: false,
      isDisabled: false,
      voteModal: false,
      disabledClass: "",
      disabled: false,
      replyModal: false,
      alertModal: false,
      isModalVisible: false,
      replyContentModal: false,
      userPhoto: "",
      reply: "",
      activeName: "",
      classItem: [],
      topic_id: "",
      tcourseId: "",
      user_id: "",
      voteInfo: null,
      voteList: null,
      userName: "",
      pid: "",
      idPid: "",
      chooseItems: [],
      votedId: null,

      title: "",
      voteContent: "",
      endTime: "",
      beginTime: "",
      myTopicId: "",
      voteType: "",
      commentList: [],
      id: "",
      user_ip: "",
      equipment: "",
      operation_code: "16010016",
      opertation_name: "读贴",
      course_id: "",
      resTitle: "",
      forum_id: "",
      topicId: "",
      message: "",
      creatorid: "",
      createdtime: "",
      bcourseid: "",
      projectid: "",
      nowUserName: "",
      nowUserPhoto: ""
    };
  },
  components: {
    MHeader,
    CommentVote,
    AlertMsg,
    AlertMessage
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
    firstGetData() {
      // 获取url参数
      this.tcourseId = this.$route.query.tcourseId;
      this.topic_id = this.$route.query.topic_id;
      this.user_id = this.$route.query.user_id;
      this.user_ip = this.$route.query.user_ip;
      this.equipment = this.$route.query.equipment;
      this.bcourseid = this.$route.query.bcourseid;
      this.projectid = this.$route.query.projectid;
      // console.log(this.bcourseid,this.projectid);
      let url =
        "/forum-comment-list&topic_id=" +
        this.topic_id +
        "&user_id=" +
        this.user_id;
      this.$http({
        method: "get",
        url: url,
        timeout: 10000
      })
        .then(res => {
          // 投票详情
          this.title = res.topic.title;
          this.voteType = res.topic.vote_type;
          this.voteContent = res.topic.content;
          this.endTime = res.topic.end_time;
          this.beginTime = res.topic.begin_time;
          this.myTopicId = res.topic.id;
          this.userPhoto = res.topic.photo;
          this.votedId = res.voted_id.length;
          this.nowUserPhoto =
            res.active_user === null ? "" : res.active_user.url_image;
          this.nowUserName =
            res.active_user === null ? "" : res.active_user.pet_name;

          // 选项列表
          this.voteList = res.vote;
          // 传递给子组件的数据
          this.commentList = res.list;
          this.userName = res.topic.pet_name;
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
              userid: this.userid,
              bcourseid: this.bcourseid,
              projectid: this.projectid
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
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
            .then(() => {
              console.log("voteList log is successful...");
            })
            .catch(err => console.log(err));
        })
        .catch(err => {
          if (err.message.indexOf("timeout") !== -1) {
            this.AlertMessage = true;
          }
        });
    },
    clickActive(index, id) {
      if (this.voteType === 1) {
        // 单选
        this.activeName = index;
        this.chooseItems = id;
      } else {
        // 多选
        if (
          this.classItem[index] === undefined ||
          this.classItem[index] === false
        ) {
          this.$set(this.classItem, index, true);
          this.chooseItems.push(id);
        } else {
          this.$set(this.classItem, index, false);
          this.chooseItems = this.chooseItems.filter(item => item !== id);
        }
        this.chooseItems = [...new Set(this.chooseItems)];
      }
      // console.log(id);
    },
    vote(topic_id, create_by, vote_type, chooseItem) {
      // console.log(topic_id, create_by, vote_type, chooseItem);
      // return false;
      if (vote_type === 2) chooseItem = JSON.stringify(chooseItem);
      // 不选择选项的情况下
      if (chooseItem == "") {
        this.voteModal = true;
        return;
      }
      const url = "/topic-user-vote&";
      this.$http({
        method: "get",
        url: url,
        params: {
          topic_id: topic_id,
          create_by: create_by,
          vote_type: vote_type,
          vote_id: chooseItem
        }
      })
        .then(() => {
          this.isModalVisible = true;
        })
        .then(() => {
          // 日志
          let url = "http://10.5.231.161:1940/index.php?r=mongo/log-info";
          this.$http({
            method: "post",
            url: url,
            data: {
              time: this.nowTime,
              operation_code: "16010021",
              opertation_name: "投票",
              coursed: this.topic_id,
              equipment: this.equipment,
              ip: this.user_ip,
              objected: this.id,
              userid: this.user_id,
              bcourseid: this.bcourseid,
              projectid: this.projectid
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
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
            .then(() => {
              console.log("vote log is successful...");
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    addInfo(reply, topic_id, user_id, pid, idPid) {
      // console.log(user_id);
      if (reply === "") {
        this.alertModal = true;
        return;
      }
      if (reply !== "" && reply.length >= 1000) {
        this.replyContentModal = true;
        return false;
      }
      // 限制快速点击发表多条评论
      this.isDisabled = true;
      this.$http({
        method: "post",
        url: "/forum-comment-add&",
        data: {
          content: reply,
          topic_id: topic_id,
          create_by: user_id,
          pid: pid || idPid
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
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
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
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
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
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
              }).then(() => console.log("vote comment log is successful..."));
            })
            .then(() => console.log("vote comment is successful..."))
            .catch(err => console.log(err));
        })
        .then(() => {
          this.replyModal = true;
        })
        .catch(err => console.log(err));
    },
    sendUser(sendUser, pid, create_by, id) {
      this.reply = "";
      this.reply = "回复 " + sendUser + ": ";
      this.create_by = create_by;
      this.pid = pid;
      this.idPid = id;
    },
    closeModal() {
      this.isModalVisible = false;
      this.reload();
    },
    closeAlert() {
      this.alertModal = false;
      this.voteModal = false;
      this.replyContentModal = false;
    },
    closeReply() {
      this.replyModal = false;
      this.reply = "";
      this.reload();
    }
  },
  filters: {
    moreOrOne(val) {
      return val === 1 ? "类型: 单选" : "类型: 多选";
    },
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
    },
    pastTime() {
      // reg replace for IOS
      let formatNowTime = this.nowTime.replace(/-/g, "/");
      let formatEndTime = this.endTime.replace(/-/g, "/");
      let formatBeginTime = this.beginTime.replace(/-/g, "/");

      if (
        this.votedId > 0 ||
        Date.parse(new Date(formatNowTime)) >
          Date.parse(new Date(formatEndTime)) ||
        Date.parse(new Date(formatNowTime)) <
          Date.parse(new Date(formatBeginTime))
      ) {
        return true;
      }
    }
  },
  watch: {}
};
</script>

<style scoped lang="less">
@import "../../assets/less/page/vote.less";
</style>
