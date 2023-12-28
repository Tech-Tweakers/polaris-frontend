import * as React from "react";
import {
    Box,
    Typography,
    Avatar,
    Grid,
    Paper,
    CircularProgress,
} from "@mui/material";
import axios from "axios";
import Card from "@mui/material/Card";
import { Divider } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Icon from "@mui/material/Icon";

let r = (Math.random() + 1).toString(36).substring(7);

function ChatUI() {
    const [input, setInput] = React.useState("");
    const [messages, setMessages] = React.useState([
        { id: 1, text: "Hello! How can I help you? 😊", sender: "bot", timestamp: new Date() },
    ]);
    const [inputDisabled, setInputDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleSend = async () => {
        if (input.trim() !== "") {
            setInputDisabled(true);


            setMessages([
                ...messages,
                {
                    id: messages.length + 1,
                    text: input,
                    sender: "user",
                    timestamp: new Date(),
                },
            ]);

            const newMessage = {
                id: messages.length + 1,
                text: input,
                sender: "user",
                timestamp: new Date(),
            };

            try {
                setLoading(true);

                const response = await axios.post("https://localhost:9001/entries/", [
                    {
                        role: "user:",
                        content: input,
                        chatID: r,
                    },
                ], {
                    headers: {
                        "content-type": "application/json",
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                    },
                });
                const botResponse = response.data.content;
                let isCode = /[{[\s]/.test(botResponse);


                setMessages([
                    ...messages,
                    newMessage,
                    {
                        id: messages.length + 2,
                        text: botResponse,
                        sender: "bot",
                        timestamp: new Date(),
                        isCode: isCode,
                    },
                ]);
                setInput("");
            } catch (error) {
                console.error("Error sending message:", error);
                setMessages([
                    ...messages,
                    {
                        id: messages.length + 1,
                        text: "Error: Could not connect to the backend: " + error,
                        sender: "bot",
                        timestamp: new Date()
                    },
                ]);
            } finally {
                setLoading(false);
                setInputDisabled(false);
            }
        }
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    return (
        <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} lg={14}>
                <Card>
                    <Box
                        p={2}
                        sx={{
                            height: "90vh",
                            display: "flex",
                            flexDirection: "column",
                            bgcolor: "transparent",
                        }}
                    >
                        <Typography variant="h5">AI Chat Interface</Typography>
                        <Divider />
                        <Box sx={{ flexGrow: 1, overflow: "auto", p: 1 }}>
                            {messages.map((message) => (
                                <Message key={message.id} message={message} />
                            ))}
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <Grid container spacing={1} justifyContent="center">
                                <Grid item xs={12} lg={14}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <textarea
                                            rows={4}
                                            placeholder="Type a message"
                                            value={input}
                                            onChange={handleInputChange}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter" && !event.shiftKey) {
                                                    handleSend();
                                                    event.preventDefault();
                                                }
                                            }}
                                            disabled={inputDisabled}
                                            style={{
                                                width: "100%",
                                                resize: "none",
                                                padding: "12px",
                                                border: "none",
                                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                                borderRadius: "8px",
                                                fontSize: "16px",
                                                lineHeight: "1.4",
                                                transition: "box-shadow 0.2s, transform 0.2s",
                                                "&:focus": {
                                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                                                    transform: "scale(1.02)",
                                                },
                                            }}
                                        />
                                        <InputAdornment position="end">
                                            <Icon
                                                onClick={handleSend}
                                                style={{
                                                    cursor: "pointer",
                                                    marginLeft: "-40px"
                                                }}
                                            >
                                                send
                                            </Icon>
                                        </InputAdornment>
                                    </div>
                                    {loading && (
                                        <CircularProgress
                                            sx={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                marginLeft: "-20px",
                                                marginTop: "-20px",
                                            }}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
}

const Message = ({ message }) => {
    const isBot = message.sender === "bot";

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: isBot ? "flex-start" : "flex-end",
                mb: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isBot ? "row" : "row-reverse",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ bgcolor: isBot ? "white" : "grey.300" }}>
                    {isBot ? "AI" : "U"}
                </Avatar>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 1,
                            ml: isBot ? 1 : 0,
                            mr: isBot ? 0 : 1,
                            backgroundColor: isBot ? "white" : "grey.300",
                            borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        <Typography variant="body2" sx={{ margin: 0 }}>
                            {message.text}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            {message.timestamp.toLocaleTimeString()}
                        </Typography>
                    </Paper>
            </Box>
        </Box>
    );
}

export default ChatUI;
