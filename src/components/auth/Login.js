import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

function Login() {

  const history = useHistory()
  const [errorMessage, setErrorMessage] = React.useState('')
  const { formData, handleChange } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const req = await loginUser(formData)
      setToken(req.data.token)
      history.push('/memories')
    } catch (err) {
      setErrorMessage(err.response.data.errMessage.password)
    }
  }

  return (
    <section className="login-background">
      <div className="title is-2 has-text-centered has-background-black has-text-white">login</div>

      <div className="container is-fullwidth login-background">
        <div className="columns is-vcentered">
          <div className="column is-half is-centered ">
            <form
              className="card is-centered is-one-quarter-desktop is-one-third-widescreen is-half-fullhd has-background-info-dark"
              onSubmit={handleSubmit}
            >
              <div className="field">
                <label className="label has-text-white">Email</label>
                <div className="control">
                  <input
                    className=
                      {`
                  input ${errorMessage ? 'is-danger' : ''}
                `}
                    type="email"
                    name="email"
                    placeholder="e.g. alinic@bossman.com"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label has-text-white">Password</label>
                <div className="control">
                  <input
                    className=
                      {`
                input ${errorMessage ? 'is-danger' : ''}
                `}
                    type="password"
                    name="password"
                    placeholder="e.g. famgrapejuiceismyfav"
                    onChange={handleChange}
                  />
                  <p className="help is-danger">
                    {errorMessage}
                  </p>
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link">Log In</button>
                </div>
              </div>
            </form>
          </div>
          <div className="column is-half">
            <figure className="image">
              <img src="https://imgur.com/JbqMTzr.png" />
            </figure>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Login