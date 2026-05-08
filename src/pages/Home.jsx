import React, { useContext } from "react";
import { Context } from "../store/";
import Card from "../components/Card";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">

      <h2 className="mt-4">Characters</h2>

      <div className="horizontal-scroll">
        {store.people.map((item) => {
          const id = item.url.split("/").filter(Boolean).pop();

          return (
            <Card
              key={id}
              name={item.name}
              id={id}
              type="characters"
            />
          );
        })}
      </div>

      <h2 className="mt-4">Planets</h2>

      <div className="horizontal-scroll">
        {store.planets.map((item) => {
          const id = item.url.split("/").filter(Boolean).pop();

          return (
            <Card
              key={id}
              name={item.name}
              id={id}
              type="planets"
            />
          );
        })}
      </div>

      <h2 className="mt-4">Vehicles</h2>

      <div className="horizontal-scroll">
        {store.vehicles.map((item) => {
          const id = item.url.split("/").filter(Boolean).pop();

          return (
            <Card
              key={id}
              name={item.name}
              id={id}
              type="vehicles"
            />
          );
        })}
      </div>

    </div>
  );
};