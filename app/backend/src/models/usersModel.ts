import { IUser } from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import SequelizeUsers from '../database/models/SequelizeUsers';

export default class UsersModel implements IUserModel {
  private model = SequelizeUsers;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}
