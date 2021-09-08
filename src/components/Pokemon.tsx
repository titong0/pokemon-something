import { getPokemon, typesURLs } from "../service";
import { useState, useEffect } from "react";

const Pokemon: React.FC<{ match: any }> = ({ match }) => {
  const [pkmnData, setpkmnData] = useState<any>(null);
  const [showShiny, setshowShiny] = useState(false);
  useEffect(() => {
    getPokemon(match.params.name).then((i) => {
      setpkmnData(i);
    });
  }, [match.params.name]);

  return (
    <div>
      {pkmnData !== null ? (
        <div className="pokemon-container">
          <h1 className="text-6xl text-center mb-3 capitalize text-gray-900 font-semibold">
            {pkmnData.species.name}
          </h1>
          <div className="grid sm:grid-cols-5 grid-cols-2 gap-2 items-start ">
            <div className="col-span-2">
              <div className="pokemon-image">
                <img
                  className="w-48"
                  src={pkmnData.sprites.front_shiny}
                  style={{ display: `${!showShiny ? "none" : "block"}` }}
                  alt=""
                />
                <img
                  className="w-48"
                  src={pkmnData.sprites.front_default}
                  style={{ display: `${!showShiny ? "none" : "block"}` }}
                  alt=""
                />
                <img
                  className="w-48"
                  src={pkmnData.sprites.other["official-artwork"].front_default}
                  style={{ display: `${showShiny ? "none" : "block"}` }}
                  alt=""
                />

                <button
                  className={`border-4 rounded-lg bg-red-500 hover:bg-red-700 h-10 w-14`}
                  onClick={() => setshowShiny(!showShiny)}
                ></button>
              </div>
              <span className="flex row-start-2 col-start-1 mt-1 ">
                <a href={`/type/${pkmnData.types[0].type.name}`}>
                  <img
                    src={typesURLs[pkmnData.types[0].type.name.toUpperCase()]}
                    alt={pkmnData.types[0].type.name}
                  />
                </a>
                <a href={`/type/${pkmnData.types[1]?.type.name}`}>
                  <img
                    src={typesURLs[pkmnData.types[1]?.type.name.toUpperCase()]}
                    alt={pkmnData.types[1]?.type.name}
                  />
                </a>
              </span>
            </div>
            <div className="moves">
              <h2 className="text-4xl uppercase text-black ">moves</h2>
              <ul>
                {pkmnData.moves
                  .filter(
                    (move: any) =>
                      move.version_group_details[0].level_learned_at !== 0
                  )
                  .map((move: any, index: number) => {
                    // if (index > 5) return;
                    return (
                      <li>
                        <a
                          href={`/move/${move.move.name}`}
                          key={move.move.name}
                          className="capitalize ml-1"
                        >
                          {move.move.name.replaceAll("-", " ")}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default Pokemon;
