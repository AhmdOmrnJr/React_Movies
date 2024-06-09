import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export default function MediaDetails() {

  let { mediatype, id } = useParams()

  function getDetails() {
    return axios.get(`https://api.themoviedb.org/3/${mediatype}/${id}?api_key=d710fda48d5a99d1a685e984dd6d2608&language=en-US`)
  }

  let { data, isLoading } = useQuery('details', getDetails)
  console.log(data?.data);


  return <>

{isLoading ? <div><i className='fas fa-spinner fa-spin vh-100 d-flex justify-content-center align-items-center'></i></div> : null}


    <div className='row  d-flex justify-content-center  align-items-center m-5 '>
      <div className="col-md-3">
        {data?.data.poster_path ? <img src={'https://image.tmdb.org/t/p/w500' + data?.data.poster_path} alt="poster" className='w-100' />
          :
          <img src={'https://image.tmdb.org/t/p/w500' + data?.data.profile_path} alt="poster" className='w-100' />}
      </div>
      <div className="col-md-9">
        <h1> {data?.data.title} {data?.data.name} </h1>
        {data?.data.runtime ? <span> {data?.data.runtime} Min</span> : null}
        <p className='text-muted'>{data?.data.tagline}</p>
        {data?.data.vote_average ? <div className='mb-3'> User score: <span className='text-info border border-2 rounded-circle p-2 m-1 '>{data?.data.vote_average.toFixed(1)}</span>  </div> : null}
        <p>{data?.data.overview} {data?.data.biography}</p>
        {data?.data.known_for ? <div className='p-1 '> {data?.data.known_for.map((names) => <span className=' text-muted ' key={names.id}> {names.name} {names.title} ,</span>)} </div> : null}
      </div>
    </div>
  </>
}




