import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  
  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})

Route.on('/').render('welcome')

Route.get('signup', 'AuthController.show_signup_form').as('show_signup_form')
Route.post('signup', 'AuthController.signup_user').as('signup_user')
Route.get('signin', 'AuthController.show_signin_form').as('show_signin_form')
Route.post('signin', 'AuthController.signin_user').as('signin_user')