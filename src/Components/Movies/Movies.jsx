import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import MediaItem from '../MediaItem/MediaItem'
import { Link } from 'react-router-dom';

export default function Movies() {

  const [currentPage, setCurrentPage] = useState(1);
  const [jumpPage, setJumpPage] = useState('');

  const getMovies = async (page) => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=d710fda48d5a99d1a685e984dd6d2608&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`)
    return data
  }

  const { data, isLoading, isError } = useQuery(['Movies', currentPage], () => getMovies(currentPage), {
    keepPreviousData: true,
  });

  const totalPages = data?.total_pages;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const maxPageItems = 10;
    const halfPageItems = Math.floor(maxPageItems / 2);
    let startPage = Math.max(1, currentPage - halfPageItems);
    let endPage = Math.min(totalPages, currentPage + halfPageItems);

    if (currentPage <= halfPageItems) {
      endPage = Math.min(totalPages, maxPageItems);
    } else if (currentPage > totalPages - halfPageItems) {
      startPage = Math.max(1, totalPages - maxPageItems + 1);
    }

    let pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); handlePageChange(i); }}>{i}</a>
        </li>
      );
    }
    return pages;
  };

  const handleJumpPageChange = (e) => {
    setJumpPage(e.target.value);
  };

  const handleJumpPageSubmit = (e) => {
    e.preventDefault();
    const page = Number(jumpPage);
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      setJumpPage('');
    } else {
      alert(`Please enter a number between 1 and ${totalPages}`);
    }
  };


  return <>

{isLoading ? <div><i className='fas fa-spinner fa-spin vh-100 d-flex justify-content-center align-items-center'></i></div> : null}


    <div className="row gap-1 d-flex justify-content-between">
      {data?.results.map((item) => <MediaItem key={item.id} mediatype={'movie'} item={item} />)}
    </div>

    <nav aria-label="Page navigation example" className='my-3'>
      <ul className="pagination justify-content-center ">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <Link className="page-link" href="#" onClick={(e) => { e.preventDefault(); if (currentPage > 1) handlePageChange(currentPage - 1); }}>Previous</Link>
        </li>
          {  renderPagination() }
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <Link className="page-link" href="#" onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) handlePageChange(currentPage + 1); }}>Next</Link>
        </li>
      </ul>
    </nav>

    <form onSubmit={handleJumpPageSubmit} className=" my-3 d-flex justify-content-center">
      <button type="submit" className="btn btn-primary mx-2">Jump to page : </button>
        <input 
          type="number"
          className="form-control w-25 "
          placeholder={`Enter page number from 1 to ${totalPages}`}
          value={jumpPage}
          onChange={handleJumpPageChange}
          
        />
      </form>

  </>
}
