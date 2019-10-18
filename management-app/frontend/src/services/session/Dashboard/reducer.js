const intialState = {
    data: null,
    error: ""
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case "GET_AC_DATA":
            return {
                ...state,
                ac: action

            }
        case "GET_AC_AVERAGE":
            return {
                ...state,

                avgac: action.data

            }
        case "GET_SENSOR_AVERAGE_DATA":
            return {
                ...state,
                avgsensor: action.data
            }
        case "GET_SENSOR_DATA":
            return {
                ...state,
                sensorData: action
            }
        case "GET_OUTDOOR_DATA":
            return {
                ...state,
                temp: action.data
            }
        case "GET_VISION_DATA":
            return {
                ...state,
                people: action.data
            }
        default:
            return state
    }

}


export default reducer