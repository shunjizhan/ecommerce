import { put, take, takeEvery } from "redux-saga/effects"
import {
  GET_PRODUCT,
  GetProductAction,
  getProductSuccess
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

export default function* productSaga() {
  yield takeEvery(GET_PRODUCT, handleGetProduct)
}
