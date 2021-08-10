import { put, take, takeEvery } from "redux-saga/effects"
import {
  GET_PRODUCT,
  GetProductAction,
  getProductSuccess,
  SearchProductAction,
  SearchProductSuccess,
  SEARCH_PRODUCT,
  FilterProductAction,
  filterProductSuccess,
  FILTER_PRODUCT,
} from "../actions"
import axios from "axios"
import { API } from "../../config"
import { Product } from "../models/product"

// /products?sortBy=createdAt&order=asc&limit=10
function* handleGetProduct({ sortBy, order, limit }: GetProductAction): any {
  const response = yield axios.get<Product[]>(`${API}/products`, {
    params: { sortBy, order, limit }
  })
  yield put(getProductSuccess(response.data, sortBy))
}

function* handleSearchProduct({ payload: { search, category } }: SearchProductAction): any {
  const response = yield axios.get(`${API}/products/search`, {
    params: { search, category }
  })
  yield put(SearchProductSuccess(response.data))
}

function* handleFilterProduct(action: FilterProductAction): any {
  let response = yield axios.post(`${API}/products/filter`, action.payload)
  yield put(filterProductSuccess(response.data, action.payload.skip))
}

export default function* productSaga() {
  yield takeEvery(GET_PRODUCT, handleGetProduct)
  yield takeEvery(SEARCH_PRODUCT, handleSearchProduct)
  yield takeEvery(FILTER_PRODUCT, handleFilterProduct)
}
