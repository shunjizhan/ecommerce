import { Product } from "./models/product"

export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const RESET_SIGNUP = 'RESET_SIGNUP';

export const SIGNIN = 'SIGNIN';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAIL = 'SIGNIN_FAIL';


/* ---------- sign up ---------- */
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

export interface ResetSignupAction {
  type: typeof RESET_SIGNUP,
}

/* ---------- sign in ---------- */
export interface SigninPayload {
  email: string,
  password: string,
};

export interface SigninAction {
  type: typeof SIGNIN,
  payload: SigninPayload,
};

export interface SigninSuccessAction {
  type: typeof SIGNIN_SUCCESS,
}

export interface SigninFailAction {
  type: typeof SIGNIN_FAIL,
  msg: string,
}

/* ---------- sign up ---------- */
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

export const resetSignup = (): ResetSignupAction => ({
  type: RESET_SIGNUP,
});

/* ---------- sign in ---------- */
export const signin = (payload: SigninPayload): SigninAction => ({
  type: SIGNIN,
  payload,
});

export const signinSuccess = (): SigninSuccessAction => ({
  type: SIGNIN_SUCCESS,
});

export const signinFail = (msg: string): SigninFailAction => ({
  type: SIGNIN_FAIL,
  msg,
});


/* ---------- both ---------- */
export type AuthType =
  | SignupAction
  | SignupSuccessAction
  | SignupFailAction
  | ResetSignupAction
  | SigninAction
  | SigninSuccessAction
  | SigninFailAction


/* ---------- category ---------- */
export const GET_CATEGORY = "GET_CATEGORY"
export const GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS"
export interface Category {
  _id: string
  name: string
}

export interface GetCategoryAction {
  type: typeof GET_CATEGORY
}

export interface GetCategorySuccessAction {
  type: typeof GET_CATEGORY_SUCCESS
  payload: Category[]
}

export const getCategory = (): GetCategoryAction => ({
  type: GET_CATEGORY
})

export const getCategorySuccess = (
  payload: Category[]
): GetCategorySuccessAction => ({
  type: GET_CATEGORY_SUCCESS,
  payload
})

export type CategoryUnionType = GetCategoryAction | GetCategorySuccessAction


/* ---------- products ---------- */
export const GET_PRODUCT = "GET_PRODUCT"
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS"

// sortBy=createdAt&order=asc&limit=10

export interface GetProductAction {
  type: typeof GET_PRODUCT
  sortBy: string
  order: string
  limit: number
}

export interface GetProductSuccessAction {
  type: typeof GET_PRODUCT_SUCCESS
  payload: Product[]
  sortBy: string
}

export const getProduct = (
  sortBy: string,
  order: string = "desc",
  limit: number = 10
): GetProductAction => ({
  type: GET_PRODUCT,
  sortBy,
  order,
  limit
})

export const getProductSuccess = (
  payload: Product[],
  sortBy: string
): GetProductSuccessAction => ({
  type: GET_PRODUCT_SUCCESS,
  payload,
  sortBy
})

/* ---------- 搜索商品 ---------- */
export const SEARCH_PRODUCT = "SEARCH_PRODUCT"
export const SEARCH_PRODUCT_SUCCESS = "SEARCH_PRODUCT_SUCCESS"

export interface SearchProductAction {
  type: typeof SEARCH_PRODUCT
  payload: {
    category: string
    search: string
  }
}

export interface SearchProductSuccessAction {
  type: typeof SEARCH_PRODUCT_SUCCESS
  products: Product[]
}

export const searchProduct = (payload: {
  category: string
  search: string
}): SearchProductAction => ({
  type: SEARCH_PRODUCT,
  payload
})

export const SearchProductSuccess = (
  products: Product[]
): SearchProductSuccessAction => ({
  type: SEARCH_PRODUCT_SUCCESS,
  products
})

/* ---------- 筛选商品 ---------- */
export const FILTER_PRODUCT = "FILTER_PRODUCT"
export const FILTER_PRODUCT_SUCCESS = "FILTER_PRODUCT_SUCCESS"

export interface FilterPayload {
  order?: string
  sortBy?: string
  limit?: number
  skip: number
  filters?: {
    category: string[]
    price: number[]
  }
}

export interface FilterProductAction {
  type: typeof FILTER_PRODUCT
  payload: FilterPayload
}

export interface FilterProductSuccessAction {
  type: typeof FILTER_PRODUCT_SUCCESS
  payload: {
    size: number
    data: Product[]
  }
  skip: number
}

export const filterProduct = (
  payload: FilterPayload
): FilterProductAction => ({
  type: FILTER_PRODUCT,
  payload
})
export const filterProductSuccess = (
  payload: {
    size: number
    data: Product[]
  },
  skip: number
): FilterProductSuccessAction => ({
  type: FILTER_PRODUCT_SUCCESS,
  payload,
  skip
})

/* ---------- 通过产品id获取产品详情 ---------- */
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID"
export const GET_PRODUCT_BY_ID_SUCCESS = "GET_PRODUCT_BY_ID_SUCCESS"

export interface GetProductByIdAction {
  type: typeof GET_PRODUCT_BY_ID
  payload: {
    productId: string
  }
}

export interface GetProductByIdSuccessAction {
  type: typeof GET_PRODUCT_BY_ID_SUCCESS
  payload: Product
}

export const getProductById = (payload: {
  productId: string
}): GetProductByIdAction => ({
  type: GET_PRODUCT_BY_ID,
  payload
})

export const getProductByIdSuccess = (
  payload: Product
): GetProductByIdSuccessAction => ({
  type: GET_PRODUCT_BY_ID_SUCCESS,
  payload
})


export type ProductUnionType =
  | GetProductAction
  | GetProductSuccessAction
  | SearchProductAction
  | SearchProductSuccessAction
  | FilterProductAction
  | FilterProductSuccessAction
  | GetProductByIdAction
  | GetProductByIdSuccessAction

