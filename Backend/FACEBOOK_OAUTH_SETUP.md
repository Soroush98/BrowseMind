# Facebook OAuth Setup Guide for BrowseMind

## Facebook App Configuration

### 1. Facebook Developer Console Setup

1. **Go to Facebook Developers**: https://developers.facebook.com/
2. **Create a New App**:
   - Choose "Consumer" app type
   - Enter App Name: "BrowseMind"
   - Enter Contact Email: browsemind.net@gmail.com

3. **Configure Facebook Login**:
   - Go to App Dashboard > Products > Facebook Login > Settings
   - Add these Valid OAuth Redirect URIs:
     - Production: `https://www.browsemind.net/auth/facebook/callback`
     - Development: `http://localhost:3000/auth/facebook/callback`

### 2. Current Configuration

Your `.env` file contains:
```
FACEBOOK_APP_ID=1280220763809642
FACEBOOK_APP_SECRET=ccbcf5a3c0a0270cc65a783011fb531d
FACEBOOK_REDIRECT_URI=https://www.browsemind.net/auth/facebook/callback
```

### 3. App Review & Permissions

For production, you need to request these permissions:
- **email**: To get user's email address
- **public_profile**: To get user's basic profile info

### 4. Testing the Configuration

Test your configuration by visiting:
- Development: `http://localhost:8000/api/facebook-config-test/`
- Production: `https://www.browsemind.net/api/facebook-config-test/`

### 5. OAuth Flow

1. **Frontend**: User clicks "Continue with Facebook"
2. **Backend**: Returns Facebook OAuth URL with state parameter
3. **Facebook**: User authorizes app and redirects to callback URL
4. **Frontend**: Callback page extracts code and sends to backend
5. **Backend**: Exchanges code for access token, gets user info, creates/updates user
6. **Frontend**: User is logged in and redirected to dashboard

### 6. Security Features

- **State Parameter**: CSRF protection
- **HTTPS Required**: For production
- **Token Expiration**: JWT tokens expire in 7 days
- **Secure Cookies**: HttpOnly, Secure, SameSite=None

### 7. Error Handling

The implementation handles common Facebook errors:
- Invalid access tokens
- Missing email permissions
- Network failures
- API rate limits

### 8. Development vs Production

**Development** (localhost):
- Use `http://localhost:3000/auth/facebook/callback`
- Test with Facebook's test users

**Production** (browsemind.net):
- Use `https://www.browsemind.net/auth/facebook/callback`
- App must be reviewed and approved by Facebook

### 9. Troubleshooting

**Common Issues**:
1. **Invalid Redirect URI**: Make sure the redirect URI in Facebook app settings matches exactly
2. **Missing Email Permission**: User must grant email permission
3. **App Not Live**: For production, app must be reviewed and approved
4. **CORS Issues**: Make sure frontend domain is whitelisted

**Debug Steps**:
1. Check `/api/facebook-config-test/` endpoint
2. Verify redirect URI configuration
3. Test with Facebook's Graph API Explorer
4. Check browser network tab for API calls
