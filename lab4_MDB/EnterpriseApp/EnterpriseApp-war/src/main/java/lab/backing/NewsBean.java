package lab.backing;

import jakarta.annotation.Resource;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.jms.JMSContext;
import jakarta.jms.Queue;

import java.util.List;

import lab.ejb.NewsItem;
import lab.ejb.NewsItemFacadeLocal;

@Named
@RequestScoped
public class NewsBean {

    @Inject
    private NewsItemFacadeLocal facade;

    @Inject
    private JMSContext context;

    @Resource(lookup = "java:app/jms/NewsQueue")
    private Queue queue;

    private String headingText;
    private String bodyText;

    void sendNewsItem(String heading, String body) {
        try {
            String messageText = heading + "|" + body;

            jakarta.jms.TextMessage message = context.createTextMessage(messageText);

            context.createProducer().send(queue, message);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public List<NewsItem> getNewsItems() {
        return facade.getAllNewsItems();
    }

    public String submitNews() {
        sendNewsItem(headingText, bodyText);
        return null;
    }

    public String getHeadingText() {
        return headingText;
    }

    public void setHeadingText(String headingText) {
        this.headingText = headingText;
    }

    public String getBodyText() {
        return bodyText;
    }

    public void setBodyText(String bodyText) {
        this.bodyText = bodyText;
    }
}