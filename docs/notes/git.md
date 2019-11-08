---
title: Git笔记
sidebar: auto
---

## Git笔记

这篇笔记仅供自己查看使用，不具备教程作用。更多关于Git的资料教程请参考官方文档[https://git-scm.com/book/zh/v2/](https://git-scm.com/book/zh/v2/)

### 起步-关于版本控制

> 版本控制是一种记录一个或若干文件内容变化，以便将来查阅特定版本修订情况的系统。

#### 集中式版本控制系统

> 一个单一的集中管理的服务器，保存所有文件的修订版本，而协同工作的人们都通过客户端连到这台服务器，取出最新的文件或者提交更新。

![集中式版本控制系统](/images/git_1.png "集中式版本控制系统")

#### 分布式版本控制系统

> 分布式管理系统客户端提取的不仅仅是最新的文件，而是把整个仓库克隆到客户端

![分布式版本控制系统](/images/git_2.png "分布式版本控制系统")

#### 优势

* 不怕服务器宕机或者数据库所在的磁盘损坏。
* 强大的分支系统

### Git基础

> `Git` 有三种状态，"已提交", "已修改"和"已暂存", 三种状态对应着三个工作区域概念，分别是**Git仓库**，**工作目录**以及**暂存区域**。

基本的工作流程：

* 在工作中修改了文件
* 暂存文件，将文件存入暂存区。
* 提交更新，找到暂存区域的文件，将快照永久性存储到 `Git` 仓库目录。

![Git工作流程图](/images/git_3.png "Git工作流程图")

#### 初始化Git并配置用户信息

``` bash
$ git config --global user.name "username"
$ git config --global user.email "email"
$ git config --global user.password "password"
```

你可以使用 `git config --list` 来查看你的配置信息。

#### 帮助信息

当你需要使用帮助时，你可以使用 `git hlep` 命令来寻求帮助文档

``` bash
$ git --help <verb>
$ git <verb> --help

# for example
$ git config --help
```

#### 忽略文件

`.gitignore` 文件帮助我们管理需要忽略的文件，规范如下：

* 所有空行或者以 ＃ 开头的行都会被 Git 忽略。
* 可以使用标准的 glob 模式匹配。
* 匹配模式可以以（/）开头防止递归。
* 匹配模式可以以（/）结尾指定目录。
* 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。

#### 获取Git仓库

* 在现有目录中初始化仓库

``` bash
# 初始化为一个$git仓库
$ git init 
# 指定跟踪文件
$ git add README.md
# 将文件提交
$ git commit -m "first commit"
```

* 克隆现有的仓库

``` bash
# 克隆list仓库到本地
$ git clone https://$github.com/home/list
# 克隆list仓库到本地并重命名为mylist
$ git clone https://$github.com/home/list mylist
# 和仓库创建关联
$ git remote add origin "url"
# 查看关联是否成功
$ git remote -V
# 移除仓库关联
$ git remote rm origin "url"
# 更新连接通道
$ git remote update origin "url"
```

#### 基础命令

具体命令参数，可以使用 `--help` 查看。

``` bash
# 增加
$ git add
# 删除
$ git rm
# 修改
$ git reset
# 查看
$ git status / $ gitdiff
# 移动
$ git mv
# 提交
$ git commit
# 拉去
$ git pull origin master
# 推送
$ git push origin master
```

#### 查看提交历史

``` bash
$ git log
$ git reflog
```

#### 撤销操作

``` bash
$ git commit -m 'initial commit'
$ git add forgotten_file
# 撤销上一次提交
$ git commit --amend
# 把暂存区的(所有/单个)文件删除
# 撤销文件在工作区已经修改需要加上 -f才可以删除，原文件会改变
$ gitrm --cached . -r
$ gitrm --cached <fileName>
# 撤销暂存区内容(文件还在暂存区) 覆盖工作区内容
$ git checkout <fileName>
```

#### 三个区的对比

``` bash
# 工作区VS暂存区
$ git diff
# 工作区和git仓库master分支比较
$ git diff master
# 暂存区VS git仓库历史区
$ git diff --cached
# 仅看统计信息
$ git diff --stat
```

#### git回退操作

``` bash
# 把暂存区内容回滚到工作区（一旦回滚，工作区内容无法恢复）
$ git checkout . 
# 把当前暂存区内容回滚到上一个暂存区，目的是为了把上一个暂存区的内容回滚到工作区
$ git reset HEAD .
# 在git仓库中回滚到某一个版本（强制把暂存区和工作区的内容改变为回退后的版本）
$ git reser --hard 版本号
# 把历史操作步骤输出
$ history > <fileName>
```

### Git分支系统

个人认为这是 `Git` 最为强大的和独特的地方，git的分支系统高效而便捷，可以频繁的使用和合并，给团队协作带来了极大的便利。

``` bash
# 创建分支  创建分支完成，会把本地的master分支中的内容同步到里面。
$ git branch <分支>
# 切换分支 | 创建并切换分支
$ git checkout <分支>
$ git checkout -b <分支>
# 删除分支
$ git branch -D <分支>
# 工作区和暂存区还有内容没有commit时，暂存分支
$ git stash
# 还原暂存的内容
$ git stash pop
# 把xxx合并到当前分支
$ git merge xxx
# 查看提交历史、各个分支的指向以及项目的分支分叉情况。
$ git log --oneline --decorate --graph --all
```

#### 分支管理

``` bash
# 查看分支列表
$ git branch
# 查看每一个分支的最后一次提交
$ git branch -v
# 查看哪些分支已经合并到当前分支,这个列表中没有 `*` 的分支通常可以使用 `$ git branch -d <分支名称>` 删除掉
$ git branch --merged
# 查看所有包含未合并工作的分支
$ git branch --no-merged
```

#### 冲突处理

  1. 同一个文件不同行发生冲突， `Git` 会自动合并，我们可以根据自己的需要选择保留哪一个，也可以全部都保留，把多余的字符删除掉，重新提交即可。
  2. 同一个文件同一行代码发生冲突, `i` -> `ESC` -> `:wq` 即可。

#### 分支开发流工作

* 长期分支

    一般项目都会经历开发->测试->上线的过程，根据这个过程我们可以将项目分成三个分支，线上项目一般都比较成熟和稳定，我们将其放在 `master` 分支上，而针对不那么稳定的测试项目，我们可以单独建立一个 `test` 的分支，而正在开发的项目则在另一个分支上，我们可以将其命名为 `develop` ，稳定分支的指针总是在提交历史中落后一大截，而前沿分支的指针往往比较靠前。

* 特性分支

    特性分支适用于任何一个项目，特性分支的存在可以最大限度的保证 `master` 分支的稳定，我们所有的修改提交基于特性分支完成然后在合并到 `master` 中。

