"use client";

import { CardContent, CardHeader, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { PokeEvolutionChainSingle } from "../PokeApiInterfaces";
import { capitalise } from "@/app/logic/capitalisation";

interface Props {
  evolutionChain: PokeEvolutionChainSingle[];
}

export default function PokeApiEvolution(props: Props) {
  const evolutionChain = props.evolutionChain;

  return (
    <Card>
      <CardHeader subheader="Evolution Chain"></CardHeader>
      <CardContent>
        <Grid container>
          {evolutionChain.map((singleEvolution: PokeEvolutionChainSingle) => {
            return (
              <Grid md={4} key={"evolution-chain-" + singleEvolution.name}>
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
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}
