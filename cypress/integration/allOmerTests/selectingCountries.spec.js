
/// <reference types="cypress" />

describe('Selecting Countries', () => {
  it('check selecting countries go well', () => {
    // cy.wait(2000)
    cy.visit('')

    const country1 = 'Spain';
    cy.get('.world-dashboard-list .filter-input')
      .clear().type(country1)
    cy.get('.world-dashboard-list .countries')
      .eq(0)
      .click()
    cy.get('.country-details-title .wrap-country-title h2')
      .should('not.have.value', country1)

    const country2 = 'Israel';
    cy.get('.world-dashboard-list .filter-input')
      .clear().type(country2)
    cy.get('.world-dashboard-list .countries')
      .eq(0)
      .click()
    cy.get('.country-details-title .wrap-country-title h2')
      .should('not.have.value', country2)

    const country3 = 'china';
    cy.get('.world-dashboard-list .filter-input')
      .clear().type(country3)
    cy.get('.world-dashboard-list .countries')
      .eq(0)
      .click()
    cy.get('.country-details-title .wrap-country-title h2')
      .should('not.have.value', country3)

  })
})



