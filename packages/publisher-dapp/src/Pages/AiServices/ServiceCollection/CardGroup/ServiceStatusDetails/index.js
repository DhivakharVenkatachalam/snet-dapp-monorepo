import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SNETButton from "shared/dist/components/SNETButton";

import Pricing from "./Pricing";
import { useStyles } from "./styles";
import { ConfigurationServiceRequest } from "../../../../../Utils/Daemon/ConfigurationService";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import { aiServiceDetailsActions } from "../../../../../Services/Redux/actionCreators";
import { checkIfKnownError } from "shared/dist/utils/error";
import { generateDetailedErrorMessageFromValidation } from "../../../../../Utils/validation";

const selectState = state => ({
  serviceDetails: state.aiServiceList,
  groupDetails: state.aiServiceDetails,
});
const ServiceStatusDetails = props => {
  const dispatch = useDispatch();
  const { classes, status, groups, editServiceLink, serviceUuid, orgUuid } = props;
  const [activeTab] = useState(2);
  const { serviceDetails, groupDetails } = useSelector(selectState);
  const [alert, setAlert] = useState({});
  //Todo check for valid url    ["daemon_end_point", "0.0.0.0:8083"],    ["passthrough_endpoint", "http://localhost:7003"],
  const configValidation = [
    ["blockchain_enabled", "true"],
    ["ipfs_end_point", "http://ipfs.singularitynet.io:80"],
    ["blockchain_network_selected", "main"],
    ["passthrough_enabled", "true"],
    ["organization_id", { orgUuid }],
    ["service_id", { serviceUuid }],
  ];
  /*
  const tabs = [
    { name: "Revenue", activeIndex: 0, component: <Revenue /> },
    { name: "Usage", activeIndex: 1, component: <Usage /> },
    { name: "Pricing", activeIndex: 2, component: <Pricing groups={groups} /> },
    { name: "Changelog", activeIndex: 3, component: <Changelog /> },
  ];
*/
  const tabs = [{ name: "Pricing", activeIndex: 2, component: <Pricing groups={groups} /> }];
  const activeComponent = tabs.find(el => el.activeIndex === activeTab);
  const validateDaemonConfig = () => {
    try {
      let DaemonConfigvalidateAlert = [];
      groupDetails.groups.forEach(group => {
        Object.entries(group.endpoints).forEach(async ([endpoint, value]) => {
          if (value.valid) {
            return;
          }
          const configurationServiceRequest = new ConfigurationServiceRequest(endpoint);
          const res = await configurationServiceRequest.getConfiguration();

          res.currentConfigurationMap.forEach(element => {
            configValidation.forEach(element1 => {
              if (element[0] === element1[0]) {
                if (element[1] !== element1[1]) {
                  if (!DaemonConfigvalidateAlert.includes(element1[0] + " should be " + element1[1]))
                    DaemonConfigvalidateAlert.push(element1[0] + " should be " + element1[1]);
                }
              }
            });
          });

          if (!DaemonConfigvalidateAlert) {
            const result = serviceDetails.data.filter(({ uuid }) => serviceUuid === uuid);
            await dispatch(aiServiceDetailsActions.saveServiceDetails(result[0].orgUuid, serviceUuid, result[0], true));
          } else {
            const errorMessage = generateDetailedErrorMessageFromValidation(DaemonConfigvalidateAlert);
            setAlert({ type: alertTypes.ERROR, children: errorMessage });
          }
        });
      });
    } catch (error) {
      if (checkIfKnownError) {
        return setAlert({ type: alertTypes.ERROR, message: error.message });
      }

      return setAlert({ type: alertTypes.ERROR, message: "something went wrong" });
    }
  };
  return (
    <div className={classes.serviceStatusDetailsMainContainer}>
      <div>
        <div className={classes.statusDetails}>
          <Typography className={classes.property}>status</Typography>
          <Typography className={classes.value}>{status}</Typography>
        </div>
        <div className={classes.tabsContainer}>
          <AppBar position="static" className={classes.tabsHeader}>
            <Tabs value={activeTab}>
              {tabs.map(value => (
                <Tab key={value.name} label={value.name} />
              ))}
            </Tabs>
          </AppBar>
          {activeComponent && activeComponent.component}
        </div>
      </div>
      <div className={classes.serviceStatusActions}>
        <Link to={editServiceLink}>
          <SNETButton children="edit" color="primary" variant="contained" />
        </Link>
        {props.status === "DRAFT" ? (
          <div className={classes.configValidButton}>
            <SNETButton children="pause service" color="primary" variant="contained" />
            <SNETButton children="validate daemon" color="primary" variant="contained" onClick={validateDaemonConfig} />
          </div>
        ) : null}
      </div>
      <br />
      <div>
        <AlertBox type={alert.type} message={alert.message} children={alert.children} />
      </div>
    </div>
  );
};
export default withStyles(useStyles)(ServiceStatusDetails);
