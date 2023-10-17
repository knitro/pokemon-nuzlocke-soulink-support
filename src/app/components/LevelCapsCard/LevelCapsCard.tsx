"use client";

import {
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Card from "@mui/material/Card";
import { getLevelCapData } from "./LevelCapsData";
import { useState } from "react";
import CardTitleBar from "../supporting/CardTitleBar";

interface Props {
  gameName: string;
}

interface ListProps {
  name: string;
  type: "gym" | "elite four" | "champion";
  levelCap: number;
}

export default function LevelCapCard(props: Props) {
  const levelCapData = getLevelCapData(props.gameName);
  const gymBattles = levelCapData.slice(0, 8);
  const eliteFour = levelCapData.slice(8, 12);
  const championLevelCap = levelCapData[12];

  const gameNameCapitalised =
    "Pokemon " +
    props.gameName.charAt(0).toUpperCase() +
    props.gameName.slice(1);

  return (
    <Card>
      <CardTitleBar title="Level Caps" subtitle={gameNameCapitalised} />
      <List>
        {gymBattles.map((levelCap: number, index: number) => (
          <div>
            <LevelCapListItem
              name={"Gym " + (index + 1)}
              type="gym"
              levelCap={levelCap}
            />
            <Divider variant="inset" component="li" />
          </div>
        ))}
        {eliteFour.map((levelCap: number, index: number) => (
          <div>
            <LevelCapListItem
              name={"Elite Four #" + (index + 1)}
              type="elite four"
              levelCap={levelCap}
            />
            <Divider variant="inset" component="li" />
          </div>
        ))}
        <LevelCapListItem
          name="Champion"
          type="champion"
          levelCap={championLevelCap}
        />
      </List>
    </Card>
  );
}

function LevelCapListItem(props: ListProps) {
  const name = props.name;
  const type = props.type;
  const levelCap = props.levelCap;

  const [strikeout, setStrikeout] = useState(false);
  const handleToggle = () => setStrikeout(!strikeout);

  return (
    <ListItem>
      <ListItemIcon>
        {type == "gym" ? (
          <FitnessCenterIcon />
        ) : type == "elite four" ? (
          <MilitaryTechIcon />
        ) : type == "champion" ? (
          <EmojiEventsIcon />
        ) : (
          <FitnessCenterIcon />
        )}
      </ListItemIcon>
      <ListItemText sx={strikeout ? { textDecoration: "line-through" } : {}}>
        {name}
      </ListItemText>
      <ListItemText></ListItemText>
      <FormControlLabel
        labelPlacement="start"
        control={
          <Switch edge="end" onChange={handleToggle} checked={strikeout} />
        }
        label={
          <ListItemText
            sx={strikeout ? { textDecoration: "line-through" } : {}}
          >
            {"Lvl " + levelCap}
          </ListItemText>
        }
      ></FormControlLabel>
    </ListItem>
  );
}
