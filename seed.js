// const { connectToDatabase, closeConnection } = require('./app');

const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function connectToDatabase(dbName) {
    try {
        await client.connect(); 
        console.log(`Connected to MongoDB, Database: ${dbName}`);
        return client.db(dbName);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}

async function closeConnection() {
    await client.close();
    console.log("Connection to MongoDB closed.");
}


async function initializeDatabase() {
    const dbName = 'warung88'; 
    const db = await connectToDatabase(dbName); 

    const collection = db.collection('menu');

    const initialData = [
        {photo: "ayam.jpg", name: "ayam madu", description: "ayam dengan saus madu yang sangat enak", price: 13000, created_at: "now", __v: 0},
    ];

    const collection2 = db.collection('users');

    const initialData2 = [
        {username: "admin warung 88", email: "admin@gmail.com", password: "12345", role: "admin", __v: 0}
    ]

    const collection3 = db.collection('histories');

    const initialData3 = [
        {username: "admin warung 88", tanggal: new Date(), pesanan: [["nasi", 1], ["ayam madu", 1]], totalHarga: 17000, buktiPembayaran: "buktipembayaran1.png", kode: 1476, status: "selesai"},
        {username: "admin warung 88", tanggal: new Date(), pesanan: [["nasi", 1], ["ayam madu", 3], ["sayur asem", 2]], totalHarga: 30000, buktiPembayaran: "buktipembayaran1.png", kode: 1109, status: "belum"}
    ]

    try {
        const result = await collection.insertMany(initialData);
        const result2 = await collection2.insertMany(initialData2);
        const result3 = await collection3.insertMany(initialData3);
        console.log(`${result.insertedCount} documents inserted into 'menu' collection.`);
        console.log(`${result2.insertedCount} documents inserted into 'users' collection.`);
        console.log(`${result3.insertedCount} documents inserted into 'history' collection.`);
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        await closeConnection();
    }
}

initializeDatabase().catch(console.error);
