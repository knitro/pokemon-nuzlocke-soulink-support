"use client";

import { CardContent, CardHeader, ListItem, ListItemText } from "@mui/material";
import Card from "@mui/material/Card";
import { PokeMove } from "../PokeApiInterfaces";
import { capitalise } from "@/app/logic/capitalisation";

interface Props {
  name: string;
  moves: PokeMove[];
}

export default function PokeApiMoves(props: Props) {
  const pokemonName = props.name;
  const levelMoves = props.moves;
  return (
    <Card>
      <CardContent>
        {levelMoves.map((currentMove: PokeMove) => (
          <ListItem key={pokemonName + "-" + currentMove.name} dense>
            <ListItemText>{capitalise(currentMove.name)}</ListItemText>
            <ListItemText>{currentMove.level}</ListItemText>
          </ListItem>
        ))}
      </CardContent>
    </Card>
  );
}
