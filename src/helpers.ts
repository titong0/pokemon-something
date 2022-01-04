import { useEffect, useRef } from "react";
import { EvolChainInterface, evolution_details } from "./interfaces";

export enum evolTypes {
  NoEvol,
  Normal,
  BranchedSecond,
  BranchedThird,
  Eevee,
}

export const getEvolType = (evolChain: EvolChainInterface): evolTypes => {
  const first = evolChain.chain;
  if (first.species.name === "eevee") return evolTypes.Eevee;
  if (first.evolves_to[0] === undefined) {
    return evolTypes.NoEvol;
  }
  if (first.evolves_to[0] && first.evolves_to[1]) {
    return evolTypes.BranchedSecond;
  }
  if (first.evolves_to[0].evolves_to[1]) {
    return evolTypes.BranchedThird;
  }
  return evolTypes.Normal;
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
  return `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/${pad(
    idFromSpecies(url),
    3
  )}.png`;
};
export const getFullImgFromSpecies = (url: string): string => {
  return `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pad(
    idFromSpecies(url),
    3
  )}.png`;
};

export const evolutionText = (evolDetails: evolution_details): string => {
  let str = "";
  if (!evolDetails?.trigger) return "";
  const { name } = evolDetails.trigger;

  switch (name) {
    case "level-up":
      str += "level up ";
      break;

    case "trade":
      str += "trade ";
      break;
    case "use-item":
      str += "use " + evolDetails.item?.name;
      break;
    case "shed":
      return "level up to 20 with empty poke ball and space in party";
    default:
      str += "galar was a mistake ";
      break;
  }
  if (evolDetails.known_move) {
    str += ` knowning ${evolDetails.known_move.name} `;
  }
  if (evolDetails.known_move_type) {
    str += ` knowing a move of type ${evolDetails.known_move_type.name} `;
  }
  if (evolDetails.held_item) {
    str += ` holding ${evolDetails.held_item.name} `;
  }
  if (evolDetails.min_level) {
    str += `to ${evolDetails.min_level} `;
  }
  if (evolDetails.location) {
    str += `at ${evolDetails.location.name} `;
  }
  if (evolDetails.min_affection) {
    str += `with ${evolDetails.min_affection} affection `;
  }
  if (evolDetails.min_beauty) {
    str += `with ${evolDetails.min_beauty} beauty `;
  }
  if (evolDetails.min_happiness) {
    str += `with ${evolDetails.min_happiness} happiness `;
  }
  if (evolDetails.needs_overworld_rain) {
    str += ` its raining `;
  }
  if (evolDetails.party_species) {
    str += `with ${evolDetails.party_species.name} in party`;
  }
  if (evolDetails.party_type) {
    str += `with pokemon of type ${evolDetails.party_type.name} in party`;
  }

  if (evolDetails.time_of_day) {
    str += `at ${evolDetails.time_of_day}time`;
  }
  if (evolDetails.trade_species) {
    str += `trade for ${evolDetails.trade_species.name}`;
  }
  if (evolDetails.turn_upside_down) {
    str += `while switch is upside down`;
  }

  if (evolDetails.relative_physical_stats) {
    let value = evolDetails.relative_physical_stats;
    if (value === 1) {
      str += "with attack higher than defense";
    }
    if (value === 0) {
      str += "with attack equal to defense";
    }
    if (value === -1) {
      str += "with attack lower than defense";
    }
  }

  if (evolDetails.gender) {
    if (evolDetails.gender === 1) {
      str += "(female)";
    } else {
      str += "(male)";
    }
  }
  return str.replaceAll("-", " ");
};

export const getGridVals = (chain: EvolChainInterface): string => {
  const first = chain.chain;
  let sm = "grid-cols-2";
  let md = "";

  if (first.evolves_to[0]?.evolves_to[0]) {
    sm += "grid-rows-3 ";
    md += "md:grid-cols-3 ";
  }
  if (first.species.name === "tyrogue") {
    sm += "grid-cols-3";
    md += "md:grid-rows-3";
  } else if (first.evolves_to[1] || first.evolves_to[0]?.evolves_to[1]) {
    sm += "grid-cols-2";
    md += "md:grid-rows-2";
  }
  console.log(sm, md);
  return `${sm} ${md}`;
};

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
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
  red: "#cc483c",
  white: "#eeeeee",
  yellow: "#e9cb62",
};
