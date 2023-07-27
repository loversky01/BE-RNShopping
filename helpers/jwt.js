const { expressjwt: jwt } = require('express-jwt');

// function authJwt() {
//   const secret = process.env.SECRET;
//   const api = process.env.API_URL;
//   return jwt({
//     secret,
//     algorithms: ['HS256'],
//     isRevoked: isRevoked,
//   }).unless({
//     path: [
//       { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
//       { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
//       { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },

//       `${api}/users/login`,
//       `${api}/users/register`,
//     ],
//   });
// }

function authJwt() {
  const secret = process.env.SECRET;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/users(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'POST', 'OPTIONS'] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

async function isRevoked(req, token) {
  // token now contains payload data
  if (!token.payload.isAdmin) {
    return true; // if the isAdmin flag in payload is false, then we reject the token
  }
  return false;
}
module.exports = authJwt;
