const nextDateAlarm ='2019-06-14T13:00';

describe("Delete alarm functionality", () => {
  before(() => {
    //Go to alarm page
    cy.visit('/');
    cy.wait(500);

    /*  Add an alarm for testing the delete functionality  */
    cy.get('[data-cy=add-new-alarm-btn]').click();
    cy.get('[data-cy="modal-date-input"]').then(input => {
      cy.wait(500);
      input[0].dispatchEvent(new Event('input', { bubbles: true }));
      input.val(nextDateAlarm)
    });
    cy.get('[data-cy="modal-date-input"]').trigger('change');
    cy.wait(500);

    //Click the accept button
    cy.get('[data-cy="modal-accept-btn"]').click();
    cy.wait(500);
  });

  it('If the delete button is click a modal should open', () => {
    cy.get('[data-cy=delete-alarm]').click();
    cy.get('[data-cy=modal]').should('exist');
    cy.wait(1000);
    //Close the modal
    cy.get('[data-cy=modal-cancel-btn]').click();
    cy.wait(1000);
  });

  it('If click the cancel button, the alarm should not be deleted from the list', () => {
    cy.get('[data-cy=delete-alarm]').click();
    cy.wait(1000);
    cy.get('[data-cy=modal-cancel-btn]').click();
    cy.wait(1000);
    cy.get('.mat-row .ng-star-inserted').should('exist');
    cy.wait(1000);
  });

  it('If click the accept button to delete the alarm, the alarm should be deleted from the list', () => {
    cy.get('[data-cy=delete-alarm]').click();
    cy.wait(1000);
    cy.get('[data-cy=modal-accept-btn]').click();
    cy.wait(4000);
    cy.get('.mat-row .ng-star-inserted').should('not.exist');
  });

});
