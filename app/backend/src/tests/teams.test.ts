import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import Team from '../database/models/TeamsModel';
// @ts-ignore
import chaiHttp = require('chai-http');



chai.use(chaiHttp);

const { expect } = chai;


const mockAllTeams = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
]

describe('Testando a rota teams', () => {

  it('Verifica se retorna todos os times', async () => {
    sinon.stub(Team, 'findAll').resolves(mockAllTeams as any);

    const result = await chai.request(app).get('/teams');
    
    expect(result.status).to.equal(200);
    expect(result.body).to.deep.equal(mockAllTeams);
  });

});
