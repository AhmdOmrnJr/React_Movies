import React from 'react'
import { Navigate } from 'react-router-dom'

export default function LoggedIn({children}) {

    if (localStorage.getItem("token")) {
        return  <Navigate to={"/home"} />
    }else {
        return children
    }

}
