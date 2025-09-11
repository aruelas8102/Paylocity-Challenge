
describe('Login to the Paylocity Benefits Dashboard', function(){

    beforeEach(function(){
        cy.visit('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/LogIn');

        cy.fixture('inputLogin')
        .then(data =>{
            this.data = data;
        })
    });

    it('Login to the Paylocity Benefits Dashboard', function(){
        cy.get('#Username').type(this.data.Username);
        cy.get('#Password').type(this.data.Password);
        cy.get("button[type='submit']").click();
        
        cy.get('.navbar-brand').should('have.text', 'Paylocity Benefits Dashboard');
        cy.wait(2000);
    });

    it('Incorrect Username', function(){
        cy.get('#Username').type(this.data.incorrectUsername);
        cy.get('#Password').type(this.data.Password);
        cy.get("button[type='submit']").click();
        
        cy.get('li').should('have.text', 'The specified username or password is incorrect.');
        cy.wait(2000);
    });

        it('Incorrect Password', function(){
        cy.get('#Username').type(this.data.Username);
        cy.get('#Password').type(this.data.incorrectPassword);
        cy.get("button[type='submit']").click();
        
        cy.get('li').should('have.text', 'The specified username or password is incorrect.');
        cy.wait(2000);
    });
});