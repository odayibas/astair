const intialState = {
    data: null,
    error: ""
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case "GET_LAST_AC_RECORDS":
            return {
                ...state,
                data: action.data
            }
        case "ERROR":
            return {
                ...state,
                error: action.msg
            }
        case "SET_TEMPERATURE":
            return {
                ...state,
                data: {
                    ...state.data,
                    temperature: action.temperature
                }
            }
        case "SET_FAN":
            return {
                ...state,
                data: {
                    ...state.data,
                    fan_speed: action.fan
                }
            }
        case "SET_MODE":
            return {
                ...state,
                data: {
                    ...state.data,
                    mode: action.mode
                }
            }
        case "SET_ACTIVE":
            return {
                ...state,
                data: {
                    ...state.data,
                    active: action.active
                }
            }
        case "SET_IS_CHECKED":
            return {
                ...state,
                data: {
                    ...state.data,
                    isChecked: action.isChecked
                }
            }
        case "HANDLE_SUBMIT":
            return {
                ...state,
                data: {
                    ...state.data,
                    id: action.message[0],
                    mode: action.message[1],
                    fan_speed: action.message[2],
                    temperature: action.message[3],
                    active: action.message[4],

                }
            }
        default:
            return state
    }

}


export default reducer