"use client";

import { CardContent, CardHeader, Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import TypeChip from "../../TypeChip/TypeChip";
import { PokeType } from "@/app/data/TypeDataInterface";
import { PokeDefense } from "../PokeApiInterfaces";

interface Props {
  defaultImageUrl: string | null;
  femaleImageUrl: string | null;
  types: PokeType[];
  defense: PokeDefense;
}

export default function PokeApiBaseInfo(props: Props) {
  const defaultImageUrl = props.defaultImageUrl;
  const femaleImageUrl = props.femaleImageUrl;
  const types = props.types;
  const defense = props.defense;

  return (
    <Card>
      <CardHeader subheader="Base Info"></CardHeader>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {defaultImageUrl !== null && <img src={defaultImageUrl} />}
            {femaleImageUrl !== null && <img src={femaleImageUrl} />}
            {types.map((type: PokeType) => (
              <TypeChip key={"pokemon_type_" + type} type={type} />
            ))}
          </Grid>
          <Grid item xs={8}>
            <Stack direction="row" spacing={1}>
              4x
              {defense.defense400.map((type) => (
                <TypeChip key={"pokemon_defense400_" + type} type={type} />
              ))}
            </Stack>
            <Stack direction="row" spacing={1}>
              2x
              {defense.defense200.map((type) => (
                <TypeChip key={"pokemon_defense200_" + type} type={type} />
              ))}
            </Stack>
            <Stack direction="row" spacing={1}>
              0.5x
              {defense.defense50.map((type) => (
                <TypeChip key={"pokemon_defense50_" + type} type={type} />
              ))}
            </Stack>
            <Stack direction="row" spacing={1}>
              0.25x
              {defense.defense25.map((type) => (
                <TypeChip key={"pokemon_defense25_" + type} type={type} />
              ))}
            </Stack>
            <Stack direction="row" spacing={1}>
              0x
              {defense.defense0.map((type) => (
                <TypeChip key={"pokemon_defense0_" + type} type={type} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
