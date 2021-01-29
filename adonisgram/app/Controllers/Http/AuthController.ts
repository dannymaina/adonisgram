import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";

export default class AuthController {
  public async show_signup_form({ view }: HttpContextContract) {
    return view.render("auth/signup");
  }

  public async signup_user({
    request,
    response,
    session,
  }: HttpContextContract) {
    const validationSchema = schema.create({
      username: schema.string({ trim: true }, [
        rules.maxLength(32),
        rules.unique({ table: "users", column: "username" }),
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.maxLength(254),
        rules.unique({ table: "users", column: "email" }),
      ]),
      password: schema.string({ trim: true }, [
        rules.maxLength(32),
        rules.confirmed(),
      ]),
    });

    const validationMessages = {
      required: "{{field}} is required to sign up",
      maxLength:
        "{{field}} must have a max of {{ options.maxLength }} characters",
      unique: "{{field}} is already in use",
      email: "please provide a valid email address",
      confirmed: "Passwords don't match",
    };

    const userDetails = await request.validate({
      schema: validationSchema,
      messages: validationMessages,
    });

    const user = new User();
    user.username = userDetails.username;
    user.email = userDetails.email;
    user.password = userDetails.password;
    await user.save()

    session.flash({ success: "Your account has been created" });

    response.redirect().toRoute("show_signin_form");
  }

  public async show_signin_form({ view }: HttpContextContract) {
    return view.render("auth/signin");
  }

  public async signin_user({ request, response, auth }: HttpContextContract) {
    const validationSchema = schema.create({
      email: schema.string({ trim: true }),
      password: schema.string({ trim: true }),
    });

    const validationMessages = {
      required: "{{field}} is required",
    };

    const userDetails = await request.validate({
      schema: validationSchema,
      messages: validationMessages,
    });

    await auth.attempt(userDetails.email, userDetails.password)

    return response.redirect().toRoute('profile')
  }

  /**
   * logout
    {auth, response}: HttpContextContract   
  */
  public signout_user({auth, response}: HttpContextContract) {
    auth.logout()
    response.redirect().toRoute('show_signin_form')
  }
}
