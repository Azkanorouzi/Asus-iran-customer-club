import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ReactElement, ReactNode } from "react";
import CustomDialog from "../dashboard/CustomDialog";

export default function Card({
  title,
  subtitle,
  type,
  id,
  onDelete,
  EditForm,
}: {
  title: string;
  subtitle: string;
  type: "customers" | "transactions";
  id: string;
  onDelete: () => void;
  EditForm: ReactElement;
}) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={`/${type}/${id}`}>
          See More
        </Button>
        <CustomDialog
          message={`Are you sure you want to delete this ${type.slice(0, -1)} ?`}
          btnAgreeTxt="Delete"
          btnDisagreeTxt="Cancel"
          title={`Delete ${id} in ${type}`}
          Trigger={
            <Button variant="outlined" color="error">
              delete
            </Button>
          }
          onSubmit={() => onDelete()}
        ></CustomDialog>

        <CustomDialog
          message={`Edit ${type.slice(0, -1)} `}
          btnAgreeTxt="Ok"
          btnDisagreeTxt="Close"
          title={`Edit ${id} in ${type}`}
          Trigger={
            <Button variant="outlined" color="warning">
              Edit
            </Button>
          }
        >
          {EditForm}
        </CustomDialog>
      </CardActions>
    </Box>
  );
}
