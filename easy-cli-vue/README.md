> 基于webpack4的项目打包实现和集成前端开发环境相关的库（babel,eslint）
> 用于Vue开发环境

### Install @easy/cli-vue

> Using npm:

```sh
> npm install --save-dev @easy/cli-vue
```

Using yarn:

```sh
> yarn add --dev @easy/cli-vue
```

### 版本更新日志

-

### Webpack打包说明

> package.json配置如下:

```$xslt
  "scripts": {
    "build": "easy-cli build [options]",
    "start": "easy-cli serve [options]"
  }
```

> options参数列表:

*【build】

|属性名称|是否必须|单目录/多目录|类型|默认值|说明|
|:---:|:---:|:---:|:---:|:---:|---|
|--source|否|-|string|none|指定生产环境打包时生成sourceMap|
|--nobuild|多|-|string|-|不编译某个项目。 参数为项目名称|
|--copy|否|-|string|-|拷贝文件到dist/项目名称/[copy文件同级目录]|
|--entry|否|单|string|main|单项目打包时的入口JS文件。默认为main(表示src/main.js)|
|--progress|否|-|boolean||显示进度|


*【dev】

|属性名称|是否必须|单目录/多目录|类型|默认值|说明|
|:---:|:---:|:---:|:---:|:---:|---|
|--port|否|-|number|8080|单目录DevServer启动端口|
|--public|否|-|string|-|浏览器访问地址（可为域名）。example: --public boss.me.so:80|
|--entry|否|单|string|main|单项目打包时的入口JS文件。默认为main(表示src/main.js)|
|--nobuild|多|-|string|-|不编译某个项目。 参数为项目名称|
|--copy|否|-|string|-|拷贝文件到dist/项目名称/[copy文件同级目录]|
|--poll|否|-|boolean|-|启用轮询。（如果自动编译未生效可以启用此配置试试）|
|--open|否|-|boolean|-|启动后是否打开浏览器|
|--progress|否|-|boolean|-|是否显示打包进度|
|--public|否|-|string|-|浏览器访问地址（可为域名）。example: --public boss.me.so:80|

### alias目录别名说明

|名称|表示目录|
|:---:|---|
|@|当前项目的主入口。单项目时此值为'/src',多项目时此值为当前子项目的主入口。默认为'/src/pages/子目录名称'|

### ProvidePlugin中包含第三方库引用说明

|名称|第三方库名称|
|:---:|---|
|$|jquery|
|_|lodash|
|moment|moment|

## 开发及维护人员
|Name|Email|
|:---:|:---:|
|nickLiu|343832401@qq.com|
