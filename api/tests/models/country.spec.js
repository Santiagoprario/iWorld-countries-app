const { Country,Activities, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });

    });
  });
});

describe('Activity model', () => {
  
  describe('Validators', () => {
    beforeEach(() => Activities.sync({ force: true }));
    describe('name', () => {

      it('should throw an error if name is number', (done) => {
        Activities.findOrCreate({name:12})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should work when its a valid name', () => {
        Activities.create({ name: 'Skii' });
      });

      it('should throw an error if season was incorrect',(done) => {
        Activities.findOrCreate({name: 'Ski' , season:'nada'})
          .then(() => done(new Error('It requires a valid season')))
          .catch(() => done());
      })
      it('should work when its a valid season', () => {
        Activities.create({ name: 'Skii' , season:'verano' });
      });

    
    });
  });
});
