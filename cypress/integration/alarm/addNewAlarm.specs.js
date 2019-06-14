const dateAlarm ='2019-06-14T13:00';

describe("Add a new alarm successfully", () => {
  before(() => {
    //Go to alarm page
    cy.visit('/');
  });
  it('Click the add alarm button should open a modal to add alarm', () => {
    cy.get('[data-cy=add-new-alarm-btn]').click();
    cy.get('[data-cy=modal]').should('exist');
  });

  it('Creates an alarm successfully', () => {
    cy.get('[data-cy="modal-date-input"]').then(input => {
      input[0].dispatchEvent(new Event('input', { bubbles: true }));
      input.val(dateAlarm)
    });
    cy.get('[data-cy="modal-date-input"]').trigger('change');
    cy.get('[data-cy="modal-accept-btn"]').click();
  });

  it('The new alarm is list', () => {
    cy.get('.mat-row .ng-star-inserted').should('exist');
  });
});
