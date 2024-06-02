/// <reference types="cypress" />
import produtosPage from "../support/page_objects/nome-funcionliada.page"
import { faker } from '@faker-js/faker';
const perfil = require('../fixtures/perfil.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      produtosPage.visitarUrl()
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
      //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
      
      //Produto 1
      produtosPage.buscarProduto('Aether Gym Pant')  
      produtosPage.addProdutoNoCarrinho('36', 'Green', 2)  
      cy.get('.tbay-woocommerce-breadcrumb > :nth-child(2) > a').click()  
      
      //Produto 2  
      cy.get('.post-3964 > .product-block > .block-inner > .image > .product-image > .image-hover').click()
      produtosPage.addProdutoNoCarrinho('XL', 'Purple', 4)  
      cy.get('.tbay-woocommerce-breadcrumb > :nth-child(2) > a').click()
      
      //Produto 3
      cy.get(':nth-child(3) > .page-numbers').click()
      produtosPage.buscarProduto('Celeste Sports Bra')
      produtosPage.addProdutoNoCarrinho('M', 'Red', 1)  
      cy.get('.tbay-woocommerce-breadcrumb > :nth-child(5) > a').click()
      
      //Produto 4
      produtosPage.buscarProduto('Electra Bra Top')
      produtosPage.addProdutoNoCarrinho('S', 'Purple', 3)  
      cy.get('.single_add_to_cart_button').click()

      cy.get('.woocommerce-message > .button').click()
      cy.get('.checkout-button').click()
      
      //Checkout
      cy.cadastroCheckout(faker.person.firstName(), faker.person.lastName(), 'Rua ABCDE, número 1324', 'São Paulo', '99999999', '99999999999', faker.internet.email())
      cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
  });


})