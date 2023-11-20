"use client";

import { Divider, List } from "@mui/material";
import Card from "@mui/material/Card";
import { getTypeArray } from "./PartyTypesData";
import CardTitleBar from "../supporting/CardTitleBar";
import { PokeType, PokeTypeInfo } from "@/app/data/TypeDataInterface";
import PartyTypesListItem from "./PartyTypesListItem";

interface Props {
  generation: number;
  allowDualWater: boolean;
}

export default function PartyTypesCard(props: Props) {
  const typeData = getTypeArray(props.generation); // Expected that data should be captialised already

  return (
    <Card>
      <CardTitleBar
        title="Party Types"
        subtitle={"Generation " + props.generation}
      />
      <List dense>
        {typeData.map((typeInfo: PokeTypeInfo, index: number) => (
          <div key={"partyTypeList-index" + index}>
            <PartyTypesListItem
              type={typeInfo.type}
              colour={typeInfo.colour}
              bothPlayers={
                typeInfo.type == PokeType.WATER && props.allowDualWater
                  ? true
                  : false
              }
            />
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </Card>
  );
}
