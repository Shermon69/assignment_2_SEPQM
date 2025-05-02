describe('Demo Web Shop Valid Search Test', () => {
    beforeEach(() => {
      // Visit the Demo Web Shop homepage
      cy.visit('https://demowebshop.tricentis.com/');
      // Wait for the page to fully load
      cy.get('body').should('be.visible');
    });
  
    it('Tests valid search with results', () => {
      // Enter a valid search term
      cy.get('#small-searchterms').should('be.visible').type('computer');
      cy.get('.search-box-button').click();
      
      // Verify search results page
      cy.url().should('include', 'search');
      cy.get('.product-grid').should('be.visible');
      cy.get('.product-grid .item-box').should('have.length.gte', 1);
      cy.get('.product-title').should('contain', 'Computer');
    });
  });