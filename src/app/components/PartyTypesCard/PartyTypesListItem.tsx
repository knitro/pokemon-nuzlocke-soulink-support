"use client";

import { ListItem, ListItemText, Switch } from "@mui/material";
import { useState } from "react";
import { PokeType } from "@/app/data/TypeDataInterface";
import TypeChip from "../TypeChip/TypeChip";

interface Props {
  type: PokeType;
  colour: string;
  bothPlayers: boolean;
}

export default function PartyTypesListItem(props: Props) {
  const type = props.type;
  const bothPlayers = props.bothPlayers;
  const colour = props.colour;
  const storageKey = "party-type-";

  const getInitialValues = () => {};

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
