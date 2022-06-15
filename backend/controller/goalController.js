const asyncHandler = require('express-async-handler') // wraps try/catch

// desc     Get all goals
// route    GET /api/goals
//access    Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'get goals'})
})

// desc     set goal
// route    POST /api/goals
//access    Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        
        // Error is overwritten with the middleware errorHandler
        throw new Error('Please add a text field')
    } 
    
    res.status(200).json({message: 'Set goal'})
})
// desc     update goal
// route    PUT /api/goals/:id 
//access    Private

const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `update goal: ${req.params.id}`})
})

// desc     Delete a goal
// route    DELETE /api/goals/:id
//access    Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `delete goal: ${req.params.id}`})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}