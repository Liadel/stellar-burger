import '@4tw/cypress-drag-drop'
import {BASE_URL, API_URL} from '../../src/constants'

describe('Burger constructor', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
    cy.intercept('GET', `${API_URL}/ingredients`).as('fetchIngredients')
    cy.wait('@fetchIngredients')
  });

  it('should open and close ingredient modal', () => {
    cy.get('a[class^=IngredientPreview_link')
      .contains('Биокотлета из марсианской Магнолии')
      .click()
    
    cy.get('[class^=Modal_header')
      .contains('Детали ингредиента')
      .should('exist')
    cy.get('.text.text_type_digits-default')
      .contains('4242')
      .should('exist')
    
    cy.get('button[class^="Modal_button"]').click()
    
    cy.get('[class^=Modal_header').should('not.exist')
  })
})

