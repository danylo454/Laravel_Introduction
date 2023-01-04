import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import http from "../../http_common";
import { IProductItem } from "./store/types";

function HomePage() {
  const { list } = useTypedSelector((store) => store.products);
  const dispatch = useDispatch();

  useEffect(() => {
    http.get<Array<IProductItem>>("/api/products").then((resp) => {
      dispatch({ type: "PRODUCT_LIST", payload: resp.data });
    });
  }, []);

  const DeleteUserHandleSubmit = (event: any) => {
    event.preventDefault();
    let idProduct = event.target.id;
    http
      .delete<IProductItem>(`/api/products/${idProduct}`)
      .then((resp) => {
        dispatch({ type: "PRODUCT_DELETED" });
        http.get<Array<IProductItem>>("/api/products").then((resp) => {
          dispatch({ type: "PRODUCT_LIST", payload: resp.data });
        });
      })
      .catch((e) => {
        console.log("Errors: ", e);
      });
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
          textDecoration: "underline",
          marginBottom: "25px",
          marginTop: "10px",
        }}
      >
        <h1>Products</h1>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "33%" }} scope="col">
              ID
            </th>
            <th style={{ width: "33%" }} scope="col">
              NAME
            </th>
            <th style={{ width: "33%" }} scope="col">
              DETAIL
            </th>
            <th style={{ width: "33%" }} scope="col">
              DELETE
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map(({ id, name, detail }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{detail}</td>
              <td>
                <button
                  id={id.toString()}
                  className="btn btn-danger"
                  onClick={DeleteUserHandleSubmit}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default HomePage;
