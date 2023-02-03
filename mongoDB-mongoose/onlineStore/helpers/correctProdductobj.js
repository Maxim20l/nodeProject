module.exports = function correctProductObj({ _id, title, description, price, category, subcategory, images }) {
    return {
        product: [
            {
                id: _id,
                title: title,
                decription: description,
                price: price,
                category: category,
                subcategory: subcategory,
                images: images
            }
        ]
    }
}