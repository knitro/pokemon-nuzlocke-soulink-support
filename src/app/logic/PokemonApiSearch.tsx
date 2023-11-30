import {
  ChainLink,
  EvolutionChain,
  EvolutionDetail,
  Pokemon,
  PokemonClient,
  PokemonMove,
  PokemonMoveVersion,
  PokemonSpecies,
  PokemonStat,
} from "pokenode-ts";
import {
  PokeApiDisplayInformation,
  PokeEvolutionChainSingle,
  PokeMove,
  PokeStat,
} from "../components/PokeApiCard/PokeApiInterfaces";
import getDefending, { getTypeBasedOnGeneration } from "./DefenderCalculator";
import axios from "axios";
import { capitalise } from "./capitalisation";
import { getGenerationFromGames } from "./gamesAndGeneration";

export async function pokemonSearch(
  searchTerm: string,
  generation: number
): Promise<PokeApiDisplayInformation | null> {
  const api = new PokemonClient(); // create a PokemonClient
  const pokemonData = await api
    .getPokemonByName(searchTerm)
    .then((data: Pokemon) => data)
    .catch((error) => {
      console.error(error);
      return null;
    });
  if (pokemonData == null) {
    return null;
  }

  const types = getTypeBasedOnGeneration(
    pokemonData.types,
    pokemonData.past_types,
    generation
  );
  const defense = getDefending(types, generation);

  const evolutionData = await getEvolutionChain(api, pokemonData.name);
  if (evolutionData === null) {
    return null;
  }

  const stats = extractStats(pokemonData);
  const moves = extractLevelMoves(pokemonData.moves, generation);

  const updatedValue: PokeApiDisplayInformation = {
    name: pokemonData.name,
    defaultImageUrl: pokemonData.sprites.front_default,
    femaleImageUrl: pokemonData.sprites.front_female,
    types: types,
    defense: defense,
    evolutionChain: evolutionData,
    stats: stats,
    levelMoves: moves,
  };
  return updatedValue;
}

async function getEvolutionChain(api: PokemonClient, pokemonName: string) {
  const evolutionUrl = await api
    .getPokemonSpeciesByName(pokemonName)
    .then((data: PokemonSpecies) => data.evolution_chain.url)
    .catch((error) => {
      console.error(error);
      return null;
    });

  if (evolutionUrl == null) {
    return null;
  }

  const evolutionData = await axios.get(evolutionUrl).then(async (response) => {
    const fetchedData: EvolutionChain = response.data;

    const returnArray: PokeEvolutionChainSingle[] = [];

    const addToArray = async (chain: ChainLink, prevEvoName: string) => {
      const pokemonName = chain.species.name;
      const evolutionDetails: { details: string; genderFemaleEvo: boolean } =
        chain.evolution_details.length === 0
          ? { details: "Base", genderFemaleEvo: false }
          : getEvolutionDetails(chain.evolution_details);
      const pokemonImage = await api
        .getPokemonByName(pokemonName)
        .then((data: Pokemon) =>
          evolutionDetails.genderFemaleEvo
            ? data.sprites.front_female
            : data.sprites.front_default
        )
        .catch((error) => {
          console.error(error);
          return null;
        });

      const item: PokeEvolutionChainSingle = {
        name: pokemonName,
        imageUrl: pokemonImage == null ? "" : pokemonImage,
        condition: evolutionDetails.details,
        previousEvoName: prevEvoName,
      };
      returnArray.push(item);
      for (const innerChain of chain.evolves_to) {
        await addToArray(innerChain, pokemonName);
      }
      return true;
    };
    await addToArray(fetchedData.chain, "");

    return returnArray;
  });

  return evolutionData;
}

