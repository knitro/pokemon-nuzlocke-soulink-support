"use client";

import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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
  edge: "start" | "end";
}

export default function TrackerCard(props: Props) {
  const [players, setPlayers] = useState<PlayerInfo[]>([]);

  const createPlayer = () => {
    const player: PlayerInfo = {
      id: v4(),
      name: "New Player",
      count: 0,
    };
    players.push(player);
    setPlayers(players);
  };

  const removePlayer = (id: string) => {
    players.filter((currentPlayer: PlayerInfo) => {
      return currentPlayer.id != id;
    });
    setPlayers(players);
  };

  const stepPlayerCount = (id: string, isIncrement: boolean) => {
    const currentPlayer = players.find(
      (loopPlayer: PlayerInfo) => loopPlayer.id == id
    );
    if (currentPlayer) {
      const adjustment = isIncrement ? 1 : -1;
      currentPlayer.count = currentPlayer.count + adjustment;
      setPlayers(players);
    }
  };

  const updatePlayerName = (id: string, updatedName: string) => {
    const currentPlayer = players.find(
      (loopPlayer: PlayerInfo) => loopPlayer.id == id
    );
    if (currentPlayer) {
      currentPlayer.name = updatedName;
      setPlayers(players);
    }
  };

  return (
    <Card>
      <CardTitleBar title={props.name} />
      <List>
        {players.map((currentPlayer: PlayerInfo) => (
          <div>
            <TrackerListItem
              info={currentPlayer}
              stepPlayerCount={stepPlayerCount}
              updatePlayerName={updatePlayerName}
            />
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </Card>
  );
}

function TrackerListItem(props: ListProps) {
  const playerInfo = props.info;
  const id = playerInfo.id;
  const playerName = playerInfo.name;
  const handleSub = () => props.stepPlayerCount(id, false);
  const handleAdd = () => props.stepPlayerCount(id, true);

  return (
    <ListItem
      // key={value}
      // secondaryAction={
      //   <TrackerButton icon={<RemoveIcon />} action={handleSub} edge="start" />
      // }
      disablePadding
    >
      <TrackerButton icon={<RemoveIcon />} action={handleSub} edge="start" />
      <ListItemText primary={playerName} />
      <TrackerButton icon={<AddIcon />} action={handleAdd} edge="end" />
      {/* <ListItemButton>
        <ListItemAvatar>
          <Avatar
            alt={`Avatar n°${value + 1}`}
            src={`/static/images/avatar/${value + 1}.jpg`}
          />
        </ListItemAvatar>
        <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
      </ListItemButton> */}
    </ListItem>
  );
}

function TrackerButton(props: TrackerButtonProps) {
  return (
    <IconButton color="primary" onClick={props.action} edge={props.edge}>
      {props.icon}
    </IconButton>
  );
}
