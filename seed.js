// const { connectToDatabase, closeConnection } = require('./app');

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://geasandhea19:RYdcGEOvNw7dtouI@cluster0.lyzqhtm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
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

    const collection = db.collection('menus');

    const initialData = [
    { photo: "uploads/tempeorekbasah.jpg", name: "tempe orek basah", description: "tempe dipotong kecil kecil dan diorek dengan saus enak", price: 3000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/tempeorekkering.jpg", name: "tempe orek kering", description: "tempe dipotong kecil kecil dan diorek sampai kering", price: 3000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/togetumis.jpg", name: "toge tumis", description: "toge ditumis dengan bumbu sederhana", price: 3000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/buncistumis.jpg", name: "buncis tumis", description: "buncis ditumis dengan bumbu gurih", price: 3000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/ayamkuluyukmadu.jpg", name: "ayam kuluyuk madu", description: "ayam goreng dengan saus madu manis", price: 9000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/ayamkuluyukladahitam.jpg", name: "ayam kuluyuk lada hitam", description: "ayam kuluyuk dengan saus lada hitam", price: 9000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/ayamkuluyukasammanis.jpg", name: "ayam kuluyuk asam manis", description: "ayam kuluyuk dengan saus asam manis", price: 9000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/kangkung.jpg", name: "kangkung", description: "sayur kangkung tumis bawang", price: 3000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/capcay.jpg", name: "capcay", description: "sayur capcay dengan aneka sayuran", price: 5000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/nuggethomemade.jpg", name: "nugget home made", description: "nugget buatan sendiri dari daging ayam", price: 5000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/jamurgorengtepung.jpg", name: "jamur goreng tepung", description: "jamur tiram digoreng dengan tepung renyah", price: 5000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/tahutelor.jpg", name: "tahu telor", description: "tahu dan telor digoreng bersama", price: 4000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/tempegorengtepung.jpg", name: "tempe goreng tepung", description: "tempe digoreng dengan tepung crispy", price: 2000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/sosisayamasammanis.jpg", name: "sosis ayam asam manis", description: "sosis ayam dimasak dengan saus asam manis", price: 5000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/gohiongayam.jpg", name: "gohiong ayam", description: "olahan ayam berbumbu khas gohiong", price: 5000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/tahusaostiram.jpg", name: "tahu saos tiram", description: "tahu dimasak dengan saus tiram gurih", price: 3000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/kripikkentangpedasmanis.jpg", name: "kripik kentang pedas manis", description: "kripik kentang dengan bumbu pedas manis", price: 4000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/telorceplokbalado.jpg", name: "telor ceplok balado", description: "telor ceplok dimasak dengan sambal balado", price: 5000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/tahuopor.jpg", name: "tahu opor", description: "tahu dimasak dengan kuah opor kuning", price: 3000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/tahudagingayam.jpg", name: "tahu daging ayam", description: "tahu isi daging ayam gurih", price: 6000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/ikandorigorengtepung.jpg", name: "ikan dori goreng tepung", description: "fillet ikan dori goreng tepung renyah", price: 9000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/ayampopcorn.jpg", name: "ayam pop corn", description: "potongan ayam kecil digoreng tepung seperti popcorn", price: 9000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/ayampentung.jpg", name: "ayam pentung", description: "ayam goreng tepung bentuk pentung besar", price: 10000, created_at: new Date(), status: true, __v: 0 },
    { photo: "uploads/sopjagung.jpg", name: "sop jagung", description: "sop kuah berisi jagung", price: 5000, created_at: new Date(), status: true, __v: 0 },
];

    const collection2 = db.collection('users');

    const initialData2 = [
        {username: "admin warung 88", email: "admin@gmail.com", password: "12345", role: "admin", __v: 0}
    ]

    const collection3 = db.collection('histories');

    const initialData3 = [
        {username: "admin warung 88", tanggal: new Date(), pesanan: [["nasi", 1], ["ayam kuluyuk madu", 1]], totalHarga: 14000, buktiPembayaran: "buktipembayaran1.png", kode: 1476, status: "selesai"},
        {username: "admin warung 88", tanggal: new Date(), pesanan: [["nasi", 1], ["ayam kuluyuk madu", 3], ["kangkung", 2]], totalHarga: 38000, buktiPembayaran: "buktipembayaran1.png", kode: 1109, status: "belum"}
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
