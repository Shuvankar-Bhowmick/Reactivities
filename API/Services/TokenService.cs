/*
    Typically if there's something that we're creating that doesn't involve data access then it's not a repository. And we don't need to create this logic inside a controller as we're keeping it separate so we create an isolated service for it.
*/

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService
    {
        public string CreateToken(AppUser user)
        {
            // We put claims inside a token
            // We will create a list of claims
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
            };

            // HTTPS uses symmetric key.
            // create a symmetric security key.
            /*
            this key must be kept securely on the server and must never leave the server otherwise anybody would be able to create a token for any user as we rely on this for validation our token
            */
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    "wA2QTyMZb7ktaWdJHnxeXjqsRpEh4Sg3VvUuPLr65DFfGmBKcznwJsvuDjyBaeT64Rf3YXEH9xk8gtcmrWA2hNUbSVFQp5CGKPZzPRQnxbVBD8dCGXw2H6kaK5ZvjtfY3FEMuNzyqg4WJsmTAepc9hHb9aqfZ5kDLJ7UNPvEA6yTt4wV2gdMsrmCcp8uQBReXKY3FxGSwhtJMAqECkeZNQSu4sPBVc92j5gprHDnXx3LfRvmU8KGFTz7Yy"
                )
            );
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7), // will expire after 7 days from when the application is executed
                SigningCredentials = creds,
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
