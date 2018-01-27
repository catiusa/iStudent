package ro.ubb.istudent.util;



import javax.mail.internet.MimeMessage;

public class MessageSender {
    String to_user, body;
    MessageSenderFactory factory = new MessageSenderFactory();
    int type;

    public MessageSender(int _type)
    {
        type = _type;
    };

    public void sendMessage(String _to_user, String _body)
    {
        to_user = _to_user;
        body = _body;


        Channel c = factory.CreateChannel(type); // 2 for email ( 1 for sms)

        c.sendMessage(to_user,body);

    }

}
