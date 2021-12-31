describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should direct to home on /', () => {
    cy.url().should('include', '/home');
  });

  describe('Full Navigation', () => {
    beforeEach(() => {
      cy.viewport('macbook-15');
    });

    it('should navigate to /about', () => {
      cy.get('[data-testid=full-navlink-About]').click();

      cy.url().should('include', '/about');
    });

    it('should navigate to /information', () => {
      cy.get('[data-testid=full-navlink-Information]').click();
      cy.url().should('include', '/information');
    });

    it('should navigate to /builds', () => {
      cy.get('[data-testid="full-navlink-USC Builds"]').click();
      cy.url().should('include', '/builds');
    });

    it('should navigate to /massacres', () => {
      cy.get('[data-testid="full-navlink-Massacre Mission Tracker"]').click();
      cy.url().should('include', '/massacres');
    });

    it('should navigate to /merch', () => {
      cy.get('[data-testid=full-navlink-Merch]').click();
      cy.url().should('include', '/merch');
    });

    it('should navigate to /join', () => {
      cy.get('[data-testid=full-navlink-Join]').click();
      cy.url().should('include', '/join');
    });
  });

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
      cy.get('[data-testid=mobile-drawer-button]').click();
    });

    it('should navigate to /about', () => {
      cy.get('[data-testid=mobile-navlink-About]').click();

      cy.url().should('include', '/about');
    });

    it('should navigate to /information', () => {
      cy.get('[data-testid=mobile-navlink-Information]').click();
      cy.url().should('include', '/information');
    });

    it('should navigate to /builds', () => {
      cy.get('[data-testid="mobile-navlink-USC Builds"]').click();
      cy.url().should('include', '/builds');
    });

    it('should navigate to /massacres', () => {
      cy.get('[data-testid="mobile-navlink-Massacre Mission Tracker"]').click();
      cy.url().should('include', '/massacres');
    });

    it('should navigate to /merch', () => {
      cy.get('[data-testid=mobile-navlink-Merch]').click();
      cy.url().should('include', '/merch');
    });

    it('should navigate to /join', () => {
      cy.get('[data-testid=mobile-navlink-Join]').click();
      cy.url().should('include', '/join');
    });
  });
});
