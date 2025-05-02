describe('TC_01 - Login with Valid Credentials', () => {
    it('should successfully login with valid username and password', () => {
      cy.visit('https://practicetestautomation.com/practice-test-login/');
  
      // Enter valid username and password
      cy.get('#username').should('be.visible').type('student');
      cy.get('#password').should('be.visible').type('Password123');
  
      // Click login button
      cy.get('#submit').should('be.visible').click();
  
      // Assertion: Check successful login by URL or heading
      cy.url().should('include', '/logged-in-successfully/');
      cy.get('h1').should('have.text', 'Logged In Successfully');
  
      // Optional log message
      cy.log('TC_01 - Login with valid credentials: PASSED');
    });
  });
  