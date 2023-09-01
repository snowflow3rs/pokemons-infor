import React, { useEffect, useState } from "react";
import "./pokemon.css";
import { Detail } from "../App";

interface Props {
  name: string;
  images: string;
  id: number;
  abilities:
    | {
        abilities: string;
        name: string;
      }[]
    | undefined;
  viewDetails: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}
const PokemonList: React.FC<Props> = (props) => {
  const { name, id, images, abilities, viewDetails, setDetail } = props;
  const [selected, setSelected] = useState<boolean>(false);
  useEffect(() => {
    setSelected(id === viewDetails?.id);
  }, [viewDetails]);
  const handelClose = () => {
    setDetail({
      id: 0,
      isOpen: false,
    });
  };

  return (
    <div>
      {selected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={handelClose}>
              X
            </p>
            <div className="detail-info">
              <img src={images} alt="pokemon" className="detail-img" />
              <p className="detail-name"> {name}</p>
            </div>
            <div className="detail-skill">
              <p className="detail-ability"> Abilities: </p>
              <div className="">
                {abilities?.map((ab: any, index) => {
                  return (
                    <div className="" key={index}>
                      <div>{`${index + 1}. ${ab.ability.name}`}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name">{name}</p>
          <img src={images} alt="" />
        </section>
      )}
    </div>
  );
};

export default PokemonList;
