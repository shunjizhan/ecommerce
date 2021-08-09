import { takeEvery, put } from "redux-saga/effects"
import { GET_CATEGORY, getCategorySuccess } from "../actions"
import axios from "axios"
import { API } from "../../config"
import { Category } from "../actions"

function* handleGetCategory(): any {
  const response = yield axios.get<Category[]>(`${API}/categories`)
  yield put(getCategorySuccess(response.data))
}

export default function* categorySaga() {
  yield takeEvery(GET_CATEGORY, handleGetCategory)     // 获取分类列表
}
