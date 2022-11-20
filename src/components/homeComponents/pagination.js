import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ pages, currentPage }) => {
  
  return (
    <nav>
      <ul className="pagination justify-content-center">
        {
      
          pages && pages.map((page, index) => {
       
            return (
              <li key={index} className={page === currentPage ?  `page-item active`: ''}>
                <Link className="page-link" to={'#'} >
                  {
                    page
                  }
                </Link>
              </li>
            )
          })
        }
       
      </ul>
    </nav >
  );
};

export default Pagination;
