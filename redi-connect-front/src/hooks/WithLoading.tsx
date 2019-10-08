import React, { useState } from "react";
import {
  Dialog,
  Grid,
  CircularProgress,
  Fade,
  withStyles,
  createStyles,
  LinearProgress
} from "@material-ui/core";

export const useLoading = function() {
  const [loading, setLoading] = useState(false);

  return {
    Loading: () => <FullScreenCircle loading={loading} />,
    setLoading,
    loading
  };
};

export const useLoadingProgress = function() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  return {
    Loading: () => (
      <FullScreenLinearProgress loading={loading} progress={progress} />
    ),
    setLoading,
    setProgress
  };
};

const styles = createStyles({
  grid: {
    height: "100%"
  },
  paperStyle: {
    backgroundColor: "transparent",
    boxShadow: "none"
  }
});

interface Props {
  loading: boolean;
  classes: {
    paperStyle: string;
    grid: string;
  };
  children: React.ReactNode;
}

// const Trans: React.FunctionComponent<FadeProps> = props => (
//   <Fade {...props} timeout={500} />
// );

const FullScreenDialog = withStyles(styles)(
  ({ loading, classes, children }: Props) => (
    <Dialog
      onBackdropClick={e => e.stopPropagation()}
      fullScreen
      open={loading}
      PaperProps={{
        className: classes.paperStyle
      }}
      TransitionComponent={Fade}
    >
      <Grid
        container
        className={classes.grid}
        alignItems="center"
        justify="center"
      >
        <Grid item>{children}</Grid>
      </Grid>
    </Dialog>
  )
);

export const FullScreenCircle = (props: { loading: boolean }) => (
  <FullScreenDialog {...props} loading={props.loading}>
    <CircularProgress size={100} />
  </FullScreenDialog>
);
const FullScreenLinearProgress = (props: {
  loading: boolean;
  progress: number;
}) => (
  <FullScreenDialog {...props} loading={true}>
    <LinearProgress color="primary" value={50} />
  </FullScreenDialog>
);
