/**
 * Statistics
 *
 * @param {Sequelize} db
 * @param {Sequelize.DataTypes} DataTypes
 */
module.exports = (db, DataTypes) => {
    db.define('Stats', {
        record_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
        },
        link_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            unique: 'Statistics_UN',
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            unique: 'Statistics_UN',
        },
        click_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    }, {
        schema: 'links',
        tableName: 'statistics',
    });
};
