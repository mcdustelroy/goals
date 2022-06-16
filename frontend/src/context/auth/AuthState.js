import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	CLEAR_ERRORS,
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
				payload: err.response.data.msg,
			});
        }
    }

    // Logout
	const logout = () => {
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
            console.log(err.response.data.msg)
            dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.msg,
			});
        }
    };

	// // Load User
	// const loadUser = async () => {
	// 	if (localStorage.token) {
	// 		setAuthToken(localStorage.token);
	// 	}

	// 	try {
	// 		const res = await axios.get("/api/auth");

	// 		dispatch({
	// 			type: USER_LOADED,
	// 			payload: res.data,
	// 		});
	// 	} catch (err) {
	// 		dispatch({ type: AUTH_ERROR });
	// 	}
	// };



	// 	try {
	// 		const res = await axios.post("/api/users", formData, config);

	// 		dispatch({
	// 			type: REGISTER_SUCCESS,
	// 			payload: res.data,
	// 		});

	// 		loadUser();
	// 	} catch (err) {
	// 		dispatch({
	// 			type: REGISTER_FAIL,
	// 			payload: err.response.data.msg,
	// 		});
	// 	}
	// };



	// 	try {
	// 		const res = await axios.post("/api/auth", formData, config);

	// 		dispatch({
	// 			type: LOGIN_SUCCESS,
	// 			payload: res.data,
	// 		});

	// 		loadUser();
	// 	} catch (err) {
	// 		dispatch({
	// 			type: LOGIN_FAIL,
	// 			payload: err.response.data.msg,
	// 		});
	// 	}
	// };



	// // Clear Errors
	// const clearErrors = () => {
	// 	dispatch({ type: CLEAR_ERRORS });
	// };

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
