module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'test',
        {
            post: {
                type: DataTypes.STRING(200),
                allowNull : true
            },
        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false,
        }
    )};