import Card from "@mui/material/Card";
import { getTypeChartUrl } from "./TypeChartData";
import CardTitleBar from "../supporting/CardTitleBar";

interface Props {
  generation: number;
}

export default function TypeChartCard(props: Props) {
  const generation = props.generation;
  const typeChartUrl = getTypeChartUrl(generation);

  return (
    <Card>
      <CardTitleBar title="Type Chart" subtitle={"Generation " + generation} />
      <img src={typeChartUrl} />
    </Card>
  );
}
