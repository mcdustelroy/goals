import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import AuthContext from '../context/auth/authContext'

function Login() {
  const authContext = useContext(AuthContext)
  const { login, reset, state: { user, isLoading, isError, isSuccess, message } } = authContext;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  
  const navigate = useNavigate()

  useEffect(() => {
    if(isError) {
      toast.error(message, {position: toast.POSITION.TOP_CENTER})
    }

    if (isSuccess || user) {
      navigate('/')
      toast(`It's goal time, ${user.name}!!`, {position: toast.POSITION.TOP_CENTER})
    }
    
    reset()

  }, [user, isSuccess, isError, message, navigate])

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }


  const onSubmit = (e) => {
    e.preventDefault()
    login(formData)
    navigate('/')
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login and start setting goals
        </h1>
        <p>Please Login</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
