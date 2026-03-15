describe('Product Categories', () => {
  beforeEach(() => {
    cy.visit('/', {failOnStatusCode: false});
    cy.verifyURL();
  });

  it('View Category Products', () => {
    cy.get('.left-sidebar').inContainer('CATEGORY');
    cy.contains('.panel-title a', 'Women').click();
    cy.clickLink('/category_products/1');
    cy.contentPage('WOMEN - DRESS PRODUCTS');
    cy.contains('.panel-title a', 'Men').click();
    cy.clickLink('/category_products/3');
    cy.contentPage('MEN - TSHIRTS PRODUCTS');
  });

  it('View and Cart Brand Products', () => {
    cy.clickLink('/products');
    cy.get('.brands_products').inContainer('BRANDS');
    cy.clickLink('/brand_products/Polo');
    cy.get('.features_items')
      .inContainer('BRAND - POLO PRODUCTS')
      .contains('Rs').should('be.visible')
    ;
    cy.contains('a', 'Add to cart')
    cy.contains('a', 'View Product')
    cy.clickLink('/brand_products/H&M');
    cy.get('.features_items')
      .inContainer('BRAND - H&M PRODUCTS')
      .contains('Rs').should('be.visible')
    ;
    cy.contains('a', 'Add to cart')
    cy.contains('a', 'View Product')

  });
})