import React from "react";
import { Grid } from "@material-ui/core";
import { RedProfile } from "../types/RedProfile";
import { Work as WorkIcon } from "@material-ui/icons";

export const ProfileOccupation = ({
  occupation
}: {
  occupation: RedProfile["mentor_occupation"];
}) => {
  return (
    <Grid container spacing={1} alignItems="center" style={{ margin: "5px 0" }}>
      <Grid item>
        <WorkIcon />
      </Grid>
      <Grid item>{occupation}</Grid>
    </Grid>
  );
};
