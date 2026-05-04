import CustomersTable from "./_components/customers-table";
import NewCustomerForm from "./_components/new-customer-form";

export const dynamic = "force-dynamic";

export default function CustomersPage() {
    return (
        <>
            <NewCustomerForm/>
            <p>&nbsp;</p>
            <CustomersTable/>
        </>
    );
}
