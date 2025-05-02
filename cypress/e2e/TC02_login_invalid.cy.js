describe('TC_02 - Login with Invalid Credentials', () => {
    it('should display an error message for invalid login attempt', () => {
      cy.visit('https://practicetestautomation.com/practice-test-login/');
  
      // Enter invalid credentials
      cy.get('#username').should('be.visible').type('invalidUser');
      cy.get('#password').should('be.visible').type('invalidPassword');
  
      // Click login button
      cy.get('#submit').should('be.visible').click();
  
      // Assertion: Check for error message
      cy.get('#error').should('contain.text', 'Your username is invalid!');
  
      // Optional log
      cy.log('TC_02 - Login with invalid credentials: PASSED');
    });
  });
  