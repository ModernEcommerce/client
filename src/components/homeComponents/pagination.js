import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => { 
  const { totalPage, currentPage, keyword = "" } = props
  return (
    <nav>
      <ul className="pagination justify-content-center">{
        totalPage && totalPage.map((indexPage)=>(
          <li className={`page-item ${indexPage === currentPage ? "active" : ""}`} key={indexPage}>
            <Link className="page-link" to={keyword ?  `/search/${keyword}/page/${indexPage}` : `/page/${indexPage}`}>
              {indexPage}
            </Link>
          </li>
        ))
      }
      </ul>
    </nav>
  );
};

export default Pagination;
