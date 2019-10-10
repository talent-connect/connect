import React from "react";
import clsx from "clsx";

import { AWS_PROFILE_AVATARS_BUCKET_BASE_URL } from "../config/config";
import { createStyles, withStyles } from "@material-ui/core";
import { Person as PersonIcon } from "@material-ui/icons";

interface Props {
  s3Key?: string;
  className?: string;
  classes: {
    avatarImage: string;
  };
  style?: object;
}

const styles = createStyles({
  avatarImage: {
    width: "50px",
    height: "50px",
    backgroundSize: "cover",
    backgroundPosition: "center center"
  }
});

export const Avatar = withStyles(styles)(
  ({ s3Key, className, classes, style }: Props) => (
    <>
      {!s3Key && (
        <PersonIcon
          className={clsx(classes.avatarImage, className)}
          color="primary"
        />
      )}
      {s3Key && (
        <div
          id="yalla"
          style={{
            backgroundImage: `url(${AWS_PROFILE_AVATARS_BUCKET_BASE_URL +
              s3Key})`,
            ...style
          }}
          className={clsx(classes.avatarImage, className)}
        />
      )}
    </>
  )
);
