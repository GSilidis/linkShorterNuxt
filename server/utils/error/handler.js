/**
 * Generate response with error
 * @param {Error} error Error object
 * @param {Object} res Express res
 */
module.exports = (error, res) => {
    res.status(error.code || 500).json({
        detail: error.toString(),
    });
};
