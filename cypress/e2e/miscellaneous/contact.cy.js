describe('Contacts', () => {
  beforeEach(() => {
    cy.visit('/', {failOnStatus: false});
    cy.verifyURL();
    cy.fixture('user').as('users');
  });
  it('Contact Us Form', function() {
    const {existingUser} = this.users;

    cy.contentPage('AutomationExercise');
    cy.clickLink('/contact_us');
    cy.contentPage('GET IN TOUCH');
    cy.contentPage('FEEDBACK FOR US');
    cy.get('[data-qa="name"]').type(existingUser.name);
    cy.get('[data-qa="email"]').type(existingUser.email);
    cy.get('[data-qa="subject"]').type('Cypress Concerns');
    cy.get('[data-qa="message"]')
      .type('I am practicing AutomationExercise using Cypress!');
    cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/images/data-test-img.png');
    cy.clickButton('submit-button');
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Press OK to proceed!');
      return true;
    });
    cy.messageSuccess('Success! Your details have been submitted successfully.');
    cy.clickLink('/');
    cy.contentPage('AutomationExercise');
  })
})