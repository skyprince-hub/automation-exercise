describe('Verify Test Cases Page', () => {

  beforeEach(() => {
    cy.visit('/', {failOnStatusCode: false});
  })

  it('should display all test cases', () => {
    cy.verifyURL();
    cy.contentPage('AutomationExercise');
    cy.clickLink('/test_cases');
    cy.verifyURL('test_cases');
  })
})