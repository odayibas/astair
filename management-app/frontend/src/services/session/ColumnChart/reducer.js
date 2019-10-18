const intialState = {
    data: null,
    error: ""
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case "GET_SENSOR_DATA":
            return {
                ...state,
                data: action.data
            }
        case "ERROR":
            return {
                ...state,
                error: action.msg
            }
        case "GET_VISION_DATA":
            return {
                ...state,
                data: action.data
            }
        default:
            return state
    }

}


export default reducer