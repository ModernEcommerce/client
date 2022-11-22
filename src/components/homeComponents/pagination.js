import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const { pages, currentPage, keyword = "" } = props
  return (
    <nav>
      <ul className="pagination justify-content-center">{
        pages && pages.map((x)=>(
          <li className={`page-item ${x === currentPage ? "active" : ""}`} key={x}>
            <Link className="page-link" to={keyword ?  `/search/${keyword}/page/${x}` : `/page/${x}`}>
              {x}
            </Link>
          </li>
        ))
      }
      </ul>
    </nav>
  );
};

export default Pagination;
