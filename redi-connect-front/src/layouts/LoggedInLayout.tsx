import React, { useState, FormEvent } from "react";
import range from "lodash/range";

import {
  AppBar,
  createStyles,
  withStyles,
  Toolbar,
  Button,
  Badge,
  Theme,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";

import rediLogo from "../assets/rediLogo.svg";
import { Avatar } from "../components/Avatar";
import { getRedProfile } from "../services/auth/auth";
import { Link, withRouter } from "react-router-dom";
import { PersonOutline, Menu as MenuIcon } from "@material-ui/icons";
import { logout } from "../services/api/api";
import { connect } from "react-redux";
import { RootState } from "../redux/types";
import { routes__loggedIn } from "../routes/routes__logged-in";
import { RouteComponentProps } from "react-router";

interface LoggedInLayoutProps {
  children: React.ReactNode;
  classes: {
    root: string;
    grow: string;
    button: string;
    avatar: string;
    sectionDesktop: string;
    sectionMobile: string;
  };
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    grow: {
      flexGrow: 1
    },
    // TODO: Can this go into the root ThemeProvider instead?
    button: {
      color: "#fff"
    },
    avatar: {
      color: "#fff"
    },
    avatarMobile: {
      color: "#000"
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "flex"
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    }
  });

export const LoggedInLayout = withStyles(styles)(
  ({ children, classes }: LoggedInLayoutProps) => {
    const [
      mobileMenuAnchorEl,
      setMobileMenuAnchorEl
    ] = useState<HTMLElement | null>(null);
    const LinkToDashboard: any = (props: any) => (
      <Link {...props} to="/app/dashboard" />
    );
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Button
              style={{ margin: 0, padding: 0 }}
              component={LinkToDashboard}
            >
              <img
                src={rediLogo}
                style={{ height: "36px", width: "96px" }}
                alt="redi logo"
              />
            </Button>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Buttons />
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={(e: FormEvent<HTMLElement>) =>
                  setMobileMenuAnchorEl(e.currentTarget)
                }
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Menu
          anchorEl={mobileMenuAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(mobileMenuAnchorEl)}
          onClose={() => setMobileMenuAnchorEl(null)}
          color="primary"
        >
          <ButtonsMobile />
        </Menu>
        <div style={{ margin: "12px" }}>{children}</div>
      </div>
    );
  }
);

type ButtonsProps = RouteComponentProps & {
  applicationCount?: number | undefined;
  menteeCount?: number | undefined;
} & {
  classes: {
    root: string;
    grow: string;
    button: string;
    avatar: string;
    avatarMobile: string;
  };
};

// TODO: the way of connecting the element below is fucked up. The compose() function
// leads to a massive TS error. So does trying to do a ButtonProps & { applicantCount: number }
// Fix this.
const Buttons = withRouter(
  connect((state: RootState) => ({
    applicantCount:
      state.user.profile && state.user.profile.currentApplicantCount,
    menteeCount: state.user.profile && state.user.profile.currentMenteeCount
  }))(
    withStyles(styles)((props: ButtonsProps) => {
      // TODO: Replace 'any' with whatever is TS-appropriate
      const menteeApplicantsPath = routes__loggedIn.filter(
        route => route.name && route.name === "mentee-applicants"
      );
      const currentPath = (props as any).match.path;
      const currentPageIsMenteeApplicants =
        menteeApplicantsPath &&
        currentPath &&
        menteeApplicantsPath === currentPath;
      const applicantCount = (props as any).applicantCount;
      const menteeCount = (props as any).menteeCount;
      const classes = props.classes;
      const LinkToMe: any = (props: any) => <Link {...props} to="/app/me" />;
      const LinkToApplications: any = (props: any) => (
        <Link {...props} to="/app/applications" />
      );
      const currentUser = getRedProfile();
      const isMentor = currentUser.userType === "mentor";
      // const isMentee = currentUser.userType === 'mentee';
      return (
        <>
          {isMentor && !currentPageIsMenteeApplicants && (
            <Button className={classes.button} component={LinkToApplications}>
              <Badge badgeContent={applicantCount} color="secondary">
                Applications
              </Badge>
            </Button>
          )}
          {isMentor && menteeCount > 0 && (
            <Button className={classes.button} component={LinkToApplications}>
              Your mentees&nbsp;
              {range(0, menteeCount).map((_, i) => (
                <PersonOutline key={i} />
              ))}
            </Button>
          )}
          <Button component={LinkToMe}>
            <Avatar
              className={classes.avatar}
              s3Key={getRedProfile().profileAvatarImageS3Key}
            />
          </Button>
          <Button className={classes.button} onClick={() => logout()}>
            Log out
          </Button>
        </>
      );
    })
  )
);

const ButtonsMobile = withRouter(
  connect((state: RootState) => ({
    applicantCount:
      state.user.profile && state.user.profile.currentApplicantCount,
    menteeCount: state.user.profile && state.user.profile.currentMenteeCount
  }))(
    withStyles(styles)((props: ButtonsProps) => {
      const menteeApplicantsPath = routes__loggedIn.filter(
        route => route.name && route.name === "mentee-applicants"
      );
      const currentPath = (props as any).match.path;
      const currentPageIsMenteeApplicants =
        menteeApplicantsPath &&
        currentPath &&
        menteeApplicantsPath === currentPath;
      const applicantCount = (props as any).applicantCount;
      const menteeCount = (props as any).menteeCount;
      const classes = props.classes;
      // TODO: Replace 'any' with whatever is TS-appropriate
      const LinkToMe: any = (props: any) => <Link {...props} to="/app/me" />;
      const LinkToApplications: any = (props: any) => (
        <Link {...props} to="/app/applications" />
      );
      const currentUser = getRedProfile();
      const isMentor = currentUser.userType === "mentor";
      return (
        <>
          {isMentor && !currentPageIsMenteeApplicants && (
            <MenuItem component={LinkToApplications}>
              <Badge badgeContent={applicantCount} color="secondary">
                Applications
              </Badge>
            </MenuItem>
          )}
          {isMentor && menteeCount > 0 && (
            <MenuItem component={LinkToApplications}>
              Your mentees&nbsp;
              {range(0, menteeCount).map((_, i) => (
                <PersonOutline key={i} />
              ))}
            </MenuItem>
          )}
          <MenuItem component={LinkToMe}>
            <Avatar
              className={classes.avatarMobile}
              s3Key={getRedProfile().profileAvatarImageS3Key}
            />
          </MenuItem>
          <MenuItem onClick={() => logout()}>Log out</MenuItem>
        </>
      );
    })
  )
);
