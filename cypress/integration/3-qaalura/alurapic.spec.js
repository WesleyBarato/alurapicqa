import { it } from "mocha";



/* Criar um novo arquivo de teste, sss
   com extensão .cy.js dentro da pasta integration e utilizar o comando describe para descrever a suite de testes; */
   describe('Teste de funcionalidades de login Alurapic', () => {

    /* Usar a função beforeEach e o comando cy.visit(),
       para indicar a URL que será carregada antes de cada novo caso de teste; */
    beforeEach(() => {
        cy.visit('https://alura-fotos.herokuapp.com/');
    })

/* Criar um novo caso de teste utilizando a função it e utilizar os recursos cy.get(),
   bem como as opção .type, .click e .should para fazer os assertions; */
/*Utilizar o comando cy.contains() para procurar por um texto dentro de um seletor,
    facilitando a busca por um elemento;*/ 
    it('verificar mensagens de erro', () => {
       cy.contains('a', 'Register now').click()
       cy.contains('button', 'Register').click() // o primeiro register aparece só a mensagem de email requerido
       cy.contains('ap-vmessage', 'Email is required!').should('be.visible')
       cy.contains('button', 'Register').click() // clicando no register outra vez aparece os campos restantes
       cy.contains('ap-vmessage', 'Full name is required!').should('be.visible')
       cy.contains('ap-vmessage', 'User name is required!').should('be.visible')
       cy.contains('ap-vmessage', 'Password is required!').should('be.visible')
    })

    /* Criando novo caso de teste para validação de dados do email */
    it('verifica mensagens de email invalido', () => {
        cy.contains('a', 'Register now').click()
        cy.contains('button', 'Register').click()
        cy.get('input[formcontrolname="email"]').type('wesley')
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible')
        
     })

     it('verifica mensagens de nome completo com menos de 2 caracteres', () => {
        cy.contains('a', 'Register now').click()
        cy.contains('button', 'Register').click()
        cy.get('input[formcontrolname="fullName"]').type('a')
        cy.contains('button', 'Register').click()
        cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible')
        
     })

     it('verifica mensagens de user name com capslock', () => {
        cy.contains('a', 'Register now').click()
        cy.contains('button', 'Register').click()
        cy.get('input[formcontrolname="userName"]').type('TESTE')
        cy.contains('button', 'Register').click()
        cy.contains('ap-vmessage', 'Must be lower case').should('be.visible')
        
     })

    it('verifica mensagens de senha minima valida', () => {
        cy.contains('a', 'Register now').click()
        cy.contains('button', 'Register').click() 
        cy.get('input[formcontrolname="password"]').type('123')
        cy.contains('button', 'Register').click()
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible')
        
     })
     
     /* Chamando o JSON criado para fazer o teste com massa de dados */
     /* O require é uma forma que foi desenvolvida para Node.JS de importar e exportar módulos em uma aplicação. Nesse exemplo,
      estamos indicando o nome e o caminho do arquivo externo que contém os dados. */
     const usuarios = require('../../fixtures/usuarios.json')

     /*Dentro do forEach, cada elemento da coleção usuarios está sendo referenciada como usuario.
      Dessa forma, substituir por usuario.email irá retornar para cada item da massa de dados a propriedade corretamente. */
     usuarios.forEach(usuario => {

      it.only(`criação de novo usuario ${usuario.userName} com massa de dados`, () => {
         cy.contains('a', 'Register now').click()
         cy.get('input[formcontrolname="email"]').type(usuario.email)
         cy.get('input[formcontrolname="fullName"]').type(usuario.fullName)
         cy.get('input[formcontrolname="userName"]').type(usuario.userName)
         cy.get('input[formcontrolname="password"]').type(usuario.password)
         cy.contains('button', 'Register').click()
        })
     })

     

     it('criação de novo usuario valido', () => {
      cy.registro('renato@email.com', 'renato cardoso', 'renato', '123456789')

     })

     it('verifica mensagens de senha maxima valida', () => {
        cy.contains('a', 'Register now').click()
        cy.contains('button', 'Register').click()
        cy.get('input[formcontrolname="password"]').type('123456789123456789')
        cy.contains('button', 'Register').click()
        cy.contains('ap-vmessage', 'Maximun length is 18').should('be.visible')
        
     })

     it('verificar login correto', () => {
      cy.login('wesley', '123456789') //usada a função login criada no gui_commands.js
      cy.contains('a', '(Logout)').should('be.visible')
     })

     it('verificar login incorreto', () => {
        cy.login('joao', '1234')
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Invalid user name or password')
        })
     })
 

})
/* primeiro commit feito */