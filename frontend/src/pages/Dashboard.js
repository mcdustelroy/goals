import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import GoalContext from '../context/goal/goalContext'
import AuthContext from '../context/auth/authContext'

function Dashboard() {
  const navigate = useNavigate()

  const { getGoals, state: { goals, isError, message, isLoading } } = useContext(GoalContext)
  const { reset, state: { user } } = useContext(AuthContext)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    getGoals()

    return () => {
      reset()
    }
  }, [ user, navigate, isError, message])


  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
