import React, { createContext, useState, useEffect } from "react";

export const Context = createContext(null);

const injectContext = PassedComponent => {

  const StoreWrapper = props => {

    const [store, setStore] = useState({
      people: [],
      planets: [],
      vehicles: [],
      favorites: JSON.parse(localStorage.getItem("favorites")) || []
    });

    const actions = {

      fetchData: async (endpoint, key) => {
        try {

          const res = await fetch(
            `https://www.swapi.tech/api/${endpoint}`
          );

          const data = await res.json();

          setStore(prev => ({
            ...prev,
            [key]: data.results
          }));

        } catch (error) {

          console.log(`Error loading ${key}`, error);
        }
      },

      getPeople: async () => {
        actions.fetchData("people", "people");
      },

      getPlanets: async () => {
        actions.fetchData("planets", "planets");
      },

      getVehicles: async () => {
        actions.fetchData("vehicles", "vehicles");
      },

      addFavorite: (item) => {

        setStore(prev => {

          const updatedFavorites = prev.favorites.includes(item)
            ? prev.favorites
            : [...prev.favorites, item];

          localStorage.setItem(
            "favorites",
            JSON.stringify(updatedFavorites)
          );

          return {
            ...prev,
            favorites: updatedFavorites
          };
        });
      },

      removeFavorite: (item) => {

        setStore(prev => {

          const updatedFavorites = prev.favorites.filter(
            fav => fav !== item
          );

          localStorage.setItem(
            "favorites",
            JSON.stringify(updatedFavorites)
          );

          return {
            ...prev,
            favorites: updatedFavorites
          };
        });
      }
    };

    useEffect(() => {

      actions.getPeople();
      actions.getPlanets();
      actions.getVehicles();

    }, []);

    return React.createElement(
      Context.Provider,
      { value: { store, actions } },
      React.createElement(PassedComponent, props)
    );
  };

  return StoreWrapper;
};

export default injectContext;