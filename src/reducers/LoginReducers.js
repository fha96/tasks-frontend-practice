import { actionType } from "./actionType";


export const loginReducer = (state, action) => {

    switch (action.type) {
        case actionType.LOGIN_SUCCESS:
            return {
                ...state,
                success: true
            }
            
        case actionType.LOGIN_FAIL:
            return {
                ...state,
                success: false,
                errMsg : action.payload.errMsg,
                showError: true
            }

        default:
            return state;
    }
}