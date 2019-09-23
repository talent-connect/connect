import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";

import { steps } from "./steps";

interface Props {
  activeStep: number;
  handleStepChange: (step: number) => void;
  disabled?: boolean;
}

export const SignUpFormStepper = ({
  activeStep,
  handleStepChange,
  disabled
}: Props) => (
  <Stepper activeStep={activeStep} alternativeLabel>
    {steps.map((label, index) => (
      <Step key={label}>
        <StepButton
          onClick={() => handleStepChange(index)}
          disabled={index > activeStep || disabled}
        >
          {label}
        </StepButton>
      </Step>
    ))}
  </Stepper>
);
