import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

function Login() {

  const history = useHistory()
  const [isError,setIsError] = React.useState(false)
  const { formData, handleChange, formError, setFormError } = useForm({
    email: '',
    password: '',
  })

  const handleRequiredMet = (e) => {
    if (e.target.value.length > 0) {
      // ! in formError, find e.target.name and set its value to ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await loginUser(formData)
      setToken(res.data.token)
      history.push('/memories')
    } catch (err) {
      setIsError(true)
      const errorMessage = err.response.data.message
      setFormError(errorMessage)
    }
  }

  return (
    <>
      <form
        className="column is-half is-offset-one-quarter"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className=
                {`
                  input ${ isError ? 'is-danger' : '' }
                `}
              type="email"
              placeholder="e.g. alinic@bossman.com"
              onBlur={handleRequiredMet}
            />
            <p className="help is-danger">
              {isError && formError.email}
            </p>
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className=
                {`
                input ${ isError ? 'is-danger' : '' }
                `}
              type="password" 
              placeholder="e.g. famgrapejuiceismyfav"
              onBlur={handleRequiredMet}
            />
            <p className="help is-danger">
              {isError && formError.password}
            </p>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login