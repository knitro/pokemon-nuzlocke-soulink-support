"use client";

import { ListItem, ListItemText, Switch } from "@mui/material";
import { useState } from "react";
import { PokeType } from "@/app/data/TypeDataInterface";
import TypeChip from "../TypeChip/TypeChip";
import { getFromStorage, saveToStorage } from "@/app/storage/browserStorage";

interface Props {
  type: PokeType;
  colour: string;
  bothPlayers: boolean;
}

interface PartyTypeStorage {
  player1: boolean;
  player2: boolean;
}

export default function PartyTypesListItem(props: Props) {
  const type = props.type;
  const bothPlayers = props.bothPlayers;
  const colour = props.colour;
  const storageKey = "party-type-" + props.type;

  const isStrikeoutCalculation = (playerOne: boolean, playerTwo: boolean) => {
    if (playerOne || playerTwo) {
      if (bothPlayers) {
        if (playerOne && playerTwo) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const getInitialValues = () => {
    const storedData = getFromStorage<PartyTypeStorage>(storageKey);

    const player1Return = storedData === null ? false : storedData.player1;
    const player2Return = storedData === null ? false : storedData.player2;
    const strikeout = isStrikeoutCalculation(player1Return, player2Return);

    return {
      player1: player1Return,
      player2: player2Return,
      strikeOut: strikeout,
    };
  };

  const initialValues = getInitialValues();

  const [playerOneCheck, setPlayerOneCheck] = useState(initialValues.player1);
  const [playerTwoCheck, setPlayerTwoCheck] = useState(initialValues.player2);
  const [strikeout, setStrikeout] = useState(initialValues.strikeOut);

  const handleTogglePlayerOne = () => {
    const newValue = !playerOneCheck;
    setPlayerOneCheck(newValue);
    checkStrikeout(newValue, playerTwoCheck);
    saveToStorage<PartyTypeStorage>(storageKey, {
      player1: newValue,
      player2: playerTwoCheck,
    });
  };

  const handleTogglePlayerTwo = () => {
    const newValue = !playerTwoCheck;
    setPlayerTwoCheck(newValue);
    checkStrikeout(playerOneCheck, newValue);
    saveToStorage<PartyTypeStorage>(storageKey, {
      player1: playerOneCheck,
      player2: newValue,
    });
  };

  const checkStrikeout = (playerOne: boolean, playerTwo: boolean) => {
    const isStrikeout = isStrikeoutCalculation(playerOne, playerTwo);
    if (isStrikeout) {
      setStrikeout(true);
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
