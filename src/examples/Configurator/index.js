import { useState, useEffect } from "react";
import React from "react";

// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";
import {
    useMaterialUIController,
    setOpenConfigurator,
    setDarkMode,
} from "context";

function Configurator() {
    const [controller, dispatch] = useMaterialUIController();
    const {
        openConfigurator,
        darkMode,
    } = controller;
    const [disabled, setDisabled] = useState(false);
    useEffect(() => {
        function handleDisabled() {
            return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
        }

        window.addEventListener("resize", handleDisabled);
        handleDisabled();

        return () => window.removeEventListener("resize", handleDisabled);
    }, []);

    const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
    const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

    return (
        <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
            <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="baseline"
                pt={4}
                pb={0.5}
                px={3}
            >
                <MDBox>
                    <MDTypography variant="h5">Tech Tweakers AI ChatUI</MDTypography>
                    <MDTypography variant="body2" color="text">
                        Customize Chat UI to your needs
                    </MDTypography>
                </MDBox>
                <Icon
                    sx={({ typography: { size }, palette: { dark, white } }) => ({
                        fontSize: `${size.lg} !important`,
                        color: darkMode ? white.main : dark.main,
                        stroke: "currentColor",
                        strokeWidth: "2px",
                        cursor: "pointer",
                        transform: "translateY(5px)",
                    })}
                    onClick={handleCloseConfigurator}
                >
                    close
                </Icon>
            </MDBox>
            <Divider />
            <MDBox display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
                <MDTypography variant="h6">Light / Dark</MDTypography>

                <Switch checked={darkMode} onChange={handleDarkMode} />
            </MDBox>
            <Divider />
        </ConfiguratorRoot>
    );
}

export default Configurator;
