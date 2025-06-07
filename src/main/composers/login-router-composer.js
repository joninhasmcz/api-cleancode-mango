const loginRouter = require("../../presentation/routers/")
const env = require("../config/env")
const TokenGenerator = require("../../helpers/token-generator");
const Encrypter = require("../../helpers/encrypter");
const LoadUserByEmailRepository = require("../../infra/repositories/load-user-by-email-repository");
const UpdateAccessTokenRepository = require("../../infra/repositories/update-access-token-repository");
const EmailValidator = require("../../helpers/email-validator");
const AuthUseCase = require("../../domain/usecases/auth-usecase");

module.exports = class LoginRouterComposer {
    static compose() {
        const tokenGenerator = new TokenGenerator(env.tokenSecret)
        const encrypter = new Encrypter()
        const loadUserByEmailRepository = new LoadUserByEmailRepository()
        const updateAccessTokenRepository = new UpdateAccessTokenRepository()
        const emailValidator = new EmailValidator()
        const authUseCase = new AuthUseCase({
            loadUserByEmailRepository,
            updateAccessTokenRepository,
            encrypter,
            tokenGenerator
        })
        return new LoginRouter({
            authUseCase,
            emailValidator
        })
    }
}