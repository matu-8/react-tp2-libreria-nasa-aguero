import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Favorite = sequelize.define(
  'Favorite',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    hdurl: {
      type: DataTypes.TEXT,
    },
    explanation: {
      type: DataTypes.TEXT,
    },
    media_type: {
      type: DataTypes.STRING,
    },
    note: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
  },
  {
    timestamps: true, // Agrega columnas createdAt y updatedAt automáticamente
  }
);

export default Favorite;
