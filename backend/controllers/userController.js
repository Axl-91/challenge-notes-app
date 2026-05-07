import * as userService from '../services/userService.js';

export async function getUser(req, res) {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, email: user.email });
}

export async function updateUser(req, res) {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ id: user.id, email: user.email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

