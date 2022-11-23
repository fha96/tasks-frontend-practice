import {createSlice} from '@reduxjs/toolkit';
import { initialState2 } from '../config/initials';
import { actionType } from '../reducers/actionType';



export const tasks = createSlice({
    name: 'tasks',
    initialState : initialState2,
    reducers : {
        addTask : (state, action) => {
            switch (action.type) {
              case actionType.ADD_TASK:
                return {
                  ...state.value,
                  tasks: action.payload.tasks,
                  role: action.payload.role,
                  capabilities: action.payload.capabilities,
                };
              case actionType.ADD_FAIL:
                return {
                  ...state.value,
                  errMsg: action.payload.errMsg,
                };
                case actionType.DELETE_TASK:
                  return state.value.tasks.filter(item => item.id !== action.payload.id)
              default:
                return state;
            }
        }
    }
});

export const { addTask } = tasks.actions ;
export default tasks.reducer ; 
