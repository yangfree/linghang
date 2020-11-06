<template>
  <div class="comment">
    <ul class="comment-list">
      <li v-for="(item,index) in restoreList" :key="index">
        <i class="iconfont icon-louzhu" v-if="item.current_pet_name===userName?!flag:flag"></i>
        <div class="comment-first">
          <div class="user">
            <div class="left">
              <div class="img">
                <img :src="item.current_url_img" @error="imgError(item)" alt>
              </div>
            </div>
            <div class="right">
              <span @click="replyDoThing(item)">{{item.current_pet_name}}</span>
              <p>{{item.create_time}}</p>
            </div>
          </div>
          <article>{{item.content}}</article>
        </div>
        <div class="bg">
          <ul>
            <li v-for="(reply,index) in item.list" :key="index" v-show="index<item.defaultInfo.num">
              <div v-if="reply.pid===item.id">
                <a
                  href="javascript: void 0"
                  @click="replyDoThing(reply)"
                >{{reply.current_pet_name}}:</a>
                <span class="reply-content">{{reply.content}}</span>
              </div>
              <div v-if="reply.pid!==item.id">
                <a
                  href="javascript: void 0"
                  @click="replyDoThing(reply)"
                >{{reply.current_pet_name}}:</a>回复
                <span class="userName">{{reply.parent_pet_name}}:</span>
                <span class="reply-content">{{reply.content}}</span>
              </div>
            </li>
          </ul>
          <div class="reply-btn" v-show="item.list!==0&&item.list.length>2">
            <a
              href="javascript: void 0"
              @click.stop.prevent="showMore(item)"
            >{{item.defaultInfo.title}}</a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Comment",
  props: {
    restoreList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    userName: {
      type: String,
      default: "user"
    }
  },
  data() {
    return {
      flag: false,
    };
  },
  methods: {
    imgError(item) {
      item.current_url_img = require("../../assets/images/userdefault_1.png");
    },
    showMore(item) {
      if (item.defaultInfo.num <= 2) {
        item.defaultInfo.num = item.list.length;
        item.defaultInfo.title = "收起全部";
      } else {
        item.defaultInfo.num = 2;
        item.defaultInfo.title = "显示剩余";
      }
    },
    replyDoThing(reply) {
      this.$emit(
        "sendUser",
        reply.current_pet_name,
        reply.pid,
        reply.create_by,
        reply.id
      );
    }
  }
};
</script>

<style scoped lang="less">
.comment {
  width: 100%;
  .comment-list {
    list-style: none;
    li {
      position: relative;
      border-bottom: 1px solid #ccc;
      i {
        position: absolute;
        top: -15px;
        left: 0;
        color: #ff0000;
        font-size: 2.5rem;
      }
      .comment-first {
        margin-bottom: 0.625rem;
        .user {
          margin: 0.625rem 1.875rem;
          overflow: hidden;
          .left {
            float: left;
            .img {
              width: 1.875rem;
              height: 1.875rem;
              -webkit-border-radius: 50%;
              border-radius: 50%;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .right {
            margin-left: 2.5rem;
            h3 {
              font-weight: normal;
              font-size: 0.875rem;
            }
            p {
              line-height: 1rem;
              font-size: 0.75rem;
              color: #666;
            }
          }
        }
        article {
          margin: 0 1.875rem;
          font-size: 0.75rem;
          word-break: break-word;
          overflow-wrap: break-word;
        }
      }
      .bg {
        background-color: #ededed;
        margin: 0.625rem 1.875rem;
        ul {
          font-size: 0.75rem;
          list-style: none;
          li {
            border-bottom: none;
            padding: 0.2rem 0.5rem;
            .reply-content {
              word-break: break-word;
              overflow-wrap: break-word;
            }
            a {
              color: #25b7fa;
            }
            .userName {
              color: #10277a;
            }
          }
        }
        .reply-btn {
          height: 1.5rem;
          a {
            padding: 1rem 0.5rem;
            font-size: 0.75rem;
            color: #25b7fa;
          }
        }
      }
    }
  }
}
</style>
