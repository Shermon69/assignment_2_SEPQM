describe('Demo Web Shop - FAIL scenario: Checkout without accepting terms', () => {
    const baseUrl = 'https://demowebshop.tricentis.com/';
    const email = 'vwa@test.com';
    const password = '12345687';
  
    it('tries to checkout without accepting terms of service', () => {
      cy.visit(baseUrl);
  
      // Login
      cy.get('.ico-login').click();
      cy.get('#Email').type(email);
      cy.get('#Password').type(password);
      cy.get('input.login-button').click();
      cy.get('.account').should('contain', email);
  
      // Go to Books → Add "Computing and Internet"
      cy.contains('Books').click();
      cy.contains('Computing and Internet').click({ force: true });
      cy.get('#add-to-cart-button-13').click();
      cy.get('.bar-notification.success')
        .should('contain', 'The product has been added to your shopping cart');
  
      // Go to cart (without clicking the terms checkbox)
      cy.get('li#topcartlink a').click();
  
      // Try clicking checkout WITHOUT checking terms
      cy.get('#checkout').click();
  
      // Assert error message is shown
      cy.get('.ui-dialog .ui-dialog-content')
      .should('be.visible')
      .and('contain', 'Please accept the terms of service before the next step.');
    });
  });
  