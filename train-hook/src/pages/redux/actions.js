export function createSet(payload) {
  return {
    type: "set",
    payload
  };
}

export function createAdd(payload) {
  return {
    type: "add",
    payload
  };
}

let idSeq = Date.now();
// 异步action
export function createAdd2(text) {
  return (dispatch, getState) => {
    // setTimeout(() => {
    const { todos } = getState();
    console.log(todos);
    if (!todos.find((todo) => todo.text === text)) {
      dispatch({
        type: "add",
        payload: {
          id: idSeq,
          text,
          complete: false
        }
      });
    }
    // }, 3000);
  };
}

export function createRemove(payload) {
  return {
    type: "remove",
    payload
  };
}

export function createToggle(payload) {
  return {
    type: "toggle",
    payload
  };
}
