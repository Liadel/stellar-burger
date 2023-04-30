import '@4tw/cypress-drag-drop'
import {TEST_USER, BASE_URL, API_URL} from '../../src/constants'

describe('Burger constructor', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
    cy.intercept('GET', `${API_URL}/ingredients`).as('fetchIngredients')
    cy.wait('@fetchIngredients')
  });

  it('should load all ingredients', () => {
    cy.get("a[class^=IngredientPreview_link").should('have.length', 15)
  })

  it('should be possible to send order', () => {
    cy.get('[class^=BurgerConstructor_section]').as('dropContainer')
    cy.get('a[class^=IngredientPreview_link')
      .contains('Флюоресцентная булка R2-D3')
      .drag('@dropContainer')
    cy.get('a[class^=IngredientPreview_link')
      .contains('Соус традиционный галактический')
      .drag('@dropContainer')
    cy.get('a[class^=IngredientPreview_link')
      .contains('Плоды Фалленианского дерева')
      .drag('@dropContainer')

    cy.get('div[class^=constructor-element]')
      .first()
      .contains('(верх)')
    cy.get('div[class^=constructor-element]')
      .last()
      .contains('(низ)')

    cy.get('button').contains('Оформить заказ').click()

    cy.get('input[name=email]').type(TEST_USER.email)
    cy.get('input[name=password]').type(TEST_USER.password)
    cy.get('Button').click()

    cy.get('button').contains('Оформить заказ').click()
    cy.intercept('POST', `${API_URL}/orders`).as('sendOrder')
  
    cy.get('[class^="Modal_modal"]').contains('Loading...').should('have.length', 1)
    cy.wait('@sendOrder')
    cy.get('[class^="Modal_modal"]').contains('Ваш заказ начали готовить').should('have.length', 1)

    cy.get('button[class^="Modal_button"]').click()
    cy.get('[class^="Modal_modal').should('not.exist')
  })
})

