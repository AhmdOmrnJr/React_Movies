import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import MediaItem from '../MediaItem/MediaItem'

export default function Movies() {

  function getMovies () {
    return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=d710fda48d5a99d1a685e984dd6d2608&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${1}`)
}

  let { data, isLoading } = useQuery('movies', getMovies)
  console.log(data?.data.results);


  return <>
    <div className="row gap-1 d-flex justify-content-between">
      {data?.data.results.map((item) => <MediaItem key={item.id} mediaType={'movie'} item={item}/>)}
    </div>
  </>
}
