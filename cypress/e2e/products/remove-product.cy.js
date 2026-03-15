describe('Removing of Products', () => {
  beforeEach(() => {
    cy.visit('/', {failOnStatus: false});
    cy.verifyURL();
    cy.fixture('product').as('products');
  });
  it('Remove Products From Cart', function() {
    const {firstProduct} = this.products;

    cy.contentPage('AutomationExercise');
    cy.clickButton('1', 'data-product-id');
    cy.clickButton('modal', 'data-dismiss');
    cy.clickLink('/view_cart');
    cy.get('tr#product-1')
      .inContainer(firstProduct.name)
      .inContainer(firstProduct.price)
    ;
    cy.clickButton('1','data-product-id');
    cy.contentPage('Cart is empty!');
  })
})