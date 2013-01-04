package com.britesnow.samplesocial.entity;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;


@Entity
@Table(name = "social_id_entity")
@javax.persistence.SequenceGenerator(name = "SEQ_STORE", allocationSize = 1, sequenceName = "social_id_entity_id_seq")
public class SocialIdEntity extends BaseEntity {
    private Long   user_id;
    private String token;
    @Column(name="token_date")
    private Date tokenDate;
    @Enumerated(EnumType.STRING)
    private Service service;
    
    public Long getUser_id() {
        return user_id;
    }
    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public Date getTokenDate() {
        return tokenDate;
    }
    public void setTokenDate(Date tokenDate) {
        this.tokenDate = tokenDate;
    }
    public Service getService() {
        return service;
    }
    public void setService(Service service) {
        this.service = service;
    }
    
}
