const requireAuth = (req, res, next) => {
    const exemptRoutes = ['/login', '/register'];

    // Check if the current route is exempt
    if (exemptRoutes.includes(req.path)) {
        next();
    } else {
        // Perform authentication check for other routes
        if (req.session.userID) {
            next();
        } else {
            res.redirect('/login');
        }
    }
};

export default requireAuth;