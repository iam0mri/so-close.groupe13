
import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

export const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: "dev-f4ersp6xmlisgq2s.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://dev-f4ersp6xmlisgq2s.us.auth0.com/api/v2/", // remplace par la vraie valeur
  issuer: "dev-f4ersp6xmlisgq2s.us.auth0.com",
  algorithms: ["RS256"],
});

module.exports = middleware