import { Grid } from "@mui/material";
import TypeChartCard from "./components/TypeChartCard/TypeChartCard";
import NavBar from "./components/NavBar/NavBar";
import LevelCapCard from "./components/LevelCapsCard/LevelCapsCard";
import DeathTrackerCard from "./components/Tracker/DeathTrackerCard";
import EncounterFailTracker from "./components/Tracker/EncounterFailTrackerCard";
import PartyTypesCard from "./components/PartyTypesCard/PartyTypesCard";
import PokeApiCard from "./components/PokeApiCard/PokeApiCard";

export default function Home() {
  const generation = 4;
  const gameName = "platinum";

  return (
    <div>
      <NavBar />
      <Grid container spacing={2}>
        <Grid container item xs={4}>
          <TypeChartCard generation={generation} />
          <Grid item xs={6}>
            <EncounterFailTracker />
          </Grid>
          <Grid item xs={6}>
            <DeathTrackerCard />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <PokeApiCard generation={generation} />
        </Grid>
        <Grid item xs={2}>
          <LevelCapCard gameName={gameName} />
        </Grid>
        <Grid item xs={2}>
          <PartyTypesCard generation={generation} allowDualWater />
        </Grid>
      </Grid>
    </div>
  );
}
