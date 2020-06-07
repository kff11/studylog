module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'user',
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },

            admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },

            id: {
                type: DataTypes.STRING(20),
                allowNull: false
            },

            password: {
                type: DataTypes.STRING(80),
                allowNull: false
            },

            name: {
                type: DataTypes.STRING(25),
                allowNull: false,
                defaultValue: 0
            },

            signUp_date: {
                type: DataTypes.DATE,
                allowNull: false
            },

            mento: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },

            refreshToken: {
                type: DataTypes.STRING(200),
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