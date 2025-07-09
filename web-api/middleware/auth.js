const { expressjwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const AUTH0_DOMAIN = "dev-f4ersp6xmlisgq2s.us.auth0.com";
const AUTH0_AUDIENCE = "https://dev-f4ersp6xmlisgq2s.us.auth0.com/api/v2/";

const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: AUTH0_AUDIENCE,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

module.exports = { checkJwt };