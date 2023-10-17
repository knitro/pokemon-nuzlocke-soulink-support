import { CardHeader, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Props {
  title: string;
  subtitle?: string;
}

export default function CardTitleBar(props: Props) {
  const title = props.title;
  const subtitle = props.subtitle;

  return (
    <CardHeader
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={title}
      subheader={subtitle}
    />
  );
}
