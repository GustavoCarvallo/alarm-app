const nextDateAlarm ='2019-06-15T13:00';
const pastDateAlarm ='2019-06-13T15:00';

describe("Add alarm functionality", () => {
  before(() => {
    //Go to alarm page
    cy.visit('/');
    cy.wait(500);
  });

  it('Click the add alarm button should open a modal to add alarm', () => {
    cy.get('[data-cy=add-new-alarm-btn]').click();
    cy.get('[data-cy=modal]').should('exist');
    cy.wait(1000);

    //Close the modal
    cy.get('[data-cy=modal-cancel-btn').click();
  });

  it('If a date is enter it should enable the accept button', () => {
    //Open the modal
    cy.get('[data-cy=add-new-alarm-btn]').click();
    cy.wait(1000);

    //Select the input and enter the date
    cy.get('[data-cy="modal-date-input"]').then(input => {
      cy.wait(1000);
      input[0].dispatchEvent(new Event('input', { bubbles: true }));
      input.val(nextDateAlarm)
    });
    cy.get('[data-cy="modal-date-input"]').trigger('change');
    cy.wait(1000);

    //Check the accept button
    cy.get('[data-cy="modal-accept-btn"]').should('be.enabled');
    cy.wait(1000);

    //Close the modal
    cy.get('[data-cy=modal-cancel-btn').click();
  });

  it('If no date is enter it should disable the accept button ', () => {
    //Open the modal
    cy.get('[data-cy=add-new-alarm-btn]').click();
    cy.wait(1000);

    //Checks the accept button
    cy.get('[data-cy="modal-accept-btn"]').should('be.disabled');
    cy.wait(1000);

    //Close the modal
    cy.get('[data-cy=modal-cancel-btn').click();
  });

  it('If a past date is enter it should not allow adding the alarm', () => {
    //Open the modal
    cy.get('[data-cy=add-new-alarm-btn]').click();
    cy.wait(1000);

    //Select the input and enter a past date
    cy.get('[data-cy="modal-date-input"]').then(input => {
      cy.wait(1000);
      input[0].dispatchEvent(new Event('input', { bubbles: true }));
      input.val(pastDateAlarm)
    });
    cy.get('[data-cy="modal-date-input"]').trigger('change');
    cy.wait(1000);

    //Checks the accept button
    cy.get('[data-cy="modal-accept-btn"]').should('be.disabled');
  });

  it('Add a new alarm should be listed on the alarm`s list', () => {
    //Close the modal
    cy.get('[data-cy=modal-cancel-btn').click();
    cy.wait(1000);

    //Open the modal
    cy.get('[data-cy=add-new-alarm-btn]').click();

    //Select the input and enter the date
    cy.get('[data-cy="modal-date-input"]').then(input => {
      cy.wait(1000);
      input[0].dispatchEvent(new Event('input', { bubbles: true }));
      input.val(nextDateAlarm)
    });
    cy.get('[data-cy="modal-date-input"]').trigger('change');
    cy.wait(1000);

    //Press the accept button
    cy.get('[data-cy="modal-accept-btn"]').click();
    cy.wait(1000);

    //Checks if the new alarm is show on the list.
    cy.get('.mat-row .ng-star-inserted').contains('15/06/2019 - 1:00 PM');
  });

});
