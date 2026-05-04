import SubmitButton from "@/components/submit-button";
import {customerService} from "@/lib/services/customer-service";
import Link from "next/link";
import {deleteCustomerAction} from "../actions";

export default async function CustomersTable() {
    const customers = await customerService.getAll();

    return (
        <table className="table-auto">
            <thead>
            <tr>
                <th className="border px-4 py-1">ID</th>
                <th className="border px-4 py-1">First name</th>
                <th className="border px-4 py-1">Last name</th>
                <th className="border px-4 py-1">Email</th>
                <th className="border px-4 py-1">Actions</th>
            </tr>
            </thead>
            <tbody>
            {customers.map((c) => (
                <tr key={c.id}>
                    <td className="border px-4 py-1">
                        <Link href={`/customers/${c.id}/edit`} className="underline hover:text-blue-800">
                            {c.id}
                        </Link>
                    </td>
                    <td className="border px-4 py-1">{c.firstName}</td>
                    <td className="border px-4 py-1">{c.lastName}</td>
                    <td className="border px-4 py-1">{c.email}</td>
                    <td className="border px-4 py-1">
                        <form action={deleteCustomerAction}>
                            <input type="hidden" name="id" value={c.id}/>
                            <SubmitButton label="Delete" pendingLabel="Deleting..."/>
                        </form>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
