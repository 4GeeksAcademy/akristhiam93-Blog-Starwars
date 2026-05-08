import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const Single = () => {

  const { type, id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {

    const apiType =
      type === "characters"
        ? "people"
        : type;

    fetch(`https://www.swapi.tech/api/${apiType}/${id}`)
      .then(res => res.json())
      .then(data => setData(data.result.properties))
      .catch(error => console.log(error));

  }, [type, id]);

  if (!data) {
    return (
      <h1 className="text-center mt-5">
        Loading...
      </h1>
    );
  }
  const fieldsByType = {

    characters: [
      "gender",
      "height",
      "mass",
      "hair_color",
      "eye_color",
      "birth_year"
    ],

    planets: [
      "climate",
      "terrain",
      "population",
      "diameter",
      "gravity",
      "surface_water"
    ],

    vehicles: [
      "model",
      "manufacturer",
      "crew",
      "passengers",
      "vehicle_class",
      "cargo_capacity"
    ]
  };

  const fields = fieldsByType[type] || [];

  const descriptions = {

    characters:
      "A legendary character from the Star Wars universe, known across the galaxy for unforgettable adventures.",

    planets:
      "A mysterious planet filled with history, battles and secrets from the Star Wars galaxy.",

    vehicles:
      "An iconic vehicle used throughout the galaxy during epic Star Wars battles."

  };

  return (
    <div className="container mt-5">

      <div className="card bg-dark text-light border-0 shadow-lg">

        <div className="row g-0">

          <div className="col-md-6">

            <img
              src={`https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`}
              className="img-fluid rounded-start h-100"
              alt={data.name}
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/600x400?text=Star+Wars";
              }}
            />

          </div>

          <div className="col-md-6">

            <div className="card-body">

              <h1 className="card-title text-uppercase">
                {data.name}
              </h1>

              <p className="card-text mt-4">
                {descriptions[type]}
              </p>

            </div>

          </div>

        </div>

      </div>

      <hr className="border-danger my-5" />


      <div className="row text-center text-danger">

        {fields.map((field) => (

          <div className="col-md-2 mb-4" key={field}>

            <h6 className="text-uppercase text-danger">
              {field.replace("_", " ")}
            </h6>

            <p className="text-light">
              {data[field]}
            </p>

          </div>

        ))}
        <div className="text-center mt-5">

          <Link
            to="/"
            className="btn btn-warning px-4 py-2 fw-bold"
          >
            ⬅ Return to the Galaxy
          </Link>

        </div>

      </div>

    </div>
  );
};