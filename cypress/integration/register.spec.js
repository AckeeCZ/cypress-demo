describe('Registration', () => {
    beforeEach(() => {
        cy.server()
        cy.visit('/cz?hideOnboarding')
    })

    it('registers a user', () => {
        cy.route(
            'POST',
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser*',
            'fixture:register.success.json'
        ).as('registerResponse')

        cy.get('button[data-testid="menu-button-user"]').click()
        cy.get('li[data-testid="user-menu-login"]').click()

        cy.get('input[name="name"]').type('John Doe')
        cy.get('input[name="email"]').type('doe14@gmail.com')
        cy.get('input[name="password"]').type('asdf4567')

        cy.get('button[type="submit"]').click()
        cy.wait('@registerResponse')
    })
})
