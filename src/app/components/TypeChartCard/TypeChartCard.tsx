import { CardContent, Typography, CardActions, Button } from "@mui/material";
import Card from "@mui/material/Card";
import { getTypeChartUrl } from "./TypeChartData";

interface Props {
  generation: number;
}

export default function TypeChartCard(props: Props) {
  const typeChartUrl = getTypeChartUrl(props.generation);

  return (
    <Card>
      <img src={typeChartUrl} />
    </Card>
  );
}
