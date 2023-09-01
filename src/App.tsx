import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";

import { useState } from "react";
import PokemonCollection from "./components/PokemonCollection";
import { ArrPoke } from "./interface";

interface Pokemons {
  name: string;
  url: string;
}

export interface Detail {
  id: number;
  isOpen: boolean;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<ArrPoke[]>([]);
  const [nextURL, setNextURL] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [viewdetails, setViewdetails] = useState<Detail>({
    id: 0,
    isOpen: false,
  });

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      setNextURL(res.data.next);

      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemons((p) => [...p, poke.data]);
      });

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    fetchApi();
  }, []);

  console.log(pokemons);

  const handleLoadMore = () => {
    setLoading(true);

    setTimeout(async () => {
      const res = await axios.get(nextURL);
      setNextURL(res.data.next);

      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemons((p) => [...p, poke.data]);
      });

      setLoading(false);
    }, 1000);
  };
  return (
    <div className="wrapper">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>

        {loading ? (
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        ) : (
          <PokemonCollection
            pokemons={pokemons}
            viewDetails={viewdetails}
            setDetail={setViewdetails}
          />
        )}

        {!viewdetails.isOpen && (
          <div className="btn">
            <button className="button" onClick={handleLoadMore}>
              Load more{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
