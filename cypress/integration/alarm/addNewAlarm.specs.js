const nextDateAlarm ='2019-06-14T13:00';
const pastDateAlarm ='2019-06-13T13:00';

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

  it('Enter a date should add an alarm in the list', () => {

    //Select the input and enter the date
    cy.get('[data-cy="modal-date-input"]').then(input => {
      cy.wait(500);
      input[0].dispatchEvent(new Event('input', { bubbles: true }));
      input.val(nextDateAlarm)
    });
    cy.get('[data-cy="modal-date-input"]').trigger('change');
    cy.wait(500);

    //Press the accept button
    cy.get('[data-cy="modal-accept-btn"]').click();
    cy.wait(1000);

    //Checks if the new alarm is show on the list.
    cy.get('.mat-row .ng-star-inserted').should('exist');

  });

  it('If no date is enter it should disable the accept button ', () => {
    //Click the add button
    cy.get('[data-cy=add-new-alarm-btn]').click();
    cy.wait(1000);

    //Checks the accept button
    cy.get('[data-cy="modal-accept-btn"]').should('be.disabled');

    //For closing the modal
    cy.visit('/');
  });


  it('Enter a past date should not allow to add the alarm', () => {
    //Click the add button
    cy.get('[data-cy=add-new-alarm-btn]').click();
    cy.wait(1000);

    //Select the input and enter the date
    cy.get('[data-cy="modal-date-input"]').then(input => {
      cy.wait(500);
      input[0].dispatchEvent(new Event('input', { bubbles: true }));
      input.val(pastDateAlarm)
    });
    cy.get('[data-cy="modal-date-input"]').trigger('change');
    cy.wait(500);

    //Checks the accept button
    cy.get('[data-cy="modal-accept-btn"]').should('be.disabled');

    //For closing the modal
    cy.visit('/');
  });

});
