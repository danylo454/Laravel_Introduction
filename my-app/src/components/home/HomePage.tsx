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

  return (
    <>
      <div
        style={{
          textAlign: "center",
          textDecoration: "underline",
          marginBottom: "25px",
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
              detail
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map(({ id, name, detail }) => (
            <tr key={id}>
              <td key={id}>{id}</td>
              <td key={name}>{name}</td>
              <td key={detail}>{detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default HomePage;
