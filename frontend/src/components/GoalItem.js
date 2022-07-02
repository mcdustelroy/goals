import React, { useContext, useState } from 'react'
import GoalContext from '../context/goal/goalContext'

function GoalItem({ goal, toast }) {
  const { deleteGoal, updateGoal } = useContext(GoalContext)

  const [showEdit, setShowEdit] = useState(false)
  const [updatedText, setUpdatedText] = useState(goal.text)

  const handleEdit = (e) => {
    setUpdatedText(e.target.value)
  }

  const handleCancel = (e) => {
    setUpdatedText(goal.text)
    setShowEdit(false)
  }

  if(!showEdit) {
    return (
      <div className='goal'>
        <div>{new Date(goal.updatedAt).toLocaleString('en-US')}</div>
        {/* <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div> */}
        <h2>{goal.text}</h2>

        <button onClick={() => {
            deleteGoal(goal._id)
            toast('Goal deleted', {position: toast.POSITION.TOP_CENTER})
          }
          } className='close'>
          X
        </button>
        <div className='update'>
          <button onClick={() => setShowEdit(true)} >
            Edit
          </button>
        </div>
      </div>
    )
  }

  if(showEdit) {
    return (
      <div className='goal'>
        <div>{new Date(goal.updatedAt).toLocaleString('en-US')}</div>
        {/* <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div> */}
        <textarea value={updatedText} onChange={handleEdit}></textarea>
        <button onClick={() => deleteGoal(goal._id)} className='close'>
          X
        </button>

        <div className='update'>
          <button onClick={handleCancel} >
            cancel
          </button>
          <button onClick={() => {
            updateGoal(goal._id, updatedText)
            toast('Goal updated', {position: toast.POSITION.TOP_CENTER})
          }} >
            Update
          </button>
        </div>
      </div>
    )
  }
}

export default GoalItem
