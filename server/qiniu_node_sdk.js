// export qiniu to server side
qiniu = Npm.require('qiniu');

// export qiniuSDK to server side
qiniuSDK = {
  'setKeys': function (ak, sk) {
    if(!ak || !sk) {
      throw Error('Please specify you ACCESS_KEY and SECRET_KEY.');
    }
    qiniu.conf.ACCESS_KEY = ak;
    qiniu.conf.SECRET_KEY = sk;
  },
  'getTokenForBucket': function(bucketName) {
    if(!bucketName) {
      throw Error('Please specify bucket.');
    }
    var putPolicy =  new qiniu.rs.PutPolicy(bucketName);
    return putPolicy.token();
  }
};

// Meteor Method For Token
Meteor.methods({
  'getQiniuBucketToken': function(bucketName) {
    return qiniuSDK.getTokenForBucket(bucketName);
  }
});



