"use client";

import Card from "@mui/material/Card";
import CardTitleBar from "../supporting/CardTitleBar";
import {
  CardContent,
  CardHeader,
  Grid,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import {
  PokeApiDisplayInformation,
  PokeEvolutionChainSingle,
  PokeMove,
  PokeStat,
} from "./PokeApiInterfaces";
import { capitalise } from "@/app/logic/capitalisation";
import { pokemonSearch } from "@/app/logic/PokemonApiSearch";
import TypeChip from "../TypeChip/TypeChip";

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
        <Card>
          <CardHeader
            subheader={displayInfo ? capitalise(displayInfo.name) : "Base Info"}
          ></CardHeader>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {displayInfo && displayInfo.defaultImageUrl !== null && (
                  <img src={displayInfo.defaultImageUrl} />
                )}
                {displayInfo && displayInfo.femaleImageUrl !== null && (
                  <img src={displayInfo.femaleImageUrl} />
                )}
                {displayInfo?.types.map((type) => (
                  <TypeChip key={"pokemon_type_" + type} type={type} />
                ))}
              </Grid>
              <Grid item xs={8}>
                <Stack direction="row" spacing={1}>
                  4x
                  {displayInfo?.defense.defense400.map((type) => (
                    <TypeChip key={"pokemon_defense400_" + type} type={type} />
                  ))}
                </Stack>
                <Stack direction="row" spacing={1}>
                  2x
                  {displayInfo?.defense.defense200.map((type) => (
                    <TypeChip key={"pokemon_defense200_" + type} type={type} />
                  ))}
                </Stack>
                <Stack direction="row" spacing={1}>
                  0.5x
                  {displayInfo?.defense.defense50.map((type) => (
                    <TypeChip key={"pokemon_defense50_" + type} type={type} />
                  ))}
                </Stack>
                <Stack direction="row" spacing={1}>
                  0.25x
                  {displayInfo?.defense.defense25.map((type) => (
                    <TypeChip key={"pokemon_defense25_" + type} type={type} />
                  ))}
                </Stack>
                <Stack direction="row" spacing={1}>
                  0x
                  {displayInfo?.defense.defense0.map((type) => (
                    <TypeChip key={"pokemon_defense0_" + type} type={type} />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardHeader subheader="Evolution Chain"></CardHeader>
          <CardContent>
            <Grid container>
              {displayInfo?.evolutionChain.map(
                (singleEvolution: PokeEvolutionChainSingle) => {
                  return (
                    <Grid
                      md={4}
                      key={"evolution-chain-" + singleEvolution.name}
                    >
                      <Card>
                        <img src={singleEvolution.imageUrl} />
                        <b>{capitalise(singleEvolution.name)}</b>
                        <br />
                        {singleEvolution.previousEvoName !== "" && (
                          <>
                            <i>
                              {"Previous Evo: " +
                                capitalise(singleEvolution.previousEvoName)}
                            </i>
                            <br />
                          </>
                        )}
                        {singleEvolution.condition}
                      </Card>
                    </Grid>
                  );
                }
              )}
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardHeader subheader="Stats"></CardHeader>
          <CardContent>
            {displayInfo?.stats.map((currentStat: PokeStat) => (
              <ListItem key={displayInfo.name + "-" + currentStat.name}>
                <ListItemText>{currentStat.name}</ListItemText>
                <ListItemText>{currentStat.value}</ListItemText>
              </ListItem>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader subheader="Move Set"></CardHeader>
        </Card>
        <CardContent>
          {displayInfo?.levelMoves.map((currentMove: PokeMove) => (
            <ListItem key={displayInfo.name + "-" + currentMove.name} dense>
              <ListItemText>{currentMove.name}</ListItemText>
              <ListItemText>{currentMove.level}</ListItemText>
            </ListItem>
          ))}
        </CardContent>
      </CardContent>
    </Card>
  );
}
