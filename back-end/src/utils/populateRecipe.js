module.exports = (recipe, exec = true) => {
    let r = recipe
        .populate("addedBy", { _id: 0, username: 1 })
        .populate("ingredients.ingredient", { name: 1 })
        .populate("ingredients.unit", { name: 1, shortcut: 1 })
        .populate("category", { name: 1 })
        .populate("cuisine", { name: 1 });
    
    return exec ? r.execPopulate() : r;
};