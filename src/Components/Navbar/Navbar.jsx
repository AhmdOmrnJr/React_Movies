import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../Contexts/AuthContexts';

export default function Navbar() {

  let { isUserLoggedIn, setIsUserLoggedIn } = useContext(authContext)
  let navigate = useNavigate()

  function logOut() {
    setIsUserLoggedIn(false)
    localStorage.removeItem("token")
    navigate("/login")
  }

  return <>

    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent ">
      <div className="container-fluid ">
        <Link className="navbar-brand text-light" to='/'><h3>Noxe</h3></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">

          {isUserLoggedIn ?
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to='movies'>Movies</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" to='Tvshow'>Tvshow</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to='people'>People</Link>
              </li>

            </ul>
            : null}

          <ul className="navbar-nav mb-2 mb-lg-0 ">

            <li className="nav-item d-flex align-items-center">
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-soundcloud'></i>
            </li>


            {isUserLoggedIn ?
              <li className="nav-item">
                <span onClick={logOut} className="nav-link cursor-pointer">Logout</span>
              </li> : <>
                <li className="nav-item">
                  <Link className="nav-link active" to='register'>Register</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" to='login'>Login</Link>
                </li>
              </>
            }

          </ul>
        </div>
      </div>
    </nav>
  </>

}
