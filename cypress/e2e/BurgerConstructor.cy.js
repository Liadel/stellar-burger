/* eslint-disable cypress/no-unnecessary-waiting */
import '@4tw/cypress-drag-drop'

describe('Burger constructor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.wait(500)
  });

  it('should have 3 tabs', () => {
    cy.get('div.tab').should('have.length', 3)
    cy.get("div.tab").contains('Булки').should('have.length', 1)
    cy.get("div.tab").contains('Соусы').should('have.length', 1)
    cy.get("div.tab").contains('Начинки').should('have.length', 1)
    
  })

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

    cy.get('input[name=email]').type(`${"metashort@test.com"}`)
    cy.get('input[name=password]').type(`${"Demo123!"}`)
    cy.get('Button').click()

    cy.wait(100)

    cy.get('button').contains('Оформить заказ').click()

    cy.get('[class^="Modal_modal"]').contains('Loading...').should('have.length', 1)
    cy.wait(20000)
    cy.get('[class^="Modal_modal"]').contains('Ваш заказ начали готовить').should('have.length', 1)
  })


  

})

