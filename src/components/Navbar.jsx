import React, { useContext } from "react";
import { Context } from "../store/";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-light px-3">

      <span className="navbar-brand">Star Wars Blog</span>

      <div className="dropdown">
        <button 
          className="btn btn-warning dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          Favorites ({store.favorites.length})
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
          {store.favorites.length === 0 ? (
            <li className="px-3">No favorites</li>
          ) : (
            store.favorites.map((item, index) => (
              <li 
                key={index} 
                className="d-flex justify-content-between px-3"
              >
                {item}
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => actions.removeFavorite(item)}
                >
                  x
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

    </nav>
  );
};