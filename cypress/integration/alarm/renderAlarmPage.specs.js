describe("Render the page correctly", () => {
  before(() => {
    //Go to alarm page
    cy.visit('/');
  });
  it('It should have a title', () => {
    cy.get('[data-cy=app-title]').should('exist');
  });
  it('It should have a search input', () => {
    cy.get('[data-cy=search-input]').should('exist');
  });
  it('It should have an button for adding alarms', () => {
    cy.get('[data-cy=add-new-alarm-btn]').should('exist');
  });
  it('It should have an alarm list', () => {
    cy.get('[data-cy=alarm-list]').should('exist');
  });
});
