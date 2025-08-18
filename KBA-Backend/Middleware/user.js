function usercheck(req, res, next) {
    if (req.role === 'user') {
        next(); 
    } else {
        res.status(403).json({ Msg: "Access denied: Only users allowed" });
    }
}

export default usercheck;







