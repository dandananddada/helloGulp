#如何使用本项目？
1.首先确保本机装有node npm。

2.clone项目到本地。

    $ git clone https://github.com/dandananddada/helloGulp.git

3.进入项目根目录，安装所需插件。

    $ npm install

4.在app目录下创建你自己的静态资源文件。

执行build命令会生成浏览器可识别的资源文件。

	$ gulp build

执行server命令启动Http服务，预览开发。

	$ gulp server

#本项目定制的命令
清理dist目录

    $ gulp clean

Build静态资源文件

    $ gulp build

启动Jasmine测试

    $ gulp test

启动http服务预览开发

    $ gulp server

#2015-06-11更新
此次更新添加Jade-Sass-Coffee分支，如果你想使用Jade和Coffee，请使用此分支

	$ git checkout Jade-Sass-Coffee

运行方法同上，注意该分支下你需要修改的源文件在src目录下，而不是app目录。
