import { BASE_URL } from '../../src/constants'

describe('Burger constructor', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  it('should have 3 tabs', () => {
    cy.get('div.tab').should('have.length', 3)
    cy.get("div.tab").contains('Булки').should('have.length', 1)
    cy.get("div.tab").contains('Соусы').should('have.length', 1)
    cy.get("div.tab").contains('Начинки').should('have.length', 1)
  })

})