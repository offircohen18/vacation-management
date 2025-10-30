import { Chip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

export default function StatusChip({ status }) {
  let color = "default";
  let icon = null;

  switch (status) {
    case "Approved":
      color = "success";
      icon = <CheckCircleIcon />;
      break;
    case "Rejected":
      color = "error";
      icon = <CancelIcon />;
      break;
    case "Pending":
      color = "warning";
      icon = <HourglassTopIcon />;
      break;
    default:
      color = "default";
      icon = null;
  }

  return <Chip label={status} color={color} icon={icon} variant="outlined" />;
}
