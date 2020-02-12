import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import AlertLink from "./AlertLink";

export const alertTypes = {
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
  INFO: "info",
};

const backgroundColor = {
  error: alertTypes.ERROR,
  success: alertTypes.SUCCESS,
  warning: alertTypes.WARNING,
  info: alertTypes.INFO,
};

const AlertBox = ({ classes, message, type, link, icon: Icon, header }) => {
  if (Icon) {
    return (
      <div className={clsx(classes.alertBoxContainer, classes[backgroundColor[type]])}>
        <Icon />
        <div className={classes.content}>
          <span>{header}</span>
          <p>{message}</p>
        </div>
      </div>
    );
  }

  return (
    <p className={clsx(classes.messageBox, classes[backgroundColor[type]])}>
      {message} <AlertLink link={link} />
    </p>
  );
};

AlertBox.propTypes = {
  type: PropTypes.oneOf(["error", "success", "warning", "info"]),
  message: PropTypes.string,
};

AlertBox.defaultProps = {
  type: "error",
};

export default withStyles(useStyles)(AlertBox);
