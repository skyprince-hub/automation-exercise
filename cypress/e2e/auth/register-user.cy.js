describe('Register User', () => {
  let newUser;

  // define javascript object representing a valid existing user
  const existingUser = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password'
  };

  // randome number to determine if title is Mr or Mrs
  const randomTitle = (Math.floor(Math.random() * 10) + 1) % 2 ? 'Mr.' : 'Mrs.';

  // random number from 1 - 7 to select which to pick among the 7 country
  const country = ['India', 'United States', 'Canada', 'Australia', 'Israrel', 'New Zealand', 'Singapore'];
  const randomCountry = country[Math.floor(Math.random() * country.length)];

  beforeEach(() => {
    newUser = {
      title: randomTitle,
      name: 'newUser' + new Date().getSeconds(), 
      lastname: 'newUser' + new Date().getSeconds(),
      email: 'newUser' + new Date().getSeconds() + '@example.com',
      password: 'password' + new Date().getSeconds(),
      day: '03',
      month: 'February',
      year: '2004',
      company: 'company',
      address: 'address' + new Date().getSeconds(),
      country: randomCountry,
      state: 'state',
      city: 'city',
      zipcode: '123',
      mobile_number: new Date().getSeconds()
    };

    // before each test, always visit the landing page
    cy.visit('/', { failOnStatusCode: false});
  });
  
  it('Register User with Valid Credentials', () => {
    cy.verifyURL();
    cy.contentPage('AutomationExercise');
    cy.signUp();
    cy.contentPage('New User Signup!');
    cy.register(newUser.name, newUser.email);
    cy.contentPage('Enter Account Information');
    cy.fullSignUp(newUser);
    cy.contentPage('ACCOUNT CREATED!');
    cy.clickButton('continue-button');
    cy.clickLink('/delete_account');
    cy.contentPage('ACCOUNT DELETED!');
    cy.clickButton('continue-button');
  });

  it('Register User with Existing Email', () => {
    cy.verifyURL();
    cy.contentPage('AutomationExercise');
    cy.signUp();
    cy.contentPage('New User Signup');
    cy.register(newUser.name,existingUser.email);
    cy.messageError('Email Address already exist!');
  });
})