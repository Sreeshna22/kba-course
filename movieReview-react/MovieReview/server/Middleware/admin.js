

const adminCheck = (req, res, next) => {
  if (req.user?.userRole === "admin") {
    next();
  } else {
    res.status(403).json({ msg: "You are not allowed" });
  }
};

export default adminCheck;
