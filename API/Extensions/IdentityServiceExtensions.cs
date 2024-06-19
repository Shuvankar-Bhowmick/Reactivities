using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(
            this IServiceCollection services,
            IConfiguration config
        )
        {
            /* Not using this as this on also has user redirection behavior which we do not want*/
            // services.AddIdentity<>()
            services
                .AddIdentityCore<AppUser>(opt =>
                {
                    opt.Password.RequireNonAlphanumeric = false;
                })
                .AddEntityFrameworkStores<DataContext>();

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    "wA2QTyMZb7ktaWdJHnxeXjqsRpEh4Sg3VvUuPLr65DFfGmBKcznwJsvuDjyBaeT64Rf3YXEH9xk8gtcmrWA2hNUbSVFQp5CGKPZzPRQnxbVBD8dCGXw2H6kaK5ZvjtfY3FEMuNzyqg4WJsmTAepc9hHb9aqfZ5kDLJ7UNPvEA6yTt4wV2gdMsrmCcp8uQBReXKY3FxGSwhtJMAqECkeZNQSu4sPBVc92j5gprHDnXx3LfRvmU8KGFTz7Yy"
                )
            );

            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        /* Not going to validate against these parameters */
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddScoped<TokenService>(); // AddScoped because the token is scoped to the http request. Token stays valid till the scope of the http request.

            return services;
        }
    }
}
