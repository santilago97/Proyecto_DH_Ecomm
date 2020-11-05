const tokenService = require('./tokenService');

module.exports = {

    minutesPerSession : 600000,
    restartSessionTime: function (req) {
        let date = new Date(Date.now() + this.minutesPerSession);

        req.session.cookie.expires = date;
    },
    loginUser: function (req, res, user) {

        let date = new Date(Date.now() + this.minutesPerSession);

        req.session.cookie.expires = date;
        req.session.cookie.maxAge = this.minutesPerSession;

        res.locals.logeado = true;
        res.locals.user = user;
        req.session.logeado = true;
        req.session.user = user;
        req.session.userEmail = req.body.email

    },
    
    rememberUser: function (user) {

    },
    logOutSession: function (req, res) {

        req.session.destroy(function(){

            req.session = null;

            res.clearCookie('recordame', { path: '/' });
            //res.clearCookie('_rememberUser_', { path: '/' });
            //res.clearCookie('connect.sid', { path: '/' });
            res.redirect('/');
    
        });

    }
}