function getEvolutionDetails(details: EvolutionDetail[]): {
  details: string;
  genderFemaleEvo: boolean;
} {
  let detailsArray = [] as string[];
  let genderFemaleEvo = false;

  details.forEach((detail) => {
    if (detail.gender !== null) {
      detailsArray.push("Gender: " + (detail.gender == 2 ? "Male" : "Female"));
    }
    if (detail.held_item !== null) {
      detailsArray.push("Held Item: " + capitalise(detail.held_item.name));
    }
    if (detail.item !== null) {
      detailsArray.push("Item: " + capitalise(detail.item.name));
    }
    if (detail.known_move !== null) {
      detailsArray.push("Known Move: " + capitalise(detail.known_move.name));
    }
    if (detail.location !== null) {
      detailsArray.push("Location: " + capitalise(detail.location.name));
    }
    if (detail.min_affection !== null) {
      detailsArray.push("Min Affection: " + detail.min_affection);
    }
    if (detail.min_beauty !== null) {
      detailsArray.push("Min Beauty: " + detail.min_beauty);
    }
    if (detail.min_happiness !== null) {
      detailsArray.push("Min Happiness: " + detail.min_happiness);
    }
    if (detail.min_level !== null) {
      detailsArray.push("Min Level: " + detail.min_level);
    }
    if (detail.needs_overworld_rain !== null && detail.needs_overworld_rain) {
      detailsArray.push("Needs overworld rain");
    }

    if (detail.party_species !== null) {
      detailsArray.push(
        "Pokemon in party: " + capitalise(detail.party_species.name)
      );
    }
    if (detail.party_type !== null) {
      detailsArray.push("Type in party: " + capitalise(detail.party_type.name));
    }
    if (detail.relative_physical_stats !== null) {
      // 1 means Attack > Defense. 0 means Attack = Defense. -1 means Attack < Defense.
      if (detail.relative_physical_stats == 1) {
        // Attack > Defense
        detailsArray.push("Attack > Defense");
      } else if (detail.relative_physical_stats == -1) {
        // Attack < Defense
        detailsArray.push("Attack < Defense");
      } else {
        // Attack = Defense
        detailsArray.push("Attack = Defense");
      }
    }
    if (detail.time_of_day !== null && detail.time_of_day !== "") {
      detailsArray.push("Time of Day: " + capitalise(detail.time_of_day));
    }
    if (detail.trade_species !== null) {
      detailsArray.push("Trade");
    }
    if (detail.turn_upside_down !== null && detail.turn_upside_down) {
      detailsArray.push("Turn upside down as level up");
    }
  });

  return {
    details: detailsArray.join(", "),
    genderFemaleEvo: genderFemaleEvo,
  };
}

function extractStats(pokemonData: Pokemon): PokeStat[] {
  // Add base stats
  const returnArray: PokeStat[] = pokemonData.stats.map(
    (pokemonStat: PokemonStat) => {
      const returnStat: PokeStat = {
        name: pokemonStat.stat.name,
        value: pokemonStat.base_stat,
        ev: pokemonStat.effort,
      };
      return returnStat;
    }
  );

  // Add misc stats
  const height: PokeStat = {
    name: "height",
    value: pokemonData.height,
  };
  returnArray.push(height);
  const weight: PokeStat = {
    name: "weight",
    value: pokemonData.weight,
  };
  returnArray.push(weight);

  return returnArray;
}

function extractLevelMoves(
  pokemonMoves: PokemonMove[],
  generation: number
): PokeMove[] {
  const returnArray: PokeMove[] = [];

  pokemonMoves.forEach((move: PokemonMove) => {
    const relatedMoveVersion = move.version_group_details.find(
      (versionDetail: PokemonMoveVersion) => {
        const gameVersion = versionDetail.version_group.name;
        const currentGeneration = getGenerationFromGames(gameVersion);
        return currentGeneration == generation;
      }
    );

    if (relatedMoveVersion === undefined) {
      return;
    }

    const returnItem: PokeMove = {
      name: move.move.name,
      level: relatedMoveVersion.level_learned_at,
    };
    returnArray.push(returnItem);
  });

  return returnArray;
}
