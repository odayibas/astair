const intialState = {
    data: null,
    error: ""
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case "GET_DATA":
            return {
                ...state,
                data: action.data
            }
        default:
            return state
    }

}


export default reducer