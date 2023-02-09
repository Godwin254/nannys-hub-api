

//pagination middleware
exports.paginate = function(req, res, next) {
    req.pagination = {};
    req.pagination.page = parseInt(req.query.page) || 1; //page number
    req.pagination.limit = parseInt(req.query.limit) || 10; //page size

    next();
}
