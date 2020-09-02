describe('Registration', () => {
    const registerUrl =
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser*'

    beforeEach(() => {
        indexedDB.deleteDatabase('@ackee/petrus')
        indexedDB.deleteDatabase('firebaseLocalStorageDb')

        cy.server()
        cy.visit('/cz?hideOnboarding')
        cy.wait(1000)
    })

    it('registers a user', () => {
        cy.route('POST', registerUrl, 'fixture:register.success.json').as(
            'registerResponse'
        )

        cy.fillRegisterForm()
        cy.wait('@registerResponse')
    })

    it('does not register again already registered user', () => {
        cy.route({
            method: 'POST',
            url: registerUrl,
            response: 'fixture:register.error.json',
            status: 400,
        }).as('registerResponse')

        cy.fillRegisterForm()
        cy.wait('@registerResponse')

        cy.get('[data-testid="form-field-email"] div').contains(
            'E-mail is already registered. Log in or use another email'
        )
    })
})
