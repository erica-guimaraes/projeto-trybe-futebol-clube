import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import JWT from '../utils/JWT';
import { mockAllMatches, mockAndMatche, mockFinishedMatches, mockInProgressMatches } from './mocks/matchesMocks';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /matches', () => {

  it('Verifica se retorna todos as partidas', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(mockAllMatches as any);

    const result = await chai.request(app).get('/matches');
    
    expect(result.status).to.equal(200);
    expect(result.body).to.deep.equal(mockAllMatches);
  });

  it('Verifica se retorna somente as paridas em andamento', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(mockInProgressMatches as any);

    const result = await chai.request(app).get('/matches');
    
    expect(result.status).to.equal(200);
    expect(result.body).to.deep.equal(mockInProgressMatches);
  });

  it('Verifica se retorna somente as paridas finalizadas', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(mockFinishedMatches as any);

    const result = await chai.request(app).get('/matches');
    
    expect(result.status).to.equal(200);
    expect(result.body).to.deep.equal(mockFinishedMatches);
  });

  it('Verifica se é possível finalizar uma partida', async () => {
    sinon.stub(SequelizeMatches, 'findByPk').resolves(mockInProgressMatches[1] as any);
    sinon.stub(SequelizeMatches, 'update').resolves(mockAndMatche as any);
    sinon.stub(JWT, 'verify').resolves();

    const result = await chai.request(app).patch('/matches/:id/finish')
    .set('authorization', 'validToken')
    .send({id: 41});
    
    expect(result.status).to.equal(200);
    expect(result.body).to.deep.equal({ "message": "Finished" });
  });
});
