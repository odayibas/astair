const intialState = {
    data: null,
    error: ""
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case "GET_SLACK_DATA":
            return {
                ...state,
                data: action.data
            }
        case "ERROR":
            return {
                ...state,
                error: action.msg
            }
        default:
            return state
    }

}


export default reducer