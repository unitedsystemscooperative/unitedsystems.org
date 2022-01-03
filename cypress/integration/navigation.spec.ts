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
      cy.findByTestId('full-navlink-About').click();
      cy.url().should('include', '/about');
    });

    it('should navigate to /information', () => {
      cy.findByTestId('full-navlink-Information').click();
      cy.url().should('include', '/information');
    });

    it('should navigate to /builds', () => {
      cy.findByTestId('full-navlink-USC Builds').click();
      cy.url().should('include', '/builds');
    });

    it('should navigate to /massacres', () => {
      cy.findByTestId('full-navlink-Massacre Mission Tracker').click();
      cy.url().should('include', '/massacres');
    });

    it('should navigate to /merch', () => {
      cy.findByTestId('full-navlink-Merch').click();
      cy.url().should('include', '/merch');
    });

    it('should navigate to /join', () => {
      cy.findByTestId('full-navlink-Join').click();
      cy.url().should('include', '/join');
    });
  });

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
      cy.findByTestId('mobile-drawer-button').click();
    });

    it('should navigate to /about', () => {
      cy.findByTestId('mobile-navlink-About').click();
      cy.url().should('include', '/about');
    });

    it('should navigate to /information', () => {
      cy.findByTestId('mobile-navlink-Information').click();
      cy.url().should('include', '/information');
    });

    it('should navigate to /builds', () => {
      cy.findByTestId('mobile-navlink-USC Builds').click();
      cy.url().should('include', '/builds');
    });

    it('should navigate to /massacres', () => {
      cy.findByTestId('mobile-navlink-Massacre Mission Tracker').click();
      cy.url().should('include', '/massacres');
    });

    it('should navigate to /merch', () => {
      cy.findByTestId('mobile-navlink-Merch').click();
      cy.url().should('include', '/merch');
    });

    it('should navigate to /join', () => {
      cy.findByTestId('mobile-navlink-Join').click();
      cy.url().should('include', '/join');
    });
  });
});
