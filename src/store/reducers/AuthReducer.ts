import { Action } from "../../interfaces/Action"

type AuthState = {
    isAuthenticated: boolean,
    token?: string
}

const INITIAL_STATE: AuthState = {
    isAuthenticated: false,
    token: ""
}

const AuthReducer = (state = INITIAL_STATE, action: Action<AuthState>) : AuthState => {
    switch(action.type) {
        case 'LOGIN':
            return {...action.payload, isAuthenticated: true}
        case 'LOGOUT':
            return {isAuthenticated: false, token: ""}
        default:
            return state
    }
}

export default AuthReducer