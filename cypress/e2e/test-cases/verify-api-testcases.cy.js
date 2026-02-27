describe('Verify API Testing Page', () => {

  beforeEach(() => {
    cy.visit('/', {failOnStatusCode: false});
  })

  it('should display all api test to practice', () => {
    cy.verifyURL();
    cy.contentPage('AutomationExercise');
    cy.clickLink('/api_list');
    cy.verifyURL('api_list');
  })
})