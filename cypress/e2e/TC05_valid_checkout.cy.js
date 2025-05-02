describe('Demo Web Shop - Add to Cart and Checkout', () => {
    const baseUrl = 'https://demowebshop.tricentis.com/';
    const email = 'vwa@test.com';
    const password = '12345687';
  
    it('logs in, adds a book to the cart, and completes checkout', () => {
      // Visit site
      cy.visit(baseUrl);
  
      // Login first
      cy.get('.ico-login').click();
      cy.get('#Email').type(email);
      cy.get('#Password').type(password);
      cy.get('input.login-button').click();
      cy.get('.account').should('contain', email);
  
      // Go to Books category
      cy.contains('Books').click();
  
      // I Bought Computing and Internet Books
      cy.contains('Computing and Internet').click({ force: true });

  
      // Confirm product page
      cy.get('h1').should('contain', 'Computing and Internet');
  
      // Add to cart
      cy.get('#add-to-cart-button-13').click();
  
      // Wait for cart notif
      cy.get('.bar-notification.success')
        .should('contain', 'The product has been added to your shopping cart');
  
      // Go to Shopping Cart
      cy.get('li#topcartlink a').click();
  
      // Agree to terms
      cy.get('#termsofservice').check();
  
      // Checkout
      cy.get('#checkout').click();
  
      // Billing address
      cy.get('#billing-buttons-container input.button-1.new-address-next-step-button, #billing-buttons-container input.button-1.billing-address-next-step-button')
        .click();
  
      // Shipping address
      cy.get('#shipping-buttons-container input.button-1.new-address-next-step-button, #shipping-buttons-container input.button-1.shipping-address-next-step-button')
        .click();
  
      // Shipping method
      cy.get('#shipping-method-buttons-container input.button-1.shipping-method-next-step-button').click();
  
      // Payment method
      cy.get('#payment-method-buttons-container input.button-1.payment-method-next-step-button').click();
  
      // Payment info
      cy.get('#payment-info-buttons-container input.button-1.payment-info-next-step-button').click();
  
      // Confirm order
      cy.get('#confirm-order-buttons-container input.button-1.confirm-order-next-step-button').click();
  
      // Success
      cy.get('.section.order-completed').should('contain', 'Your order has been successfully processed!');
    });
  });
  