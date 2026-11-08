import express from 'express'
import subjectsRouter from './routes/subjects';
import cors from 'cors';

const app = express()
const PORT = 8000;

if(!process.env.FRONTEND_URL) throw new Error("Frontend url is not set in .env file")
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials : true
}))
app.use('/api/subjects', subjectsRouter)

app.get('/', (req, res) => {
  res.send('Classroom api');
});

app.listen(PORT, () => {
  console.log(`Server is running in port : ${PORT}`)
});