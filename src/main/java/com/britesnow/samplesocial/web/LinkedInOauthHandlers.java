package com.britesnow.samplesocial.web;


import java.io.IOException;

import org.scribe.model.Token;
import org.scribe.model.Verifier;
import org.scribe.oauth.OAuthService;

import com.britesnow.samplesocial.dao.SocialIdEntityDao;
import com.britesnow.samplesocial.entity.Service;
import com.britesnow.samplesocial.entity.SocialIdEntity;
import com.britesnow.samplesocial.entity.User;
import com.britesnow.samplesocial.oauth.OAuthType;
import com.britesnow.samplesocial.oauth.OAuthUtils;
import com.britesnow.samplesocial.service.LinkedInAuthService;
import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class LinkedInOauthHandlers {
    @Inject
    private OAuthUtils oAuthUtils;
    @Inject
    private LinkedInAuthService linkedInAuthService;
     @Inject
    private SocialIdEntityDao socialIdEntityDao;

    @WebModelHandler(startsWith = "/linkedinLogin")
    public void linkedinLogin(RequestContext rc) throws IOException {
        OAuthService linkedService = oAuthUtils.getOauthService(OAuthType.LINKEDIN);
        Token requestToken = linkedService.getRequestToken();
        rc.getReq().getSession().setAttribute("reqToken", requestToken);
        String authUrl = linkedService.getAuthorizationUrl(requestToken);
        System.out.println(authUrl);
        rc.getRes().sendRedirect(authUrl);
    }
    @WebModelHandler(startsWith = "/linkedinCallback")
    public void linkedinCallback(RequestContext rc, @WebParam("oauth_verifier") String code) throws Exception {
        User user = rc.getUser(User.class);
        if (user!=null && code != null) {
            OAuthService linkinedOAuthService = oAuthUtils.getOauthService(OAuthType.LINKEDIN);
            Verifier verifier = new Verifier(code);
            Token reqToken = (Token) rc.getReq().getSession().getAttribute("reqToken");

            Token accessToken = linkinedOAuthService.getAccessToken(reqToken, verifier);
            if (accessToken.getToken() != null) {
                rc.getReq().getSession().removeAttribute("reqToken");
                //get expire date
                SocialIdEntity social = linkedInAuthService.getSocialIdEntity(user.getId());
                boolean newSocial = false;
                if (social == null) {
                    social = new SocialIdEntity();
                    newSocial = true;
                }
                social.setUser_id(user.getId());
                social.setToken(accessToken.getToken());
                social.setService(Service.LinkedIn);
                if (newSocial) {
                    socialIdEntityDao.save(social);
                }else {
                    socialIdEntityDao.update(social);
                }
                rc.getRes().sendRedirect(rc.getContextPath());
            } else {
                linkedinLogin(rc);
            }

        }
    }
}
