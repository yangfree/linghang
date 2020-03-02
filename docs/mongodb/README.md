---
title: MongoDB
sidebar: auto
# prev: ./javascript
# next: ./typescript
---

## 1. 基础

### 1.1 概念

|SQL术语/概念|MongoDB术语/概念|解释说明|
|:---|:---|:---|
|database|database|数据库|
|table|collection|表/集合|
|row|document|数据记录行/文档|
|column|field|数据字段/域|
|index|index|索引|
|table joins|表链接|MongoDB不支持|
|primary key|primary key|MongoDB自动将_id字段设置为主键|

### 1.2 安装

[官网下载地址:https://www.mongodb.com/download-center/community](https://www.mongodb.com/download-center/community)

在根目录创建`data/db`文件夹用于存储数据,也可以根据`--dbpath`来指定存放数据的文件夹。

### 1.3 增删改查

``` bash
# 必须插入一条数据才可以用show dbs查出来
use database
# 删除数据库
db.dropDatabase()
# 创建集合
db.createCollection('name')
# 删除集合
db.collectionName.drop()
# 查询数据库
show dbs
# 查询集合
show collection
# 插入/更新文档
db.collectionName.insert(document)
db.collectionName.save(document)
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
# 删除文档
db.collectionName.deleteMany(<query>)
db.collectionName.deleteOne(<query>)
# 查询文档
# $gt -------- greater than  >
# $gte --------- gt equal  >=
# $lt -------- less than  <
# $lte --------- lt equal  <=
# $ne ----------- not equal  !=
# $eq  --------  equal  =
db.collectionName.find(<query>).pretty()
# 返回指定数量的数据
db.collectionName.find().limit(number)
# 跳过指定数量的数据
db.collectionName.find().skip(number)
# 排序 1为升序 -1为降序
db.collectionName.find().sort(<query>)
# skip(), limilt(), sort()三个放在一起执行的时候，执行的顺序是先 sort(), 然后是 skip()，最后是显示的 limit()。
```