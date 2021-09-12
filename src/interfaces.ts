import { Url } from "url";

export interface PokemonInterface {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
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
    stat: {
      name: string;
      url: string;
    };
  }[];
  species: {
    name: string;
    url: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
}

export interface typeInterface {
  damage_relations: {
    double_damage_from: {
      name: string;
      url: string;
    }[];

    double_damage_to: {
      name: string;
      url: string;
    }[];

    half_damage_from: {
      name: string;
      url: string;
    }[];

    half_damage_to: {
      name: string;
      url: string;
    }[];

    no_damage_to: {
      name: string;
      url: string;
    }[];
  };
  pokemon: {
    name: string;
    url: string;
  };
}
