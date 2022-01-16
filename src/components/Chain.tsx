import PkmnImage from "./PkmnImage";
import { EvolChainInterface } from "../interfaces";
import React, { useEffect, useState, Fragment } from "react";
import { getTypesFromChain } from "../service";
import { getEvolType, usePrevious, evolTypes } from "../helpers";

export interface ChainProps {
  chain: EvolChainInterface;
}

const Chain: React.FC<ChainProps> = (props) => {
  const first = props.chain.chain;
  const prevFirst = usePrevious(props.chain.chain);

  const [chainTypes, setchainTypes] = useState<Map<string, any> | null>(null);

  useEffect(() => {
    if (first !== prevFirst) {
      getTypesFromChain(props.chain).then((i) => setchainTypes(i));
    }
  });

  const evolType = getEvolType(props.chain);

  return (
    <>
      {chainTypes !== null ? (
        <div className={` my-6 place-items-center`}>
          {/* if the pokemon doesn't evolve */}
          {evolType === evolTypes.NoEvol ? (
            <div className="flex items-center flex-col">
              <h3>{first.species.name} doesnt evolve</h3>
            </div>
          ) : // if the pokmeon is eevee
          evolType === evolTypes.Eevee ? (
            <div className="eevee-evolution">
              <div className="row-start-2 col-start-2 flex justify-center ">
                <PkmnImage pkmn={first} types={chainTypes} />
              </div>
              {first.evolves_to.map((i) => (
                <PkmnImage key={i.species.name} types={chainTypes} pkmn={i} />
              ))}
            </div>
          ) : (
            <>
              {/* if the pokemon DOESNT have branched evolutions */}
              {evolType === evolTypes.Normal ? (
                <div className={`grid auto-cols-fr gap-4 mx-8 sm:items-end`}>
                  {/* first pokemon */}
                  <PkmnImage
                    pkmn={first}
                    types={chainTypes}
                    classes="sm:row-start-1"
                  />
                  {/* second pokemon */}
                  <PkmnImage
                    pkmn={first.evolves_to[0]}
                    types={chainTypes}
                    classes="sm:row-start-1"
                  />
                  {/* third (if its undefined, <PkmnImage /> renders null) */}
                  <PkmnImage
                    pkmn={first.evolves_to[0].evolves_to[0]}
                    types={chainTypes}
                    classes="sm:row-start-1"
                  />
                </div>
              ) : // chains whose first pokemon evolves into two different ones
              // like wurmple
              evolType === evolTypes.BranchedSecond ? (
                <div
                  className={`grid items-center gap-y-8 grid-cols-2 sm:grid-cols-3`}
                >
                  {/* first pokemon */}
                  <PkmnImage
                    pkmn={first}
                    types={chainTypes}
                    classes="col-span-full sm:row-span-full sm:col-auto h-fit "
                  />

                  {first.evolves_to.map((i, index) => (
                    <Fragment key={i.species.name}>
                      {/* second pokemon */}
                      <PkmnImage
                        pkmn={i}
                        types={chainTypes}
                        classes="row-start-2 sm:row-auto sm:col-start-2"
                      />
                      {/* third pokemon */}
                      <PkmnImage
                        pkmn={i.evolves_to[0]}
                        types={chainTypes}
                        classes="row-start-3 sm:row-auto sm:col-start-3"
                      />
                    </Fragment>
                  ))}
                </div>
              ) : evolType === evolTypes.BranchedThird ? (
                <div
                  className={`grid gap-y-8 items-center grid-cols-2 sm:grid-rows-2 sm:grid-cols-3 `}
                >
                  {/* first pokemon in the chain */}
                  <PkmnImage
                    pkmn={first}
                    types={chainTypes}
                    classes="col-span-full sm:row-span-full sm:col-auto h-fit"
                  />
                  {/* second pokemon in the chain */}
                  <PkmnImage
                    pkmn={first.evolves_to[0]}
                    types={chainTypes}
                    classes="col-span-full sm:row-span-full sm:col-auto h-fit"
                  />
                  {/* last two pokemon */}
                  {first.evolves_to[0].evolves_to.map((i, index) => (
                    <PkmnImage pkmn={i} types={chainTypes} />
                  ))}
                </div>
              ) : (
                // tyrogue evolution
                // tyrogue evolves into three different pokemon.
                <div
                  className={`grid grid-cols-3 sm:grid-cols-2 sm:grid-rows-3 items-end sm:items-center`}
                >
                  {/* first pokemon in the chain */}
                  <PkmnImage
                    pkmn={first}
                    types={chainTypes}
                    classes="col-span-full sm:col-auto sm:row-span-full h-fit"
                  />
                  {/* second pokemon in the chain */}
                  {first.evolves_to.map((i) => (
                    <PkmnImage
                      pkmn={i}
                      types={chainTypes}
                      classes="transform scale-75   h-fit"
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="text-center">loading chain types</div>
      )}
    </>
  );
};

export default Chain;
