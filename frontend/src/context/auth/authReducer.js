/* eslint-disable import/no-anonymous-default-export */
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	REGISTER_PENDING,
	LOGOUT,
	LOGIN_SUCCESS,
	LOGIN_FAIL
} from "../types";

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
		default:
			return state;
	}
};
