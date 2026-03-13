describe('Adding Products', () => {
  let newUser;

  // randome number to determine if title is Mr or Mrs
  const randomTitle = (Math.floor(Math.random() * 10) + 1) % 2 ? 'Mr.' : 'Mrs.';

  // random number from 1 - 7 to select which to pick among the 7 country
  const country = ['India', 'United States', 'Canada', 'Australia', 'Israrel', 'New Zealand', 'Singapore'];
  const randomCountry = country[Math.floor(Math.random() * country.length)];

  beforeEach(() => {
    cy.visit('/');
    cy.verifyURL();
    cy.fixture('product').as('products');
    cy.fixture('user').as('users');
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
      address: new Date().getDay() + "th Avenue",
      country: randomCountry,
      state: 'state',
      city: 'city',
      zipcode: '123',
      mobile_number: new Date().getSeconds()
    };
  });

  it('Add Products in Cart', function() {
    const {firstProduct} = this.products;
    const {secondProduct} = this.products;

    cy.contentPage('AutomationExercise');
    cy.clickLink('/products');
    cy.get('[data-product-id="1"]').first().click();
    cy.clickButton('close-modal', 'class');
    cy.get('[data-product-id="2"]').first().click();
    cy.clickLink('/view_cart');
    cy.get('#product-1')
      .inContainer(firstProduct.name)
      .inContainer(firstProduct.price)
      .inContainer('1')
    ;
    cy.get('#product-2')
      .inContainer(secondProduct.name)
      .inContainer(secondProduct.price)
      .inContainer('1')
    ;
  });

  it('Verify Product Quantity in Cart', function() {
    const {firstProduct} = this.products;

    cy.contentPage('AutomationExercise');
    cy.clickLink('/products');
    cy.clickLink('/product_details/1');
    cy.get('.product-information')
      .inContainer(firstProduct.name)
      .inContainer(firstProduct.price)
      .inContainer(firstProduct.availability)
      .inContainer(firstProduct.condition)
      .inContainer(firstProduct.brand)
    ;
    cy.get('#quantity')
      .clear()
      .type('4')
      .should('have.value', '4');
    cy.contains('button', 'Add to cart').click();
    cy.clickButton('close-modal', 'class');
    cy.clickLink('/view_cart');
    cy.get('#product-1').within(() => {
        cy.get('.cart_quantity').contentPage('4');
      });
  });

  it('Add to Cart from Recommended Items', function() {
    const {firstProduct} = this.products;

    cy.contentPage('AutomationExercise');
    cy.contentPage('RECOMMENDED ITEMS');
    cy.clickButton('1','data-product-id');
    cy.clickButton('close-modal', 'class');
    cy.clickLink('/view_cart');
    cy.get('#product-1')
      .inContainer(firstProduct.name)
      .inContainer(firstProduct.price)
      .inContainer('1')
    ;
  });

  it('Verify Address Details in Checkout Page', function() {
    const {firstProduct} = this.products;

    cy.contentPage('AutomationExercise');
    cy.signUp();
    cy.contentPage('New User Signup!');
    cy.register(newUser.name, newUser.email);
    cy.contentPage('Enter Account Information');
    cy.fullSignUp(newUser);
    cy.contentPage('ACCOUNT CREATED!');
    cy.clickButton('continue-button');
    cy.contentPage('Logged in as');
    cy.get('[data-product-id="1"]').first().click();
    cy.clickButton('close-modal', 'class');
    cy.clickLink('/view_cart');
    cy.get('#product-1')
      .inContainer(firstProduct.name)
      .inContainer(firstProduct.price)
      .inContainer('1')
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
    cy.clickLink('/delete_account');
    cy.contentPage('ACCOUNT DELETED!');
  });

  it.only('Download Invoice after Purchase Order', function() {
    const {firstProduct} = this.products;
    const {card} = this.payments;

    cy.contentPage('AutomationExercise');
    cy.get('[data-product-id="1"]').first().click();
    cy.clickButton('close-modal', 'class');
    cy.clickLink('/view_cart');
    cy.get('#product-1')
      .inContainer(firstProduct.name)
      .inContainer(firstProduct.price)
      .inContainer('1')
    ;
    cy.clickButton('check_out', 'class');
    cy.clickButton('modal', 'data-dismiss');
    cy.signUp();
    cy.contentPage('New User Signup!');
    cy.register(newUser.name, newUser.email);
    cy.contentPage('Enter Account Information');
    cy.fullSignUp(newUser);
    cy.contentPage('ACCOUNT CREATED!');
    cy.clickButton('continue-button');
    cy.contentPage('Logged in as');
    cy.clickLink('/view_cart');
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
    cy.clickButton('check_out', 'class');
    cy.clickButton('continue-button');
    cy.clickLink('/delete_account');
    cy.contentPage('ACCOUNT DELETED!');
  });
})