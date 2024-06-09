import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import MediaItem from '../MediaItem/MediaItem';

export default function People() {

  
  function getPeople () {
    return axios.get(`https://api.themoviedb.org/3/person/popular?api_key=d710fda48d5a99d1a685e984dd6d2608&language=en-US&page=${1}`)
}

  let { data, isLoading } = useQuery('people', getPeople)
  console.log(data?.data.results);


  return <>
    <div className="row gap-1 d-flex justify-content-between">
    {data?.data.results.map((item) => <MediaItem key={item.id} mediatype={'person'} item={item}/>)}
    </div>
  </>

}
