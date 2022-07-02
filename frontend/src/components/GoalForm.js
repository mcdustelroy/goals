import { useState, useContext } from 'react'
import GoalContext from '../context/goal/goalContext'
import AuthContext from '../context/auth/authContext'


function GoalForm({ toast }) {
  const [text, setText] = useState('')

  const { createGoal, state: { goals, isError, message, isLoading } } = useContext(GoalContext)
  const { logout, login, reset, state: { user } } = useContext(AuthContext)

  const onSubmit = (e) => {
    e.preventDefault()
    createGoal({
      text: text
    })
    setText('')
    toast('New goal created!', {position: toast.POSITION.TOP_CENTER})
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Goal
          </button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm
