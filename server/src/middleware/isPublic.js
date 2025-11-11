
export async function isPublic(req, res, next) {
    if (req.user && req.user.isLoggedIn) {
        // Galime siųsti status success + user info
        return res.json({
            status: 'already_logged_in',
            msg: 'You are already logged in',
            user: {
                email: req.user.email,
                id: req.user.id
            }
        });
    }
    return next();
}