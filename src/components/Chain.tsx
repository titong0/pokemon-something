import { EvolChainInterface } from "../interfaces";
import React, { useState, useEffect } from "react";

import {
  getEvolType,
  getImgFromSpecies,
  idFromSpecies,
  evolutionText,
} from "../helpers";
import { useHistory } from "react-router";

export interface ChainProps {
  chain: EvolChainInterface;
}

const Chain: React.FC<ChainProps> = (props) => {
  const first = props.chain.chain;
  const chainCols = first.evolves_to[0]?.evolves_to[0]
    ? "grid-cols-3"
    : "grid-cols-2";
  const chainRows =
    first.species.name === "tyrogue"
      ? "grid-rows-3"
      : first.evolves_to[1] || first.evolves_to[0]?.evolves_to[1]
      ? "grid-rows-2"
      : "grid-rows-1";
  const routerHistory = useHistory();

  const evolType = getEvolType(props.chain);
  return (
    <div className={`mx-6 place-items-center`}>
      {!first.evolves_to[0] ? (
        <div className="flex items-center flex-col">
          <h3>{first.species.name} doesnt evolve</h3>
        </div>
      ) : evolType === "Eevee" ? (
        <div className="eevee-evolution">
          <div className="md:row-start-2 col-start-2 flex justify-center ">
            <img
              className="self-center"
              src={getImgFromSpecies(first.species.url)}
              onClick={() =>
                routerHistory.push("" + idFromSpecies(first.species.url))
              }
              alt=""
            />
          </div>
          {first.evolves_to.map((i) => (
            <div className="flex justify-center items-center flex-col">
              <span>{evolutionText(i.evolution_details[0])}</span>
              <img
                onClick={() =>
                  routerHistory.push("" + idFromSpecies(i.species.url))
                }
                src={getImgFromSpecies(i.species.url)}
                alt={i.species.name}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`grid ${chainRows} ${chainCols} items-center place-items-center`}
        >
          <div className="row-start-1 row-span-full">
            <PkmnImage evol={first} text="born" />
          </div>
          {first.evolves_to.map((i) => (
            <>
              {/* if the first pkmn evolves to two different ones */}
              {first.evolves_to[1] ? (
                <>
                  <PkmnImage evol={i} />
                  {i.evolves_to[0] ? (
                    <PkmnImage evol={i.evolves_to[0]} />
                  ) : null}
                </>
              ) : (
                <>
                  <PkmnImage evol={i} />
                  {i.evolves_to[0] ? (
                    <>
                      {i.evolves_to.map((evol) => (
                        <PkmnImage evol={evol} />
                      ))}
                    </>
                  ) : null}
                </>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
};

interface imgProps {
  evol: any;
  text?: string;
}
const PkmnImage: React.FC<imgProps> = (props: any) => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <span className="max-w-xs text-center">
        {props.text ?? evolutionText(props.evol.evolution_details[0])}
      </span>
      <img src={getImgFromSpecies(props.evol.species.url)} alt="" />
      <span className="bg-gray-300 p-1 border-2 rounded-md">
        {props.evol.species.name}
      </span>
    </div>
  );
};

export default Chain;
