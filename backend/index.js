import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import authRouter from './routes/authRoutes.js'
import noteRoutes from './routes/noteRoutes.js'

import session from 'express-session'
import sessionConfig from './config/session.js'

const app = express()
const port = process.env.SERVER_PORT

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use(session(sessionConfig));

app.use('/api/auth', authRouter)
app.use('/api/notes', noteRoutes)

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
