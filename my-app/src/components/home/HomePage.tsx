import { useFormik } from "formik";
import qs from "qs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Pagination from "../common/Pagination";
import { ISearchProduct } from "./store/types";

const HomePage = () => {
  const { list, total, count_page, current_page } = useTypedSelector(
    (store) => store.products
  );
  const [getPageSize, SetPageSize] = useState("2");
  const { GetProductList } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState<ISearchProduct>({
    name: searchParams.get("name") || "",
    page: searchParams.get("page") || 1,
    page_size: getPageSize,
  });

  function filterNonNull(obj: ISearchProduct) {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
  }

  useEffect(() => {
    const find: ISearchProduct = {
      name: searchParams.get("name") || "",
      page: searchParams.get("page") || 1,
      page_size: getPageSize,
    };
    GetProductList(find);
    setSearch(find);
    //clear formik data
    formik.values.name = find.name;
  }, [searchParams, getPageSize]);

  //Maping data from db in html
  const data_content = list.map((product) => (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.detail}</td>
    </tr>
  ));

  //Try to make arrow pagination but have one bug
  const onClickArrow = (namber: number, action: string) => {
    if (action == "-" && current_page != 1) {
      setSearch({ ...search, page: (search.page as number) - namber });
      console.log();
      setSearchParams(qs.stringify(filterNonNull(search)));
    }
    if (action == "+" && count_page != search.page) {
      setSearch({ ...search, page: (search.page as number) + namber });
      setSearchParams(qs.stringify(filterNonNull(search)));
    }
  };
  const buttons = [];
  for (let i = 1; i <= count_page; i++) {
    buttons.push(i);
  }

  const handleClickPaginate = (page: number) => {
    setSearch({ ...search, page: page });
    setSearchParams(qs.stringify(filterNonNull({ ...search, page: page })));
  };

  const onSubmit = (values: ISearchProduct) => {
    setSearchParams(qs.stringify(filterNonNull(values)));
    setSearch(values);
  };

  const formik = useFormik({
    initialValues: search,
    onSubmit,
  });
  const handleChange = (e: any) => {
    SetPageSize(e.target.value);
  };

  return (
    <>
      <h1 className="text-center">Головна сторінка</h1>
      <div className="table-responsive">
        <form
          className=" w-100 mt-3 d-flex flex-wrap border border-secondary rounded-3 position-relative"
          onSubmit={formik.handleSubmit}
        >
          <div
            style={{ display: "flex", justifyContent: "center", margin: "5px" }}
          >
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              className="form-control"
              placeholder="пошук по імені"
            />
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ alignItems: "center", display: "flex" }}>
              <label
                htmlFor="customRange1"
                className="form-label"
                style={{
                  margin: "0",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                Size page:
              </label>
            </div>

            <select
              id="customRange1"
              className="form-select"
              onChange={handleChange}
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "5px",
              }}
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
            </select>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "20px",
            }}
          >
            <button type="submit" className="btn btn-secondary">
              <span>
                <i className="fa fa-search"></i>
              </span>
              <span>Пошук</span>
            </button>
          </div>
        </form>

        <h4>Всього записів: {total}</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Назва</th>
              <th scope="col">Опис</th>
            </tr>
          </thead>
          <tbody>{data_content}</tbody>
        </table>

        <nav>
          <ul className="pagination">
            <li
              style={{
                display: "flex",
                alignItems: "center",
                paddingRight: "7px",
              }}
            >
              <i
                style={{ cursor: "pointer" }}
                className="fa fa-arrow-left fa-2x"
                onClick={() => onClickArrow(1, "-")}
                aria-hidden="true"
              ></i>
            </li>
            <Pagination
              current_page={current_page}
              count_page={count_page}
              onClick={handleClickPaginate}
            />
            <li
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "7px",
              }}
            >
              <i
                className="fa fa-arrow-right fa-2x "
                style={{ cursor: "pointer" }}
                aria-hidden="true"
                onClick={() => onClickArrow(1, "+")}
              ></i>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default HomePage;
