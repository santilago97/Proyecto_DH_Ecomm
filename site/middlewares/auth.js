module.exports = function authMdw (req, res, next) {

	if (!req.session.logeado) {
		return res.redirect('/auth/login');
  }
    
  next();  
}