import { useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import http from "../../http_common";
import { IProductItem } from "../home/store/types";

const AddProduct = () => {
  const [canRedirect, setRedirect] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newProduct = {
      name: data.get("nameProduct"),
      detail: data.get("descriptionProduct"),
    };
    http
      .post<IProductItem>(`/api/products`, newProduct)
      .then((resp) => {
        console.log(resp);
        setRedirect(true);
      })
      .catch((e) => {
        console.log("Errors: ", e);
      });
  };
  if (canRedirect == true) {
    return <Navigate to={"/"}></Navigate>;
  }
  return (
    <>
      <div style={{ paddingTop: "20px" }}>
        <form onSubmit={handleSubmit} method="post">
          <div className="mb-3">
            <label htmlFor="nameProduct" className="form-label">
              Name Product
            </label>
            <input
              name="nameProduct"
              type="text"
              className="form-control"
              id="nameProduct"
              placeholder="Name Product"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descriptionProduct" className="form-label">
              Description Product
            </label>
            <textarea
              className="form-control"
              id="descriptionProduct"
              name="descriptionProduct"
              required
            ></textarea>
          </div>
          <div>
            <button type="submit" className="btn btn-success">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddProduct;
