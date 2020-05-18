import React from "react";
import { Language as LanguageIcon } from "@material-ui/icons";
import { RedMatch } from "../../../types/RedMatch";
import {
  Grid,
  createStyles,
  Theme,
  withStyles,
  Card,
  CardContent
} from "@material-ui/core";
import { Avatar } from "../../../components/Avatar";
import { history } from "../../../services/history/history";
import { ConnectButton } from "../../../components/ConnectButton";
import { menteeOccupationCategory_idToLabelMap } from "../../../config/config";
import { ContactInfo } from '../../../components/ContactInfo';

interface Props {
  application: RedMatch;
  classes: {
    avatar: string;
    connectBtnContainer: string;
  };
}

const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      width: "100px",
      height: "100px"
    },
    connectBtnContainer: {
      [theme.breakpoints.up("xs")]: {
        justifyContent: "center"
      },
      [theme.breakpoints.up("md")]: {
        justifyContent: "flex-end"
      }
    }
  });

export const ApplicationCard = withStyles(styles)(
  ({ application, classes }: Props) => {
    if (!application.mentee) return null;
    /// TODO: below 'application as any' shouldn't be necessary due to above check. Figure out
    // how to remove the 'application as any'
    return (
      <Card
        onClick={() =>
          history.push(`/app/profile/${(application as any).mentee.id}`)
        }
        style={{
          cursor: 'pointer'
        }}
      >
        <CardContent>
          <Grid container direction="row">
            <Grid item xs={12} md={5}>
              <Grid container spacing={1}>
                <Grid item>
                  <Avatar
                    className={classes.avatar}
                    s3Key={application.mentee.profileAvatarImageS3Key}
                  />
                </Grid>
                <Grid item>
                  <h3 style={{ fontWeight: 700, fontFamily: "Roboto" }}>
                    {application.mentee.firstName} {application.mentee.lastName}
                  </h3>
                  <h4 style={{ fontWeight: 400, fontFamily: "Roboto" }}>
                    {
                      menteeOccupationCategory_idToLabelMap[
                      application.mentee.mentee_occupationCategoryId
                      ]
                    }
                  </h4>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                alignItems="center"
                style={{ margin: "5px 0" }}
              >
                <Grid item>
                  <LanguageIcon />
                </Grid>
                <Grid item>{application.mentee.languages.join(", ")}</Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <h3>Application message</h3>
              <p style={{ overflowWrap: "break-word" }}>
                {application.applicationText}
              </p>
              <ContactInfo profile={application.mentee} />
              <p>Feel free to communicate with your potential mentee before accepting their mentorship request.</p>
            </Grid>
            <Grid item xs={12} md={3}>
              <Grid
                container
                alignItems="center"
                className={classes.connectBtnContainer}
                style={{ height: "100%" }}
              >
                <ConnectButton matchId={application.id} />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
);
