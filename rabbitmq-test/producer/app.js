import express from 'express';
import amqplib from 'amqplib';

const app = express();

const PORT = 8080;

let ch1 = null;
const queue = 'testqueue';

async function initializeChannel() {
    const conn = await amqplib.connect('amqp://localhost');
    ch1 = await conn.createChannel();
    await ch1.assertQueue(queue);
}

(async () => {
    await initializeChannel();
})();

app.get('/rabbit', (req, res) => {
    console.log('hello');
    const message = {
        test: 'test',
        test2: 10212,
    }
    ch1.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    res.send('hello')
})

app.listen(PORT, () => console.log('The server is listening on port: ', PORT));