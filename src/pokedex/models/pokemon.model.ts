import {
  Pokemon as FullPokemon,
  PokemonAbility as FullPokemonAbility,
  PokemonMove as FullPokemonMove,
  PokemonStat as FullPokemonStat,
  PokemonType as FullPokemonType,
} from 'pokenode-ts';
import { NamedAPIResource, apiToNamedAPIResource } from './common.model';

/**
 * Pokemon
 */
export interface Pokemon {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The base experience gained for defeating this Pokémon */
  base_experience: number;
  /** The height of this Pokémon in decimetres */
  height: number;
  /** Set for exactly one Pokémon used as the default for each species */
  is_default: boolean;
  /** Order for sorting. Almost national order, except families are grouped together */
  order: number;
  /** The weight of this Pokémon in hectograms */
  weight: number;
  /** A list of abilities this Pokémon could potentially have */
  abilities: PokemonAbility[];
  /** A list of moves along with learn methods and level details pertaining to specific version groups */
  moves: string[];
  /** A sprite used to depict this Pokémon in the game. Using sprites.other.official-artwork.front_default */
  sprite: string | null | undefined;
  /** The species this Pokémon belongs to */
  species: NamedAPIResource;
  /** A list of base stat values for this Pokémon */
  stats: PokemonStat[];
  /** A list of details showing types this Pokémon has */
  types: PokemonType[];
}

/**
 * Abilities the given pokémon could potentially have
 */
export interface PokemonAbility {
  /** Whether or not this is a hidden ability */
  is_hidden: boolean;
  /** The slot this ability occupies in this Pokémon species */
  slot: number;
  /** The ability the Pokémon may have */
  ability: string;
}

/**
 * Details showing types the given Pokémon has
 */
export interface PokemonType {
  /** The order the Pokémon's types are listed in */
  slot: number;
  /** The type the referenced Pokémon has */
  type: NamedAPIResource;
}

/**
 * Base stat values for the given Pokémon
 */
export interface PokemonStat {
  /** The stat the Pokémon has */
  stat: NamedAPIResource;
  /** The effort points (EV) the Pokémon has in the stat */
  effort: number;
  /** The base value of the stat */
  base_stat: number;
}

export function apiToPokemon(data: FullPokemon | null): Pokemon {
  const converted = {} as Pokemon;
  if (!data) {
    return converted;
  }

  converted.id = data.id;
  converted.name = data.name;
  converted.base_experience = data.base_experience;
  converted.height = data.height;
  converted.is_default = data.is_default;
  converted.order = data.order;
  converted.weight = data.weight;
  converted.abilities = apiToAbilities(data.abilities);
  converted.moves = apiToMoves(data.moves);
  converted.sprite = data.sprites.other?.['official-artwork']?.front_default;
  converted.species = apiToNamedAPIResource(data.species);
  converted.stats = apiToStats(data.stats);
  converted.types = apiToTypes(data.types);

  return converted;
}

export function apiToAbilities(data: FullPokemonAbility[]): PokemonAbility[] {
  const converted: PokemonAbility[] = [];
  if (!data) {
    return converted;
  }

  data.forEach((dataRow: FullPokemonAbility) => {
    converted.push({
      is_hidden: dataRow.is_hidden,
      slot: dataRow.slot,
      ability: dataRow.ability.name
    } as PokemonAbility);
  });

  return converted;
}

export function apiToMoves(data: FullPokemonMove[]): string[] {
  const converted: string[] = [];
  if (!data) {
    return converted;
  }

  data.forEach((dataRow: FullPokemonMove) => {
    converted.push(dataRow.move.name);
  });

  return converted;
}

export function apiToStats(data: FullPokemonStat[]): PokemonStat[] {
  const converted: PokemonStat[] = [];
  if (!data) {
    return converted;
  }

  data.forEach((dataRow: FullPokemonStat) => {
    converted.push({
      stat: apiToNamedAPIResource(dataRow.stat),
      effort: dataRow.effort,
      base_stat: dataRow.base_stat
    } as PokemonStat);
  });

  return converted;
}

export function apiToTypes(data: FullPokemonType[]): PokemonType[] {
  const converted: PokemonType[] = [];
  if (!data) {
    return converted;
  }

  data.forEach((dataRow: FullPokemonType) => {
    converted.push({
      slot: dataRow.slot,
      type: apiToNamedAPIResource(dataRow.type)
    } as PokemonType);
  });

  return converted;
}
