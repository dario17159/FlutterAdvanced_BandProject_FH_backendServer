const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Metalica'));
bands.addBand(new Band('Héroes del silencio'));

// console.log(bands)

//  Socket message
io.on('connection', client => {

    console.log('Client connected')

    client.emit('active-bands', bands.getBands());


    client.on('disconnect', () => {
        console.log('Client disconnected')
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!', payload)

        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });

    client.on('vote-band', (payload) => {

        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());

    });
});