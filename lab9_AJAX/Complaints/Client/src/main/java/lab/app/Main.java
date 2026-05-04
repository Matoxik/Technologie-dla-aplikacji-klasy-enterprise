package lab.app;

import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.core.GenericType;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lab.dto.ComplaintDTO;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        Long testId = 152L;

        Client client = ClientBuilder.newClient();
        String baseUrl = "http://localhost:8080/Server-1.0-SNAPSHOT/api/complaints";

        System.out.println("Fetching status");
        String status = getStatus(client, baseUrl, testId);
        System.out.println("Status: " + status);

        System.out.println("\nFetching all complaints");
        List<ComplaintDTO> all = getAllComplaints(client, baseUrl);
        all.forEach(c -> System.out.println(c.getId() + " - " + c.getComplaintText()));

        System.out.println("\nFetching one open complaint");
        ComplaintDTO complaint = getComplaint(client, baseUrl, testId);
        System.out.println("Fetched: " + complaint.getComplaintText() + " | Status: " + complaint.getStatus());

        System.out.println("\nModifying complaint to closed ===");
        complaint.setStatus("closed");
        Response putResponse = updateComplaint(client, baseUrl, testId, complaint);
        System.out.println("Status code after update: " + putResponse.getStatus());

        System.out.println("\nFetching only open complaints");
        List<ComplaintDTO> openComplaints = getOpenComplaints(client, baseUrl);
        openComplaints.forEach(c -> System.out.println(c.getId() + " - " + c.getComplaintText()));

        client.close();
    }

    private static String getStatus(Client client, String baseUrl, Long id) {
        return client.target(baseUrl + "/" + id + "/status")
                .request(MediaType.TEXT_PLAIN)
                .get(String.class);
    }

    private static List<ComplaintDTO> getAllComplaints(Client client, String baseUrl) {
        return client.target(baseUrl)
                .request(MediaType.APPLICATION_JSON)
                .get(new GenericType<List<ComplaintDTO>>() {
                });
    }

    private static ComplaintDTO getComplaint(Client client, String baseUrl, Long id) {
        return client.target(baseUrl + "/" + id)
                .request(MediaType.APPLICATION_JSON)
                .get(ComplaintDTO.class);
    }

    private static Response updateComplaint(Client client, String baseUrl, Long id, ComplaintDTO complaint) {
        return client.target(baseUrl + "/" + id)
                .request(MediaType.APPLICATION_JSON)
                .put(Entity.entity(complaint, MediaType.APPLICATION_JSON));
    }

    private static List<ComplaintDTO> getOpenComplaints(Client client, String baseUrl) {
        return client.target(baseUrl)
                .queryParam("status", "open")
                .request(MediaType.APPLICATION_JSON)
                .get(new GenericType<List<ComplaintDTO>>() {
                });
    }
}