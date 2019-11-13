export const showToast = (level,message) => {
    return (dispatch) => {

        const data =  {
            toastLevel: level,
            toastMessage: message,
            showToast: true,
        }
        console.log("data",data)
        dispatch(
            { type: "SHOW_TOAST", action: data })
    }
}

export const hideToast = () => {
    return (dispatch) => {
        
        const data =  {
            toastLevel: "",
            toastMessage: "",
            showToast: false,
        }

        dispatch(
            { type: "HIDE_TOAST", action: data })
    }
}