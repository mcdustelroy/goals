import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import AuthContext from '../context/auth/authContext'


function Register() {
  const authContext = useContext(AuthContext)
	const { register, reset, state: { user, isLoading, isError, isSuccess, message } } = authContext;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    if(isError) {
      toast.error(message, {position: toast.POSITION.TOP_CENTER})
    }
    if (isSuccess || user) {
      navigate('/')
      toast(`Welcome ${user.name}, let's start setting some goals!`, {position: toast.POSITION.TOP_CENTER})
    }

    reset()

  }, [user, isSuccess, isError, message, navigate])

  const { name, email, password, password2 } = formData


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match', {position: toast.POSITION.TOP_CENTER})
    } else {
      const userData = {
        name,
        email,
        password,
      }
      register(userData)
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
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
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
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

export default Register
