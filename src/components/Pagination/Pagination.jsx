import React from 'react'
import style from './pagination.module.css'

const Pagination = ({currentPage, totalPages, onPageChange}) => {
  return (
    <div className={style.pagination}>
      <button 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
