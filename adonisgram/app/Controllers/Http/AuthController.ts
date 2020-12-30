import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    public async signup ({view}: HttpContextContract) {
        return view.render('auth/signup')
      }

      public async signin ({view}: HttpContextContract) {
        return view.render('auth/signin')
      } 
}
