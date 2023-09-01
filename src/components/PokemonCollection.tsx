import React from "react";
import { ArrPoke, PokemonDetail } from "../interface";
import PokemonList from "./PokemonList";
import "./pokemon.css";
import { Detail } from "../App";
interface Props {
  pokemons: PokemonDetail[];

  viewDetails: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}
const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons, viewDetails, setDetail } = props;

  const handleChoose = (id: number) => {
    if (!viewDetails.isOpen) {
      setDetail({
        id: id,
        isOpen: true,
      });
    }
  };
  return (
    <>
      <section
        className={
          viewDetails.isOpen
            ? "collection-container-active"
            : "collection-container"
        }
      >
        {viewDetails.isOpen ? (
          <div className="overlay"></div>
        ) : (
          <div className=""></div>
        )}
        {pokemons.map((pokemon, index) => {
          return (
            <div
              className="wrapper"
              key={index}
              onClick={() => handleChoose(pokemon.id)}
            >
              <PokemonList
                abilities={pokemon.abilities}
                viewDetails={viewDetails}
                setDetail={setDetail}
                name={pokemon.name}
                id={pokemon.id}
                images={pokemon.sprites.front_default}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default PokemonCollection;
