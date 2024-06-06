import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tvshow from './Components/Tvshow/Tvshow';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import LoggedIn from './Components/LoggedIN/LoggedIn';
import AuthContextProvider from './Components/Contexts/AuthContexts';
import MediaItemDetails from './Components/MediaItemDetails/MediaItemDetails';


let queryClint = new QueryClient()

let routers = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      { path: '', element: <Navigate to={'home'} /> },
      { path: 'home', element: <ProtectedRoute><Home /> </ProtectedRoute> },
      { path: "movies", element: <ProtectedRoute><Movies /></ProtectedRoute> },
      { path: "tvshow", element: <ProtectedRoute><Tvshow /></ProtectedRoute> },
      { path: "people", element: <ProtectedRoute><People /></ProtectedRoute> },
      { path: "mediaitemdetails/:mediatype/:id", element: <ProtectedRoute><MediaItemDetails /></ProtectedRoute> },
      { path: "login", element: <LoggedIn><Login /> </LoggedIn> },
      { path: "register", element: <LoggedIn><Register /></LoggedIn> },
      { path: "*", element: <Notfound /> },
    ]
  }
])

function App() {

  return <>

    <QueryClientProvider client={queryClint}>

      <AuthContextProvider>
        <RouterProvider router={routers}>
        </RouterProvider>
        <ReactQueryDevtools />
      </AuthContextProvider>

    </QueryClientProvider>

  </>


}

export default App;
