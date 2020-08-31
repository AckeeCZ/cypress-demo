describe('Contact form', () => {
    it('loads the mainpage', () => {
        cy.visit('/cz?hideOnboarding')

        cy.get('main[data-testid="news"] ul li:last-child button').click()
    })

    it.only('fills and submits the contact form', () => {
        cy.visit('/cz/kontakt?hideOnboarding')

        cy.get('form').within((el) => {
            // Select box
            cy.get('.select__control').click()
            cy.get('.select__option:nth-child(2)').click()

            // Inputs
            cy.get('input[name="name"]').type('John Doe')
            cy.get('input[name="email"]').type('john@gmail.com')
            cy.get(
                'textarea[name="text"]'
            ).type('Pls enable progressive web app features', { delay: 2 })
            cy.get('input[name="termsAndConditions"]').check()

            // Button and submit
            cy.get('button[type="submit"]').click()
        })

        // Assert success toast
        cy.get('.Toastify__toast--success').should('exist')

        // Autohides
        cy.wait(6000)
        cy.get('.Toastify__toast--success').should('exist')
    })
})
