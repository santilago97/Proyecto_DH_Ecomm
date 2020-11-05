module.exports = function guestMdw (req, res, next) {

	if (req.session.logeado) {
		return res.redirect('/auth/profile');
  }

  next();  
}