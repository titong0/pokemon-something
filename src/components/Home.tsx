import { useState, useEffect } from "react";
import { getPokedex } from "../service";
import { getImgFromSpecies } from "../helpers";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [pokedex, setpokedex] = useState<any | null>(null);
  const history = useHistory();
  useEffect(() => {
    getPokedex().then((i) => setpokedex(i));
  }, []);
  return (
    <div className="pokedex-container">
      {pokedex !== null
        ? pokedex.pokemon_entries
            .filter((i: any, index: number) => index < 807)
            .map((i: any, index: number) => {
              return (
                <div
                  className="flex flex-col justify-center items-center m-1 p-2 border-2 transition-colors hover:border-gray-700 h-42"
                  onClick={() => {
                    history.replace(`pokemon/${index + 1}`);
                  }}
                  key={i.pokemon_species.url}
                >
                  <img
                    src={getImgFromSpecies(i.pokemon_species.url)}
                    alt={i.pokemon_species.name}
                    key={i.pokemon_species.url}
                  />
                  <span className="bg-yellow-300 border-2 rounded-md p-1 capitalize">{i.pokemon_species.name}</span>
                </div>
              );
            })
        : "loading pokedex"}
    </div>
  );
};

export default Home;
