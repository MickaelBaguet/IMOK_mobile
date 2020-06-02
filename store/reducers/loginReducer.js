const initialState = {
    auth_token : null
}

const loginReducer = (state=initialState, action) => {
    let nextState

    switch(action.type) {
        case 'login' :
            nextState = {
                ...state,
                auth_token: action.value
            }
            return nextState || state

        case 'logout' :
            nextState = {
                ...state,
                auth_token: null
            }
            return nextState || state

        default:
            return state
    }
}

export default loginReducer