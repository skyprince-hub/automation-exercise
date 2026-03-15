describe('Product Categories', () => {
  beforeEach(() => {
    cy.visit('/', {failOnStatusCode: false});
    cy.verifyURL();
  });

  it.only('View Category Products', () => {
    cy.get('.left-sidebar').inCointainer('CATEGORY');
    cy.contains('.panel-title a', 'Women').click();
    cy.clickLink('/category_products/1');
    cy.contentPage('WOMEN - DRESS PRODUCTS');
    cy.contains('.panel-title a', 'Men').click();
    cy.clickLink('/category_products/3');
    cy.contentPage('MEN - TSHIRTS PRODUCTS');
  });

  it('View and Cart Brand Products', () => {

  });
})