module.exports = function publishMdw (req, res, next) {

	if (!req.session.logeado) {
		return res.redirect('/auth/login');
  } else {

  }
    
  next();  
}