# auto-fly
简洁，高效，实用的前端自动化开发小工具！针对前端开发常见需求，提供解决方案！希望你的code像风一样，在知识的海洋自由翱翔！

##功能：
致力于提供前端自动化开发环境，集脚手架，服务器，代理，API快速测试，数据mock，多端测试抓包，性能可视化分析于一体，提高开发效率！

## 使用:
#### 1. 全局安装
`npm install auto-fly -g`

#### 2. 使用
Usage: auto-fly [options] [command]  

Options:
- -v, --version                 输出当前auto-fly版本号  
- -p, --port [port]             指定服务启动端口，默认为[8080]  
- -P, --proxy [url]             开启代理服务  
- -debug, --debug [true|false]  是否禁止输出log信息在控制台，默认打开  
- -w --watch                    页面加载性能分析／webpack构建性能分析  
- -pack, --pack                 开启抓包  
- -o                            在服务启动之后，打开浏览器窗口，默认为true  
- --cors                        配置Access-Control-Allow-Origin头部信息  
- -g --gzip                     启动服务器gzip配置项  
- -c                            缓存相关配置  
- -h, --help                    output usage information  

Commands:  
- server                        开启服务  
- init [appName]                创建一个以react为前端框架，webpack为构建工具的基础应用   
- minify [fileDir]              压缩js或css文件  
- help [cmd]                    display help for [cmd]  

##### 3.说明 :  
Commands：  
- server命令启动服务，服务目录默认为`./public`，如果不存在则会以 `./`为服务目录；  

Options：  
- -v, --version   ：输出当前auto-fly版本号  
- -h --help     ：输出帮助手册（详细的配置项）  
- -P --proxy    ：是否开启代理功能，配置参数为代理服务的url，如：http://testurl.com或http:127.0.0.1:3300，访问/proxy/api即可代理至相应的服务，默认不打开此功能；  
- -debug --debug：是否禁止输出log信息在控制台，默认打开  

##### 规划 [正在陆续赶来...]  
Commands:  
- init                          ：初始化构建一个以react为前端框架，webpack为构建工具的基础应用  

Options：  
- -p, --port [port]             ：指定服务启动端口，默认为[8080]  
- -P, --proxy [url]             ：开启代理服务  
- -debug, --debug [true|false]  ：是否禁止输出log信息在控制台，默认打开  
- -w --watch                    ：页面加载性能分析／webpack构建性能分析  
- -pack, --pack                 ：开启抓包  
- -o                            ：在服务启动之后，打开浏览器窗口，默认为true  
- --cors                        ：配置Access-Control-Allow-Origin头部信息  
- -g --gzip                     ：启动服务器gzip配置项  
- -c                            ：缓存相关配置  