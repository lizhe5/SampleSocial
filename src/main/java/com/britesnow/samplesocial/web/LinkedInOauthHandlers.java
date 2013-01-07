package com.britesnow.samplesocial.web;


import com.britesnow.samplesocial.entity.User;
import com.britesnow.samplesocial.service.LinkedInAuthService;
import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.google.inject.Inject;
import com.google.inject.Singleton;

import java.io.IOException;

@Singleton
public class LinkedInOauthHandlers {

    @Inject
    private LinkedInAuthService linkedInAuthService;

    @WebModelHandler(startsWith = "/linkedinLogin")
    public void linkedinLogin(RequestContext rc) throws IOException {
        String authUrl = linkedInAuthService.getAuthorizationUrl();
        System.out.println(authUrl);
        rc.getRes().sendRedirect(authUrl);
    }
    @WebModelHandler(startsWith = "/linkedinCallback")
    public void linkedinCallback(RequestContext rc, @WebParam("oauth_token") String reqToken, @WebParam("oauth_verifier") String code) throws Exception {
        User user = rc.getUser(User.class);
        if (user!=null && code != null) {
            if (linkedInAuthService.updateAccessToken(reqToken, code, user.getId())){
                rc.getReq().getSession().removeAttribute("reqToken");
                rc.getRes().sendRedirect(rc.getContextPath());
            } else {
                linkedinLogin(rc);
            }

        }
    }
}
