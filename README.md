# Cypress demo

Cypress basics testing demo project with examples. The project uses flashsport.com as the tested web app.

[Cypress documentation](https://docs.cypress.io/guides/overview/why-cypress.html)

## Setup

[Installation guide](https://docs.cypress.io/guides/getting-started/installing-cypress.html)

Prerequisities:
- Node
- Yarn or NPM package manager
- Cloned [flashsport repo](https://gitlab.ack.ee/Web/flash-sport) to run it locally (optional)

Steps:
 1. Clone a GIT project and open up a terminal in its directory.
 2. Install Cypress with `yarn add -D cypress`
 3. Run it with `yarn cypress open`
 4. Add `baseUrl` key (localhost or any public URL) into `cypress.json` configuration file.

All Cypres related files are located in `cypress` directory.

## Basics of testing

Links:
- [Documentation](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html)
- Example in [contact_form.spec.js](cypress/integration/contact_form.spec.js)

Each test case has its own file in `cypress/integration`. The naming convention is `your_test_name.spec.js`. Tests can be grouped with `describe` function and each single tests is within `it` function:

```js
describe('Test case' () => {
    beforeEach(() => {
        // Some setup before each test within the test suite...
    })

    it('test 1', () => {})
    it('test 2', () => {})
})
```

Some important commands / terms:
 - `cy.visit('https://google.com')` - opens a page (both relative and absolute URLs)
 - `beforeEach`/`afterEach` - hooks to execute some code befor / after each test within a test suite (useful for preparation / cleanup)
 - `it.only(...)` / `describe.only(...)` - executes only the specified test (useful for development)
 - [`cy.get()`](https://docs.cypress.io/api/commands/get.html) - finds an element on the page specified by CSS selector
 - [`cy.get(...).should('not.exist')`](https://docs.cypress.io/api/commands/should.html) - assertions on found element
 - [`cy.get().within()`](https://docs.cypress.io/api/commands/within.html) - finds elements within found element
 - `cy.wait(5000)` - waits for the specified interval (miliseconds)

## Stubbing API calls

Links:
 - [Documentation page](https://docs.cypress.io/guides/guides/network-requests.html)
 - Examples in [cypress/integration/register.spec.js](cypress/integration/register.spec.js)

Works **only for XHR requests** and doesn't work for new Fetch API so far. There is [an experimental workaround](https://docs.cypress.io/guides/guides/network-requests.html#Testing-Strategies).

Network request are visible in test runner debugger. Custom response (a fixture) can be saved in JSON format in `cypress/fixtures` folder.

Important commands:
 - [`cy.server()`](https://docs.cypress.io/api/commands/server.html#Syntax)  - starts a server to begin request intercepting. Should be executed before stubbing.
 - [`cy.route()`](https://docs.cypress.io/api/commands/route.html) - Command to stub a request.
   - URL
   - HTTP method
   - HTTP response - fixtures saved in `cypress/fixtures` folder can be used by defining string `fixture:my_response.json`
   - HTTP response status (default is OK 200)
- `cy.route(...).as('responseAlias')` - alias for a stubbed request
- `cy.wait('@responseAlias')` - waits for a request with the alias to be completed.
  

## Custom commands

Links:
 - [Documentation](https://on.cypress.io/custom-commands)
 - Definition in [cypress/support/commands.js](cypress/support/commands.js)
 - Example usage in [cypress/integration/register.spec.js](cypress/integration/register.spec.js) - `cy.fillRegisterForm()`

Custom commands accessible on `cy` variable. They are useful for repetitive stuff like signing in.

Important commands:
 - `Cypress.Commands.add('myCustomCommand', () => {...})` - adds a command. Should be placed inside `cypress/support/commands.js` file by the convention.
 - `cy.myCustomCommand()` - executes the custom command


## Preparing state

Links:
 - [Documentation](https://docs.cypress.io/api/commands/request.html#Syntax)

**Custom commands shouldn't be overloaded to prepare state** (e.g. sign in a user). Programmatic preparation of state with `cy.request()` should be used instead, which makes any HTTP request on the background without affecting UI. The API is very similar to `cy.route()`.
