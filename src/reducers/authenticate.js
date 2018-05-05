export default function authenticate(state, action) {
    switch (action.type) {
        case 'SIGNIN':
            return {
                isLogin: true,
                user: action.user
            };
        case 'LOGOUT':
            return {
                isLogin: false,
                user: null
            };
        default:
            return state
    }
}
