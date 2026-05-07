import session from 'express-session'
import pool from './db.js'
import connectPgSimple from 'connect-pg-simple'

const PgSession = connectPgSimple(session);

const sessionConfig = {
  store: new PgSession({
    pool: pool,
    tableName: 'session',
    createTableIfMissing: true,
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60
  },
}

export default sessionConfig
