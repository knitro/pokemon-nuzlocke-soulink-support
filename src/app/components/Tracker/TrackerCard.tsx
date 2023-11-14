"use client";

import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import { ReactNode, useState } from "react";
import { v4 } from "uuid";
import CardTitleBar from "../supporting/CardTitleBar";

interface Props {
  name: string;
}

interface ListProps {
  info: PlayerInfo;
  stepPlayerCount: (id: string, isIncrement: boolean) => void;
  updatePlayerName: (id: string, updatedName: string) => void;
}

interface PlayerInfo {
  id: string;
  name: string;
  count: number;
}

interface TrackerButtonProps {
  icon: ReactNode;
  action: () => void;
}

const defaultPlayers = [
  {
    id: v4(),
    name: "Player 1",
    count: 0,
  },
  {
    id: v4(),
    name: "Player 2",
    count: 0,
  },
];

export default function TrackerCard(props: Props) {
  const name = props.name;

  const [players, setPlayers] = useState<PlayerInfo[]>(defaultPlayers);

  const createPlayer = () => {
    const listCopy = [...players];
    const player: PlayerInfo = {
      id: v4(),
      name: "New Player",
      count: 0,
    };
    listCopy.push(player);
    setPlayers(listCopy);
  };

  const removePlayer = (id: string) => {
    const listCopy = [...players];
    listCopy.filter((currentPlayer: PlayerInfo) => {
      return currentPlayer.id != id;
    });
    setPlayers(listCopy);
  };

  const stepPlayerCount = (id: string, isIncrement: boolean) => {
    const listCopy = [...players];
    const currentPlayer = listCopy.find(
      (loopPlayer: PlayerInfo) => loopPlayer.id == id
    );
    if (currentPlayer) {
      const adjustment = isIncrement ? 1 : -1;
      currentPlayer.count = currentPlayer.count + adjustment;
      if (currentPlayer.count < 0) {
        currentPlayer.count = 0;
      }
      setPlayers(listCopy);
    }
  };

  const updatePlayerName = (id: string, updatedName: string) => {
    const listCopy = [...players];
    const currentPlayer = listCopy.find(
      (loopPlayer: PlayerInfo) => loopPlayer.id == id
    );
    if (currentPlayer) {
      currentPlayer.name = updatedName;
      setPlayers(listCopy);
    }
  };

  return (
    <Card>
      <CardTitleBar title={props.name} />
      {players.map((currentPlayer: PlayerInfo) => (
        <div key={"trackerCard-" + name + "-" + currentPlayer.id}>
          <TrackerListItem
            info={currentPlayer}
            stepPlayerCount={stepPlayerCount}
            updatePlayerName={updatePlayerName}
          />
        </div>
      ))}
    </Card>
  );
}

function TrackerListItem(props: ListProps) {
  const playerInfo = props.info;
  const id = playerInfo.id;
  const playerName = playerInfo.name;
  const count = playerInfo.count;
  const handleSub = () => props.stepPlayerCount(id, false);
  const handleAdd = () => props.stepPlayerCount(id, true);

  const playerAvatar = "https://robohash.org/" + id + ".png";

  return (
    <div className="bg-blue-500/75 rounded-full flex my-2 mx-4">
      <TrackerButton icon={<RemoveIcon />} action={handleSub} />
      <div className="grow place-items-center">
        <div className="place-items-center ">
          <Typography variant="subtitle1" display="block" align="center">
            {playerName}
          </Typography>
        </div>
        <div className="place-items-center">
          <Typography variant="h6" display="block" align="center">
            {count}
          </Typography>
        </div>
      </div>
      <TrackerButton icon={<AddIcon />} action={handleAdd} />
    </div>
  );
}

function TrackerButton(props: TrackerButtonProps) {
  return (
    <IconButton color="primary" onClick={props.action}>
      {props.icon}
    </IconButton>
  );
}
