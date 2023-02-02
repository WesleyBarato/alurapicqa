
/* é criado uma função para substituir o codigo e deixar ainda mais automatizado */
/* deve ser importado no index.js */
Cypress.Commands.add('login', (nome, senha) => {
    cy.get('input[formcontrolname="userName"]').type(nome)
    cy.get('input[formcontrolname="password"]').type(senha)
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('registro', (email, nome, user, password) => {
    cy.contains('a', 'Register now').click()
    cy.get('input[formcontrolname="email"]').type(email)
    cy.get('input[formcontrolname="fullName"]').type(nome)
    cy.get('input[formcontrolname="userName"]').type(user)
    cy.get('input[formcontrolname="password"]').type(password)
    cy.contains('button', 'Register').click()
})