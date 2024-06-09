import React from 'react'
import { Link } from 'react-router-dom'

export default function MediaItem({item, mediatype}) {
  return <>
    <div className=" col-md-2 card p-0 m-1 shadow cardItem">
        <Link className="text-decoration-none text-white position-relative" to={`/mediaitemdetails/${mediatype}/${item.id}`}>
            {item.poster_path ? <img src={'https://image.tmdb.org/t/p/w500' + item.poster_path} alt="poster" className='w-100' /> 
            : 
            <img src={'https://image.tmdb.org/t/p/w500' + item.profile_path} alt="poster" className='w-100'/>}
            <h3 className='h6 p-2'> {item.title} {item.name} </h3>
            {item.vote_average ? <div className='position-absolute top-0 end-0 bg-main '> {item.vote_average.toFixed(1)} </div> : null}
            {item.known_for ? <div className='p-1 '> {item.known_for.map((names) => <span className=' text-muted ' key={names.id}> {names.name} {names.title} ,</span> )} </div> : null}
        </Link>
    </div>

  </>
}
