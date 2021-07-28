const defaultState = {
  inputValue: "",
  list: ["aa", "bb"],
  hihi: "我是reducer2的嘿嘿"
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  if (typeof state === "undefined") {
    return 0;
  }
  switch (action.type) {
    case "change_input_value2": {
      let newState = JSON.parse(JSON.stringify(state));
      newState.inputValue = action.value;
      return newState;
    }
    case "add_item2": {
      let newState = JSON.parse(JSON.stringify(state));
      newState.list.push(newState.inputValue);
      newState.inputValue = "";
      return newState;
    }
    case "add_item_custom2": {
      let newState = JSON.parse(JSON.stringify(state));
      newState.list.push(action.item);
      return newState;
    }
    case "delete_item2": {
      let newState = JSON.parse(JSON.stringify(state));
      newState.list.splice(action.index, 1);
      return newState;
    }
    default:
      return state;
  }
};
