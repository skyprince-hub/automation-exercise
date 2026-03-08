describe('Verify Products', () => {

  beforeEach(() => {
    cy.visit('/', { failOnStatusCode: false});
  });

  it.only('Verify All Products and product detail page ', () => {
    cy.verifyURL();
    cy.contentPage('AutomationExercise');
    cy.clickLink('/products');
    cy.contentPage('ALL PRODUCTS');
    cy.get('.features_items').within(() => {
      cy.contentPage('Rs');
    });
    cy.clickLink('/product_details');
    cy.verifyURL('product_details/');
    cy.get('.product-information')
      .inContainer('Category')
      .inContainer('Rs')
      .inContainer('Availability')
      .inContainer('Condition')
      .inContainer('Brand');
  });

  it('Search Product', () => {

  });

  it('Search Products and Verify Cart After Login', () => {
    cy.fixtures('user').then(({existingUser}) => {
        cy.login(existingUser.email, existingUser.password);
    });
  })
})