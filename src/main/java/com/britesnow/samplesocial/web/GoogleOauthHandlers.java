package com.britesnow.samplesocial.web;


import com.britesnow.samplesocial.entity.User;
import com.britesnow.samplesocial.service.GoogleAuthService;
import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.google.inject.Inject;
import com.google.inject.Singleton;

import java.io.IOException;

@Singleton
public class GoogleOauthHandlers {
    @Inject
    private GoogleAuthService googleAuthService;

    @WebModelHandler(startsWith = "/googleLogin")
    public void googleLogin(RequestContext rc) throws IOException {
        String authUrl = googleAuthService.getAuthorizationUrl();
        System.out.println(authUrl);
        rc.getRes().sendRedirect(authUrl);
    }

    @WebModelHandler(startsWith = "/googleCallback")
    public void googleCallback(RequestContext rc, @WebParam("code") String code) throws Exception {
        User user = rc.getUser(User.class);
        if (user != null && code != null) {
            if (googleAuthService.updateAccessToken(code, user.getId()))
                rc.getRes().sendRedirect(rc.getContextPath());
        } else {
            googleLogin(rc);
        }

    }
}
