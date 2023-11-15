"use client";

import { Divider, List, ListItem, ListItemText, Switch } from "@mui/material";
import Card from "@mui/material/Card";
import { getTypeArray } from "./PartyTypesData";
import { useState } from "react";
import CardTitleBar from "../supporting/CardTitleBar";
import { PokeType, PokeTypeInfo } from "@/app/data/TypeDataInterface";
import { capitalise } from "@/app/logic/capitalisation";
import TypeChip from "../TypeChip/TypeChip";

interface Props {
  generation: number;
  allowDualWater: boolean;
}

interface ListProps {
  type: PokeType;
  colour: string;
  bothPlayers: boolean;
}

export default function PartyTypesCard(props: Props) {
  const typeData = getTypeArray(props.generation); // Expected that data should be captialised already

  return (
    <Card>
      <CardTitleBar title="Party Types" />
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

function PartyTypesListItem(props: ListProps) {
  const type = props.type;
  const bothPlayers = props.bothPlayers;
  const colour = props.colour;

  const [playerOneCheck, setPlayerOneCheck] = useState(false);
  const [playerTwoCheck, setPlayerTwoCheck] = useState(false);
  const [strikeout, setStrikeout] = useState(false);

  const handleTogglePlayerOne = () => {
    const newValue = !playerOneCheck;
    setPlayerOneCheck(newValue);
    checkStrikeout(newValue, playerTwoCheck);
  };

  const handleTogglePlayerTwo = () => {
    const newValue = !playerTwoCheck;
    setPlayerTwoCheck(newValue);
    checkStrikeout(playerOneCheck, newValue);
  };

  const checkStrikeout = (playerOne: boolean, playerTwo: boolean) => {
    if (playerOne || playerTwo) {
      if (bothPlayers) {
        if (playerOne && playerTwo) {
          setStrikeout(true);
        } else {
          setStrikeout(false);
        }
      } else {
        setStrikeout(true);
      }
    } else {
      setStrikeout(false);
    }
  };

  return (
    <ListItem>
      <Switch
        edge="start"
        onChange={handleTogglePlayerOne}
        checked={playerOneCheck}
        disabled={playerTwoCheck && !bothPlayers}
        sx={{
          "&.MuiSwitch-root .Mui-checked": {
            color: colour,
          },
        }}
      />
      <ListItemText sx={{ textAlign: "center" }}>
        <TypeChip type={type} isCrossedOut={strikeout} />
      </ListItemText>
      <Switch
        edge="end"
        onChange={handleTogglePlayerTwo}
        checked={playerTwoCheck}
        disabled={playerOneCheck && !bothPlayers}
        sx={{
          "&.MuiSwitch-root .Mui-checked": {
            color: colour,
          },
        }}
      />
    </ListItem>
  );
}
