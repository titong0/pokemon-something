import PkmnImage from "./PkmnImage";
import { EvolChainInterface } from "../interfaces";
import React, { useEffect, useState, Fragment } from "react";
import { getTypesFromChain } from "../service";
import { getEvolType, usePrevious, getGridVals, evolTypes } from "../helpers";

export interface ChainProps {
  chain: EvolChainInterface;
}

const Chain: React.FC<ChainProps> = (props) => {
  const first = props.chain.chain;
  const prevFirst = usePrevious(props.chain.chain);

  const [chainTypes, setchainTypes] = useState<Map<string, any> | null>(null);
  const gridLayout = getGridVals(props.chain);

  useEffect(() => {
    if (first !== prevFirst) {
      getTypesFromChain(props.chain).then((i) => setchainTypes(i));
    }
  });

  const evolType = getEvolType(props.chain);
  return (
    <>
      {chainTypes !== null ? (  
        <div className={`m-6 place-items-center`}>
          {evolType === evolTypes.NoEvol ? (
            <div className="flex items-center flex-col">
              <h3>{first.species.name} doesnt evolve</h3>
            </div>
          ) : evolType === evolTypes.Eevee ? (
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
              {evolType === evolTypes.Normal ? (
                <div className={`grid items-center ${gridLayout}`}>
                  {/* first pokemon */}
                  <PkmnImage pkmn={first} types={chainTypes} />
                  {/* second pokemon */}
                  <PkmnImage pkmn={first.evolves_to[0]} types={chainTypes} />
                  {/* third (if it exists, if its undefined <PkmnImage /> renders null) */}
                  <PkmnImage
                    pkmn={first.evolves_to[0].evolves_to[0]}
                    types={chainTypes}
                  />
                </div>
              ) : evolType === evolTypes.BranchedSecond ? (
                <div className={`grid items-center ${gridLayout}`}>
                  {/* first pokemon */}
                  <PkmnImage
                    pkmn={first}
                    types={chainTypes}
                    classes="col-span-full md:row-span-full md:col-auto h-fit"
                  />

                  {first.evolves_to.map((i, index) => (
                    <Fragment key={i.species.name}>
                      {/* second pokemon */}
                      <PkmnImage pkmn={i} types={chainTypes} />
                      {/* third pokemon */}
                      <PkmnImage pkmn={i.evolves_to[0]} types={chainTypes} />
                    </Fragment>
                  ))}
                </div>
              ) : evolType === evolTypes.BranchedThird ? (
                <div className={`grid items-center ${gridLayout}`}>
                  {/* first pokemon in the chain */}
                  <PkmnImage
                    pkmn={first}
                    types={chainTypes}
                    classes="col-span-full md:row-span-full md:col-auto h-fit"
                  />
                  {/* second pokemon in the chain */}
                  <PkmnImage
                    pkmn={first.evolves_to[0]}
                    types={chainTypes}
                    classes="col-span-full md:row-span-full md:col-auto h-fit"
                  />
                  {/* last two pokemon */}
                  {first.evolves_to[0].evolves_to.map((i, index) => (
                    <PkmnImage pkmn={i} types={chainTypes} />
                  ))}
                </div>
              ) : null}
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
