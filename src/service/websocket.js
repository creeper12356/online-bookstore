export function createWebSocketConnection (wsUrl, message) {
    return new Promise((resolve, reject) => {
        // Create a new WebSocket connection
        const socket = new WebSocket(wsUrl);

        // Send a message when the connection is open
        socket.onopen = () => {
            console.log("WebSocketConnection onopen: ", message);
            socket.send(message);

            // Resolve the promise with the socket
            resolve(socket);
        };

        // Reject the promise if there is an error
        socket.onerror = (error) => {
            console.log('WebSocket error: ' , error);
            reject(error);
        };
    });
};