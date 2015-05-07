#如何使用本项目？
1.首先确保本机装有node npm。

2.clone项目到本地。

    $ git clone https://github.com/dandananddada/helloGulp.git

3.进入项目根目录，安装所需插件。

    $ npm install

4.在app目录下创建你自己的静态资源文件。

执行gulp命令会在dist目录下生成相应处理后的资源文件。

#本项目定制的命令
清理dist目录

    $ gulp clean

Build静态资源文件

    $ gulp build

启动http服务预览开发

    $ gulp server
