import { Grid } from "@mui/material";
import TypeChartCard from "./components/TypeChartCard/TypeChartCard";
import NavBar from "./components/NavBar/NavBar";
import LevelCapCard from "./components/LevelCapsCard/LevelCapsCard";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TypeChartCard generation={3} />
        </Grid>
        <Grid item xs={4}>
          <LevelCapCard gameName="emerald" />
        </Grid>
      </Grid>
    </div>
  );
}
