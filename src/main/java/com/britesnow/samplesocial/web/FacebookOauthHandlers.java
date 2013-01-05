package com.britesnow.samplesocial.web;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

import com.britesnow.samplesocial.dao.SocialIdEntityDao;
import com.britesnow.samplesocial.entity.Service;
import com.britesnow.samplesocial.entity.SocialIdEntity;
import com.britesnow.samplesocial.entity.User;
import com.britesnow.samplesocial.oauth.OAuthUtils;
import com.britesnow.samplesocial.service.FacebookAuthService;
import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class FacebookOauthHandlers {
    @Inject
    private FacebookAuthService facebookAuthService;

    @Inject
    private WebUtil             webUtil;

    @Inject
    private OAuthUtils          oAuthUtils;
    @Inject
    private SocialIdEntityDao   socialIdEntityDao;

    @WebModelHandler(startsWith = "/authorize")
    public void authorize(@WebParam("service") String service, @WebModel Map m, RequestContext rc) throws IOException {
        if ("facebook".equals(service)) {
            String url = facebookAuthService.getAuthorizationUrl();
//            rc.getRes().sendRedirect(url);
            m.put("url", url);
        }
    }

    @WebModelHandler(startsWith = "/oauth_fb_callback")
    public void fbCallback(@WebParam("code") String code, @WebModel Map m, RequestContext rc) {
        String[] tokens = facebookAuthService.getAccessToken(code);
        System.out.println("--->" + tokens[0]);
        User user =   webUtil.getUser(rc);
        SocialIdEntity s =   facebookAuthService.getSocialIdEntity(user.getId());
        String[] strArr =tokens[2].split("&expires=");
        String expire = strArr[1];
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.SECOND,new Integer(expire)/1000);
        Date tokenDate = cal.getTime();
        if (s==null) {
            s = new SocialIdEntity();
            s.setUser_id(user.getId());
            s.setToken(tokens[0]);
            s.setService(Service.FaceBook);
            s.setTokenDate(tokenDate);
            socialIdEntityDao.save(s);
        }else{
            s.setTokenDate(tokenDate);
            s.setToken(tokens[0]);
            socialIdEntityDao.update(s);
        }
    }
}
