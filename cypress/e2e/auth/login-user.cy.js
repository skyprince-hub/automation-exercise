describe('Login User', () => {
  const existingUser1 = {
      name: 'Bob Doe',
      email: 'bob.cypress@example.com',
      password: 'bob_password'
  };

  const existingUser2 = {
    name: 'Charlie Doe',
    email: 'charlie.cypress@example.com',
    password: 'charlie_password'
  }

  const incorrectUser = {
    name: 'Alice',
    email: 'alice.cy@gmail.com',
    password: 'password'
  }

  beforeEach(() => {
      cy.visit('/', { failOnStatusCode: false});
  });
  
  it('Login User with Correct Email and Password', () => {
    cy.verifyURL();
    cy.contentPage('AutomationExercise');
    cy.signUp();
    cy.contentPage('Login to your account');
    cy.login(existingUser1.email, existingUser1.password);
    cy.contentPage('Logged in as');
    cy.clickLink('/delete_account');
    cy.contentPage('ACCOUNT DELETED!');
  });

  it('Login User with Incorrect Email and Password',() => {
    cy.verifyURL();
    cy.contentPage('AutomationExercise');
    cy.signUp();
    cy.contentPage('Login to your account');
    cy.login(incorrectUser.email, incorrectUser.password);
    cy.messageError('Your email or password is incorrect!');
  });
  
  it('Logout User', () => {
    cy.verifyURL();
    cy.contentPage('AutomationExercise');
    cy.signUp();
    cy.contentPage('Login to your account');
    cy.login(existingUser2.email, existingUser2.password);
    cy.contentPage('Logged in as');
    cy.clickLink('/logout');
    cy.verifyURL('login');
  });
})