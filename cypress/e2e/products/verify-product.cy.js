describe('Verify Products', () => {

  beforeEach(() => {
    cy.visit('/', { failOnStatusCode: false});
  });

  it('Verify All Products and product detail page ', () => {
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

  it.only('Search Product', () => {
    cy.verifyURL();
    cy.contentPage('AutomationExercise');
    cy.clickLink('/products');
    cy.contentPage('ALL PRODUCTS');
    // fixture/product.json for fixed, static set of test data
    cy.fixture('product').then(({mensProduct}) => {
      cy.get('#search_product').type(mensProduct.name);
      cy.clickButton('submit_search', 'id');
    });
    cy.contentPage('SEARCHED PRODUCTS');
    cy.get('.features_items').inContainer('Tshirt');
  });

  it('Search Products and Verify Cart After Login', () => {
    //fixtures can be found in the fixture/user.json
    cy.fixture('user').then(({existingUser}) => {
        cy.login(existingUser.email, existingUser.password);
    });
  })
})