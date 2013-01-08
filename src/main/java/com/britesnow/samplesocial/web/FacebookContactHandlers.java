package com.britesnow.samplesocial.web;

import java.util.List;

import com.britesnow.samplesocial.dao.ContactDao;
import com.britesnow.samplesocial.entity.Contact;
import com.britesnow.samplesocial.entity.SocialIdEntity;
import com.britesnow.samplesocial.entity.User;
import com.britesnow.samplesocial.service.FacebookAuthService;
import com.britesnow.samplesocial.service.FacebookService;
import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.handler.annotation.WebActionHandler;
import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.britesnow.snow.web.param.annotation.WebUser;
import com.google.inject.Inject;

public class FacebookContactHandlers {
    @Inject
    private ContactDao      contactDao;
    @Inject
    private FacebookService     facebookService;
    @Inject
    private FacebookAuthService facebookAuthService;

    @WebModelHandler(startsWith = "/fbFriendsList")
    public void getFriends(@WebUser User user, @WebParam("limit") Integer limit, @WebParam("offset") Integer offset,
                            RequestContext rc) {
        SocialIdEntity e = facebookAuthService.getSocialIdEntity(user.getId());
        String token = e.getToken();
        List ls = facebookService.getFriendsByPage(token, limit, offset);
        rc.getWebModel().put("_jsonData", ls);
    }
    
    
    @WebActionHandler
    public Object addContact(@WebParam("token") String token, @WebParam("groupId") Long groupId,
                            @WebParam("fbid") String fbid) {
        try {
            Contact c = contactDao.getContactByFbid(fbid);
            if (c == null) {
                c = new Contact();
            }
            c.setFbid(fbid);
            com.restfb.types.User user = facebookService.getFriendInformation(token, fbid);
            c.setName(user.getName());
            c.setEmail(user.getEmail());
            c.setHometownname(user.getHometownName());
            if (c.getId() == null) {
                contactDao.save(c);
            } else {
                contactDao.update(c);
            }
            return c;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
