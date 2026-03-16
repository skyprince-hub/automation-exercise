describe('Placing Orders', () => {
  
  let newUser;
  // randome number to determine if title is Mr or Mrs
  const randomTitle = (Math.floor(Math.random() * 10) + 1) % 2 ? 'Mr.' : 'Mrs.';

  // random number from 1 - 7 to select which to pick among the 7 country
  const country = ['India', 'United States', 'Canada', 'Australia', 'Israrel', 'New Zealand', 'Singapore'];
  const randomCountry = country[Math.floor(Math.random() * country.length)];

  beforeEach(() => {
    cy.visit('/', {failOnStatus: false});
    cy.verifyURL();
    cy.fixture('user').as('users');
    cy.fixture('product').as('products');
    cy.fixture('payment').as('payments');
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
  });

  it('Place Order where Checkout first before Register', function() {
    const {firstProduct} = this.products;
    const {card} = this.payments;

    cy.contentPage('AutomationExercise');
    cy.clickButton('1', 'data-product-id');
    cy.clickButton('close-modal', 'class');
    cy.clickLink('/view_cart');
    cy.get('#product-1')
      .inContainer(firstProduct.name)
      .inContainer(firstProduct.price)
    ;
    cy.clickButton('check_out', 'class');
    cy.clickButton('close-checkout-modal', 'class');
    cy.signUp();
    cy.register(newUser.name, newUser.email);
    cy.fullSignUp(newUser);
    cy.contentPage('ACCOUNT CREATED!');
    cy.clickButton('continue-button');
    cy.contentPage('Logged in as');
    cy.clickLink('/view_cart');
    cy.get('#product-1')
      .inContainer(firstProduct.name)
      .inContainer(firstProduct.price)
    ;
    cy.clickButton('check_out', 'class');
    cy.get('#address_delivery')
      .inContainer(newUser.address)
      .inContainer(newUser.state)
      .inContainer(newUser.country)
    ;
    cy.get('#address_invoice')
      .inContainer(newUser.address)
      .inContainer(newUser.state)
      .inContainer(newUser.country)
    ;
    cy.get('.cart_info').within(() => {
      cy.get('#product-1')
        .inContainer(firstProduct.name)
        .inContainer(firstProduct.price)
      ;
    });
    cy.get('#ordermsg').type(`Please Take Care of my order: ${firstProduct.name}`);
    cy.clickLink('/payment');
    cy.contentPage('Payment');
    cy.get('[data-qa="name-on-card"]').type(card.name);
    cy.get('[data-qa="card-number"]').type(card.number);
    cy.get('[data-qa="cvc"]').type(card.cvc);
    cy.get('[data-qa="expiry-month"]').type(card.expMonth);
    cy.get('[data-qa="expiry-year"]').type(card.expYear);
    cy.clickButton('pay-button');
    cy.contentPage('ORDER PLACED!');
    cy.clickLink('/delete_account');
    cy.contentPage('ACCOUNT DELETED!');
  });

  it('Place Order where Register first before Checkout', function() {
    const {firstProduct} = this.products;
    const {card} = this.payments;

    cy.contentPage('AutomationExercise');
    cy.signUp();
    cy.register(newUser.name, newUser.email);
    cy.fullSignUp(newUser);
    cy.contentPage('ACCOUNT CREATED!');
    cy.clickButton('continue-button');
    cy.contentPage('Logged in as');
    cy.clickButton('1', 'data-product-id');
    cy.clickButton('close-modal', 'class');
    cy.clickLink('/view_cart');
    cy.get('#product-1')
      .inContainer(firstProduct.name)
      .inContainer(firstProduct.price)
    ;
    cy.clickButton('check_out', 'class');
    cy.get('#address_delivery')
      .inContainer(newUser.address)
      .inContainer(newUser.state)
      .inContainer(newUser.country)
    ;
    cy.get('#address_invoice')
      .inContainer(newUser.address)
      .inContainer(newUser.state)
      .inContainer(newUser.country)
    ;
    cy.get('.cart_info').within(() => {
      cy.get('#product-1')
        .inContainer(firstProduct.name)
        .inContainer(firstProduct.price)
      ;
    });
    cy.get('#ordermsg').type(`Please Take Care of my order: ${firstProduct.name}`);
    cy.clickLink('/payment');
    cy.contentPage('Payment');
    cy.get('[data-qa="name-on-card"]').type(card.name);
    cy.get('[data-qa="card-number"]').type(card.number);
    cy.get('[data-qa="cvc"]').type(card.cvc);
    cy.get('[data-qa="expiry-month"]').type(card.expMonth);
    cy.get('[data-qa="expiry-year"]').type(card.expYear);
    cy.clickButton('pay-button');
    cy.contentPage('ORDER PLACED!');
    cy.clickLink('/delete_account');
    cy.contentPage('ACCOUNT DELETED!');
  });

  it('Place Order where Login first before Checkout', function() {
    const {firstProduct} = this.products;
    const {card} = this.payments;
    const {existingUser} = this.users;

    cy.contentPage('AutomationExercise');
    cy.signUp();
    cy.login(existingUser.email, existingUser.password);
    cy.contentPage('Logged in as');
    cy.clickButton('1', 'data-product-id');
    cy.clickButton('close-modal', 'class');
    cy.clickLink('/view_cart');
    cy.get('#product-1')
      .inContainer(firstProduct.name)
      .inContainer(firstProduct.price)
    ;
    cy.clickButton('check_out', 'class');
    cy.get('#address_delivery')
      .inContainer(existingUser.country)
    ;
    cy.get('#address_invoice')
      .inContainer(existingUser.country)
    ;
    cy.get('.cart_info').within(() => {
      cy.get('#product-1')
        .inContainer(firstProduct.name)
        .inContainer(firstProduct.price)
      ;
    });
    cy.get('#ordermsg').type(`Please Take Care of my order: ${firstProduct.name}`);
    cy.clickLink('/payment');
    cy.contentPage('Payment');
    cy.get('[data-qa="name-on-card"]').type(card.name);
    cy.get('[data-qa="card-number"]').type(card.number);
    cy.get('[data-qa="cvc"]').type(card.cvc);
    cy.get('[data-qa="expiry-month"]').type(card.expMonth);
    cy.get('[data-qa="expiry-year"]').type(card.expYear);
    cy.clickButton('pay-button');
    cy.contentPage('ORDER PLACED!');
    cy.clickLink('/logout');
    cy.contains('Logged in as').should('not.exist');
  })
})