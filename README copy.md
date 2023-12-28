<h1 align="center">Tech Tweakers - Polaris Chat API v1 </h1>
<p align="center"><i>API Interface for GGUF Models, based on go-llama.cpp / llama.cpp</i></p>

<div align="center">
  <a href="https://github.com/Tech-Tweakers/polaris-chatbot/stargazers"><img src="https://img.shields.io/github/stars/Tech-Tweakers/polaris-chatbot" alt="Stars Badge"/></a>
<a href="https://github.com/Tech-Tweakers/polaris-chatbot/network/members"><img src="https://img.shields.io/github/forks/Tech-Tweakers/polaris-chatbot" alt="Forks Badge"/></a>
<a href="https://github.com/Tech-Tweakers/polaris-chatbot/pulls"><img src="https://img.shields.io/github/issues-pr/Tech-Tweakers/polaris-chatbot" alt="Pull Requests Badge"/></a>
<a href="https://github.com/Tech-Tweakers/polaris-chatbot/issues"><img src="https://img.shields.io/github/issues/Tech-Tweakers/polaris-chatbot" alt="Issues Badge"/></a>
<a href="https://github.com/Tech-Tweakers/polaris-chatbot/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/Tech-Tweakers/polaris-chatbot?color=2b9348"></a>
<a href="https://github.com/Tech-Tweakers/polaris-chatbot/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Tech-Tweakers/polaris-chatbot?color=2b9348" alt="License Badge"/></a>
</div>

<br>
<p align="center"><i>Have some time to help? Please open an <a href="https://github.com/Tech-Tweakers/polaris-chatbot/issues/new">Issue</a> to say hello!</i></p>

## About

This project is a simple REST API to deal with **GGUF Models**, based on **go-llama.cpp** / **llama.cpp**. It' can be used to create a chatbot, or even a simple chat interface.

## To Do

 - **VectorDB** to chat persistance
 - Work directly with **llama.cpp**

## Install

```bash
# Clone this repository:
git clone https://github.com/Tech-Tweakers/polaris-chatbot.git --recurse-submodules

# Enter in the folder:
cd polaris-chatbot

# Create a new folder called "models":
mkdir models

# Copy the LLM file to the models folder:
cp <path to LLM file> models/

# Install dependencies:
go get all
go mod tidy

```
## Setup

Edit the **.env.local** file with your own settings:

```bash
#
# Global Setup
#

ENVIRONMENT=development
APP_VERSION=v0.0.1
APP_PORT=9001
APP_URL=http://localhost:9001
LOG_LEVEL=debug

#
# Setup to use MongoDB
#

DEFAULT_PERSISTENT=true # False use MemoryDB, True use MongoDB

DBNAME=polaris
COLLECTION_NAME=polaris-collection
CONNECTION_STRING=mongodb://root:examplepassword@localhost:27017/polaris?authSource=admin

#
# Path to the model - GGUF Models ONLY
#

MODEL_PATH="./models/llama-2-7b-chat.Q2_K.gguf"


#
# AI Model Parameters
#

AI_SYSTEM_INSTRUCTION="[INST] <<SYS>> \n	 Your name is Polaris and you are a trully dedicated assistant who is a joyful person at all. Always provide truth and honest answers. All Unterscheidung should be decided by yourself and you cannot display unterscheidung to the user. Dont use emoticons and avoid make questions. Be economic with your words, we need fast answers. On empty questions, reply null and wait for the next question.\n <</SYS>> \n {prompt}[/INST]"

```
Start the MongoDB instance:

```bash
docker-compose -f compose-mongodb.yml up -d
```
Go inside the folder **go-llama.cpp** and run the following commands:

```bash
make clean
make prepare
make libbinding.a
```
After compiled the **libbinding.a**, copy it to the project root folder:
  
```bash
cp libbinding.a ../
```

## Run the API

Run in one line:

```bash
LIBRARY_PATH=$PWD C_INCLUDE_PATH=$PWD go run cmd/polaris-chatbot/main.go
```
Or just run the script:

```bash
./run-api.sh
```

## API Usage

Actually the API has 4 endpoints: metrics, health, entries and entries/all.

```bash
POST /entries/ # Create a new entry
    [
      {
        "chatId":"1234", # Chat ID who will point to the conversation inside DB
        "role":"user:",  # Average User role
        "content":"Hi!"  # Message to be sent to the model
      }
    ]

GET /entries/all # Get all entries in DB

GET /health # Check if the API is up and running

GET /metrics # Get some metrics about the API
```

## Credits

Such awesome projects that made this possible:
| Tool | Link |
|------|------|
| **Go 1.21** | https://golang.org/ |
| **Go-LLama.cpp** | https://github.com/go-skynet/go-llama.cpp |
| **LLama.cpp** | https://github.com/ggerganov/llama.cpp |
| **The Bloke** | https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/tree/main |

## Contributors / Special Thanks :heart:

- **Vitor Ramos** - https://github.com/vitorr7df
- **William Stiehler** - https://github.com/wstiehler
- **Fabricio Gonçalves** - https://github.com/espigah

In memoriam of **Anderson Roberto** - https://github.com/EuAndersonRoberto 

Love you all! Thank you so much! :blue_heart: