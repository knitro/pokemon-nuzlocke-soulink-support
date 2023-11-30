"use client";

import { CardContent, CardHeader, ListItem, ListItemText } from "@mui/material";
import Card from "@mui/material/Card";
import { PokeStat } from "../PokeApiInterfaces";
import { capitalise } from "@/app/logic/capitalisation";

interface Props {
  name: string;
  stats: PokeStat[];
}

export default function PokeApiStats(props: Props) {
  const pokemonName = props.name;
  const stats = props.stats;

  return (
    <Card>
      <CardContent>
        {stats.map((currentStat: PokeStat) => (
          <ListItem key={pokemonName + "-" + currentStat.name}>
            <ListItemText>{capitalise(currentStat.name)}</ListItemText>
            <ListItemText>{currentStat.value}</ListItemText>
          </ListItem>
        ))}
      </CardContent>
    </Card>
  );
}
