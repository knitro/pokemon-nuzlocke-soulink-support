import { getPokeTypeInfo } from "@/app/data/TypeData";
import { PokeType } from "@/app/data/TypeDataInterface";
import { capitalise } from "@/app/logic/capitalisation";
import { Chip } from "@mui/material";

interface Props {
  type: PokeType;
  isCrossedOut?: boolean;
}

export default function TypeChip(props: Props) {
  const type = props.type;
  const typeInfo = getPokeTypeInfo(type);
  const colour = typeInfo ? typeInfo.colour : "#68A090";
  const isCrossedOut = props.isCrossedOut === null ? false : props.isCrossedOut;

  const style = isCrossedOut
    ? {
        backgroundColor: "white",
        color: colour,
        borderColor: colour,
      }
    : {
        backgroundColor: colour,
        color: "white",
      };

  return (
    <Chip
      sx={
        isCrossedOut
          ? { textAlign: "center", textDecoration: "line-through" }
          : { textAlign: "center" }
      }
      label={capitalise(type)}
      style={style}
    />
  );
}
