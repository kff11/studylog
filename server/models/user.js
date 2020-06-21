module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },

            admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },

            user_id: {
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
            },

            email: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },

            phone: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },

            state: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },

            mento: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },

            signUp_date: {
                type: DataTypes.DATE,
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