import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';

class Team extends Model<InferAttributes<Team>,
InferCreationAttributes<Team>> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true, // tem a mesma função do snakeze
});

export default Team;
