Package.describe({
  name: 'chenkaic4:qiniu-uploader',
  version: '0.0.2',
  summary: 'package for qiniu cloud storage',
  git: 'git@github.com:chenkaiC4/meteor-package-for-qiniu-uploader.git',
  documentation: 'README.md'
});

Npm.depends({
  'qiniu': '6.1.8'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use([
    'templating'
  ], 'client');

  api.addFiles(['server/qiniu_node_sdk.js'], 'server');

  api.addFiles([
    'client/plupload.full.min.js',
    'client/qiniu.js',
    'client/ui.js',
    'client/upload.html',
    'client/upload.js'
    ], 'client');



  // server api
  api.export('qiniu', 'server');
  api.export('qiniuSDK', 'server');

  // client api
  api.export('Qiniu', 'client');
  api.export('FileProgress', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles('qiniu-tests.js');
});
