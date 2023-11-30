"use client";

import Card from "@mui/material/Card";
import CardTitleBar from "../supporting/CardTitleBar";
import { CardContent, CardHeader, TextField } from "@mui/material";
import { useState } from "react";
import { PokeApiDisplayInformation } from "./PokeApiInterfaces";
import { capitalise } from "@/app/logic/capitalisation";
import { pokemonSearch } from "@/app/logic/PokemonApiSearch";
import PokeApiBaseInfo from "./Supporting/PokeApiBaseInfo";
import PokeApiEvolution from "./Supporting/PokeApiEvolution";
import PokeApiStats from "./Supporting/PokeApiStats";
import PokeApiMoves from "./Supporting/PokeApiMoves";

interface Props {
  generation: number;
}

export default function PokeApiCard(props: Props) {
  const generation = props.generation;

  const [search, setSearch] = useState("");
  const [displayInfo, setDisplayInfo] =
    useState<PokeApiDisplayInformation | null>(null);

  const onSearchBarChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  const searchPokemon = async () => {
    console.log("Searching with: " + search);

    const searchTerm = search.toLowerCase(); // Search term must be lowercase for API

    const updatedValue = await pokemonSearch(searchTerm, generation);
    if (updatedValue !== null) {
      console.log("Result", updatedValue);
      setDisplayInfo(updatedValue);
    }
  };

  return (
    <Card>
      <CardTitleBar
        title="Pokemon Search"
        subtitle={"Generation " + generation}
      />
      <CardContent>
        <TextField
          value={search}
          fullWidth
          placeholder="Type in a Pokemon. eg. Charmander"
          id="fullWidth"
          onChange={onSearchBarChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchPokemon();
            }
          }}
        />

        {displayInfo && (
          <>
            <CardHeader title={capitalise(displayInfo.name)} />
            <PokeApiBaseInfo
              defaultImageUrl={displayInfo.defaultImageUrl}
              femaleImageUrl={displayInfo.femaleImageUrl}
              types={displayInfo.types}
              defense={displayInfo.defense}
            />
            <PokeApiEvolution evolutionChain={displayInfo.evolutionChain} />
            <PokeApiStats name={displayInfo.name} stats={displayInfo.stats} />
            <PokeApiMoves
              name={displayInfo.name}
              moves={displayInfo.levelMoves}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
