import PkmnImage from "./PkmnImage";
import { EvolChainInterface } from "../interfaces";
import React, { useEffect, useState, Fragment } from "react";
import { getTypesFromChain } from "../service";
import { getEvolType, usePrevious } from "../helpers";
import { useHistory } from "react-router";

export interface ChainProps {
  chain: EvolChainInterface;
}

interface evolTypes {
  name: string;
  types: string[][];
}

const Chain: React.FC<ChainProps> = (props) => {
  const first = props.chain.chain;
  const prevFirst = usePrevious(props.chain.chain);

  const [chainTypes, setchainTypes] = useState<evolTypes[] | null>(null);
  const routerHistory = useHistory();
  const chainCols = first.evolves_to[0]?.evolves_to[0]
    ? "grid-cols-3"
    : "grid-cols-2";
  const chainRows =
    first.species.name === "tyrogue"
      ? "grid-rows-3"
      : first.evolves_to[1] || first.evolves_to[0]?.evolves_to[1]
      ? "grid-rows-2"
      : "grid-rows-1";

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
          {!first.evolves_to[0] ? (
            <div className="flex items-center flex-col">
              <h3>{first.species.name} doesnt evolve</h3>
            </div>
          ) : evolType === "Eevee" ? (
            <div className="eevee-evolution">
              <div className="md:row-start-2 col-start-2 flex justify-center ">
                <PkmnImage
                  types={chainTypes}
                  history={routerHistory}
                  pkmn={first}
                />
              </div>
              {first.evolves_to.map((i) => (
                <PkmnImage
                  key={i.species.name}
                  types={chainTypes}
                  history={routerHistory}
                  pkmn={i}
                />
              ))}
            </div>
          ) : (
            <div
              className={`sm:flex flex-col md:grid ${chainRows} ${chainCols} items-center place-items-center `}
            >
              <div className="row-start-1 row-span-full">
                <PkmnImage
                  types={chainTypes}
                  history={routerHistory}
                  pkmn={first}
                  text="born"
                />
              </div>
              {first.evolves_to.map((i) => (
                <Fragment key={i.species.name}>
                  {/* if the first pkmn evolves to two different ones */}
                  {first.evolves_to[1] ? (
                    <>
                      <PkmnImage
                        key={i.species.name}
                        types={chainTypes}
                        history={routerHistory}
                        pkmn={i}
                      />
                      {i.evolves_to[0] ? (
                        <PkmnImage
                          key={i.species.name}
                          types={chainTypes}
                          history={routerHistory}
                          pkmn={i.evolves_to[0]}
                        />
                      ) : null}
                    </>
                  ) : (
                    <>
                      <PkmnImage
                        key={i.species.name}
                        types={chainTypes}
                        history={routerHistory}
                        pkmn={i}
                        classes="row-span-full"
                      />
                      {i.evolves_to[0] ? (
                        <>
                          {i.evolves_to.map((pkmn) => (
                            <PkmnImage
                              key={pkmn.species.name}
                              types={chainTypes}
                              history={routerHistory}
                              pkmn={pkmn}
                            />
                          ))}
                        </>
                      ) : null}
                    </>
                  )}
                </Fragment>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">loading...</div>
      )}
    </>
  );
};

export default Chain;
