export function GET_USER_INFO(payload) {
  return {
    type: "GET_USER_INFO",
    payload
  };
}

export function ADD_USER_INFO(payload) {
  return {
    type: "ADD_USER_INFO",
    payload
  };
}

export function EDIT_USER_INFO(payload) {
  return {
    type: "EDIT_USER_INFO",
    payload
  };
}

export function DELETE_USER_INFO(payload) {
  return {
    type: "DELETE_USER_INFO",
    payload
  };
}
