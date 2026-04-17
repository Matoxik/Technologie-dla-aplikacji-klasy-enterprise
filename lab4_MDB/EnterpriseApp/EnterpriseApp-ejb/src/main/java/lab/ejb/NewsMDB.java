package lab.ejb;

import jakarta.ejb.ActivationConfigProperty;
import jakarta.ejb.MessageDriven;
import jakarta.jms.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@MessageDriven(activationConfig = {
        @ActivationConfigProperty(propertyName = "destinationLookup", propertyValue = "java:app/jms/NewsQueue"),
        @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "jakarta.jms.Queue")
})
@JMSDestinationDefinition(name = "java:app/jms/NewsQueue",
        interfaceName = "jakarta.jms.Queue", resourceAdapter = "jmsra",
        destinationName = "NewsQueue")

public class NewsMDB implements MessageListener {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void onMessage(Message message) {
        try {
            if (message instanceof jakarta.jms.TextMessage) {
                jakarta.jms.TextMessage msg = (jakarta.jms.TextMessage) message;
                String text = msg.getText();

                String[] parts = text.split("\\|");

                if (parts.length >= 2) {
                    NewsItem e = new NewsItem();
                    e.setHeading(parts[0]);
                    e.setBody(parts[1]);

                    em.persist(e);
                }
            }
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
}