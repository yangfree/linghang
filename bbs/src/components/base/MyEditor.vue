<template>
  <div class="quill-wrap">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur"
      @focus="onEditorFocus"
      @change="onEditorChange"
    >
    </quill-editor>
  </div>
</template>

<script>
  // require styles
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';


  // import {quillEditor} from 'vue-quill-editor';
  // use插件
  import {quillEditor, Quill} from 'vue-quill-editor';
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module';


  Quill.register('modules/ImageExtend', ImageExtend);

  const updateUrl = 'http://218.249.45.162:1940/?r=forum/ajax-image-upload&tcourseId=';

  const toolBarOptions = [
    // [{'font': []}],         //字体
    ['bold', 'italic'],        //加粗，斜体，下划线，删除线   'underline', 'strike'
    ['blockquote'],         //引用，代码块  , 'code-block'

    // [{'header': 1}, {'header': 2}],               // 标题，键值对的形式；1、2表示字体大小
    [{'list': 'ordered'}, {'list': 'bullet'}],          //列表
    // [{'script': 'sub'}, {'script': 'super'}],      // 上下标
    // [{'indent': '-1'}, {'indent': '+1'}],          // 缩进
    // [{'direction': 'rtl'}],                         // 文本方向

    // [{'size': ['small', false, 'large', 'huge']}],  // 字体大小
    // [{'header': [1, 2, 3, 4, 5, 6, false]}],         //几级标题

    // [{'color': []}, {'background': []}],          // 字体颜色，字体背景颜色
    // [{'align': []}],        //对齐方式

    // ['clean'],        //清除字体样式
    ['image']        //上传图片、上传视频
  ];
  export default {
    name: 'MyEditor',
    components: {
      quillEditor,
    },
    props: ['tcourseId'],
    created() {
      // console.log(this.tcourseId);
    },
    data() {
      return {
        content: '',
        // 富文本框参数设置
        editorOption: {
          boundary: document.body,
          readOnly: false,
          theme: 'snow',
          placeholder: '请输入内容',
          modules: {
            ImageExtend: {
              loading: true,
              name: 'imagefile',  // 图片参数名
              size: 10,  // 可选参数 图片大小，单位为M，1M = 1024kb
              // 服务器地址, 如果action为空，则采用base64插入图片
              action: updateUrl + this.tcourseId,
              // response 为一个函数用来获取服务器返回的具体图片地址
              // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
              // 则 return res.data.url
              response: (res) => {
                // console.log(res.file_path);
                if (res.file_path === '') {
                  alert('只能上传图片。');
                  return false;
                }
                return res.file_path;
              },
              // 可选参数 设置请求头部
              headers: (xhr) => {
                // xhr.setRequestHeader('myHeader','myValue')
              },
              // 图片超过大小的回调
              sizeError: () => {
                alert('传递图片大小超过服务器限制，请重新上传。');
                return false;
              },
              // 可选参数 自定义开始上传触发事件
              start: () => {
                // console.log(this.content);
              },
              // 可选参数 自定义上传结束触发的事件，无论成功或者失败
              end: () => {
              },
              // 可选参数 上传失败触发的事件
              error: () => {
                alert('Sorry,err...')
              },
              // 可选参数  上传成功触发的事件
              success: () => {
                // alert('Success!!!')
              },
              change: (xhr, formData) => {
                // xhr.setRequestHeader('myHeader','myValue')
                // formData.append('token', 'myToken')
              },
            },
            toolbar: {
              // 工具栏
              container: toolBarOptions,
              //   自定义图片事件
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id);
                }
              }
            },
          },
        },
      }
    },
    methods: {
      onEditorBlur() {
        //失去焦点事件
        // console.log(this.content);

        // console.log("失去焦点");
      },
      onEditorFocus() {
        //获得焦点事件
        // this.content = '';
        // console.log('获得焦点');
      },
      onEditorChange() {
        //内容改变事件
        this.$emit('send', this.content);
        // console.log('改变');
      }
    }
  }
</script>

<style scoped lang="less">
  .quill-wrap {
    padding: 0.5rem 0 3rem 0;
    background-color: #fff;
    height: 9rem;
    .quill-editor {
      height: 100%;
    }
  }

</style>
