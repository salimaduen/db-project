import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
    // DB sequelize instance
    sequelize,
    modelName: 'User',
    tableName: 'users'
    }
);

export default User;