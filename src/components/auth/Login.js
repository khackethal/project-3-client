import React from 'react'

function Login() {

  const [isLogged, setIsLogged] = React.useState(null)

  React.useEffect( () => {

  },[])

  return (
    <>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input className="input" type="email" placeholder="e.g. alinic@bossman.com" />
        </div>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input className="input" type="password" placeholder="e.g. famgrapejuiceismyfav" />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link">Submit</button>
        </div>
      </div>
    </>
  )
}

export default Login