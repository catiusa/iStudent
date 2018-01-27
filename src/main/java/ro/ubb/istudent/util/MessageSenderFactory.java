package ro.ubb.istudent.util;

public class MessageSenderFactory {
    public Channel CreateChannel(int ct)
    {
        switch(ct)
        {
            case 1:
                return new SmsChannel();
            case 2:
                return new EmailChannel();
        }
        return null;
    }
}
