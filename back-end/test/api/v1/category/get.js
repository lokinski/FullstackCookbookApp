const chai = require('chai');
const http = require('chai-http');
const app = require('../../../../src/index');

chai.use(http);
chai.should();

describe("GET /api/v1/categories/", () => {
    it('Powinno zwrócić wszystkie kategorie', (done) => {
        chai.request(app).get('/api/v1/categories/').end((_, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            done();
        });
    });

    it('Powinno zwrócić kategorię "dania"', (done) => {
        const specificCategoryId = "60d4b8c16314fe17c8557440";

        chai.request(app).get(`/api/v1/categories/${specificCategoryId}`).end((_, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object').that.have.property('name', 'dania');
            done();
        });
    });

    it('Powinno zwrócić brak danej kategorii', (done) => {
        const wrongCategoryId = "60d4b8c16314fe17c8557442";

        chai.request(app).get(`/api/v1/categories/${wrongCategoryId}`).end((_, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object').that.have.property('errors');
            done();
        });
    });
});