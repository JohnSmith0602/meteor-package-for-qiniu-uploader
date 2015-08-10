Template.qiniuUploader.onRendered(function() {
  var params = Template.currentData(),
      bucket = params.bucket,
      domain = params.domain,
      cssId = params.cssId;

  // get token
  Meteor.call('getQiniuBucketToken', bucket, function(err, token) {
    if (!err) {
      setUploader(token, domain, cssId);
    }
  });

  /*
  * token: bucket's access token
  * domain: bucket's domain
  * */
  function setUploader (token, domain, cssId) {
    var uploader = Qiniu.uploader({
      runtimes: 'html5,flash,html4',
      browse_button: cssId,
      uptoken: token,
      unique_names: true,
      domain: domain,
      //上传区域DOM ID，默认是browser_button的父元素
      //container: '',
      //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
      drop_element: cssId,
      max_file_size: '100mb',
      flash_swf_url: 'js/plupload/Moxie.swf',
      dragdrop: true,
      max_retries: 3,
      chunk_size: '4mb',
      auto_start: true,

      init: {
        // 文件添加进队列后,处理相关的事情
        'FilesAdded': function (up, files) {
          plupload.each(files, function (file) {

          });
        },
        // 每个文件上传前,处理相关的事情
        'BeforeUpload': function (up, file) {

        },
        // 每个文件上传时,处理相关的事情
        'UploadProgress': function (up, file) {

        },
        // 队列处理完毕
        'UploadComplete': function () {
          console.log('全部上传成功');
        },
        // 单个文件处理完毕
        'FileUploaded': function (up, file, info) {
          // 其中 info 是文件上传成功后，服务端返回的json，形式如
          // {
          //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
          //    "key": "gogopher.jpg"
          //  }
          console.log(file.name + ' --> **上传成功**');
        },
        //上传出错时,处理相关的事情
        'Error': function (up, err, errTip) {

        }
      }
    });

    $('#container')
      .on('dragenter', function (e) {
        e.preventDefault();
        $('#container').addClass('draging');
        e.stopPropagation();
      })
      .on('drop', function (e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
      })
      .on('dragleave', function (e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
      })
      .on('dragover', function (e) {
        e.preventDefault();
        $('#container').addClass('draging');
        e.stopPropagation();
      });
  }
});