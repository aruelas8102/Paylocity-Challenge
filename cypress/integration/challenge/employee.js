describe('Adding, Editing and Deleting Employees in the Paylocity Benefits Dashboard', function(){

    beforeEach(function(){
        cy.visit('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/LogIn');

        cy.fixture('inputLogin')
        .then(data =>{
            this.data = data;
        })
    });

    it('Add the New Employee.', function(){
        cy.get('#Username').type(this.data.Username);
        cy.get('#Password').type(this.data.Password);
        cy.get("button[type='submit']").click();
        
        cy.get('.navbar-brand').should('have.text', 'Paylocity Benefits Dashboard');
        cy.get('#add').click();

        cy.get('#employeeModal > .modal-dialog > .modal-content > .modal-header > .modal-title').should('have.text', 'Add Employee');

        cy.get('[name="firstName"]').type(this.data.FirstName);
        cy.get('[name="lastName"]').type(this.data.LastName);
        cy.get('[name="dependants"]').type('2');
        cy.get('#addEmployee').click();
        cy.wait(2000);
    });

    it('Edit Employee', function(){
        cy.get('#Username').type(this.data.Username);
        cy.get('#Password').type(this.data.Password);
        cy.get("button[type='submit']").click();
        
        cy.get('#employeeModal > .modal-dialog > .modal-content > .modal-header > .modal-title').should('have.text', 'Add Employee');

        cy.get('.fa-edit').click();
        cy.get('#updateEmployee').should('have.text', 'Update');

        cy.get('[name="dependants"]').clear();
        cy.get('[name="dependants"]').type(this.data.DependentsUpdate);
        cy.get('#updateEmployee').click();

        cy.get('tbody > tr > :nth-child(4)').should('have.text', '4');
        cy.wait(2000);
    });

    it('Delete Employee', function(){
        cy.get('#Username').type(this.data.Username);
        cy.get('#Password').type(this.data.Password);
        cy.get("button[type='submit']").click();

        cy.get('.fa-times').click();
        
        cy.get('#deleteModal > .modal-dialog > .modal-content > .modal-header > .modal-title').should('have.text', 'Delete Employee');
        cy.get('#deleteEmployee').click();       
        cy.wait(5000);

        cy.get('.nav-item > a').click();
    });
});