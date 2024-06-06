import axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react'
import {  useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Register() {

  let navigate = useNavigate()


  function register() {
    return axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formik.values)
    }
  
 


  const { mutate, isLoading, error, isSuccess } = useMutation(register);
//  console.log(data);
 if (isSuccess) {
  navigate('/login')
 }

  let validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Min length 3 characters').max(20, 'Max length 20 characters'),
    email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'must have at least one number, at least one special character and must be greater than 6 characters and max 16 characters'),
    rePassword: Yup.string().required('RePassword is required').oneOf([Yup.ref('password')], 'Password and RePassword must be identical'),
    phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'Enter a valid Egypyian phone number')
  })


  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: mutate
    
  })


  return <>
    <h2 >Register now: </h2>
    <form onSubmit={formik.handleSubmit} className='w-75 mx-auto mt-5 color-main' >

      <label htmlFor="name">name:</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" className="form-control mb-3" id="name" name='name' placeholder="name" />
      {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : null}


      <label htmlFor="email">email:</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" className="form-control mb-3" id="email" name='email' placeholder="email@example.com" />
      {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}



      <label htmlFor="password">password:</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" className="form-control mb-3" id="password" name='password' placeholder="password" />
      {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}



      <label htmlFor="rePassword">rePassword:</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" className="form-control mb-3" id="rePassword" name='rePassword' placeholder="retype your password" />
      {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : null}



      <label htmlFor="phone">phone:</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" className="form-control mb-3" id="phone" name='phone' placeholder="phone" />
      {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : null}

      {error ? <div className='alert alert-danger'>{error.response.data.message}</div> : null}

      {isLoading ?
        <button disabled type='button' className='btn  px-3 ms-auto d-block'><i className='fas fa-spin fa-spinner'></i></button>
        :
        <button  type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn btn-main text-white px-3 ms-auto d-block'>Register</button>}

    </form>

  </>


}
