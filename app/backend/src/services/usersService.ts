import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IToken } from '../Interfaces/Users/IToken';
import { IUser } from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import UsersModel from '../models/usersModel';
import JWT from '../utils/JWT';

export default class UsersService {
  private usersModel: IUserModel;

  constructor() {
    this.usersModel = new UsersModel();
  }

  async loginUser(email: IUser['email'], password: IUser['password']):
  Promise<ServiceResponse<IToken>> {
    const emailValid = await this.usersModel.findByEmail(email);

    if (!emailValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const passwordValid = await bcrypt.compare(password, emailValid.password);

    if (!passwordValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = JWT.create({ id: emailValid.id, email: emailValid.email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  async userRole(email: IUser['email']): Promise<ServiceResponse<{ role: string }>> {
    const user = await this.usersModel.findByEmail(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid user' } };
    }

    return { status: 'SUCCESSFUL', data: { role: user?.role } };
  }
}
