"use client";

import Card from "@mui/material/Card";
import CardTitleBar from "../supporting/CardTitleBar";
import {
  CardContent,
  CardHeader,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { PokeApiDisplayInformation } from "./PokeApiInterfaces";
import { capitalise } from "@/app/logic/capitalisation";
import { pokemonSearch } from "@/app/logic/PokemonApiSearch";
import PokeApiBaseInfo from "./Supporting/PokeApiBaseInfo";
import PokeApiEvolution from "./Supporting/PokeApiEvolution";
import PokeApiStats from "./Supporting/PokeApiStats";
import PokeApiMoves from "./Supporting/PokeApiMoves";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";

interface Props {
  generation: number;
}

export default function PokeApiCard(props: Props) {
  const generation = props.generation;

  const [search, setSearch] = useState("");
  const [displayInfo, setDisplayInfo] =
    useState<PokeApiDisplayInformation | null>(null);

  const [openBaseInfo, setOpenBaseInfo] = useState(false);
  const [openEvolution, setOpenEvolution] = useState(false);
  const [openStats, setOpenStats] = useState(false);
  const [openMoves, setOpenMoves] = useState(false);

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
          <List>
            <CardHeader title={capitalise(displayInfo.name)} />

            <ListItemButton onClick={() => setOpenBaseInfo(!openBaseInfo)}>
              <ListItemText primary="Typings" />
              {openBaseInfo ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openBaseInfo} timeout="auto" unmountOnExit>
              <PokeApiBaseInfo
                defaultImageUrl={displayInfo.defaultImageUrl}
                femaleImageUrl={displayInfo.femaleImageUrl}
                types={displayInfo.types}
                defense={displayInfo.defense}
              />
            </Collapse>
            <ListItemButton onClick={() => setOpenEvolution(!openEvolution)}>
              <ListItemText primary="Evolution Chain" />
              {openEvolution ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openEvolution} timeout="auto" unmountOnExit>
              <PokeApiEvolution evolutionChain={displayInfo.evolutionChain} />
            </Collapse>

            <ListItemButton onClick={() => setOpenStats(!openStats)}>
              <ListItemText primary="Stats" />
              {openStats ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openStats} timeout="auto" unmountOnExit>
              <PokeApiStats name={displayInfo.name} stats={displayInfo.stats} />
            </Collapse>

            <ListItemButton onClick={() => setOpenMoves(!openMoves)}>
              <ListItemText primary="Move Set" />
              {openMoves ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openMoves} timeout="auto" unmountOnExit>
              <PokeApiMoves
                name={displayInfo.name}
                moves={displayInfo.levelMoves}
              />
            </Collapse>
          </List>
        )}
      </CardContent>
    </Card>
  );
}
