import React from 'react'

<<<<<<< HEAD
export default function useForm(initialState) {
  const [formdata, setFormdata] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)

  const handleChange = event => {
    setFormdata({ ...formdata, [event.target.name]: event.target.value })
    setFormErrors({ ...formErrors, [event.target.name]: '' })
  }

  return {
    formdata,
    formErrors,
    handleChange,
    setFormErrors,
    setFormdata,
=======
export function useForm(initialFormData) {

  const [formData, setFormData] = React.useState(initialFormData)
  const [formError, setFormError] = React.useState(initialFormData)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormError({ ...formData, [e.target.name]: ['',''] })
    console.log(formError)
  }

  return {
    formData,
    setFormData,
    handleChange,
    formError,
    setFormError,
>>>>>>> 43a015d6bc1d9eeb5cd2ae404f4aee6f95829cd0
  }
}