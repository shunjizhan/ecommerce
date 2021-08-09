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

## 3) 创建导航组件
用antd的导航组件

## 4) 页头组件
用antd的PageHeader组件，并且加上了一些很酷的css

## 5) 登陆和注册组件
创建了登陆和注册组件和它们的route。

## 6) 用户注册的redux流程
首先要创建一堆基础actions
```ts
// src/store/actions.ts
export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

export interface SignupPayload {
  email: string,
  name: string,
  password: string,
};

export interface SignupAction {
  type: typeof SIGNUP,
  payload: SignupPayload,
};

export interface SignupSuccessAction {
  type: typeof SIGNUP_SUCCESS,
}

export interface SignupFailAction {
  type: typeof SIGNUP_FAIL,
  msg: string,
}

export const signup = (payload: SignupPayload): SignupAction => ({
  type: SIGNUP,
  payload,
});

export const signupSuccess = (): SignupSuccessAction => ({
  type: SIGNUP_SUCCESS,
});

export const signupFail = (msg: string): SignupFailAction => ({
  type: SIGNUP_FAIL,
  msg,
});

export type AuthType =
  | SignupAction
  | SignupSuccessAction
  | SignupFailAction
```

然后在根据这些actions创建reducers
```ts
// src/store/reducers/auth.reducer.ts
export interface AuthState {
  signup: {
    loaded: boolean,
    success: boolean,
  },
};

const initState: AuthState = {
  signup: {
    loaded: false,
    success: false,
  }
}

export default function authReducer (state = initState, aciton: AuthType) {
  switch (aciton.type) {
    case SIGNUP: ...
    case SIGNUP_SUCCESS: ...
    case SIGNUP_FAIL: ...
  }
}
```

然后创建saga的异步注册action
```ts
// src/store/sagas/auth.saga.ts
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SIGNUP, SignupAction, signupFail, signupSuccess } from "../actions";
import { API } from '../../config';

function* handleSignup (action: SignupAction) {
  try {
    yield axios.post(`${API}/signup`, action.payload);
    yield put(signupSuccess());
  } catch (e) {
    yield put(signupFail(e.response.data.error));
  }
}

export default function* authSaga () {
  yield takeEvery(SIGNUP, handleSignup);
}
```

把注册action添加到rootSata中
```ts
import { all } from "redux-saga/effects";
import authSaga from "./auth.saga";

export default function* rootSaga () {
  yield all([
    authSaga(),
  ]);
}
```

最后就是在redux中注册saga middleware
```ts
// src/store/index.ts
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  createRootReducer(history),
  applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware
  )
);

sagaMiddleware.run(rootSaga);

export default store;
```

有了saga的middleware和注册的action，我们就可以在注册的时候直接dispatch这个action
```tsx
const Signup = () => {
  const dispatch = useDispatch();
  const handleSignup = (data: SignupPayload) => {
    dispatch(signup(data));
  }

  return (
    <Layout title='注册' subTitle=''>
      <Form onFinish= { handleSignup }>
        ...
      </Form>
    </Layout>
  )
}
```

## 7) 处理注册结果
这里主要使用到useSelector来拿到当前的signup状态，然后根据状态用Result组件来表示给用户看。

## 8) 处理登陆结果
如果登陆成功，要把登陆结果的jwt储存在localStorage里面，还要储存在store里面
```ts
// src/store/sagas/auth.saga.ts
function* handleSignin (action: SigninAction): any {
  try {
    const res = yield axios.post(`${API}/signin`, action.payload);
    window.localStorage.setItem('jwt', JSON.stringify(res.data));
    yield put(signinSuccess());
  } catch (e) {
    yield put(signinFail(e.response.data.error));
  }
}
```

