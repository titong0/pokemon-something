import { EvolChainInterface } from "./interfaces";

export enum evolType {
  NoEvol = "no evolution",
  Normal = "normal evolution chain",
  Multiple = "multiple evolutions",
  Eevee = "Eevee",
}

export const getEvolType = (evolChain: EvolChainInterface): evolType => {
  if (evolChain.chain.species.name === "eevee") return evolType.Eevee;
  if (evolChain.chain.evolves_to[0] === undefined) {
    return evolType.NoEvol;
  }
  let currentPkmn = evolChain.chain;
  while (true) {
    if (currentPkmn.evolves_to[0] === undefined) {
      break;
    }
    if (currentPkmn.evolves_to[0] && currentPkmn.evolves_to[1]) {
      return evolType.Multiple;
    }
    break;
  }
  return evolType.Normal;
};

export const idFromSpecies = (url: string): number => {
  return parseInt(url.split("/")[6]);
};

const pad = (number: number | string, length: number): string => {
  let str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
};

export const getImgFromSpecies = (url: string): string => {
  return `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pad(
    idFromSpecies(url),
    3
  )}.png`;
};

export const typeClrs: any = {
  NORMAL: "#9098a2",
  FIGHTING: "#cf3f6a",
  FLYING: "#8fa8de",
  POISON: "#ab6ac8",
  GROUND: "#d97846",
  ROCK: "#c8b78b",
  BUG: "#90c02c",
  GHOST: "#5269ac",
  STEEL: "#5a8fa1",
  FIRE: "#fe9c53",
  WATER: "#4d90d6",
  GRASS: "#64bb5c",
  ELECTRIC: "#f4d23b",
  PSYCHIC: "#f97077",
  ICE: "#73cebf",
  DRAGON: "#096dc3",
  DARK: "#5a5365",
  FAIRY: "#ec90e7",
};

// pokemon.species has a color property which gives the name of the color, this object
// has the purpose of taking a color and giving a cooler one
export const betterColors: any = {
  black: "#bbbbbb",
  blue: "#4c9bbb",
  brown: "#c88751",
  gray: "#dddddd",
  green: "#8abd8a",
  pink: "#ed829c",
  purple: "#c7b6d8",
  red: "#f44336",
  white: "#eeeeee",
  yellow: "#e9cb62",
};
