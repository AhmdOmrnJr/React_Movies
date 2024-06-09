import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MediaItem from '../MediaItem/MediaItem';
import { useQuery } from 'react-query';




export default function Home() {

  const getTrending = async (mediaitem) => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaitem}/week?api_key=d710fda48d5a99d1a685e984dd6d2608`);
    return data.results;
  };

  const { data: movies, isLoading: moviesLoading, isError: moviesError } = useQuery(['trendingMovies'], () => getTrending('movie'));
  const { data: tv, isLoading: tvLoading, isError: tvError } = useQuery(['trendingTv'], () => getTrending('tv'));
  const { data: people, isLoading: peopleLoading, isError: peopleError } = useQuery(['trendingPeople'], () => getTrending('person'));

  if (moviesLoading || tvLoading || peopleLoading) return <> <div><i className='vh-100 d-flex justify-content-center align-items-center fas fa-spinner fa-spin'></i></div> </>;
  if (moviesError || tvError || peopleError) return <div>Error loading data</div>;

  return (
    <>
      <div className="row py-3 justify-content-between">
        <div className='col-md-3 d-flex align-items-center'>
          <div>
            <div className='brdr w-25 my-3'></div>
            <h2 className='h3'>Trending <br />Movies <br />To Watch Now ...</h2>
            <p className='text-muted'>Most watched movies by week</p>
            <div className='brdr w-100 mt-3'></div>
          </div>
        </div>
        {movies.slice(0, 9).map((item, index) => <MediaItem mediatype={'movie'} key={index} item={item} />)}
      </div>

      <div className="row py-3 justify-content-between">
        <div className='col-md-3 d-flex align-items-center'>
          <div>
            <div className='brdr w-25 my-3'></div>
            <h2 className='h3'>Trending <br />TV Shows <br />To Watch Now ...</h2>
            <p className='text-muted'>Most watched TV shows by week</p>
            <div className='brdr w-100 mt-3'></div>
          </div>
        </div>
        {tv.slice(0, 9).map((item, index) => <MediaItem mediatype={'tv'} key={index} item={item} />)}
      </div>

      <div className="row py-3 justify-content-between">
        <div className='col-md-3 d-flex align-items-center'>
          <div>
            <div className='brdr w-25 my-3'></div>
            <h2 className='h3'>Trending <br />People <br />To Follow Now ...</h2>
            <p className='text-muted'>Most followed people by week</p>
            <div className='brdr w-100 mt-3'></div>
          </div>
        </div>
        {people.slice(0, 9).map((item, index) => <MediaItem mediatype={'person'} key={index} item={item} />)}
      </div>
    </>
  );
}






// export default function Home() {

//   const [movies, setMovies] = useState([])
//   const [tv, setTv] = useState([])
//   const [people, setPeople] = useState([])

//   async function getTrending(mediaitem, callback) {
//     let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaitem}/week?api_key=d710fda48d5a99d1a685e984dd6d2608`)
//     console.log(data.results);
//     callback(data.results);
//   }

//   useEffect(() => {
//     getTrending('movie', setMovies)
//     getTrending('tv', setTv)
//     getTrending('person', setPeople)
//   }, [])

//   return <>


//     <div className="row py-3 justify-content-between" >

//       <div className='col-md-3 d-flex align-items-center  '>
//         <div>
//           <div className='brdr w-25 my-3'></div>
//           <h2 className='h3'>Trending <br />Movies <br />To Watch Now ...</h2>
//           <p className='text-muted'>Most watched movies by week</p>
//           <div className='brdr w-100 mt-3'></div>
//         </div>
//       </div>
//       {movies.slice(0, 9).map((item) => <MediaItem key={item.id} item={item} />)}
//     </div>

//     <div className="row py-3 justify-content-between" >

//       <div className='col-md-3 d-flex align-items-center  '>
//         <div>
//           <div className='brdr w-25 my-3'></div>
//           <h2 className='h3'>Trending <br />Movies <br />To Watch Now ...</h2>
//           <p className='text-muted'>Most watched movies by week</p>
//           <div className='brdr w-100 mt-3'></div>
//         </div>
//       </div>
//       {tv.slice(0, 9).map((item) => <MediaItem key={item.id} item={item} />)}
//     </div>
    
//     <div className="row py-3 justify-content-between" >

//       <div className='col-md-3 d-flex align-items-center  '>
//         <div>
//           <div className='brdr w-25 my-3'></div>
//           <h2 className='h3'>Trending <br />Movies <br />To Watch Now ...</h2>
//           <p className='text-muted'>Most watched movies by week</p>
//           <div className='brdr w-100 mt-3'></div>
//         </div>
//       </div>
//       {people.slice(0, 9).map((item) => <MediaItem key={item.id} item={item} />)}
//     </div>


//   </>

// }





{/* <div className="row py-3 gap-1 justify-content-between" >
  
  <div className="col-md-4 py-3 ">
  <div>
  <div className='brdr w-25 my-3'></div>
  <h2 className='h3'>Trending <br />Movies <br />To Watch Now ...</h2>
  <p className='text-muted'>Most watched movies by week</p>
  <div className='brdr w-100 mt-3'></div>
  </div>
  </div>
  <Movies />
  </div> */}
  
  
  
  
  
  {/* <div className="row py-3 gap-1 justify-content-between" >
    
    <div className="col-md-4 py-3 ">
    <div>
    <div className='brdr w-25 my-3'></div>
    <h2 className='h3'>Trending <br />Movies <br />To Watch Now ...</h2>
    <p className='text-muted'>Most watched movies by week</p>
    <div className='brdr w-100 mt-3'></div>
    </div>
    <Movies />
    </div>
    
    
    
    
    </div>
    
    <div className="row py-3" >
    
    <div className="col-md-4 py-3 ">
    <div>
    <div className='brdr w-25 my-3'></div>
    <h2 className='h3'>Trending <br />Tv <br />To Watch Now ...</h2>
    <p className='text-muted'>Most watched Tv Series by week</p>
    <div className='brdr w-100 mt-3'></div>
    </div>
    </div>
    
    <div className=" ">
    <Tvshow />
    </div>
    
    </div>
    
    <div className="row py-3" >
    
    <div className="col-md-4 py-3 ">
    <div>
    <div className='brdr w-25 my-3'></div>
    <h2 className='h3'>Trending <br />Actors <br />To Watch Now ...</h2>
    <p className='text-muted'>Most watched Actors by week</p>
    <div className='brdr w-100 mt-3'></div>
    </div>
    </div>
    
    <div className=" ">
    <People />
    </div>
    
    </div> */}
    
    
    
