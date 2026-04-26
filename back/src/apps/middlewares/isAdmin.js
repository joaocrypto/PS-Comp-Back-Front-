const verifyAdmin = (req, res, next) => {
    if (req.usuarioIsAdmin !== 'admin') {
        return res.status(403).json({ error: 'Acesso restrito a administradores.' });
    }
    return next();
}

module.exports = verifyAdmin;