const API = "https://pokeapi.co/api/v2";

export const getPokemon = (pokemon: string): Promise<any> => {
  return fetch(`${API}/pokemon/${pokemon}`).then((res) => {
    return res.json();
  });
};
export const getType = (type: string): Promise<any> => {
  return fetch(`${API}/type/${type}`).then((res) => {
    return res.json();
  });
};

export const typesImgs: any = {
  NORMAL:
    "https://cdn2.bulbagarden.net/upload/thumb/9/95/Normal_icon_SwSh.png/64px-Normal_icon_SwSh.png",
  FIGHTING:
    "https://cdn2.bulbagarden.net/upload/thumb/3/3b/Fighting_icon_SwSh.png/64px-Fighting_icon_SwSh.png",
  FLYING:
    "https://cdn2.bulbagarden.net/upload/thumb/b/b5/Flying_icon_SwSh.png/64px-Flying_icon_SwSh.png",
  POISON:
    "https://cdn2.bulbagarden.net/upload/thumb/8/8d/Poison_icon_SwSh.png/64px-Poison_icon_SwSh.png",
  GROUND:
    "https://cdn2.bulbagarden.net/upload/thumb/2/27/Ground_icon_SwSh.png/64px-Ground_icon_SwSh.png",
  ROCK: "https://cdn2.bulbagarden.net/upload/thumb/1/11/Rock_icon_SwSh.png/64px-Rock_icon_SwSh.png",
  BUG: "https://cdn2.bulbagarden.net/upload/thumb/9/9c/Bug_icon_SwSh.png/64px-Bug_icon_SwSh.png",
  GHOST:
    "https://cdn2.bulbagarden.net/upload/thumb/0/01/Ghost_icon_SwSh.png/64px-Ghost_icon_SwSh.png",
  STEEL:
    "https://cdn2.bulbagarden.net/upload/thumb/0/09/Steel_icon_SwSh.png/64px-Steel_icon_SwSh.png",
  FIRE: "https://cdn2.bulbagarden.net/upload/thumb/a/ab/Fire_icon_SwSh.png/64px-Fire_icon_SwSh.png",
  WATER:
    "https://cdn2.bulbagarden.net/upload/thumb/8/80/Water_icon_SwSh.png/64px-Water_icon_SwSh.png",
  GRASS:
    "https://cdn2.bulbagarden.net/upload/thumb/a/a8/Grass_icon_SwSh.png/64px-Grass_icon_SwSh.png",
  ELECTRIC:
    "https://cdn2.bulbagarden.net/upload/thumb/7/7b/Electric_icon_SwSh.png/64px-Electric_icon_SwSh.png",
  PSYCHIC:
    "https://cdn2.bulbagarden.net/upload/thumb/7/73/Psychic_icon_SwSh.png/64px-Psychic_icon_SwSh.png",
  ICE: "https://cdn2.bulbagarden.net/upload/thumb/1/15/Ice_icon_SwSh.png/64px-Ice_icon_SwSh.png",
  DRAGON:
    "https://cdn2.bulbagarden.net/upload/thumb/7/70/Dragon_icon_SwSh.png/64px-Dragon_icon_SwSh.png",
  DARK: "https://cdn2.bulbagarden.net/upload/thumb/d/d5/Dark_icon_SwSh.png/64px-Dark_icon_SwSh.png",
  FAIRY:
    "https://cdn2.bulbagarden.net/upload/thumb/c/c6/Fairy_icon_SwSh.png/64px-Fairy_icon_SwSh.png",
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
