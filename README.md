[![Build Status](https://travis-ci.org/mwaylabs/mcapjs-client.svg)](https://travis-ci.org/mwaylabs/mcapjs-client)

# mCAP JavaScript Client Library
A JavaScript library to develop applications for mCAP. You will find more informations about mCAP [here](http://mobility-platform.com).

## Setup for development
- Install NodeJS
- Install Grunt
- Run npm install
- Run 'grunt' to start a watch task witch automatically builds the file in the dist folder
- Include 'dist/mcap.js' in your index html

## Before you commit
- Make sure you pass the jshint test
- You can setup a before commit-hook
  * Create a file in ./.git/hooks named pre-commit with the following content
  * ```
       #!/bin/sh 
       grunt jshint  
     ```

  * Make sure you set the file permissions to executable `$ chmod +x pre-commit`

## Tests

### Install Jasmine: 
We use Jasmine version 2.0.0 as test suite.
You find further information here:
[Jasmine version 2.0.0](http://jasmine.github.io/2.0/introduction.html)

To install the [node version of Jasmine](https://github.com/mhevery/jasmine-node) run:

```
npm install jasmine-node -g
```

### Run Karma:

We use [Karma](http://karma-runner.github.io/0.12/index.html) as test runner.
To run the tests you have to complete the following steps. We are working on a solution to make the setup a bit easier

You have to install karma-cli global
```
npm install karma-cli -g
```
Install PhantomJS
```
npm install phantomjs -g
```
Set phantomjs env variable
```
export PHANTOMJS_BIN=$(which phantomjs)
```

To start a test use:
```
karma start karma.conf.js
// or
grunt test
```

It is also possible to test against a running server:
Add a `online.conf.js` file to the root:

```
window.USERNAME = window.USERNAME || 'username';
window.ORGANIZATION = window.ORGANIZATION || 'org';
window.PASSWORD = window.PASSWORD || 'password';
```


```
karma start karma.online.conf.js
```

## Documentation
[Documentation](https://wiki.mwaysolutions.com/confluence/display/mCAP/Getting+Started+with+mCAPjs-client)

## Changelog
[Changelog](https://github.com/mwaylabs/mcapjs-client/blob/master/changelog.md)
大鼠mCAP JavaScript客户端库
一个JavaScript库，开发应用大鼠mCAP。你会发现更多的信息有关大鼠mCAP这里。

安装程序开发

安装NodeJS
安装咕噜
运行安装NPM
运行'咕噜'自动启动手表任务女巫建立在dist文件夹中的文件
在指数的HTML包括“DIST/ mcap.js”
在提交以前

请确保你通过jshint测试
你可以设置一个之前提交钩

创建一个名为./.git/hooks文件预提交包含以下内容
 ＃！/ bin / sh的
 咕噜jshint
确保你设置文件权限为可执行$使用chmod + X预提交
测试

安装茉莉：

我们用茉莉花版本2.0.0的测试套件。您在这里找到更多的信息：茉莉花版本2.0.0

要安装茉莉花运行的节点版本：

NPM安装茉莉花节点-g
运行噶：

我们用噶作为测试运行。要运行，你必须完成以下步骤测试。我们正在研究解决方案，使安装更容易一点

你必须安装业，CLI全球

NPM安装业，CLI-g
安装PhantomJS

故宫安装phantomjs-g
集phantomjs ENV变量

出口PHANTOMJS_BIN=$（其中phantomjs）
要开始测试使用：

业开始karma.conf.js
//或
咕噜测试
另外，也可以以测试对正在运行的服务器：添加online.conf.js文件到根：

window.USERNAME= window.USERNAME||'用户名';
window.ORGANIZATION= window.ORGANIZATION||'组织';
window.PASSWORD= window.PASSWORD||'密码';
业开始karma.online.conf.js
文件

文件

更新日志

更新日志
