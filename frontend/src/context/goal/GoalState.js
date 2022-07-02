import React, { useReducer } from 'react';
import goalReducer from './goalReducer'
import GoalContext from './goalContext'
import axios from "axios";
import {
    CREATE_GOAL_SUCCESS,
    CREATE_GOAL_FAIL,
    GET_GOAL_SUCCESS,
    GET_GOAL_FAIL,
    LOADING,
    DELETE_GOAL_FAIL
} from '../types';

const GoalState = props => {
    const initialState = {
        goals: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
      }

    const [state, dispatch] = useReducer(goalReducer, initialState)

    // Reset state function
    const reset = () => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
    }

    // Create new goal
    const createGoal = async (goalData) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const config = {
                headers: {
                    'x-auth-token': user.token,
                },
            }

            dispatch({ type: LOADING })
            const res = await axios.post('/api/goals', goalData, config)
        
            dispatch({
                type: CREATE_GOAL_SUCCESS,
                payload: res.data
            })
        } catch (err) {
        const message =
            (err.response?.data?.message) || err.message || err.toString()
            dispatch({
                type: CREATE_GOAL_FAIL,
                payload: message
            })
        }
    }
  
  
  // Get user goals
  const getGoals = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        const config = {
            headers: {
                'x-auth-token': user.token,
            },
        }

        dispatch({ type: LOADING })
        const res = await axios.get('/api/goals', config)
        
        dispatch({
            type: GET_GOAL_SUCCESS,
            payload: res.data
        })
    } catch (err) {
    const message =
        (err.response?.data?.message) || err.message || err.toString()
        dispatch({
            type: GET_GOAL_FAIL,
            payload: message
        })
    }
  }
  
  // Delete user goal
  const deleteGoal = async (goalID) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        const config = {
            headers: {
                'x-auth-token': user.token,
            },
          }

        dispatch({ type: LOADING })
        await axios.delete(`/api/goals/${goalID}`, config)

        getGoals()
    } catch (err) {
    const message =
        (err.response?.data?.message) || err.message || err.toString()
        dispatch({
            type: DELETE_GOAL_FAIL,
            payload: message
        })
    }
}

  // Update user goal
  const updateGoal = async (goalID, updatedGoal) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        const config = {
            headers: {
                'x-auth-token': user.token,
            },
          }

        const goalData = {
            text: updatedGoal
        }

        dispatch({ type: LOADING })
        await axios.put(`/api/goals/${goalID}`, goalData, config)

        getGoals()
    } catch (err) {
    const message =
        (err.response?.data?.message) || err.message || err.toString()
        dispatch({
            type: DELETE_GOAL_FAIL,
            payload: message
        })
    }
}

    return (
        <GoalContext.Provider 
            value={{
                state,
                createGoal,
                getGoals,
                deleteGoal,
                updateGoal
            }}
        >
            {props.children}
        </GoalContext.Provider>
    )
};

export default GoalState;