const { decryptedToken } = require('../../utils/token');
const { decrypt } = require('../../utils/crypt');

const verifyJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não encontrado!'})
    }

    try {
        const { userId, isAdmin} = await decryptedToken(authHeader);
        req.userId = parseInt(decrypt(userId));
        req.userIsAdmin = isAdmin;

        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Não autorizado!'});
    }
}

module.exports = verifyJwt;