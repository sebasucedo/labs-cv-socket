# Personal CV Generator - Real-time Update with WebSockets

Welcome to the auxiliary repository for the Personal CV Generator project. This repository focuses on providing real-time updates to the client upon successful CV generation using Node.js WebSockets. The system is triggered by a DynamoDB insert operation that occurs after receiving a successful response from the OpenAI API.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [How to Use](#how-to-use)
5. [Contribution](#contribution)
6. [Licence](#licence)

## Overview

This part of the Personal CV Generator project deals with real-time updates, making the CV generation process more interactive and user-friendly. Upon a successful CV generation operation, a DynamoDB insert triggers the WebSocket system, which subsequently updates the user interface.

## Features

- **Real-time Updates**: With the integration of Node.js and WebSockets, the system provides real-time updates to users.
- **Triggered by DynamoDB Insert**: The system is triggered by a DynamoDB insert operation, ensuring updates occur only after a successful CV generation operation.
- **Built with Node.js**: Utilizing the power of Node.js for efficient WebSocket management.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- AWS DynamoDB
- A WebSocket Client

### Installation

1. Clone the repository:
    ```
    git clone https://github.com/sebasucedo/labs-cv-socket.git
    ```

2. Install the dependencies:
    ```
    npm install
    ```

3. Set up your AWS credentials and DynamoDB configuration as environment variables.

4. Run the application:
    ```
    node server.js
    ```

## How to Use

1. Connect to the WebSocket server from your client.
2. Upon successful CV generation and DynamoDB insert operation in the main Personal CV Generator application, you should receive real-time updates on this WebSocket connection.

## Contribution

Contributions, issues, and feature requests are welcome! For major changes, please open an issue first to discuss what you would like to change. See the [issues](https://github.com/sebasucedo/labs-cv-socket/issues) page for ideas on where to start.

## Licence

This project is licensed under the terms of the MIT license.
