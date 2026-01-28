export const notFoundHandler = ((req, res) => {
  res.status(404).json({ msg: 'route not found' });
});
