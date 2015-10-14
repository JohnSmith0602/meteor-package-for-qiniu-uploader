Package.describe({
  name: 'johnsmith0602:qiniu-uploader',
  version: '0.0.2',
  summary: 'package for uploading to Qiniu cloud storage',
  git: 'git@github.com:JohnSmith0602/meteor-package-for-qiniu-uploader.git',
  documentation: 'README.md'
});

// 依赖的NPM包，使用 Npm.require()引用
Npm.depends({
  'qiniu': '6.1.8'
});


Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  // client 引用的package
  api.use([
    'underscore'
  ], 'client');

  // server 引用的package
  api.use([
    'nimble:restivus@=0.8.2'
  ], 'server');

  // 导入 package 文件到响应的端
  api.addFiles([
    'server/qiniu.js'
  ], 'server');

  api.addFiles([
    'client/plupload.full.min.js',
    'client/qiniu.js',
    'client/ui.js',
    'client/upload.js'
  ], 'client');



  // 导出 package 中的变量作为 全局变量
  api.export('qiniu', 'server');
  api.export('QiniuSDK', 'server');

  api.export('Qiniu', 'client');
  api.export('FileProgress', 'client');
  api.export('QiniuUploader', 'client');
});

// TODO 测试单元
Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles('qiniu-tests.js');
});
