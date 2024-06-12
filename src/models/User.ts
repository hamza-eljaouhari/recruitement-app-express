import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

// These are all the attributes in the User model
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// We need to declare the static model so `Model` knows about `UserAttributes` and `UserCreationAttributes` models
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    User.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: 'users',
    });
  }
}

export default User;
