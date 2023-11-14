import { getPokeTypeInfo } from "@/app/data/TypeData";
import { PokeType } from "@/app/data/TypeDataInterface";
import { capitalise } from "@/app/logic/capitalisation";
import { Chip } from "@mui/material";

interface Props {
  type: PokeType;
}

export default function TypeChip(props: Props) {
  const type = props.type;
  const typeInfo = getPokeTypeInfo(type);
  const colour = typeInfo ? typeInfo.colour : "#68A090";

  return (
    <Chip
      label={capitalise(type)}
      style={{ backgroundColor: colour, color: "white" }}
    />
  );
}
