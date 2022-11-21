import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../config/initials';
import { actionType } from '../reducers/actionType';


export const register = createSlice({
    name: 'register',
    initialState: {
        value: initialState      
    },
    reducers: {
        login: (state, action) => {
            switch (action.payload.type) {
                case actionType.LOGIN_SUCCESS:
                    console.log('from success');
                    console.log(state.value.success);
                    state.value.success = true;
                    break;
                case actionType.LOGIN_FAIL:
                    state.value.success = false;
                    state.value.errMsg = action.payload.payload.errMsg;
                    state.value.showError = true;
                    break;
                default:
                    return state;
            }
        }
    }
    
});

export const { login } = register.actions ;

export default register.reducer ;