# 七牛储存的meteor SDK

安装：`meteor add chenkaic4:qiniu-uploader`
[DEMO](https://github.com/chenkaiC4/qiniu-package-demo)

> 只需要创建两个 `template`，就可以**高度定制**七牛上传控件

第一个`template`，作为包裹层，包裹本package提供的名为`qiniuUploader`的`template`。
第二个`template`定义具体的上传控件的`html`，`css`，从而达到高度定制的效果。

具体使用，请看如下示例：

**第一个包裹层`template`，主要负责引用该package**
参数说明（必填）：
- bucket：该控件对应的上传 bucket
- domain：该bucket对应的域名空间
- templateName：对应第二个`template`的名字，该template具体定义上传控件
- targetId：css ID，点击该dom元素，弹出文件选择框

``` html
<template name="uploadWrap">
    {{> qiniuUploader
        bucket="test-bucket"
        domain="<bucket 对应的域名地址>"
        templateName='upload'
        cssId='pickfiles'
    }}
</template>
```

**第二个自定义上传控件`template`，主要负责自由定义上传组件的html结构，注意对应 cssId**

``` html
<template name="upload">
    <div class="container">
        <div class="body">
            <div class="col-md-12">
                <div id="container">
                    <a class="btn btn-default btn-lg " id="pickfiles" href="#" >
                        <i class="glyphicon glyphicon-plus"></i>
                        <sapn>选择文件</sapn>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
```

