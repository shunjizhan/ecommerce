# Ecommerce 

电商系统的前端

## 启动mongoDB
```
brew services run mongodb-community   # 启动
brew services stop mongodb-community  # 停止
```

- 数据库配置文件：`/usr/local/etc/mongod.conf`
- 数据库文件默认存放位置：`/usr/local/var/mongodb`
- 日志存放位置：`/usr/local/var/log/mongodb/mongo.log`

## 0) 根据环境切换API接口地址
在根目录下创建`.env`文件
```
REACT_APP_PRODUCTION_API_URL=http://fullstack.net.cn/api
REACT_APP_DEVLOPMENT_API_URL=http://localhost/api
```
直接用`REACT_APP_PRODUCTION_API_URL`很长很麻烦，我们可以创建一个config把实际上用的API接口存起来，以后就直接用`API`这个变量就行了。
```ts
// src/config.ts
export let API: string

if (process.env.NODE_ENV === "development") {
  API = process.env.REACT_APP_DEVLOPMENT_API_URL!     // 感叹号表示这个变量一定会存在，不会是undefined，所以let API:string就不会报错，不然要let API:stirng | undefined
} else if (process.env.NODE_ENV === "production") {
  API = process.env.REACT_APP_PRODUCTION_API_URL!
}
```