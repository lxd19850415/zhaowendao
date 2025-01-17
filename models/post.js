var mongodb = require('./db');

function Post(name, title, post,type) {
  this.name = name;
  this.title= title;
  this.post = post;
  var typeName;

  if(type == "1")
  {
      typeName = "计算机";
  }
  else if(type == "2")
  {
      typeName = "生物";
  }
  else if(type == "3")
  {
      typeName = "机械";
  }
  else if(type == "4")
  {
      typeName = "电子";
  }
  else if(type == "999")
  {
      typeName = "其他";
  }
  else
  {
      typeName = "其他";
  }
  this.type = typeName;
}

module.exports = Post;

Post.prototype.save = function(callback) {//存储一篇文章及其相关信息

  var date = new Date();

  //存储各种时间格式，方便以后扩展
  var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-"+ (date.getMonth()+1),
      day : date.getFullYear() + "-"+ (date.getMonth()+1) + "-"+ date.getDate(),
      minute : date.getFullYear() + "-"+ (date.getMonth()+1) + "-"+ date.getDate() + " "+ date.getHours() + ":"+ date.getMinutes()
  }

  //要存入数据库的文档
  var post = {
      name:this.name,
      time: time,
      title:this.title,     
      post:this.post,
      type:this.type
  };

  //打开数据库

  mongodb.open(function (err, db) {

    if(err) {
      return callback(err);
    }

    //读取 posts 集合
    db.collection('posts', function (err, collection) {

      if(err) {
        mongodb.close();
        return callback(err);
      }

      //将文档插入posts 集合

      collection.insert(post, {
        safe:true
      }, function (err,post) {

        mongodb.close();

        if (err) {
          return callback(err);
        }
        callback(null);
      });
    });
  });
};

 

Post.get = function(name, callback) {//读取文章及其相关信息

  //打开数据库
  mongodb.open(function (err, db) {

    if(err) {
      return callback(err);
    }

    //读取posts 集合
    db.collection('posts', function(err, collection) {

      if(err) {
        mongodb.close();
        return callback(err);
      }

      var query = {};

      if(name) {
        query.name = name;
      }

      //根据 query 对象查询文章
      collection.find(query).sort({
            time: -1
      }).toArray(function(err, docs) {

        mongodb.close();

        if(err) {
          return callback(err);//失败！返回 null
        }

        callback(null,docs);//成功！以数组形式返回查询的结果

      });

    });

  });

};



Post.getByID = function(id, callback) {//读取文章及其相关信息

  //打开数据库
  mongodb.open(function (err, db) {

    if(err) {
      return callback(err);
    }

    //读取posts 集合
    db.collection('posts', function(err, collection) {

      if(err) {
        mongodb.close();
        return callback(err);
      }
/*
      var query = {};

      if(id) {
        query._id = id;
      }

      //根据 query 对象查询文章
      collection.find(query).sort({
            time: -1
      }).toArray(function(err, docs) {

        mongodb.close();

        if(err) {
          return callback(err);//失败！返回 null
        }

        callback(null,docs);//成功！以数组形式返回查询的结果

      });
*/

   //var myId = new ObjectId(id);

   var obj_id = new ObjectID(id);
   debugger;

    collection.findOne({"_id":obj_id},function(err,docs){

        debugger;

        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null,docs);
      });

    });

  });

};

