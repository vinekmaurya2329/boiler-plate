class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search(key) {
        const keyword = this.queryStr.keyword ? {
            [key]: {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        } : {}

        console.log("keyword", keyword);
        this.query = this.query.find({...keyword});
        return this;
    }

    filter() {
        const queryCopy = {...this.queryStr}

        // Removing field for category
        const removeFields = ["keyword", "currentPage", "resultPerPage"];
        removeFields.forEach(key => delete queryCopy[key]);

        // filter for price
        let querystr = JSON.stringify(queryCopy);
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(querystr));
        return this;
    }

    pagination() {
        const currentPage = Number(this.queryStr.currentPage);
        const resultPerPage = Number(this.queryStr.resultPerPage);

        const skip = resultPerPage * (currentPage - 1);
        
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    } 
}

module.exports = APIFeatures