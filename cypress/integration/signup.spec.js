import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
import signupPage from '../pages/SignupPage'

describe('Signup', () => {

    //ganchos
    /*     before(function () {
            cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
        })
    
        beforeEach(function () {
            cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')
        })
    
        after(function () {
            cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')
        })
    
        afterEach(function () {
            cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de teste')
        }) */

    /*     beforeEach(function () {
            cy.fixture('deliver').then((d) => {
                this.deliver = d
            })
        }) */

    it('User should be deliver', function () {

        var deliver = signupFactory.deliver()
        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.';
        signup.modalContentShouldBe(expectedMessage)
    })

    it('Incorrect document', function () {

        var deliver = signupFactory.deliver()
        deliver.cpf = '010210AAAAA'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Incorrect Email', function () {

        var deliver = signupFactory.deliver()
        deliver.email = 'papito.com.br'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    context('Required fields', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'deliver_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'É necessário informar o nome' },

        ]

        before(function(){
            signupPage.go()
            signupPage.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signupPage.alertMessageShouldBe(msg.output)
            })
        })
    })
})