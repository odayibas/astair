const intialState = {
    toastLevel: "",
    toastMessage: "",
    showToast: false,
}

export const toastReducer = (state = intialState, action) => {
    switch (action.type) {
        case "SHOW_TOAST":

            return {

                ...state,
                toastLevel: action.action.toastLevel,
                toastMessage: action.action.toastMessage,
                showToast: action.action.showToast,

            }
        case "HIDE_TOAST":
            return {
                ...state,
                toastLevel: action.action.toastLevel,
                toastMessage: action.action.toastMessage,
                showToast: action.action.showToast,
            }
        default:
            return state
    }

}

