describe('Contact form', () => {
    it('loads the mainpage', () => {
        cy.visit('/cz?hideOnboarding')

        cy.get('main[data-testid="news"] ul li:last-child button').click()
    })
})
