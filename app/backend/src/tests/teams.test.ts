import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { mockAllTeams, mockIdTeam } from './mocks/teamsMocks';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /teams', () => {

  it('Verifica se retorna todos os times', async () => {
    sinon.stub(SequelizeTeams, 'findAll').resolves(mockAllTeams as any);

    const result = await chai.request(app).get('/teams');
    
    expect(result.status).to.equal(200);
    expect(result.body).to.deep.equal(mockAllTeams);
  });

  it('Verifica se retorna dados de um time específico', async () => {
    sinon.stub(SequelizeTeams, 'findOne').resolves(mockIdTeam as any);

    const result = await chai.request(app).get('/teams/:id');
    
    expect(result.status).to.equal(200);
    expect(result.body).to.deep.equal(mockIdTeam);
  });

});
