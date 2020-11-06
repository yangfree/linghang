# 论坛答疑

> 论坛答疑模块,项目在PC端需在IE8以上...node版本需>=6.0,npm版本需要>=3.0.移动端支持IOS和安卓5.0以上版本(包括5.0).

## 页面组件

- 论坛首页 `Home`
- 我的帖子 `About`
- 帖子详情一 `BBSInfo`
- 帖子详情二 `Vote`
- 发布投票 `CreateVote`
- 发布帖子 `Message`

## 基础组件

- 弹框请求超时 `AlertMessage`
- 弹框信息 `AlertMsg`
- 帖子详情列表一 对应答疑讨论帖子 `Comment`
- 帖子详情列表二 对应投票帖子 `CommentVote`
- 首页列表 `List`
- 公共头部  `MHeader`
- 首页按钮 `MyBtn`
- 日历选择 没有使用项目中使用elementUI的日历组件 `MyDate` (可删除)
- 富文本插件 `Vue-Quill-Editor` 因为不支持安卓低版本而弃用 对应`MyEditor`组件 (可删除)
- 富文本插件 `WangEditor`

## 项目构建和打包

``` bash
# install dependencies
$npm install

# serve with hot reload at localhost:8081
$npm run dev

# build for production with minification
$npm run build

```
