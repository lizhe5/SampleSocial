package com.britesnow.samplesocial.web;

import com.britesnow.samplesocial.oauth.OauthException;
import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.exception.WebExceptionContext;
import com.britesnow.snow.web.exception.annotation.WebExceptionCatcher;
import com.google.inject.Singleton;

import java.io.IOException;

@Singleton
public class WebExceptionProcessor {

    @WebExceptionCatcher
    public void processOauthException(OauthException e, WebExceptionContext wec, RequestContext rc) throws IOException {
        //log.warn(e.getMessage(), e);
        rc.getWebModel().put("oauthUrl", e.getOauthUrl());
        rc.getWebModel().put("oauthError", true);
        rc.getRes().sendRedirect(e.getOauthUrl());
    }
}
