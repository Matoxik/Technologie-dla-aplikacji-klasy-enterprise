package lab.requests.lab.requests.backing;

import jakarta.enterprise.context.RequestScoped;
import jakarta.faces.component.html.HtmlDataTable;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Size;
import lab.requests.data.RequestRepository;
import lab.requests.entieties.Request;

import java.util.List;

@RequestScoped
@Named
public class RequestsList {
    @Inject
    private RequestRepository requestRepository;
    @Size(min = 3, max = 60, message = "{request.size}")
    private String newRequest;
    ;
    private HtmlDataTable requestsDataTable;

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public String getNewRequest() {
        return newRequest;
    }

    public void setNewRequest(String newRequest) {
        this.newRequest = newRequest;
    }

    public HtmlDataTable getRequestsDataTable() {
        return requestsDataTable;
    }

    public void setRequestsDataTable(HtmlDataTable requestsDataTable) {
        this.requestsDataTable = requestsDataTable;
    }

    @Transactional
    public String addRequest() {
        Request newReq = new Request();

        newReq.setRequestDate(java.time.LocalDate.now());
        newReq.setRequestText(getNewRequest());

        requestRepository.create(newReq);

        setNewRequest("");

        return "requestsList.xhtml?faces-redirect=true";
    }


    @Transactional
    public String deleteRequest() {
        // Pobranie obiektu Request przypisanego do wiersza, w którym kliknięto przycisk
        Request req = (Request) getRequestsDataTable().getRowData();
        // Usunięcie obiektu za pomocą repozytorium
        requestRepository.remove(req);

        return "requestsList.xhtml?faces-redirect=true";
    }
}
