import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT,
	LOGIN_SUCCESS,
	LOGIN_FAIL
} from "../types";

const AuthState = (props) => {
    const user = JSON.parse(localStorage.getItem('user'))

    const initialState = {
        user: user ? user : null,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
      }
      
	const [state, dispatch] = useReducer(authReducer, initialState);
	
    const reset = () => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
    }

    // Register User
    const register = async (userData) => {
        try {
            const res = await axios.post('/api/users/', userData)
            if (res.data) {
              localStorage.setItem('user', JSON.stringify(res.data))
            }

            dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
            
        } catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.message,
			});
        }
    }

    // Logout
	const logout = async () => {
        localStorage.removeItem("user");
		dispatch({ type: LOGOUT })

	};

    // Login User
	const login = async (formData) => {
        try {
            const res = await axios.post('/api/users/login', formData)

            if (res.data) {
                localStorage.setItem('user', JSON.stringify(res.data))
            }
            
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});

        } catch (err) {
            dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.message,
			});
        }
    };

	return (
		<AuthContext.Provider
			value={{
                state,
                register,
                logout,
                login,
                reset
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
