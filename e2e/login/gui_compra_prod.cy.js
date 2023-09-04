/// <reference types = "Cypress"/>

describe('Teste E2E - Realizando a compra de produtos com sucesso', () => {
    it('Fluxo da compra de produtos', () => {
        cy.login_teste('standard_user', 'secret_sauce')
        cy.get('.title').should('contain', 'Products')

        // Ordenação de produtos de menor para maior valor:
        cy.get('[data-test="product_sort_container"]').select('Price (low to high)')
        // Validação da ordenação desses produtos:
        cy.get(':nth-child(1) > .inventory_item_description').should('contain', 'Sauce Labs Onesie')
        cy.get(':nth-child(2) > .inventory_item_description').should('contain', 'Sauce Labs Bike Light')
        cy.get(':nth-child(3) > .inventory_item_description').should('contain', 'Sauce Labs Bolt T-Shirt')

        // Adicionando produtos ao carrinho:
        cy.contains('Sauce Labs Onesie').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bike Light').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bolt T-Shirt').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        // Checagem na quantidade de itens no carrinho:
        cy.get('.shopping_cart_link').should('have.text', '3')
        // Check no carrinho:
        cy.get('.shopping_cart_link').click()
        cy.verificaProdutos()

        // Checkout:
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Teste Primeiro Nome')
        cy.get('[data-test="lastName"]').type('Teste Segundo Nome')
        cy.get('[data-test="postalCode"]').type('04137000')
        cy.get('[data-test="continue"]').click()

        // Verificando produtos no checkout:
        cy.verificaProdutos()

        // Checagem no valor total:
        cy.get('.summary_total_label').should('have.text', 'Total: $36.69')
        cy.get('[data-test="finish"]').click()
        cy.get('.complete-header').should('have.text', 'Thank you for your order!')
    });
});