之后我们就可以根据是否登陆，以及用户的身份，显示不同的界面。因为经常用到这个逻辑，我们需要一个helper来判断是否登陆，以后可以到处复用这个helper。
```ts
// src/helpers/auth.ts
import { Jwt } from "../store/models/auth";

export function isAuth (): boolean | Jwt {
  const jwt = window.localStorage.getItem('jwt');
  if (jwt) {
    return JSON.parse(jwt);
  }

  return false;
}
```

有了登陆信息，我们就可以在用户登陆之后，根据role跳转到dashboard
```ts
// src/components/core/Signin.tsx
const redirectToDashboard = () => {
  const auth = isAuth();
  if (auth) {
    const { user: { role }} = auth as Jwt;    // Auth的type有可能是false，所以这里告诉TS这里确定是Jwt type

    if (role === 0) {   // 用户
      return <Redirect to='/user/dashboard' />
    } else {            // 管理员
      return <Redirect to='/admin/dashboard' />
    }
  }
}
```

在导航栏，如果登陆了，就显示dashboad的link，如果没有，就显示注册/登陆的link
```tsx
// src/components/core/Navigation.tsx
const Navigation = () => {
  ...
  function getDashboardUrl () {
    let url = '/user/dashboard';

    const auth = isAuth();
    if (auth) {
      const {
        user: { role },
      } = auth as Jwt;

      if (role === 1) {
        url = '/admin/dashboard';
      }
    }

    return url;
  }

  return (
    <Menu mode='horizontal' selectable={ false }>
      ...
      {
        !isAuth() && (<>
          <Menu.Item className={ isSignin }>
            <Link to='/signin'>登陆</Link>
          </Menu.Item>
          <Menu.Item className={ isSignup }>
            <Link to='/signup'>注册</Link>
          </Menu.Item>
        </>)
      }
      {
        isAuth() && (<>
          <Menu.Item className={ isDashboard }>
            <Link to={ getDashboardUrl() }>dashboard</Link>
          </Menu.Item>
        </>)
      }
    </Menu>
  )
}
```

## 9) 受保护的dashboard组件
我们想要实现用户必须要登陆才能访问dashboard，否则就跳转到signin界面。这跟上一步有一点区别，上一步是直接在同一个route的同一个组件中判断要显示什么内容，所以比较直接。这里我们想要如果用户没有登陆，就不能访问某个route，所以要创建一个privateRoute来实现（不一定要叫这个名），原理就是与其在route里面直接用`<Route path='/xxx/>`，我们用render prop的方式判断应该返回什么Route.

```tsx
// src/components/admin/PrivateRoute.tsx
import React, { FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { isAuth } from '../../helpers/auth'

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>,
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      render={ props => {
        const auth = isAuth();
        if (auth) {
          return <Component { ...props } />
        }
        return <Redirect to='/signin' />
      }}
      { ...rest }
    />
  )
}
```

```tsx
// src/components/Routes.tsx
const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path='/' component={ Home } exact />
        ...
        <PrivateRoute path='/user/dashboard' component={ Dashboard } />
      </Switch>
    </HashRouter>
  )
}
```

## 10) Admin Dashboard添加UI
略

## 11) 添加分类组件
创建了一个添加分类组件`AddCategory`,这里可以复用到我们刚才创建的`AdminRoute`。
```tsx
// src/components/Routes.tsx
<AdminRoute path='/create/category' component={ AddCategory } />
```

AddCategory用到的数据流是每当form提交的时候，更新本地的state，又用一个effect来监听这个state，当state变化的时候就发送axios。

```tsx
const AddCategory = () => {
  const [name, setName] = useState<string>("")
  const { user, token } = isAuth() as Jwt

  useEffect(() => {
    async function addCategory() {
      ... // 发送axios
    }

    name && addCategory();
  }, [name])

  const onFinish = (value: { name: string }) => {
    setName(value.name)
  }
  return (
    <Layout title="添加分类" subTitle="">
      <Form onFinish={ onFinish }>
         ...
      </Form>
    </Layout>
  )
}
```

## 12) 添加商品组件
略

## 13) 首页商品展示
略