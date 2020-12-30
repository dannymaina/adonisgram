import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('welcome')

Route.get('signup', 'AuthController.signup').as('signup')
Route.get('signin', 'AuthController.signin').as('signin')
