import React, { useEffect } from "react";
import { connect } from "dva";
import ProductList from "../components/ProductList";

const Products = (props) => {
  // console.log("props", props);
  const { dispatch, products = [], tests } = props;
  useEffect(() => {
    console.log("tests", tests);
  }, []);
  useEffect(() => {
    const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout, 'done'));
    /* const fetchData = async (ms) => {
      await delay(ms)
      console.log(90)
    }
    fetchData(2000) */

    delay(2000).then(val => {
      console.log(val)
    })
  }, [])
  function handleDelete(id) {
    dispatch({
      type: "products/delete33",
      payload: id,
    });
  }
  const handleAdd = () => {
    dispatch({
      type: "products/addList229",
      payload: Math.random(),
    });
  };
  return (
    <div>
      <h2>List of Products</h2>
      <div>
        <button onClick={handleAdd}>ADD-LIST</button>
      </div>
      <ProductList onDelete={handleDelete} products={products} />
      <ProductList onDelete={handleDelete} products={tests} />
    </div>
  );
};

// export default Products;
export default connect(({ products, tests }) => ({
  products,
  tests,
}))(Products);
