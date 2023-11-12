/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import '@badeball/cypress-cucumber-preprocessor';

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            getByCy: typeof getByCy
            logout: typeof logout
            login: typeof login
        }
    }
}
function getByCy(field: string ) {
    return cy.get(`[placeholder=${field}]`,{timeout:40000})
}

function logout() {
    cy.get('.oxd-userdropdown-tab').click({ force: true });
    return cy.get('.oxd-dropdown-menu',{timeout:40000}).contains('Logout').click({ force: true });
}
function login(username: string, password: string) {
    cy.getByCy('Username').type(username);
    cy.getByCy('Password').type(password);
    cy.get('button').click({ force: true });
    return cy.get('.oxd-topbar-header-title').contains("Dashboard")
}
Cypress.Commands.add('getByCy', getByCy)
Cypress.Commands.add('logout', logout)
Cypress.Commands.add('login', login)
