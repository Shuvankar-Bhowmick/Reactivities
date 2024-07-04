using System.Security.Claims;
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

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            // adding authentication
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

            // adding authorization
            services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminPolicy", p => p.RequireClaim(ClaimTypes.Role, "admin"));
            });

            services.AddScoped<TokenService>(); // AddScoped because the token is scoped to the http request. Token stays valid till the scope of the http request.

            return services;
        }
    }
}
