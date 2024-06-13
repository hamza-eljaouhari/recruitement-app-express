import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';

// These are all the attributes in the User model
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  type: 'candidate' | 'recruiter'; // Add type field
  googleId?: string; // Add Google ID field
  linkedinId?: string; // Add LinkedIn ID field
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'password'> {}

// We need to declare the static model so `Model` knows about `UserAttributes` and `UserCreationAttributes` models
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public type!: 'candidate' | 'recruiter'; // Add type field
  public googleId?: string; // Add Google ID field
  public linkedinId?: string; // Add LinkedIn ID field

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
    allowNull: true, // Allow null for OAuth users
  },
  type: {
    type: DataTypes.ENUM('candidate', 'recruiter'),
    allowNull: false,
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  linkedinId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
}, {
  sequelize,
  tableName: 'users',
});

export default User;
