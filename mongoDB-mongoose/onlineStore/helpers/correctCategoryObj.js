function correctResult({ _id, title, subcategories }) {
    return {
        id: _id,
        title: title,
        subcategories: subcategories.map(element => {
            return {
                title: element.title,
                id: element._id
            }
        })
    }
}

module.exports = correctResult;