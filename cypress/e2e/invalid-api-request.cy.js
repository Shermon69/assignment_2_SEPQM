describe('API Testing: JSONPlaceholder Invalid Request', () => {
    it('TC02: should handle invalid GET request and measure performance', { retries: 2 }, () => {
      // Clear performance entries for debugging
      cy.window().then((win) => {
        win.performance.clearMarks();
        win.performance.clearMeasures();
      });
  
      // Mark request start for debugging
      cy.window().then((win) => {
        win.performance.mark('apiRequestStart');
      });
  
      // Send GET request to non-existent endpoint
      cy.request({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts/999999',
        failOnStatusCode: false, // Allow 404 response
      }).then((response) => {
        // Mark request end for debugging
        cy.window().then((win) => {
          win.performance.mark('apiRequestEnd');
          win.performance.measure('apiRequest', 'apiRequestStart', 'apiRequestEnd');
          const debugTime = win.performance.getEntriesByName('apiRequest')[0].duration;
          cy.log(`TC02 Debug Time (performance.mark): ${debugTime}ms`);
        });
  
        // Use response.duration for accurate timing
        const responseTime = response.duration;
        cy.log(`TC02 Response Time: ${responseTime}ms`);
        // Warn if response time exceeds 1000ms
        if (responseTime > 1000) {
          cy.log('Warning: Response time exceeds 1000ms, consider network optimization');
        }
        // Assert response time < 2000ms
        expect(responseTime).to.be.lessThan(2000);
  
        // Verify response
        expect(response.status).to.eq(404);
        expect(response.body).to.be.empty;
        cy.log('TC02 - Invalid API request: PASSED');
      });
  
      // Capture screenshot (of Cypress Test Runner for report)
      cy.screenshot('tc02-invalid-api-request');
    });
  });