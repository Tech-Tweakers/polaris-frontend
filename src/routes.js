import React from "react"; // Importe o React
import ChatUI from "layouts/chatui";
import Icon from "@mui/material/Icon";

const routes = [
    {
        type: "collapse",
        name: "Chat UI",
        key: "chatui",
        icon: <Icon fontSize="small">messages</Icon>,
        route: "/chatui",
        component: <ChatUI />,
    },
];

export default routes;
