
module.exports = (req, res, next) => {

    //cookie sencilla de mantenerme logeado
    if (req.cookies['_rememberUser_']) {
        //lo logeo si la cookie esta buena
        req.session.logeado = true;
        req.session.userEmail = req.cookies['_rememberUser_'];
    }

    next();
}