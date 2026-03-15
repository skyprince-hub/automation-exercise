describe('Add Reviews', () => {
  beforeEach(() => {
    cy.visit('/', {failOnStatusCode: false});
    cy.verifyURL();
    cy.fixture('user').as('users');
  });
  
  it('Add Review on Product', function() {
    const {existingUser} = this.users;

    cy.clickLink('/products');
    cy.get('.features_items').inContainer('ALL PRODUCTS');
    cy.clickLink('/product_details/1');
    cy.get('#review').should('have.attr', 'placeholder', 'Add Review Here!');
    cy.get('#name').type(existingUser.name);
    cy.get('#email').type(existingUser.email);
    cy.get('#review').type('This is a review from Cypress!');
    cy.clickButton('button-review', 'id');
    cy.contentPage('Thank you for your review.')
  })
})