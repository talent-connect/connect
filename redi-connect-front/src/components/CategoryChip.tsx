import React from "react";
import { Chip } from "@material-ui/core";
import {
  categoriesIdToColourMap,
  categoriesIdToLabelMap
} from "../config/config";
import { ChipProps } from "@material-ui/core/Chip";

interface Props {
  categoryId: string;
  className?: string;
  style?: object;
  overrideBackgroundColour?: string;
}
export const CategoryChip = ({
  categoryId,
  className,
  style,
  overrideBackgroundColour,
  ...rest
}: Props & ChipProps) => (
  <Chip
    {...rest}
    className={className}
    style={{
      backgroundColor: overrideBackgroundColour
        ? overrideBackgroundColour
        : categoriesIdToColourMap[categoryId],
      ...style
    }}
    label={categoriesIdToLabelMap[categoryId]}
  />
);
