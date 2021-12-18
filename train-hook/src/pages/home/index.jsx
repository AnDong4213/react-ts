import React from "react";
import { connect } from "react-redux";
import { handleCustomItem } from "../../store/actionCreators";
const hehe = 9966;

function Home({
  handleInputChange,
  handleClick,
  handleDelete,
  handleCustomItem,
  inputValue,
  list,
  haha,
  hehe,
  hihi
}) {
  return (
    <section>
      <div>Home</div>
      <h2>{haha}</h2>
      <h3 style={{ color: "red" }}>{hehe}</h3>
      <h4>{hihi}</h4>
      <input onChange={handleInputChange} value={inputValue} />
      <button onClick={handleClick}>提交</button>
      <button onClick={(e) => handleCustomItem(e, "other", "thrid")}>
        异步提交
      </button>
      <ul>
        {list?.map((item, index) => {
          return (
            <li
              onClick={() => {
                handleDelete(index);
              }}
              key={index}
            >
              {item.includes("https") ? (
                <img style={{ width: "120px" }} src={item} alt="9" />
              ) : (
                <span>{item}</span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// 不能使用 return action;
/* const handleInputChange = (e) => (dispatch) => {
  const action = {
    type: "change_input_value",
    value: e.target.value
  };

  dispatch(action);
}; */
const handleInputChange = (e) => {
  const action = {
    type: "change_input_value",
    value: e.target.value
  };
  return action;
};

const handleClick = () => {
  const action = {
    type: "add_item"
  };
  return action;
};
const handleDelete = (index) => {
  const action = {
    type: "delete_item",
    index
  };
  return action;
};

/* export default connect(
  ({ haha, inputValue, list }) => ({ haha, inputValue, hehe, list }),
  {
    handleInputChange,
    handleClick,
    handleDelete,
    handleCustomItem
  }
)(Home); */

export default connect(
  ({ reducer1, reducer2 }) => ({
    haha: reducer1.haha,
    inputValue: reducer1.inputValue,
    hehe: 678,
    list: reducer1.list,
    hihi: reducer2.hihi
  }),
  {
    handleInputChange,
    handleClick,
    handleDelete,
    handleCustomItem
  }
)(Home);
