
const initialState = {
    curUserDetails: {},
    redirect: "/personal-info",
    isFast: false,
    externalUserDetails:{},
    pathUrl: "/"
}
    


export const globalReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case "externalUserDetails":
        return {
            ...state,
            externalUserDetails: payload,
        }
        case "curUserDetails":
            return {
                ...state,
                curUserDetails: payload,
            }
        case "redirect":
            return {
                ...state,
                redirect: payload,
            }
        case "isFast":
            return {
                ...state,
                isFast: payload,
            }
        case "pathUrl":
            return {
                ...state,
                pathUrl: payload,
            }
        case "hasOpenCalls":
            return{
                ...state,
                hasOpenCalls: payload,
            }
        default:
            return state;
    }
};
