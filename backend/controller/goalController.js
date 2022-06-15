const asyncHandler = require('express-async-handler') // wraps try/catch
const Goal = require('../models/Goal')
const User = require('../models/User')
const { protect } = require('../middleware/authMiddleware')

// desc     Get all goals
// route    GET /api/goals
// access    Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

// desc     set goal
// route    POST /api/goals
// access    Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400) 
        // Error is overwritten with the middleware errorHandler
        throw new Error('Please add a text field')
    } 
     
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})
// desc     update goal
// route    PUT /api/goals/:id 
// access    Private

const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    } 

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User does not own this goal.')
    }
     
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal)
})
 
// desc     Delete a goal
// route    DELETE /api/goals/:id
// access    Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    } 

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User does not own this goal.')
    }
    await goal.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}