// server.js
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;

// MongoDB Connection Settings
const dbName = 'COMP322-Hawkins'; // Replace with your last name
const mongoConfig = {
    host: 'comp322-hawkins-shard-00-00.5pc0r.mongodb.net',
    port: '27017',
    username: 'nhawkins',
    password: 'wyaVSz8NYvvqKgyy'
};

const getMongoURI = () => {
    if (mongoConfig.username && mongoConfig.password) {
        return `mongodb://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}`;
    }
    return `mongodb://${mongoConfig.host}:${mongoConfig.port}`;
};

const url = 'mongodb+srv://nhawkins:wyaVSz8NYvvqKgyy@comp322-hawkins.5pc0r.mongodb.net/?retryWrites=true&w=majority&appName=COMP322-Hawkins';

app.use(express.json());
app.use(express.static('public'));

// Serve student.html at both root path and /student.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'student.html'));
});

// MongoDB Connection
let db;
async function connectDB() {
    try {
        const client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        db = client.db(dbName);
        console.log('Connected to MongoDB successfully');
        
        if (!(await db.listCollections({name: 'student'}).toArray()).length) {
            await db.createCollection('student');
            console.log('Created student collection');
        }
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}
connectDB();

// POST handler- Create new student
app.post('/api/student', async (req, res) => {
    try {
        const student = req.body;
        const existingStudent = await db.collection('student').findOne({ studentId: student.studentId });
        if (existingStudent) {
            return res.status(400).json({ error: 'Student ID already exists' });
        }
        
        await db.collection('student').insertOne(student);
        res.json({ message: 'Student added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET handler- Find student by ID
app.get('/api/student/:id', async (req, res) => {
    try {
        const student = await db.collection('student').findOne({ studentId: req.params.id });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT handler- Update student by ID
app.put('/api/student/:id', async (req, res) => {
    try {
        const result = await db.collection('student').updateOne(
            { studentId: req.params.id },
            { $set: req.body }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE handler - Delete student by ID
app.delete('/api/student/:id', async (req, res) => {
    try {
        const result = await db.collection('student').deleteOne({ studentId: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});