import * as userService from '../services/userService.js'
import bcrypt from 'bcrypt';

export async function getSession(req, res) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" })
  }

  const user = await userService.getUserById(req.session.userId)
  res.json({ id: user.id, email: user.email, name: user.name })
}

export async function registerUser(req, res) {
  try {
    const user = await userService.createUser(req.body);

    // Store the userID on the session
    req.session.userId = user.id

    req.session.save(err => {
      if (err) {
        console.error("Failed to save session:", err);
        return res.status(500).send("Could not save session");
      }
      res.status(200).json({ message: "Logged in successfully" });
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  const user = await userService.getUserByEmail(req.body.email)

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid Credentials' })
  }

  req.session.userId = user.id

  res.status(200).json({ message: 'Logged in successfully' })

}

export async function logout(req, res) {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error: ', err)
      return res.status(500).json({ error: 'Logout failed' })
    }

    res.clearCookie('connect.sid')
    res.status(200).json({ message: 'Logged out successfully' })
  })
}
