import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export default function MediaItemDetails() {

    let { mediaType, id } = useParams()

    function getDetails () {
        return axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=d710fda48d5a99d1a685e984dd6d2608&language=en-US`)
    }
    
      let { data, isLoading } = useQuery('details', getDetails)
      console.log(data?.data.results);
    

  return (
    <div>MediaItemDetails</div>
  )
}




