import { Link } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { ReportProblemDialog } from "./ReportProblemDialog";

export interface ReportProblemBtnProps {
  dispatch: Function;
  redProfileId: string;
  type: "mentor" | "mentee";
}

export const ReportProblemBtn = connect()(
  ({ dispatch, redProfileId, type }: ReportProblemBtnProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    return (
      <>
        If you think that this is not working, you can{" "}
        <Link onClick={() => setDialogOpen(true)}>report a problem</Link>.
        <ReportProblemDialog
          asyncResult="notSubmitted"
          redProfileId={redProfileId}
          type={type}
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      </>
    );
  }
);
