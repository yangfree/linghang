/*
 * @Author: Jie.Yang 
 * @Date: 2019-03-28 09:13:21 
 * @Last Modified by: Author
 * @Last Modified time: 2019-05-31 10:53:18
 */
<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left;"></div>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "editorElem",
  data() {
    return {
      editorContent: "",
      Android: "Android5"
    };
  },
  props: ["catchData", "tcourseId", "equipment"],
  mounted() {
    let editor = new E(this.$refs.editorElem);
    editor.customConfig.onchange = html => {
      this.editorContent = html;
      //把这个html通过catchData的方法传入父组件
      this.catchData(html);
    };
    //自定义图片接口
    editor.customConfig.uploadImgServer =
      "http://218.249.45.162:1940/?r=forum/ajax-image-upload&tcourseId=" +
      this.tcourseId;
    // 自定义文件名
    editor.customConfig.uploadFileName = "imagefile";
    // setting timeout
    editor.customConfig.uploadImgTimeout = 30000;
    // setting iamgeMaxSize
    editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024;
    // 限制一次最多上传 1 张图片
    editor.customConfig.uploadImgMaxLength = 1;
    // 隐藏“网络图片”tab
    editor.customConfig.showLinkImg = false;
    // Set z-index
    editor.customConfig.zIndex = 999;
    // setting Headers for example token/cookio
    editor.customConfig.uploadImgHeaders = {
      Accept: "*/*"
    };
    // recent Android version
    editor.Android = this.Android;
    // user Android version
    editor.equipment = this.equipment;
    // setting menus
    editor.customConfig.menus = ["head", "image", "undo"];
    // 安卓版本判断
    if (editor.equipment < editor.Android) {
      editor.customConfig.menus = ["head", "undo"];
    }
    editor.customConfig.uploadImgHooks = {
      /**
       * @params:
       *   xhr 是 XMLHttpRequst 对象
       *   editor 是编辑器对象，
       *   files 是选择的图片文件
       *   result 是服务器端返回的结果
       *   insertImg 是插入图片的函数
       * */

      // 图片上传之前触发
      before: function(xhr, editor, files) {},
      // 图片上传并返回结果，图片插入成功之后触发
      success: function(xhr, editor, result) {
        this.imgUrl = result.file_path;
      },
      // 图片上传并返回结果，但图片插入错误时触发
      fail: function(xhr, editor, result) {
        console.log("插入出错");
      },
      // 图片上传出错时触发
      error: function(xhr, editor) {
        console.log("上传出错");
      },
      // 图片上传超时时触发
      timeout: function(xhr, editor) {},
      // result 必须是一个 JSON 格式字符串！！！否则报错
      customInsert: function(insertImg, result, editor) {
        let url = result.file_path;
        insertImg(url);
      }
    };

    editor.create();
  }
};
</script>