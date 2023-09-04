/// <reference types = "Cypress"/>

describe('Teste Funcional de login', () => {
    it('Deve realizar o login com sucesso', () => {
        cy.login_teste('standard_user', 'secret_sauce')
        cy.get('.title').should('contain', 'Products')

    });

    it('Validar Login Incorreto', () => {
        cy.login_teste('incorreto', 'secret_sauce')
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    });

    it('Validar Senha Incorreta', () => {
        cy.login_teste('standard_user', 'incorreta')
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    });
});