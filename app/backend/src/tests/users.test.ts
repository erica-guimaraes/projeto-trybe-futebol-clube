import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import { app } from '../app';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { mockToken, mockUserCorrect, mockUserWithoutEmail, mockUserWithoutPassword } from './mocks/usersMocks';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes referente à users', () => {
  it('Verifica se é retornado um token, caso o login for feito com sucesso', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves( mockUserCorrect as any);
    sinon.stub(jwt, 'sign').returns(mockToken as any);

    const result = await chai.request(app).post('/login');
    
    expect(result.status).to.equal(200);
    expect(result.body).to.deep.equal(mockToken);
  });

  it('Verifica se é retornado um erro, caso o campo email não seja informado na requisição', async () => {
    sinon.stub(SequelizeUsers, 'findAll').resolves(mockUserWithoutEmail as any);

    const result = await chai.request(app).post('/login');
    
    expect(result.status).to.equal(400);
    expect(result.body).to.deep.equal({ "message": "All fields must be filled" });
  });

  it('Verifica se é retornado um erro, caso o campo password não seja informado na requisição', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mockUserWithoutPassword as any);

    const result = await chai.request(app).post('/login');
    
    expect(result.status).to.equal(400);
    expect(result.body).to.deep.equal({ "message": "All fields must be filled" });
  });

});
