import React from "react";
import { connect } from "dva";
import ProductList from "../components/ProductList";

const Products = (props) => {
  // console.log("props", props);
  const { dispatch, products = [] } = props;
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
    </div>
  );
};

// export default Products;
export default connect(({ products }) => ({
  products,
}))(Products);
