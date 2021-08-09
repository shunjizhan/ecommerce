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
create-react-app 脚手架中内置了 dotenv，允许我们在 React 项目中配置环境变量，但环境变量的名字必须以 REACT_APP_ 开头。

在根目录下创建`.env`文件
```
REACT_APP_PRODUCTION_API_URL=http://fullstack.net.cn/api
REACT_APP_DEVLOPMENT_API_URL=http://localhost/api
```

在项目中可以通过 `process.env.REACT_APP_DEVLOPMENT_API_URL` 方式进行访问，但是这样会有弊端
- 代码过长写起来不方便
- 如果在代码中将环境写死，当切换环境时改起来也不方便。

解决方案：我们可以创建一个config把实际上用的API接口存起来，以后就直接用`API`这个变量就行了。

```ts
// src/config.ts
export let API: string

if (process.env.NODE_ENV === "development") {
  API = process.env.REACT_APP_DEVLOPMENT_API_URL!     // 感叹号表示这个变量一定会存在，不会是undefined，所以let API:string就不会报错，不然要let API:stirng | undefined
} else if (process.env.NODE_ENV === "production") {
  API = process.env.REACT_APP_PRODUCTION_API_URL!
}
```

## 1) 页面组件初始化和路由初始化
初始化了几个组件和相关的路由：Home,Shop和Layout。没啥特别的，正常代码。

## 2）store初始化
普通的创建一个redux，稍微有趣的是用到了`connected-react-router`这个库，可以把router的信息同步到store里面。

主要做的事情就是先创建了一个route的reducer
```ts
// src/store/reducers/index.ts
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
});
```

然后创建store的时候给了一个middleware，可以监听history的变化从而更新store.
```ts
// src/store/index.ts
import createRootReducer from "./reducers";
import { createHashHistory } from 'history';
import { routerMiddleware } from "connected-react-router";

export const history = createHashHistory();

const store = createStore(createRootReducer(history), applyMiddleware(routerMiddleware(history)));
```

## 3) 创建导航
用antd的导航组件