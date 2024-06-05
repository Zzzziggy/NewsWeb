const socket = new WebSocket('ws://127.0.0.1:5500');

socket.onmessage = (event) => {
    console.log(`Received message: ${event.data}`);
};

socket.onopen = () => {
    console.log('Connected to the WebSocket server');
};

socket.onerror = (error) => {
    console.log('WebSocket error: ', error);
};

socket.onclose = () => {
    console.log('Disconnected from the WebSocket server');
};