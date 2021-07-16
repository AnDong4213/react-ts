const defaultState = {
  inputValue: "",
  list: ["aa", "bb"],
  hehe: "呵呵"
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  if (typeof state === "undefined") {
    return 0;
  }
  switch (action.type) {
    case "change_input_value1": {
      let newState = JSON.parse(JSON.stringify(state));
      newState.inputValue = action.value;
      return newState;
    }
    case "add_item1": {
      let newState = JSON.parse(JSON.stringify(state));
      newState.list.push(newState.inputValue);
      newState.inputValue = "";
      return newState;
    }
    case "add_item_custom1": {
      let newState = JSON.parse(JSON.stringify(state));
      newState.list.push(action.item);
      return newState;
    }
    case "delete_item1": {
      let newState = JSON.parse(JSON.stringify(state));
      newState.list.splice(action.index, 1);
      return newState;
    }
    default:
      return state;
  }
};
