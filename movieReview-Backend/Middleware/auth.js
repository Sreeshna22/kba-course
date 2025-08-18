
import jwt from 'jsonwebtoken';

function authenticate(req, res, next) {
    const cookie = req.headers.cookie;
    console.log(cookie);

    if (cookie) {
        const cookiesArray = cookie.trim().split(';'); 
        const [name, token] = cookiesArray[0].trim().split('='); 
        console.log("name", name);
        console.log("Token", token);

        if (name === 'authtoken') {
            const decode = jwt.verify(token, process.env.secret_key);
            console.log(decode);
            req.name = decode.UserName;
            req.role = decode.UserRole;
            next();         
        } else {
            res.status(401).json({ msg: 'unauthorized access' });
        }
    } else {
        res.status(404).json({ msg: 'cookie not found' });
    }




} export { authenticate };
                         


