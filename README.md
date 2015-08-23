# 七牛储存的meteor SDK


[DEMO](https://github.com/chenkaiC4/qiniu-package-demo)

## 安装

`meteor add chenkaic4:qiniu-uploader`

## 使用方法 

- 服务端配置方法

``` javascript
var config = {
  'ak': String,                       // 必填 <ACCESS_KEY>
  'sk': String,                       // 必填 <SECRET_KEY>
  'domain':  String,                  // 可选 开启回调模式，指定服务器地址
  'callbackRoute': String,            // 可选 回调的路由名，不用加'/'，默认为'qiniu_callback'
  'buckets': Array                    // 可选 bucket 配置
  
  /* buckets 的元素结构
    {
      'name': String,                 // bucket 名字
      'onUploaded': function          // 资源上传到 bucket 后的回调函数
      'callbackBody': String          // 回调的内容 key=$(key)&bucket=$(bucket)&userId=$(x:userId)
    }
  */
}
// 生成实例
var qiniu = new QiniuSDK(config);
// 添加单个 bucket
qiniu.addBucket(bucket);  // 可以获取token了，背后设置了 callbackUrl
// 应用配置
qiniu.init();
```

- 客户端配置方法

在上传按钮所在的 `template` 的 `onRender` 中进行如下配置

``` javascript
var settings = {
  bucket: 'test-bucket',                            // 必选 bucket 名字
  browse_button: 'pickfiles',                       // 必选 上传按钮的 css id
  domain: 'http://7xl03g.dl1.z0.glb.clouddn.com',   // 可选 bucket 域名，提供下载链接
  x_vars: {                                         // 可选 回调时，POST 给服务端的内容
    'time' : function(up, file) {
      var time = (new Date()).getTime();
      return time;
    },
    'userId' : function(up, file) {
      return '123456';
    }
  },
  bindListeners: {                                   // 上传状态和结果监听
    'FilesAdded': function(up, files) {
      plupload.each(files, function(file) {
        // 文件添加进队列后,处理相关的事情
      });
    },
    'BeforeUpload': function(up, file) {
      // 每个文件上传前,处理相关的事情
    },
    'UploadProgress': function(up, file) {
      // 每个文件上传时,处理相关的事情
    },
    'FileUploaded': function(up, file, info) {
      // 每个文件上传成功后,处理相关的事情
      // 其中 info 是文件上传成功后，服务端返回的json，形式如
      // {
      //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
      //    "key": "gogopher.jpg"
      //  }
      // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
      // var domain = up.getOption('domain');
      // var res = parseJSON(info);
      // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
    },
    'Error': function(up, err, errTip) {
      //上传出错时,处理相关的事情
    },
    'UploadComplete': function() {
      //队列文件处理完毕后,处理相关的事情
    }
  }
};

// 在 `template` 的 upload 中配置并初始化上传功能
Template.upload.onRendered(function() {
  var uploader = new QiniuUploader(settings);
  uploader.init();
});
```

