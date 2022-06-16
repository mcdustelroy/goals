import React, { Fragment, useReducer } from 'react';
import {v4 as uuidv4} from 'uuid';
import goalReducer from './goalReducer'
import GoalContext from './goalContext'
// import {
//   SET_ALERT,
//   REMOVE_ALERT,
// } from '../types';

const GoalState = props => {
    const initialState = [];
    const [state, dispatch] = useReducer(goalReducer, initialState)

    

    return (
        <GoalContext.Provider 
            value={{

            }}
        >
            {props.children}
        </GoalContext.Provider>
    )
};

export default GoalState;