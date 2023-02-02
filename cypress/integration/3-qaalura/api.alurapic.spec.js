




describe('buscar fotos na API', () => {

    it('buscar fotos do flavio', () => {
        cy.request({
            method: 'GET',
            url: 'https://apialurapic.herokuapp.com/flavio/photos'
        }).then((res) => {
            expect(res.status).to.be.equal(200) //é esperado que o status seja igual a 200
            expect(res.body).is.not.empty // é esperado que o body não esteja vazio
            expect(res.body[0]).to.have.property('description') // é esperado que no body na posição 0 tenha a propriedade description
            expect(res.body[0].description).to.be.equal('Farol iluminado') //esperamos que dentro do body na posição 0 esteja a descrição "Farol iluminado"
            
        })
    })

    it('buscar login do flavio', () => {
        cy.request({
            method: 'POST',
            url: 'https://apialurapic.herokuapp.com/user/login',
            body: Cypress.env()
        }).then((res) => {
            expect(res.status).to.be.equal(200) //é esperado que o status seja igual a 200
            expect(res.body).is.not.empty // é esperado que o body não esteja vazio
            expect(res.body).to.have.property('id')
            expect(res.body.id).to.be.equal(1)
            expect(res.body).to.have.property('email')
            expect(res.body.email).to.be.equal('flavio@alurapic.com.br')
            
        })
    })
})