import React from "react";
import { connect } from "react-redux";
import { handleCustomItem } from "../../store/actionCreators";
const hehe = 99;

function Home(props) {
  console.log(props);
  const {
    handleInputChange,
    handleClick,
    handleDelete,
    handleCustomItem,
    inputValue,
    list,
    haha
  } = props;
  return (
    <section>
      <div>Home</div>
      <h4>{haha}</h4>
      <input onChange={handleInputChange} value={inputValue} />
      <button onClick={handleClick}>提交</button>
      <button onClick={handleCustomItem}>异步提交</button>
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

const handleInputChange = (e) => (dispatch) => {
  const action = {
    type: "change_input_value",
    value: e.target.value
  };

  // return action;
  dispatch(action);
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
  ({ reducer1 }) => ({
    haha: reducer1.haha,
    inputValue: reducer1.inputValue,
    hehe,
    list: reducer1.list
  }),
  {
    handleInputChange,
    handleClick,
    handleDelete,
    handleCustomItem
  }
)(Home);
