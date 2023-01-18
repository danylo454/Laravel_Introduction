import { Dispatch } from "react";
import http from "../../../http_common";
import {
  IPorductResponse,
  ISearchProduct,
  ProductActions,
  ProductActionTypes,
} from "./types";

export const GetProductList =
  (search: ISearchProduct) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      const response = await http.get<IPorductResponse>("/api/products", {
        params: search,
      });
      const { data } = response;
      console.log("data", data);
      dispatch({
        type: ProductActionTypes.PRODUCT_LIST,
        payload: {
          list: [...data.data],
          count_page: data.last_page,
          total: data.total,
          current_page: data.current_page,
          error_message: "",
        },
      });
    } catch (err: any) {
      return Promise.reject();
    }
  };
