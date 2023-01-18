import { ProductState, ProductActionTypes, ProductActions } from './types';

const initialState: ProductState = {
  list: [],
  count_page: 0,
  total: 0,
  current_page: 0,
  error_message: ""
};

export const productReducer = (state=initialState, action: ProductActions ) : ProductState => {
    switch(action.type) {
        case ProductActionTypes.PRODUCT_LIST: {
            //console.log("Payload:", action.payload);
            return {
                ...state,
                ...action.payload,
            };
        }
        default:
            return state;
    }
}