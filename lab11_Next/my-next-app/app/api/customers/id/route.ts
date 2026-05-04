import {CustomerInput} from "@/lib/models/customer";
import {customerService} from "@/lib/services/customer-service";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";

function jsonError(message: string, status: number) {
    return NextResponse.json({error: message}, {status});
}

function parseId(idParam: string): number | null {
    const id = Number(idParam);
    console.log(id);
    return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(request: Request, ctx: { params: Promise<{ id: string }> }) {
    const {id} = await ctx.params;
    let numId = parseId(id);
    if (numId === null) {
        return jsonError("Invalid id parameter", 400);
    }
    const customer = await customerService.getById(numId);
    if (!customer) {
        return jsonError("Customer not found", 404);
    }
    return NextResponse.json(customer, {status: 200});
}

export async function PUT(request: Request, ctx: { params: Promise<{ id: string }> }) {
    const {id} = await ctx.params;
    let numId = parseId(id);
    if (numId === null) {
        return jsonError("Invalid id parameter", 400);
    }
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return jsonError("Invalid JSON body", 400);
    }
    const {firstName, lastName, email} = body as Partial<CustomerInput>;
    if (!firstName || !lastName || !email) {
        return jsonError("firstName, lastName and email are required", 400);
    }
    try {
        const existing = await customerService.getById(numId);
        if (!existing) {
            return jsonError("Customer not found", 404);
        }
        const updated = await customerService.update(numId, {
            firstName,
            lastName,
            email,
        });
        return NextResponse.json(updated, {status: 200});
    } catch (err) {
        console.error("Error updating customer", err);
        return jsonError("Internal server error", 500);
    }
}

export async function DELETE(request: Request, ctx: { params: Promise<{ id: string }> }) {
    const {id} = await ctx.params;
    let numId = parseId(id);
    if (numId === null) {
        return jsonError("Invalid id parameter", 400);
    }
    try {
        const existing = await customerService.getById(numId);
        if (!existing) {
            return jsonError("Customer not found", 404);
        }
        await customerService.delete(numId);
        return new NextResponse(null, {status: 204});
    } catch (err) {
        console.error("Error deleting customer", err);
        return jsonError("Internal server error", 500);
    }
}
