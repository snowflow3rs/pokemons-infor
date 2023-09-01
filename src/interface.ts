export interface ArrPoke {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface PokemonDetail extends ArrPoke {
  abilities?: { abilities: string; name: string }[];
}
