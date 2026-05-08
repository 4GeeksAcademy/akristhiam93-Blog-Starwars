import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/";

const Card = ({ name, id, type }) => {
  const { actions } = useContext(Context);

  return (
    <div
      className="card mx-2"
      style={{ width: "18rem", minWidth: "18rem" }}
    >

      <img
        src={`https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`}
        className="card-img-top"
        alt={name}
        style={{ height: "300px", objectFit: "cover" }}
        onError={(e) => {
          e.target.onerror = null;

          e.target.src =
            "https://placehold.co/600x400?text=Star+Wars";
        }}
      />

      <div className="card-body">

        <h5 className="card-title">{name}</h5>

        <p className="card-text">
          Some quick example text to build on the card title
          and make up the bulk of the card’s content.
        </p>

        <div className="d-flex justify-content-between">

          <Link
            to={`/single/${type}/${id}`}
            className="btn btn-primary"
          >
            Learn more
          </Link>

          <button
            className="btn btn-outline-warning"
            onClick={() => actions.addFavorite(name)}
          >
            ⭐ Favorite
          </button>

        </div>

      </div>
    </div>
  );
};

export default Card;