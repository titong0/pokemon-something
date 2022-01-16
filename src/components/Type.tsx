import React, { useState, useEffect } from "react";
import { getType } from "../service";
import { typeClrs, getImgFromUrl } from "../helpers";
import { typeInterface } from "../interfaces";
import { useHistory } from "react-router-dom";

const Type: React.FC<{ match: { params: { type: string } } }> = ({ match }) => {
  const [typeData, setTypeData] = useState<typeInterface | null>(null);
  const history = useHistory();

  useEffect(() => {
    getType(match.params.type).then((i) => setTypeData(i));
  }, [match.params.type]);

  return (
    <div style={{ backgroundColor: typeClrs[match.params.type.toUpperCase()] }}>
      <h2 className="text-4xl text-center capitalize">{match.params.type}</h2>

      {typeData !== null ? (
        <>
          <div className="flex flex-col items-center m-2">
            <div className="damage-relations w-full">
              <div className="m-2 p-2">
                <h3 className="text-white text-l bg-green-600 text-center p-1 my-2 rounded-lg">
                  Double damage to
                </h3>
                {typeData.damage_relations.double_damage_to.map((i) => (
                  <>
                    <a href={`/type/${i.name}`}>
                      <img
                        className="type-img"
                        src={`/assets/Icon_${i.name}.png`}
                        alt={i.name}
                        title={i.name}
                      />
                    </a>
                  </>
                ))}
              </div>
              <div className="m-2 p-2">
                <h3 className="text-white text-l bg-gray-600 text-center p-1 my-2 rounded-lg">
                  half damage from
                </h3>
                {typeData.damage_relations.half_damage_from.map((i) => (
                  <>
                    <a href={`/type/${i.name}`}>
                      <img
                        className="type-img"
                        src={`/assets/Icon_${i.name}.png`}
                        alt={i.name}
                        title={i.name}
                      />
                    </a>
                  </>
                ))}
              </div>
              <div className="m-2 p-2">
                <h3 className="text-white text-l bg-gray-600 text-center p-1 my-2 rounded-lg ">
                  half damage to
                </h3>
                {typeData.damage_relations.half_damage_to.map((i) => (
                  <>
                    <a href={`/type/${i.name}`}>
                      <img
                        className="type-img"
                        src={`/assets/Icon_${i.name}.png`}
                        alt={i.name}
                        title={i.name}
                      />
                    </a>
                  </>
                ))}
              </div>
              <div className="m-2 p-2">
                <h3 className="text-white text-l bg-red-600 text-center p-1 my-2 rounded-lg">
                  Double damage from
                </h3>
                {typeData.damage_relations.double_damage_from.map((i) => (
                  <>
                    <a href={`/type/${i.name}`}>
                      <img
                        className="type-img"
                        src={`/assets/Icon_${i.name}.png`}
                        alt={i.name}
                        title={i.name}
                      />
                    </a>
                  </>
                ))}
              </div>
            </div>
            <div className="pokedex-container m-4 w-full">
              {typeData.pokemon.map((i) => (
                // eslint-disable-next-line
                <object
                  onClick={() => {
                    history.replace(`/pokemon/${i.pokemon.name}`);
                  }}
                  className="p-2 cursor-pointer transform hover:scale-105"
                  data={getImgFromUrl(i.pokemon.url)}
                ></object>
              ))}
            </div>
          </div>
        </>
      ) : (
        <h2 className="text-4xl text-center uppercase">LOADING</h2>
      )}
    </div>
  );
};

export default Type;
