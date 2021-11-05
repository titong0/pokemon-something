import { getPokemon, getEvolutionChain, getSpecies } from "../service";
import { betterColors, getFullImgFromSpecies } from "../helpers";
import { useState, useEffect } from "react";

import {
  PokemonInterface,
  EvolChainInterface,
  SpeciesInterface,
} from "../interfaces";
import { useHistory } from "react-router-dom";
import Types from "./Types";
import Moves from "./Moves";
import Chain from "./Chain";



const Pokemon: React.FC<{ match: any }> = ({ match }) => {
  const History = useHistory();
  const [exists, setexists] = useState(true);
  const [pkmnData, setpkmnData] = useState<PokemonInterface | null>(null);
  const [pkmnSpecies, setpkmnSpecies] = useState<SpeciesInterface | null>(null);
  const [evolChain, setevolChain] = useState<EvolChainInterface | null>(null);
  useEffect(() => {
    getPokemon(match.params.name).then((i) => {
      if (i.status === 404) {
        return setexists(false);
      }
      setexists(true);
      i.json().then((i: PokemonInterface) => {
        document.title = i.species.name;
        setpkmnData(i);
      });
      getSpecies(match.params.name)
        .then((i) => {
          setpkmnSpecies(i);
          return i;
        })
        .then((i: any) =>
          getEvolutionChain(i.evolution_chain.url).then((i) => {
            setevolChain(i);
          })
        );
    });
  }, [match.params.name]);

  return (
    <div>
      {!exists ? (
        <div>
          No pokemon found with this name, redirecting to home...{" "}
          <span className="text-red-600">
            {setTimeout(() => History.replace(""), 3000)} this number shouldn't
            be here I'm not sure what it means
          </span>
        </div>
      ) : (
        <>
          {evolChain !== null && pkmnData !== null ? (
            <>
              {pkmnData.id >= 808 ? (
                "All pokemon whose ID is bigger than 808 are NOT in the API used for this website."
              ) : (
                <div
                  className={`pokemon-container `}
                  style={{
                    backgroundColor:
                      betterColors[pkmnSpecies?.color?.name || ""],
                  }}
                >
                  <h1 className="text-5xl text-center mb-3 text-gray-900 font-semibold capitalize">
                    {pkmnData.species.name}
                  </h1>
                  <h2 className="text-3xl text-center">{`#${pkmnData.id}`}</h2>
                  <div className="flex flex-col items-center justify-center">
                    <img
                      className="w-96"
                      src={getFullImgFromSpecies(pkmnData.species.url)}
                      alt={pkmnData.species.name}
                    />
                    <Types types={pkmnData.types} />
                  </div>
                  <Chain
                    key={evolChain.chain.species.name}
                    chain={evolChain}
                  ></Chain>
                  <Moves pkmnData={pkmnData}></Moves>
                </div>
              )}
            </>
          ) : (
            "loading..."
          )}
        </>
      )}
    </div>
  );
};

export default Pokemon;
