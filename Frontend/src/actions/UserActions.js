import axios from "axios"
import { toast } from "react-toastify"

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const registerUser = (user) => async (dispatch) => {
    dispatch({ type: "USER_REGISTER_REQUEST" })
    try {
        const response = await axios.post(`${backendUrl}/signup`, { user })
        dispatch({ type: "USER_REGISTER_SUCCESS", payload: response.data })

        setTimeout(() => {
            window.location = "/";
        }, 1500);

        localStorage.setItem("token", response.data.access_token)
    }
    catch (error) {
        dispatch({ type: "USER_REGISTER_FAILED", payload: error.response?.data?.message || error.message })
    }
}

export const loginUser = (user) => async (dispatch) => {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    try {
        // Convert to FORM DATA
        const formData = new URLSearchParams();
        formData.append("username", user.username);
        formData.append("password", user.password);

        // Making API call to backend for Login
        const response = await axios.post(`${backendUrl}/token`,formData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        // If Login Success
        dispatch({type: "USER_LOGIN_SUCCESS",payload: response.data,});
        toast.success("Login successful");

        setTimeout(() => {
            window.location = "/";
        }, 1500);

        // Storing token in localstorage
        localStorage.setItem("token", response.data.access_token);
    } 

    catch (error) {
        // If Login Fails
        dispatch({type: "USER_LOGIN_FAILED", payload: error.response?.data || error.message,});
    }
};
