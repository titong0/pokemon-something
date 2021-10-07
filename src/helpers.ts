import { EvolChainInterface, evolution_details } from "./interfaces";

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

export const evolutionText = (evolDetails: evolution_details): string => {
  console.log(evolDetails);
  let str = "";
  if (!evolDetails?.trigger) return "xd";
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
      str += "no se por favor ";
      break;

    default:
      str += "galar was a mistake ";
      break;
  }
  if (evolDetails.known_move) {
    str += `while knowning ${evolDetails.known_move.name} `;
  }
  if (evolDetails.known_move_type) {
    str += `while knowing a move of type ${evolDetails.known_move_type.name} `;
  }
  if (evolDetails.held_item) {
    str += `while holding ${evolDetails.held_item.name} `;
  }
  if (evolDetails.min_level) {
    str += `to ${evolDetails.min_level} `;
  }
  if (evolDetails.location) {
    str += `at ${evolDetails.location.name} `;
  }
  if (evolDetails.min_affection) {
    str += `with affection at level ${evolDetails.min_affection} `;
  }
  if (evolDetails.min_beauty) {
    str += `with beauty at level ${evolDetails.min_beauty} `;
  }
  if (evolDetails.min_happiness) {
    str += `with happiness at level ${evolDetails.min_happiness} `;
  }
  if (evolDetails.needs_overworld_rain) {
    str += `while its raining `;
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

  if (evolDetails.relative_physical_stats) {
    let value = evolDetails.relative_physical_stats;
    if (value === 1) {
      str += "while attack is higher than defense";
    }
    if (value === 0) {
      str += "while attack is equal to defense";
    }
    if (value === -1) {
      str += "while attack is lower than defense";
    }
  }

  if (evolDetails.gender) {
    if (evolDetails.gender === 0) {
      str += "(male)";
    } else {
      str += "(female)";
    }
  }

  return str.replaceAll("-", " ");
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
