module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'diary', // 테이블 이름
        {
            // Columns
            contents: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false,
        }
    )
};