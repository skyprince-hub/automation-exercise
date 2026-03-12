describe('Verify Products', () => {

  beforeEach(() => {
    cy.fixture('product').as('products');
    cy.fixture('user').as('users');
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

  it('Search Product', () => {
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

  it.only('Search Products and Verify Cart After Login', function() {
    const {womensProduct} = this.products;
    const {existingUser} = this.users;

    cy.clickLink('/products');
    cy.contentPage('ALL PRODUCTS');
    cy.get('#search_product').type(womensProduct.name);
    cy.clickButton('submit_search', 'id');
    cy.contentPage('SEARCHED PRODUCTS');
    cy.clickButton('add-to-cart', 'class')
    //cy.clickLink('/view_cart');
    cy.clickButton('close-modal', 'class');
    cy.clickLink('/view_cart');
    cy.contentPage(womensProduct.name);
    cy.clickLink('/login')
    cy.login(existingUser.email, existingUser.password);
    cy.clickLink('/view_cart');
    cy.contentPage(womensProduct.name);
  })
})