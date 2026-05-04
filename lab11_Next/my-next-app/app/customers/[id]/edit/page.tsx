import SubmitButton from "@/components/submit-button";
import {customerService} from "@/lib/services/customer-service";
import Link from "next/link";
import {notFound} from "next/navigation";
import {updateCustomerAction} from "../../actions";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditCustomerPage({params}: Props) {
    const {id} = await params;
    const customer = await customerService.getById(+id);

    if (!customer) {
        notFound();
    }

    return (
        <main className="space-y-4">
            <h1 className="text-xl font-semibold">Edit customer #{customer.id}</h1>
            <form action={updateCustomerAction} className="flex flex-col gap-3 max-w-md">
                <input type="hidden" name="id" value={customer.id}/>

                <div className="flex flex-col gap-1">
                    <label className="text-sm">First name</label>
                    <input name="firstName" className="border px-2 py-1" defaultValue={customer.firstName} required/>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm">Last name</label>
                    <input name="lastName" className="border px-2 py-1" defaultValue={customer.lastName} required/>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm">Email</label>
                    <input name="email" type="email" className="border px-2 py-1" defaultValue={customer.email}
                           required/>
                </div>

                <div className="flex gap-2 pt-2">
                    <SubmitButton label="Save" pendingLabel="Saving..."/>
                    <Link href="/customers" className="border w-28 px-4 py-1 bg-gray-100 inline-block text-center">
                        Cancel
                    </Link>
                </div>
            </form>
        </main>
    );
}
