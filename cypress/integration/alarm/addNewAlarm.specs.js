const nextDateAlarm ='2019-06-14T13:00';
const nextDateAlarm2 ='2019-06-15T13:00';
const pastDateAlarm ='2019-06-13T15:00';

describe("Add a new alarm successfully", () => {
  before(() => {
    //Go to alarm page
    cy.visit('/');
    cy.wait(500);
  });

  it('Click the add alarm button should open a modal to add alarm', () => {
    cy.get('[data-cy=add-new-alarm-btn]').click();
    cy.get('[data-cy=modal]').should('exist');
    cy.wait(1000);
  });

  it('If a date is enter it should enable the accept button', () => {

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
    //Click the add button
    cy.get('[data-cy=add-new-alarm-btn]').click();
    cy.wait(1000);

    //Checks the accept button
    cy.get('[data-cy="modal-accept-btn"]').should('be.disabled');
    cy.wait(1000);

    //Close the modal
    cy.get('[data-cy=modal-cancel-btn').click();
  });

  it('Add a new alarm should be listed on the alarm`s list', () => {
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
    cy.get('.mat-row .ng-star-inserted').contains('14/06/2019 - 1:00 PM');
  });

  it('Enter a past date should not allow to add the alarm', () => {
    //Click the add button
    cy.get('[data-cy=add-new-alarm-btn]').click();
    cy.wait(1000);

    //Select the input and enter the date
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

  it('Click the edit alarm button should open a modal to edit the alarm', () => {
    //Close the modal
    cy.get('[data-cy=modal-cancel-btn').click();

    cy.get('[data-cy=edit-alarm]').click();
    cy.get('[data-cy=modal]').should('exist');
    cy.wait(1000);
  });

  it('If a date is enter it should enable the accept button ', () => {

    //Select the input and enter the date
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


  it('If the alarm is edited, it should be reflect on the alarm`s list ', () => {

    //Open the edit modal
    cy.get('[data-cy=edit-alarm]').click();

    //Select the input and enter no date
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

  it('If the delete button is click a modal should open', () => {
    // //Close the modal
    // cy.get('[data-cy=modal-cancel-btn').click();

    cy.get('[data-cy=delete-alarm]').click();
    cy.get('[data-cy=modal]').should('exist');
    cy.wait(1000);
  });

  it('If click the accept button to delete the alarm, the alarm should be deleted', () => {

    cy.get('[data-cy=modal-accept-btn]').click();
    cy.wait(4000);
    cy.get('.mat-row .ng-star-inserted').should('not.exist');

  });

});
