module.exports = (err) => {
    let errors = []
    if (err.name === 'MongoError') {
       errors.push('Unknown error');
    } else if (err.name === 'ValidationError' && err.errors !== undefined) {
        for(let e of Object.values(err.errors)) {
            if (e.properties !== undefined) {
                errors.push(e.properties.message || 'Unknown error');
            }
        }
   } else {
       errors.push(err.message || 'Unknown error');
   }
    return {
       errors: errors
    };
};