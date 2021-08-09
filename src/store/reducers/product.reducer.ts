import {
  ProductUnionType,
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS
} from "../actions"
import { Product } from "../models/product"

export interface ProductState {
  createdAt: {
    loaded: boolean
    success: boolean
    products: Product[]
  }
  sold: {
    loaded: boolean
    success: boolean
    products: Product[]
  }
  product: {
    loaded: boolean
    success: boolean
    result: Product
  }
  search: Product[]
}

const initialState: ProductState = {
  createdAt: {
    loaded: false,
    success: false,
    products: []
  },
  sold: {
    loaded: false,
    success: false,
    products: []
  },
  product: {
    loaded: false,
    success: false,
    result: {
      _id: "",
      name: "",
      price: 0,
      description: "",
      category: {
        _id: "",
        name: ""
      },
      quantity: 0,
      sold: 0,
      photo: new FormData(),
      shipping: false,
      createdAt: ""
    }
  },
  search: [],
}

export default function productReducer(
  state = initialState,
  action: ProductUnionType
) {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        [action.sortBy]: {
          ...state[action.sortBy === "createdAt" ? "createdAt" : "sold"],
          loaded: false,
          success: false
        }
      }
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        [action.sortBy]: {
          loaded: true,
          success: true,
          products: action.payload
        }
      }
    
    default:
      return state
  }
}
