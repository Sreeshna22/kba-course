



const adminCheck = (req, res, next) => {
  if (!req.user) return res.status(401).send("Unauthorized access");

  if (req.user.role !== "admin") {
    return res.status(403).send("Forbidden: Admins only");
  }
  next();
};

export default adminCheck;
