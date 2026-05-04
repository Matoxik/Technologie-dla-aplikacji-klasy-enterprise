"use client";
import {useFormStatus} from "react-dom";

type Props = {
    label: string;
    pendingLabel: string;
};
export default function SubmitButton({label, pendingLabel}: Props) {
    const {pending} = useFormStatus();
    return (
        <button type="submit" disabled={pending} className="border w-28 px-4 py-1 bg-gray-100">
            {pending ? pendingLabel : label}
        </button>
    );
}
