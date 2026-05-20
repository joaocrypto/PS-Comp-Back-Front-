const convertType = (req, res, next) => {

    if (req.body.ano) {
        req.body.ano = Number(req.body.ano);
    }

    next();
};

module.exports = convertType;