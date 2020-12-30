import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('welcome')

Route.get('signup', 'AuthController.show_signup_form').as('show_signup_form')
Route.post('signup', 'AuthController.signup_user').as('signup_user')
Route.get('signin', 'AuthController.show_signin_form').as('show_signin_form')
Route.post('signin', 'AuthController.signin_user').as('signin_user')