import { ProductActionTypes, ProductState } from './types';

const initialState : ProductState ={
    list:[]
};

export const productReducer = (state=initialState,action:any) : ProductState => {
    console.log(action.payload);
    switch(action.type){
        case ProductActionTypes.PRODUCT_LIST:{
            return {...state,list:[...action.payload]}
        }
        case ProductActionTypes.PRODUCT_DELETED:{
            return {...state,list:[]}
        }
        case ProductActionTypes.PRODUCT_SUCCESSFULLY_ADDED:{
            return {...state}
        }
        default:{return state};
    }
}