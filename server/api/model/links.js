/**
 * Links
 *
 * @param {Sequelize} db
 * @param {Sequelize.DataTypes} DataTypes
 */
module.exports = (db, DataTypes) => {
    db.define('Links', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
        },
        short_link: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        original_link: {
            type: DataTypes.STRING(2048),
            allowNull: false,
        },
        statistics_link: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
    }, {
        schema: 'links',
        tableName: 'links',
    });
};
