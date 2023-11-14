import { Grid } from "@mui/material";
import TypeChartCard from "./components/TypeChartCard/TypeChartCard";
import NavBar from "./components/NavBar/NavBar";
import LevelCapCard from "./components/LevelCapsCard/LevelCapsCard";
import DeathTrackerCard from "./components/Tracker/DeathTrackerCard";
import EncounterFailTracker from "./components/Tracker/EncounterFailTrackerCard";
import PartyTypesCard from "./components/PartyTypesCard/PartyTypesCard";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Grid container spacing={2}>
        <Grid container item xs={4}>
          <TypeChartCard generation={3} />
          <Grid item xs={6}>
            <EncounterFailTracker />
          </Grid>
          <Grid item xs={6}>
            <DeathTrackerCard />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <LevelCapCard gameName="emerald" />
        </Grid>
        <Grid item xs={2}>
          <LevelCapCard gameName="emerald" />
        </Grid>
        <Grid item xs={2}>
          <PartyTypesCard generation={3} allowDualWater />
        </Grid>
      </Grid>
    </div>
  );
}
