import { getPokemon, getEvolutionChain, getSpecies } from "../service";
import { betterColors, getFullImgFromSpecies } from "../helpers";
import { useState, useEffect } from "react";
import {
  PokemonInterface,
  EvolChainInterface,
  SpeciesInterface,
} from "../interfaces";

import Types from "./Types";
import Moves from "./Moves";
import Chain from "./Chain";

const Pokemon: React.FC<{ match: any }> = ({ match }) => {
  const [pkmnData, setpkmnData] = useState<PokemonInterface | null>(null);
  const [pkmnSpecies, setpkmnSpecies] = useState<SpeciesInterface | null>(null);
  const [evolChain, setevolChain] = useState<EvolChainInterface | null>(null);

  useEffect(() => {
    setpkmnData(null);
    getPokemon(match.params.name).then((i: PokemonInterface) => {
      document.title = i.species.name;
      setpkmnData(i);
    });
    getSpecies(match.params.name)
      .then((i) => {
        setpkmnSpecies(i);
        return i;
      })
      .then((i) => {
        getEvolutionChain(i.evolution_chain.url).then((i) => setevolChain(i));
      });
  }, [match.params.name]);

  return (
    <div>
      {pkmnData !== null ? (
        <div
          className={`pokemon-container `}
          style={{
            backgroundColor: betterColors[pkmnSpecies?.color?.name || ""],
          }}
        >
          <h1 className="text-5xl text-center mb-3 text-gray-900 font-semibold uppercase">
            {pkmnData.species.name}
          </h1>
          <h2 className="text-3xl text-center">#{pkmnData.id}</h2>
          <div className="flex flex-col items-center justify-center">
            <img
              className="w-96"
              src={getFullImgFromSpecies(pkmnData.species.url)}
              alt={pkmnData.species.name}
            />
            <Types pkmnData={pkmnData} />
          </div>
          {evolChain ? <Chain chain={evolChain}></Chain> : null}
          <Moves pkmnData={pkmnData}></Moves>
        </div>
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default Pokemon;
