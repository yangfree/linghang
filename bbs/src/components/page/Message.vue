<template>
  <div class="message-page">
    <MHeader>
      <router-link
        tag="i"
        class="iconfont icon-left-arrow"
        :to="{path: '/?', query:{tcourseId:tcourseId,uid:user_id,ip:ip,equipment:equipment,bcourseid:bcourseid,projectid:projectid}}"
      ></router-link>
      <span>发帖</span>
      <button
        class="complete"
        @click="postContent(tcourseId,defaultChoice,title,content,user_id)"
        :disabled="isDisabled"
      >发布</button>
    </MHeader>
    <div class="main">
      <div class="title">
        <input type="text" v-model="title" title="请输入标题" placeholder="请输入标题" ref="title">
      </div>
      <div class="type">
        <span>创建类型</span>
        <div>
          <span>
            <input type="radio" title="帖子类型答疑" value="2" v-model="defaultChoice" id="radio0">
            <label for="radio0">答疑帖</label>
          </span>
          <span>
            <input type="radio" title="帖子类型讨论" value="1" v-model="defaultChoice" id="radio1">
            <label for="radio1">讨论帖</label>
          </span>
        </div>
      </div>
      <!--<VueQuillEditor :tcourseId="tcourseId" @send="send"></VueQuillEditor>-->
      <!--富文本插件-->
      <template>
        <div id="father">
          <WangEditor :catchData="catchData" :tcourseId="tcourseId" :equipment="equipment"></WangEditor>
        </div>
      </template>
      <!--富文本提示语-->
      <div class="placeholder-words">不支持表情输入</div>
      <div class="editor-info" v-if="equipment < 'Android5'">您的系统版本过低，暂不支持图片上传功能。</div>
    </div>

    <!--  弹框提示语 -->
    <AlertMsg v-show="isModalVisible" @close="closeModal">
      <span slot="body">发表成功，可去首页查看~</span>
      <span slot="footer">
        <button type="button" class="btn-green" @click="closeModal">去首页</button>
      </span>
    </AlertMsg>

    <AlertMsg v-show="mostWord" @close="closeWord">
      <span slot="body">最多可以输入30个字。</span>
    </AlertMsg>

    <AlertMsg v-show="lessWordTitle" @close="closeWord">
      <span slot="body">帖子标题不能为空。</span>
    </AlertMsg>

    <AlertMsg v-show="lessWordContent" @close="closeWord">
      <span slot="body">帖子内容不能为空。</span>
    </AlertMsg>
  </div>
</template>

<script>
import MHeader from "../../components/base/MHeader";
import AlertMsg from "../../components/base/AlertMsg";
import WangEditor from "../../components/base/WangEditor";

export default {
  name: "message",
  components: {
    MHeader,
    AlertMsg,
    WangEditor
  },
  data() {
    return {
      content: "",
      isDisabled: false,
      number: "30",
      lessWordTitle: false,
      lessWordContent: false,
      mostWord: false,
      isModalVisible: false,
      tcourseId: "",
      user_id: "",
      ip: "",
      equipment: "",
      bcourseid: "",
      projectid: "",
      sendData: "",
      title: "",
      optionValue: "",
      defaultChoice: "1",
      // give mongo params
      id: "",
      subject: "",
      forumid: "",
      message: "",
      creatorid: "",
      createdtime: "",
      operation_code: "",
      opertation_name: ""
    };
  },
  created() {
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
    catchData(value) {
      this.content = value; //在这里接受子组件传过来的参数，赋值给data里的参数
    },
    closeWord() {
      this.mostWord = false;
      this.lessWordTitle = false;
      this.lessWordContent = false;
    },
    closeModal() {
      this.isModalVisible = false;
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
      this.sendData = send;
    },
    postContent(tcourseId, type, title, content, create_by) {
      // 判断参数是否有效
      if (title === "") {
        this.lessWordTitle = true;
        return;
      }
      if (content === "" || content === "<p><br></p>") {
        this.lessWordContent = true;
        return;
      }
      this.isDisabled = true;
      //  建立路径 发送请求
      let url = "/forum-topic-add&";
      this.$http({
        method: "post",
        url: url,
        data: {
          tcourseId: tcourseId,
          type: type,
          title: title,
          content: content,
          create_by: create_by
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
        timeout: 10000
      })
        .then(res => {
          this.isModalVisible = true;
          //  创建完成后给备份给mongo  参数
          this.id = res.id;
          this.subject = res.title;
          this.forumid = res.forum_id;
          this.message = res.content;
          this.creatorid = res.create_by;
          this.createdtime = res.create_time;
          // console.log(res);
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
            .then(() => console.log("message is successful..."))
            .catch(err => console.log(err));
        })
        .then(() => {
          //  发送日志
          // 发送post请求   1讨论帖 2答疑帖
          if (this.defaultChoice === "1") {
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
              operation_code: this.operation_code,
              opertation_name: this.opertation_name,
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
            .then(() => console.log("message log is successful..."))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  },
  watch: {
    title() {
      if (this.title.length > this.number) {
        this.title = String(this.title).slice(0, this.number);
        this.mostWord = true;
      }
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/page/message.less";
</style>
