const amqp = require('amqplib');
const AMQP_HOST = process.env.amqp_host || "amqp://rabbitmq:5672";
const QUEUE = process.env.queue || "service1";

async function connectServer(msg) {
    // try {
    console.log(QUEUE)
    amqp.connect(AMQP_HOST).then(connection => {
        console.log('connected')

        connection.createChannel().then(async channel => {

            await channel.assertQueue(QUEUE);

            channel.sendToQueue(QUEUE, Buffer.from(msg));
            console.log(`msg sent successfully ${msg}`);

            return "success"

        }).catch(err_channel=>{
            throw err_channel;
        });

        setTimeout(() => {
            connection.close();
            console.log(`connection closed`)
        }, 1000);
    }).catch(err_connection => {
            console.log(err_connection)
            throw err_connection;
    });

    // } catch (err) {
    //     console.log(err);
    //     return;
    // }
}

async function connectAlt(msg) {
    try {
        const connection = await amqp.connect("amqp://rabbitmq:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        console.log(`Job sent successfully ${msg}`);

    } catch (ex) {
        console.error(ex);
    }
}

module.exports = {
    connectMQ: connectServer
}