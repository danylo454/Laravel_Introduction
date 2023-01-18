export interface IProductItem {
  id: number;
  name: string;
  detail: string;
}

export interface IPorductResponse {
  data: Array<IProductItem>;
  current_page: number;
  total: number;
  last_page: number;
}

export interface ISearchProduct {
  name?: string;
  page: number;
}

export interface ProductState {
  list: Array<IProductItem>;
  current_page: number;
  total: number;
  count_page: number;
  error_message: string;
}

export enum ProductActionTypes {
  PRODUCT_LIST = "PRODUCT_LIST",
}

export interface GetProductAction {
  type: ProductActionTypes.PRODUCT_LIST;
  payload: ProductState;
}

export type ProductActions = GetProductAction;
