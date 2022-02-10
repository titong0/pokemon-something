import { EvolChainInterface } from "./interfaces";

const API = "https://pokeapi.co/api/v2";

export const getPokemon = (pokemon: string): Promise<any> => {
  return fetch(`${API}/pokemon/${pokemon}`);
};

export const getSpecies = (pokemon: string): Promise<any> => {
  return fetch(`${API}/pokemon-species/${pokemon}`).then((res) => {
    return res.json();
  });
};

export const getEvolutionChain = (url: string): Promise<any> => {
  return fetch(`${url}`).then((res) => {
    return res.json();
  });
};

export const getType = (type: string): Promise<any> => {
  return fetch(`${API}/type/${type}`).then((res) => {
    return res.json();
  });
};
export const getTypes = (): Promise<any> => {
  return fetch(`${API}/type`).then((res) => {
    return res.json();
  });
};

export const getTypesFromChain = async (
  chain: EvolChainInterface
): Promise<Map<string, any>> => {
  const types = new Map<string, any>();
  const names = [chain.chain.species.name];

  chain.chain.evolves_to.forEach((i) => {
    names.push(i.species.name);
    i.evolves_to.forEach((i) => names.push(i.species.name));
  });

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const pkmnData = await fetch(`${API}/pokemon/${name}`).then((res) => {
      return res.json();
    });
    types.set(pkmnData.species.name, pkmnData.types);
  }
  return types;
};

export const getPokedex = (): Promise<any> => {
  return fetch(`https://pokeapi.co/api/v2/pokedex/1`).then((res) => {
    return res.json();
  });
};
