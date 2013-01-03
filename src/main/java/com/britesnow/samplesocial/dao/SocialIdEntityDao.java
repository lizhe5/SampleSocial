package com.britesnow.samplesocial.dao;

import com.britesnow.samplesocial.entity.SocialIdEntity;


public class SocialIdEntityDao extends BaseHibernateDao<SocialIdEntity> {

    public SocialIdEntity getSocialdentity(Long user_id,String service) {
        SocialIdEntity socialdentity = (SocialIdEntity) daoHelper.findFirst("from Socialdentity u where u.service = ? and u.user_id = ? ", service,user_id);
        return socialdentity;
    }
    
}
