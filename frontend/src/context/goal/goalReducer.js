/* eslint-disable import/no-anonymous-default-export */
import {
    CREATE_GOAL_SUCCESS,
    CREATE_GOAL_FAIL,
    GET_GOAL_SUCCESS,
    GET_GOAL_FAIL,
    LOADING,
    DELETE_GOAL_FAIL
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case CREATE_GOAL_SUCCESS:
            return {
                ...state,
                goals: [...state.goals, action.payload],
                isLoading: false,
                isSuccess: true,
                isError: false,
            }
        case GET_GOAL_SUCCESS:
            return {
                ...state,
                goals: action.payload,
                isLoading: false,
                isSuccess: true,
                isError: false,
            }
        case CREATE_GOAL_FAIL:
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                message: action.payload
            }
        case GET_GOAL_FAIL:
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                message: action.payload
            }
        case DELETE_GOAL_FAIL:
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                message: action.payload
            }

        default:
            return state;
    }
}
