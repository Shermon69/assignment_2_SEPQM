describe('API Testing: JSONPlaceholder Valid Request', () => {
    it('TC01: should handle valid GET request and measure performance', { retries: 2 }, () => {
      // Clear performance entries for debugging
      cy.window().then((win) => {
        win.performance.clearMarks();
        win.performance.clearMeasures();
      });
  
      // Mark request start for debugging
      cy.window().then((win) => {
        win.performance.mark('apiRequestStart');
      });
  
      // Send GET request
      cy.request({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts/1',
      }).then((response) => {
        // Mark request end for debugging
        cy.window().then((win) => {
          win.performance.mark('apiRequestEnd');
          win.performance.measure('apiRequest', 'apiRequestStart', 'apiRequestEnd');
          const debugTime = win.performance.getEntriesByName('apiRequest')[0].duration;
          cy.log(`TC01 Debug Time (performance.mark): ${debugTime}ms`);
        });
  
        // Use response.duration for accurate timing
        const responseTime = response.duration;
        cy.log(`TC01 Response Time: ${responseTime}ms`);
        // Warn if response time exceeds 1000ms
        if (responseTime > 1000) {
          cy.log('Warning: Response time exceeds 1000ms, consider network optimization');
        }
        // Assert response time < 2000ms
        expect(responseTime).to.be.lessThan(2000);
  
        // Verify response
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 1);
        expect(response.body).to.have.property('title');
        expect(response.body).to.have.property('body');
        cy.log('TC01 - Valid API request: PASSED');
      });
  
      // Capture screenshot (of Cypress Test Runner for report)
      cy.screenshot('tc01-valid-api-request');
    });
  });