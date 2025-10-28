describe('Book appointment', () => {
    it('books appointment through UI', () => {
      // Visit your frontend app
      cy.visit('http://localhost:3000')
  
      // Fill in patient name
      cy.get('input[placeholder="Patient name"]')
        .should('be.visible')
        .type('Test User')
  
      // Fill in appointment time
      cy.get('input[placeholder="Time (ISO)"]')
        .should('be.visible')
        .type('2025-10-30T09:00:00')
  
      // Click the "Book" button
      cy.contains('Book')
        .should('be.visible')
        .click()
  
      // Wait for the appointment to appear in the list
      // Adjust '.appointment-list' to match the container where appointments appear
      cy.get('.appointment-list', { timeout: 10000 })
        .should('contain.text', 'Test User')
    })
  })
  