import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grid: {
    minWidth: "70%",
    margin: "auto",
  },
}));

export default function OneRead({ data, setData, onDelete }) {
  const classes = useStyles();
  return (
    <Grid sm={3} item className={classes.grid}>
      <Paper>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2" gutterBottom>
            {data.AccountName}
          </Typography>
          <IconButton
            component={Link}
            to="/detail"
            onClick={() => setData(data)}
          >
            <VisibilityIcon />
          </IconButton>
        </Box>
        <Typography variant="caption">{data.BillingPeriod}</Typography>
        <Typography variant="caption">{data.BillingStarted}</Typography>

        <Typography variant="caption">{data.NextBillingDate}</Typography>
        <Typography variant="caption">{data.IdentityNumber}</Typography>

        <Button
          component={Link}
          to="/update"
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => setData(data)}
        >
          edit
        </Button>
        <Button
          startIcon={<DeleteOutlineIcon />}
          onClick={() => onDelete(data.id)}
        >
          delete
        </Button>
      </Paper>
    </Grid>
  );
}
