describe('Subscriptions', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.verifyURL();
    cy.fixture('user').as('users');
  });

  it('Verify Subscription in Home Page', function() {
    const {existingUser} = this.users;

    cy.contentPage('AutomationExercise');
    cy.get('#footer').inContainer('Subscription')
    cy.get('#susbscribe_email').type(existingUser.email);
    //cy.clickButton('subscribe', 'id');
    cy.get('.searchform').submit();
    cy.get('#success-subscribe', {timeout:10000})
      .should('be.visible')
      .and('contain', 'You have been successfully subscribed!');
  });

  it('Verify Subscription in Cart Page', function() {
    const {existingUser} = this.users;
    cy.contentPage('AutomationExercise');
    cy.clickLink('view_cart');
    cy.get('#footer').inContainer('Subscription')
    cy.get('#susbscribe_email').type(existingUser.email);
    //cy.clickButton('subscribe', 'id');
    cy.get('.searchform').submit();
    cy.get('#success-subscribe', {timeout:10000})
      .should('be.visible')
      .and('contain', 'You have been successfully subscribed!');
  })
})