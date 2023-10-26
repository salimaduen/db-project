import { DataTypes, Model } from 'sequelize';
import { database as sequelize} from '../../database.js';

class User extends Model {
    static async getAllUsers() {
        try {
            const results = await sequelize.query(`SELECT * FROM ${User.tableName}`);
            console.log(results);
        } catch (error) {
            throw new Error('Error: ' + error.message);
        }
    }
}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
    // DB sequelize instance
    sequelize: sequelize,
    modelName: 'User',
    tableName: 'users'
    }
);

await User.sync()
.then( () => {
    console.log('Table ' + User.tableName + ' has been succesfully created');
})
.catch((err) => {
    console.log('Error creating table: ' + err);
});

export default User;