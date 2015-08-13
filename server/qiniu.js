// 引入 七牛 SDK
qiniu = Npm.require('qiniu');


QiniuSDK = function(config) {
  var self = this;
  if(!config.ak || !config.sk) {
    throw Error('Please specify you ACCESS_KEY and SECRET_KEY.');
  }

  this.ak = config.ak;
  this.sk = config.sk;
  if (config.domain) {
    // 可选默认 REST 路径
    this.callbackRoute = config.callbackRoute || 'qiniu_callback';
    this.callbackUrl = config.domain + this.callbackRoute;
  }

  // 设置keys
  qiniu.conf.ACCESS_KEY = this.ak;
  qiniu.conf.SECRET_KEY = this.sk;

  // 不同的 buckets
  this.buckets = {};
  config.buckets.forEach(function(bucketConfig) {
    self.addBucket(bucketConfig);
  });
};


// 加入bucket，并设置该 bucket 上传后的会调函数
QiniuSDK.prototype.addBucket = function(config) {
  var bucket = config.bucket;
  var callback = config.onUploaded;
  var callbackBody = config.callbackBody;
  if (this.buckets.hasOwnProperty(config.bucket)) {
    console.warn('bucket: ' + bucket + ' has been added! Nothing done here.');
    return;
  }
  // 为不同的bucket设置不同的回调函数
  this.buckets[bucket] = {
    'name': bucket,
    'callback': callback
  };
  // 为不同的bucket设置不同的上传策略
  var putPolicy =  new qiniu.rs.PutPolicy(bucket);
  if (this.callbackUrl) {
    putPolicy.callbackUrl = this.callbackUrl;
    putPolicy.callbackBody = callbackBody;
  }
  this.buckets[bucket].putPolicy = putPolicy;
};


// 为不同的bucket生成token
QiniuSDK.prototype.setTokenMethod = function() {
  var self = this;
  Meteor.methods({
    'getQiniuBucketToken': function(bucketName) {
      return self.buckets[bucketName].putPolicy.token();
    }
  });
};


// 为七牛回调设置REST路由
QiniuSDK.prototype.setRESTRouter = function() {
  var self = this;
  // 使用 restivus 设置 REST路由 https://github.com/kahmali/meteor-restivus
  var Api = new Restivus({
    apiPath: '/',
    prettyJson: true
  });

  Api.addRoute(this.callbackRoute, {
    post: function () {
      var body = this.bodyParams,
          bucket = body.bucket;
      // 回调函数
      self.buckets[bucket].callback(body);
      console.log(body);
      return body;
    },
  });
};


// 初始化
QiniuSDK.prototype.init = function() {
  this.setTokenMethod();
  this.setRESTRouter();
};







