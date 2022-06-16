/* eslint-disable import/no-anonymous-default-export */
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	REGISTER_PENDING,
	LOGOUT,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CLEAR_ERRORS,
	USER_LOADED,
	AUTH_ERROR,
} from "../types";

// const initialState = {
// 	user: user ? user : null,
// 	isError: false,
// 	isSuccess: false,
// 	isLoading: false,
// 	message: '',
//   }

export default (state, action) => {
	switch (action.type) {
		case REGISTER_PENDING:
			return {
				...state,
				isLoading: true,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			return {
				...state,
				user: action.payload,
				isSuccess: true,
				isLoading: false,
			};
		case REGISTER_FAIL:
		case LOGIN_FAIL:
			return {
				...state,
				isLoading: false,
				isError: true,
				message: action.payload,
				user: null
			};
		case LOGOUT:
			return {
				...state,
				user: null
			};
		// case USER_LOADED:
		// 	return {
		// 		...state,
		// 		isAuthenticated: true,
		// 		loading: false,
		// 		user: action.payload,
		// 	};
		// case AUTH_ERROR:
		
		// case CLEAR_ERRORS:
		// 	localStorage.removeItem("token");
		// 	return {
		// 		...state,
		// 		error: null,
		// 	};
		default:
			return state;
	}
};
