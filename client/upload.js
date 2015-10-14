// 七牛前端上传控件
QiniuUploader = function(settings) {
  // 检测必选参数
  var checkArgs = !settings.bucket || !settings.browse_button || !settings.domain;
  if (checkArgs) {
    throw new Error('请指定 bucket 以及对应的域名，并且指定响应上传点击的 dom 元素的 id 值为 browse_button');
  }

  var self = this;
  this.bucket = settings.bucket;
  this.domain = settings.domain;
  this.cssId = settings.cssId;

  // 自定义变量，参考 http://developer.qiniu.com/docs/v6/api/overview/up/response/vars.html
  var defaultXVar = {};

  // 配置 uplaoder 的参数，参考 https://github.com/qiniu/js-sdk
  this.settings = {
    runtimes: settings.runtimes || 'html5,flash,html4',
    browse_button: settings.browse_button,            //**必需**
    //uptoken_url: '/uptoken',                        // 本SDK推荐使用 Meteor.method 来获取 token
    downtoken_url: settings.downtoken_url,            // Ajax请求downToken的Url，私有空间时使用,JS-SDK将向该地址POST文件的key和domain,服务端返回的JSON必须包含`url`字段，`url`值为该文件的下载地址
    uptoken : '',                                     // 将在调用 init 方法时获得
    unique_names: settings.unique_names || false,     // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
    domain: settings.domain,                          //bucket 域名，下载资源时用到，**必需**
    container: settings.container,                    //上传区域DOM ID，默认是browser_button的父元素，
    max_file_size: settings.max_file_size || '100mb', //最大文件体积限制
    flash_swf_url: 'js/plupload/Moxie.swf',           //引入flash,相对路径
    max_retries: settings.max_retries || 3,           //上传失败最大重试次数
    dragdrop: settings.dragdrop || true,              //开启可拖曳上传
    drop_element: settings.drop_element || settings.browse_button,        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
    chunk_size: settings.chunk_size || '4mb',                             //分块上传时，每片的体积
    auto_start: true,                                                     //选择文件后自动上传，若关闭需要自己绑定事件触发上传,
    x_vars : settings.x_vars,                      //自定义变量，用于回调函数
    init: settings.bindListeners,

    bucket: settings.bucket   // 为了实现文件覆盖，PutPolicy 的 scope 值必须是 <bucket>:<key>，而 key 只能在上传文件后获取，需要在 directUpload 中根据 bucket 和 key 生成 uptoken
  };
};


// 获取 token 并初始化
QiniuUploader.prototype.init = function() {
  var self = this;
  Meteor.call('getQiniuBucketToken', self.bucket, function(err, token) {
    if (!err) {
      self.settings.uptoken = token;
      self.uploader = Qiniu.uploader(self.settings);
    }
  });
};
