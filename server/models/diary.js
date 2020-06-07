module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'diary',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            user_name: {
                type: DataTypes.STRING(25),
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            contents: {
                type: DataTypes.STRING(300),
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false
            },
        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false,
        }
    )
};