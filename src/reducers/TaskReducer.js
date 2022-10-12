import { actionType } from "./actionType";

export const taskReducer = (state, action) => {
  switch (action.type) {
    case actionType.ADD_TASK:
      return {
        ...state,
        tasks: action.payload.tasks,
        role: action.payload.role,
        capabilities: action.payload.capabilities,
      };
    case actionType.ADD_FAIL:
      return {
        ...state,
        errMsg: action.payload.errMsg,
      };
      case actionType.DELETE_TASK:
        return state.tasks.filter(item => item.id !== action.payload.id)
    default:
      return state;
  }
};
