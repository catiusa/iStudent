package ro.ubb.istudent.util;

import javax.mail.MessagingException;

public interface Channel {
    void sendMessage(String user_to, String body);
}
