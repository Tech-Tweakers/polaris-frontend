import * as React from "react";
import {
    Box,
    Typography,
    Avatar,
    Grid,
    Paper,
    CircularProgress,
    Button,
} from "@mui/material";
import axios from "axios";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import Icon from "@mui/material/Icon";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

let r = (Math.random() + 1).toString(36).substring(7);

function ChatUI() {
    const [input, setInput] = React.useState("");
    const [messages, setMessages] = React.useState([
        { id: 1, text: "Hello, how can I help you today? 😊", sender: "bot", timestamp: new Date() },
    ]);
    const [inputDisabled, setInputDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [activeEndpoint, setActiveEndpoint] = React.useState("chat"); // Default to "chat"
    const [confirmationDialogOpen, setConfirmationDialogOpen] = React.useState(false);

    const chatContainerRef = React.useRef(null);
    
    React.useEffect(() => {
        // Function to scroll to the bottom of the chat container
        const scrollToBottom = () => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        };
    
        // Scroll to the bottom whenever messages change
        scrollToBottom();
        }, [messages]
    );
    
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
    
                const endpoint =
                    activeEndpoint === "chat"
                        ? "http://localhost:9001/chat/send"
                        : "http://localhost:9001/code/send";
    
                const response = await axios.post(
                    endpoint,
                    [
                        {
                            role: "user:",
                            content: input,
                            chatID: r,
                        },
                    ],
                    {
                        headers: {
                            "content-type": "application/json",
                            "Access-Control-Allow-Credentials": "true",
                            "Access-Control-Allow-Methods":
                            "GET,POST,PUT,PATCH,DELETE,OPTIONS",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "*",
                        },
                    }
                );
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
                        text:
                            "Error: Could not connect to the backend: " + error,
                        sender: "bot",
                        timestamp: new Date(),
                    },
                ]);
            } finally {
                setLoading(false);
                setInputDisabled(false);
            }
        }
    };
    
    const handleSwitchEndpoint = (endpoint) => {
        if (endpoint !== activeEndpoint) {
            setConfirmationDialogOpen(true);
        }
    };

    const handleConfirmSwitch = () => {
        setConfirmationDialogOpen(false);
        setActiveEndpoint((prevEndpoint) => {
            const newEndpoint = prevEndpoint === "chat" ? "code" : "chat";
            setMessages([
                {
                id: 1,
                text: newEndpoint === "chat" ? "Hello, how can I help you today? 😊" : "Hello, I'm ready to code! What do you need? 🤖",
                sender: "bot",
                timestamp: new Date(),
                },
            ]);
        return newEndpoint;
        });
    };

    const handleCancelSwitch = () => {
        setConfirmationDialogOpen(false);
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
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                            <img
                                src="logo.png"
                                alt="Logo"
                                style={{ width: "35px", height: "35px", marginRight: "10px" }}
                            />
                            <Typography variant="h5">Polaris AI Frontend v1</Typography>
                        </div>
                        <Box
                            ref={chatContainerRef}
                            sx={{ flexGrow: 1, overflow: "auto", p: 1 }}
                        >
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
                                                resize: "horizontal",
                                                padding: "8px",
                                                border: "none",
                                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                                borderRadius: "6px",
                                                fontSize: "14px",
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
                            <Box>
                                <Button onClick={() => handleSwitchEndpoint('chat')}>Switch to Chat</Button>
                                <Button onClick={() => handleSwitchEndpoint('code')}>Switch to Code</Button>
                            </Box>
                        </Box>
                    </Box>
                </Card>
            </Grid>
            {/* Confirmation Dialog */}
            <Dialog open={confirmationDialogOpen} onClose={handleCancelSwitch}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to exit active mode?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelSwitch} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmSwitch} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
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
