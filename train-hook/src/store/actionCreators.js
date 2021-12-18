import axios from "axios";

/* export const handleCustomItem = (e, er) => async (dispatch, state, obj) => {
  console.log("para", e.target.tagName);
  console.log("para", er);
  console.log("state", state());
  console.log("obj", obj); // applyMiddleware(thunk.withExtraArgument({ api })) obj才有值
  const url = await axios.get(
    "https://api.thecatapi.com/v1/images/search?limit=1"
  );
  const item = url.data[0].url;

  dispatch({
    type: "add_item_custom",
    item
  });
}; */

export const handleCustomItem = (e, ...er) => {
  return async (dispatch, state, obj) => {
    console.log("para", e.target.tagName);
    console.log("para", er);
    console.log("state", state());
    console.log("obj", obj); // applyMiddleware(thunk.withExtraArgument({ api })) obj才有值
    const url = await axios.get(
      "https://api.thecatapi.com/v1/images/search?limit=1"
    );
    const item = url.data[0].url;

    dispatch({
      type: "add_item_custom",
      item
    });
  };
};

/* export const getTodoList = () => {
  return (dispatch, state) => {
      // console.log(state())
      axios.get('./list.json').then(res => {
          let data = res.data.data
          const action = initListAction(data)
          dispatch(action)
      })
  }
} */
