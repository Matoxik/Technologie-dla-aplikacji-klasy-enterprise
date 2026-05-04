import SubmitButton from "@/components/submit-button";
import {createCustomerAction} from "../actions";

export default function NewCustomerForm() {
    return (
        <form action={createCustomerAction} className="flex flex-wrap gap-2 items-end">
            <div>
                <label className="block text-sm">First name</label>
                <input name="firstName" className="border px-2 py-1" required/>
            </div>
            <div>
                <label className="block text-sm">Last name</label>
                <input name="lastName" className="border px-2 py-1" required/>
            </div>
            <div>
                <label className="block text-sm">Email</label>
                <input name="email" type="email" className="border px-2 py-1" required/>
            </div>
            <SubmitButton label="Submit" pendingLabel="Submitting..."/>
        </form>
    );
}
