describe('Demo Web Shop Other Search Scenarios Test', () => {
    beforeEach(() => {
      // Visit the Demo Web Shop homepage
      cy.visit('https://demowebshop.tricentis.com/');
      // Wait for the page to fully load
      cy.get('body').should('be.visible');
    });
  
    it('Tests search with no results', () => {
      // Enter a search term unlikely to yield results
      cy.get('#small-searchterms').should('be.visible').type('nonexistentproductxyz');
      cy.get('.search-box-button').click();
      
      // Verify no results message
      cy.url().should('include', 'search');
      cy.get('.product-grid').should('not.exist');
      // Check for the actual no-results message
      cy.get('.result', { timeout: 10000 }).should('be.visible').should('contain', 'No products were found');
    });
  
    it('Tests empty search', () => {
      // Stub the alert to capture it
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Please enter some search keyword');
      });
      
      // Click search button without entering text
      cy.get('#small-searchterms').should('be.visible').clear();
      cy.get('.search-box-button').click();
      
      // Verify page does not navigate to search
      cy.url().should('eq', 'https://demowebshop.tricentis.com/');
    });
  
    it('Tests partial match search', () => {
      // Enter a partial search term
      cy.get('#small-searchterms').should('be.visible').type('book');
      cy.get('.search-box-button').click();
      
      // Verify search results page with partial matches
      cy.url().should('include', 'search');
      cy.get('.product-grid').should('be.visible');
      cy.get('.product-grid .item-box').should('have.length.gte', 1);
      cy.get('.product-title').each(($el) => {
        cy.wrap($el).invoke('text').should('match', /book/i);
      });
    });
  });