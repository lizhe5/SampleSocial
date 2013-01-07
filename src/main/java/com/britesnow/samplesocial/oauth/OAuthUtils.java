package com.britesnow.samplesocial.oauth;

import java.util.HashMap;
import java.util.Map;

import org.scribe.builder.ServiceBuilder;
import org.scribe.model.OAuthConstants;
import org.scribe.oauth.OAuthService;

import com.britesnow.snow.web.binding.ApplicationProperties;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class OAuthUtils {
    private final Map appconfig;
    private final Map<OAuthType, OAuthService> oAuthServiceMap = new HashMap<OAuthType, OAuthService>();

    public static final String EMAIL_ENDPOINT = "https://www.googleapis.com/userinfo/email";
    public static final String PROFILE_ENDPOINT = "https://www.googleapis.com/oauth2/v1/userinfo";

    @Inject
    public OAuthUtils(@ApplicationProperties Map appConfig) {
        this.appconfig = appConfig;
    }

    public OAuthService getOauthService(OAuthType service) {
        OAuthService oAuthService = oAuthServiceMap.get(service);
        if (oAuthService == null) {
            String clientId = (String) appconfig.get(service.getKey() + ".client_id");
            String secret = (String) appconfig.get(service.getKey() + ".secret");
            String callback = (String) appconfig.get(service.getKey() + ".callback");
            String scope = (String) appconfig.get(service.getKey() + ".scope");
            String accessType = (String) appconfig.get(service.getKey() + ".access_type");
            ServiceBuilder builder = new ServiceBuilder().provider(service.getApiClass()).apiKey(clientId).apiSecret(secret);
            builder.grantType(OAuthConstants.GRANT_TYPE_AUTHORIZATION_CODE);
            if (callback != null) {
                builder.callback(callback);
            }
            if (scope != null) {
                builder.scope(scope);
            }
            if (accessType != null) {
                builder.accessType(accessType);
            }
            oAuthService = builder.build();
            oAuthServiceMap.put(service, oAuthService);

        }
        return oAuthService;
    }
}
