import React from 'react'
import { RootState } from '../redux/types';
import { getHasReachedMenteeLimit } from '../redux/user/selectors';
import { connect } from 'react-redux';
import { Tooltip, Button } from '@material-ui/core';
import { matchesAcceptMentorshipStart } from '../redux/matches/actions';

type ConnectButtonProps = {
  dispatch: Function;
  matchId: string;
  hasReachedMenteeLimit: boolean;
};

const mapState = (state: RootState) => ({
  hasReachedMenteeLimit: getHasReachedMenteeLimit(state.user),
});

// TODO: This throws a TS error: { dispatch, matchId }: ConnectButtonProps
// What to replace with instead of below hack?
export const ConnectButton = connect(mapState)((props: any) => {
  const Wrapper = ({ children }: any) =>
    // <Tooltip> requires child <Button> to be wrapped in a div since it's disabled
    props.hasReachedMenteeLimit ? (
      <Tooltip
        placement="top"
        title="You're reached the number of mentees you've specified as able to take on"
      >
        <div onClick={e => e.stopPropagation()}>{children}</div>
      </Tooltip>
    ) : (
      <>{children}</>
    );
  return (
    <Wrapper>
      <Button
        color="primary"
        variant="contained"
        disabled={props.hasReachedMenteeLimit}
        onClick={e => {
          e.stopPropagation();
          if (window.confirm('Are you certain you would like to connect to this mentee?')) {
            props.dispatch(matchesAcceptMentorshipStart(props.matchId));
          } 
        }}
      >
        Connect
      </Button>
    </Wrapper>
  );
});
