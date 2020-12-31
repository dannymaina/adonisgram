import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('profile')

Route.get('signup', 'AuthController.show_signup_form').as('show_signup_form')
Route.post('signup', 'AuthController.signup_user').as('signup_user')
Route.get('login', 'AuthController.show_signin_form').as('show_signin_form')
Route.post('login', 'AuthController.signin_user').as('signin_user')
Route.get('logout', 'AuthController.signout_user').as('signout_user')


Route.get('profile', 'ProfilesController.index').as('profile').middleware('auth')


Route.get('health', 'HealthChecksController.index').as('health_check')
