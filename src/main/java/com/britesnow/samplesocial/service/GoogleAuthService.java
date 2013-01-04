package com.britesnow.samplesocial.service;

import com.britesnow.samplesocial.entity.Service;
import com.britesnow.samplesocial.entity.SocialIdEntity;

public class GoogleAuthService implements AuthService {

    private Service serivce = Service.Google;
    @Override
    public SocialIdEntity getSocialIdEntity(Long userId) {
        // TODO Auto-generated method stub
        return null;
    }

}
