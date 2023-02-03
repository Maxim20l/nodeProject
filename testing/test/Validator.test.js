const Validator = require('../Validator');
const expect = require('chai').expect;

describe('testing-configuration-logging/unit-tests', () => {
    describe('Validator', () => {
        it('валидатор проверяет строковые поля', () => {

            const validator = new Validator({
                name: {
                    type: 'string',
                    min: 5,
                    max: 10,
                },
                age: {
                    type: 'number',
                    min: 18,
                    max: 27,
                }
            });

            const errors = validator.validate({ name: 'Lalala' });

            expect(errors).to.have.length(1);
            expect(errors[0]).to.have.property('field').and.to.be.equal('name');
            expect(errors[0]).to.have.property('error').and.to.be.equal('');
        });
        it('валидатор проверяет строковые поля на помилку якщо менше', () => {

            const validator = new Validator({
                name: {
                    type: 'string',
                    min: 5,
                    max: 10,
                },
                age: {
                    type: 'number',
                    min: 18,
                    max: 27,
                }
            });

            const errors = validator.validate({ name: 'Lal' });

            expect(errors).to.have.length(1);
            expect(errors[0]).to.have.property('field').and.to.be.equal('name');
            expect(errors[0]).to.have.property('error').and.to.be.equal('too short, expect 5, got 3');
        });
        it('валидатор проверяет строковые поля на помилку якщо більше', () => {

            const validator = new Validator({
                name: {
                    type: 'string',
                    min: 5,
                    max: 10,
                },
                age: {
                    type: 'number',
                    min: 18,
                    max: 27,
                }
            });

            const errors = validator.validate({ name: 'Lalфдфдфдфд' });

            expect(errors).to.have.length(1);
            expect(errors[0]).to.have.property('field').and.to.be.equal('name');
            expect(errors[0]).to.have.property('error').and.to.be.equal('too large, expect 10, got 11');
        });
        it('валидатор проверяет строковые поля на помилку якщо не той тип', () => {

            const validator = new Validator({
                name: {
                    type: 'string',
                    min: 5,
                    max: 10,
                },
                age: {
                    type: 'number',
                    min: 18,
                    max: 27,
                }
            });

            const errors = validator.validate({ name: 8 });

            expect(errors).to.have.length(1);
            expect(errors[0]).to.have.property('field').and.to.be.equal('name');
            expect(errors[0]).to.have.property('error').and.to.be.equal('wrong type, expect string');
        });
        it('валидатор проверяет числові поля', () => {

            const validator = new Validator({
                name: {
                    type: 'string',
                    min: 5,
                    max: 10,
                },
                age: {
                    type: 'number',
                    min: 18,
                    max: 27,
                }
            });

            const errors = validator.validate({ age: 19 });

            expect(errors).to.have.length(1);
            expect(errors[0]).to.have.property('field').and.to.be.equal('age');
            expect(errors[0]).to.have.property('error').and.to.be.equal('');
        });
        it('валидатор проверяет числові поля на помилку якщо число менше ліміта', () => {

            const validator = new Validator({
                name: {
                    type: 'string',
                    min: 5,
                    max: 10,
                },
                age: {
                    type: 'number',
                    min: 18,
                    max: 27,
                }
            });

            const errors = validator.validate({ age: 9 });

            expect(errors).to.have.length(1);
            expect(errors[0]).to.have.property('field').and.to.be.equal('age');
            expect(errors[0]).to.have.property('error').and.to.be.equal('too small, exect 18, got 9');
        });
        it('валидатор проверяет числові поля на помилку якщо число перевищує ліміт', () => {

            const validator = new Validator({
                name: {
                    type: 'string',
                    min: 5,
                    max: 10,
                },
                age: {
                    type: 'number',
                    min: 18,
                    max: 27,
                }
            });

            const errors = validator.validate({ age: 54 });

            expect(errors).to.have.length(1);
            expect(errors[0]).to.have.property('field').and.to.be.equal('age');
            expect(errors[0]).to.have.property('error').and.to.be.equal('too big, expect 27, got 54');
        });
        it('валидатор проверяет числові поля на помилку якщо не той тип', () => {

            const validator = new Validator({
                name: {
                    type: 'string',
                    min: 5,
                    max: 10,
                },
                age: {
                    type: 'number',
                    min: 18,
                    max: 27,
                }
            });

            const errors = validator.validate({ age: 'ksjd' });

            expect(errors).to.have.length(1);
            expect(errors[0]).to.have.property('field').and.to.be.equal('age');
            expect(errors[0]).to.have.property('error').and.to.be.equal('wrong type, expected number');
        });
    });
});