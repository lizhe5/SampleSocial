package com.britesnow.samplesocial.service;

import com.britesnow.samplesocial.entity.User;
import com.britesnow.samplesocial.mail.OAuth2Authenticator;
import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.britesnow.snow.web.param.annotation.WebUser;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.sun.mail.imap.IMAPStore;
import com.sun.mail.smtp.SMTPTransport;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.search.FromStringTerm;
import javax.mail.search.OrTerm;
import javax.mail.search.SearchTerm;
import javax.mail.search.SubjectTerm;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Singleton
public class GMailService {
    @Inject
    OAuth2Authenticator emailAuthenticator;

    public Message[] listMails(User user, String folderName, int start, int count) throws Exception {
        IMAPStore imap = getImapStore(user);

        Folder inbox;
        if (folderName == null) {
            inbox = imap.getFolder("INBOX");
        } else {
            inbox = imap.getFolder(folderName);
        }

        inbox.open(Folder.READ_ONLY);
        FetchProfile profile = new FetchProfile();
        profile.add(FetchProfile.Item.ENVELOPE);
        if (!inbox.isOpen()) {
            inbox.open(Folder.READ_ONLY);
        }

        return inbox.getMessages(start, count);
    }

    public Folder[] listFolders(User user) throws Exception {
        IMAPStore imap = getImapStore(user);
        return imap.getDefaultFolder().list();
    }

    public Message getEmail(User user, int emailId) throws Exception {
        IMAPStore imap = getImapStore(user);
        Folder inbox = imap.getFolder("INBOX");
        inbox.open(Folder.READ_ONLY);
        FetchProfile profile = new FetchProfile();
        profile.add(FetchProfile.Item.ENVELOPE);
        if (!inbox.isOpen()) {
            inbox.open(Folder.READ_ONLY);
        }

        Message message = inbox.getMessage(emailId);
        return message;
    }

    public void deleteEmail(User user, int emailId) throws Exception {
        IMAPStore imap = getImapStore(user);
        Folder inbox = imap.getFolder("INBOX");

        inbox.open(Folder.READ_WRITE);
        Message msg = inbox.getMessage(emailId);
        msg.setFlag(Flags.Flag.DELETED, true);
    }

    public Message[] search(User user, String subject, String from) throws Exception {
        Folder inbox = null;
        try {
            IMAPStore imap = getImapStore(user);

            inbox = imap.getFolder("INBOX");
            inbox.open(Folder.READ_ONLY);
            List<SearchTerm> searchTerms = new ArrayList<SearchTerm>();
            if (subject != null) {
                SubjectTerm subjectTerm = new SubjectTerm(subject);
                searchTerms.add(subjectTerm);
            }
            if (from != null) {
                FromStringTerm fromStringTerm = new FromStringTerm(from);
                searchTerms.add(fromStringTerm);
            }
            if (searchTerms.size() > 0) {
                return inbox.search(new OrTerm(searchTerms.toArray(new SearchTerm[searchTerms.size()])));


            }

        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        } finally {
            if (inbox != null)
                inbox.close(true);
        }
        return null;
    }

    public void sendMail(User user,String subject,String content, String to) throws Exception {
//        SMTPTransport transport = emailAuthenticator.connectToSmtp(email, token);
//        Session mailSession = emailAuthenticator.getSMTPSession(token);
//        Message msg = new MimeMessage(mailSession);
//        try {
//            msg.setFrom(new InternetAddress(email));
//            msg.setSubject(subject);
//            msg.setContent(content, "text/html;charset=UTF-8");
//            InternetAddress[] iaRecevers = new InternetAddress[1];
//            iaRecevers[0] = new InternetAddress(to);
//            msg.setRecipients(Message.RecipientType.TO, iaRecevers);
//            transport.sendMessage(msg, msg.getAllRecipients());
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return null;
    }

    private IMAPStore getImapStore(User user) throws Exception {
//        return emailAuthenticator.connectToImap(email, token);
        return null;
    }


}
