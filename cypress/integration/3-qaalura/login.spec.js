describe('Teste de funcionalidades de login Alurapic', () => {

    /* Usar a função beforeEach e o comando cy.visit(),
       para indicar a URL que será carregada antes de cada novo caso de teste; */
    beforeEach(() => {
        cy.visit('https://alura-fotos.herokuapp.com/');
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

