const nextDateAlarm ='2019-06-14T13:00';
const nextDateAlarm2 ='2019-06-15T13:00';
const pastDateAlarm ='2019-06-13T15:00';

describe("Edit alarm functionality", () => {
  before(() => {
    //Go to alarm page
    cy.visit('/');
    cy.wait(500);

    /*  Add an alarm for testing the edit functionality  */
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

  it('Click the edit alarm button should open a modal to edit the alarm', () => {
    cy.get('[data-cy=edit-alarm]').click();
    cy.get('[data-cy=modal]').should('exist');
    cy.wait(1000);
  });

  it('If a new date is enter it should enable the accept button ', () => {

    //Select the input and enter the new date
    cy.get('[data-cy="modal-date-input"]').then(input => {
      cy.wait(1000);
      input[0].dispatchEvent(new Event('input', { bubbles: true }));
      input.val(nextDateAlarm2)
    });
    cy.get('[data-cy="modal-date-input"]').trigger('change');
    cy.wait(1000);

    //Check the accept button
    cy.get('[data-cy="modal-accept-btn"]').should('be.enabled');
    cy.wait(1000);

    //Close the modal
    cy.get('[data-cy=modal-cancel-btn').click();
  });


  it('If the date is deleted it should disabled the accept button ', () => {

    //Open the edit modal
    cy.get('[data-cy=edit-alarm]').click();

    //Select the input and delete the current date
    cy.get('[data-cy="modal-date-input"]').then(input => {
      cy.wait(1000);
      input[0].dispatchEvent(new Event('input', { bubbles: true }));
      input.val("")
    });
    cy.get('[data-cy="modal-date-input"]').trigger('change');
    cy.wait(1000);

    //Check the accept button
    cy.get('[data-cy="modal-accept-btn"]').should('be.disabled');
    cy.wait(1000);

    //Close the modal
    cy.get('[data-cy=modal-cancel-btn').click();
  });


  it('If the alarm is edited, it should be reflect on the alarm`s list ', () => {

    //Open the edit modal
    cy.get('[data-cy=edit-alarm]').click();

    //Select the input and enter a new date
    cy.get('[data-cy="modal-date-input"]').then(input => {
      cy.wait(1000);
      input[0].dispatchEvent(new Event('input', { bubbles: true }));
      input.val(nextDateAlarm2)
    });
    cy.get('[data-cy="modal-date-input"]').trigger('change');
    cy.wait(1000);

    //Click the accept button
    cy.get('[data-cy="modal-accept-btn"]').click();
    cy.wait(2000);

    //Checks if the alarm was edited on the list.
    cy.get('.mat-row .ng-star-inserted').contains('15/06/2019 - 1:00 PM');
  });

});
