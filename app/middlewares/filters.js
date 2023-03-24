

//pagination middleware
exports.paginate = (req, res, next) => {
    req.pagination = {};
    req.pagination.page = parseInt(req.query.page) //|| 1; //page number
    req.pagination.limit = parseInt(req.query.limit) //|| 10; //page size

    next();
}

//dynamic filter
exports.dynamicFilter = (req, res, next) => {
    const {field, value} = req.query;
    req.filterData = {[field]: value} || {};
    console.log("filteredData",req.filterData)

    next();
}
