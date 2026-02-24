// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// automate login
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/');
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password);
    cy.get('[data-qa="login-button"]').click();
});

// automate register
Cypress.Commands.add('register', (name, email) => {
    cy.get('[data-qa="signup-name"]').type(name);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
});

// automate to verify if the url is correct
Cypress.Commands.add('verifyURL', () => {
    cy.url().should('eq', Cypress.config().baseUrl);
});

// commands to check content of the page
Cypress.Commands.add('contentPage', (exptectedContent) => {
    cy.contains(exptectedContent, { matchCase: false }).should('be.visible')
});

// command to click the Sign/Login navigation link
Cypress.Commands.add('signUp', () => {
    cy.clickLink('/login')
});

// command to enter account information when doing signup
Cypress.Commands.add('fillAccountInfo', (user) => {
    if(user.title === "Mr."){
        cy.get('#uniform-id_gender1').click();
    }else
    {
        cy.get('#uniform-id_gender2').click();
    }
    cy.get('[data-qa="name"]').type(user.name);
    cy.get('[data-qa="password"]').type(user.password);
    cy.get('[data-qa="months"]').type(user.day);
    cy.get('[data-qa="months"]').type(user.month);
    cy.get('[data-qa="years"]').type(user.year);
    cy.get('#newsletter').click();
    cy.get('#optin').click();
});

// command to enter address information when doing signup
Cypress.Commands.add('addressInfo', (user) => {
    cy.get('[data-qa="first_name"]').type(user.name);
    cy.get('[data-qa="last_name"]').type(user.lastname);
    cy.get('[data-qa="company"]').type(user.company);
    cy.get('[data-qa="address"]').type(user.address);
    cy.get('[data-qa="address2"]').type(user.address);
    cy.get('[data-qa="country"]').select(user.country);
    cy.get('[data-qa="state"]').type(user.state);
    cy.get('[data-qa="city"]').type(user.city);
    cy.get('[data-qa="zipcode"]').type(user.zipcode);
    cy.get('[data-qa="mobile_number"]').type(user.mobile_number)
});

// Master Command or Command Composition to combine the function of register and fillAccountInfo
Cypress.Commands.add('fullSignUp', (user) => {
    cy.fillAccountInfo(user);
    cy.addressInfo(user);
    cy.get('[data-qa="create-account"]').click();
});

// command to click any button
Cypress.Commands.add('clickButton', (qaSelector) => {
    cy.get(`[data-qa="${qaSelector}"]`).click()
})

// command to click any ahref link
Cypress.Commands.add('clickLink', (hrefValue) => {
    cy.get(`a[href="${hrefValue}"]`).should('be.visible').click()
})
