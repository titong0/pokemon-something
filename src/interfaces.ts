interface genericObj {
  name: string;
  url: string;
}

export interface PokemonInterface {
  abilities: {
    ability: genericObj;
  }[];
  moves: {
    move: genericObj;
  }[];
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
      dream_world: {
        front_default: string;
      };
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: genericObj;
  }[];
  species: genericObj;
  types: {
    slot: number;
    type: genericObj;
  }[];
}

export interface typeInterface {
  damage_relations: {
    double_damage_from: genericObj[];

    double_damage_to: genericObj[];

    half_damage_from: genericObj[];

    half_damage_to: genericObj[];

    no_damage_to: genericObj[];
  };
  pokemon: genericObj;
}

export interface SpeciesInterface {
  color: genericObj;
  evolution_chain: string;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
}

export interface evolution_details {
  item: genericObj | null;
  gender: number;
  held_item: genericObj | null;
  known_move: genericObj | null;
  known_move_type: null;
  location: genericObj | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  party_species: genericObj;
  party_type: genericObj | null;
  relative_physical_stats: number;
  time_of_day: string;
  trade_species: genericObj;
  trigger: genericObj;
  turn_upside_down: boolean;
}

export interface EvolChainInterface {
  chain: {
    evolves_to: {
      evolution_details: evolution_details[];

      evolves_to: {
        evolution_details: evolution_details[];
        species: genericObj;
      }[];

      species: genericObj;
    }[];
    species: genericObj;
  };
  id: number;
}
