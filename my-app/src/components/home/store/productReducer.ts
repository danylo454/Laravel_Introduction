import { ProductActionTypes, ProductState } from './types';

const initialState : ProductState ={
    list:[]
};

export const productReducer = (state=initialState,action:any) : ProductState => {
    switch(action.type){
        case ProductActionTypes.PRODUCT_LIST:{
            return {...state,list:[...action.payload]}
        }
        default:{return state};
    }
}