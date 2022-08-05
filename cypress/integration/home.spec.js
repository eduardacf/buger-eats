describe('home page',()=> { 
    it('Website must be visible',() => {
        cy.viewport(1440,900)
        cy.visit('https://buger-eats-qa.vercel.app')
        cy.get('#page-home main h1').should('have.text','Seja um parceiro entregador pela Buger Eats')
    })

})