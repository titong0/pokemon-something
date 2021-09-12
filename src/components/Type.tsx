import React, { useState, useEffect } from "react";
import { typesImgs, getType, typeClrs } from "../service";
import { typeInterface } from "../interfaces";

const Type: React.FC<{ match: { params: { type: string } } }> = ({ match }) => {
  const [typeData, setTypeData] = useState<typeInterface | null>(null);
  useEffect(() => {
    getType(match.params.type).then((i) => setTypeData(i));
  }, [match.params.type]);
  return (
    <div
      style={{ backgroundColor: typeClrs[match.params.type.toUpperCase()] }}
      className="grid"
    >
      <h2 className="text-4xl text-center capitalize">{match.params.type}</h2>

      {typeData !== null ? (
        <>
          <div className="m-2">
            <div className="damage-relations">
              <div className="m-2 p-2">
                <h3 className="text-white text-l">Double damage to</h3>
                {typeData.damage_relations.double_damage_to.map((i) => (
                  <>
                    <a href={`/type/${i.name}`}>
                      <img
                        className="type-img"
                        src={typesImgs[i.name.toUpperCase()]}
                        alt={i.name}
                        title={i.name}
                      />
                    </a>
                  </>
                ))}
              </div>
              <div className="m-2 p-2">
                <h3 className="text-white text-l">Double damage from</h3>
                {typeData.damage_relations.double_damage_from.map((i) => (
                  <>
                    <a href={`/type/${i.name}`}>
                      <img
                        className="type-img"
                        src={typesImgs[i.name.toUpperCase()]}
                        alt={i.name}
                        title={i.name}
                      />
                    </a>
                  </>
                ))}
              </div>
              <div className="m-2 p-2">
                <h3 className="text-white text-l">half damage from</h3>
                {typeData.damage_relations.half_damage_from.map((i) => (
                  <>
                    <a href={`/type/${i.name}`}>
                      <img
                        className="type-img"
                        src={typesImgs[i.name.toUpperCase()]}
                        alt={i.name}
                        title={i.name}
                      />
                    </a>
                  </>
                ))}
              </div>
              <div className="m-2 p-2">
                <h3 className="text-white text-l ">half damage to</h3>
                {typeData.damage_relations.half_damage_to.map((i) => (
                  <>
                    <a href={`/type/${i.name}`}>
                      <img
                        className="type-img"
                        src={typesImgs[i.name.toUpperCase()]}
                        alt={i.name}
                        title={i.name}
                      />
                    </a>
                  </>
                ))}
              </div>
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
