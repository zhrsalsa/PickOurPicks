import { db } from "@/lib/db"
import { hash } from "bcrypt";
import Email from "next-auth/providers/email";
import { patchFetch } from "next/dist/server/app-render/entry-base";
import { NextResponse } from "next/server";
import { use } from "react";
import * as z from 'zod';

const userSchema = z
    .object({
        name: z.string().min(1, 'Name is required').max(100),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must have than 8 characters'),
        confirmPassword: z.string().min(1, 'Password confirmation is required'),
    })

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name, password } = userSchema.parse(body);

        const existingUserByEmail = await db.user.findUnique({
            where: { email: email}
        });
        if(existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists"}, { status: 409 })
        }
        const existingUserByName = await db.user.findUnique({
            where: { name: name } 
        });
        if(existingUserByName) {
            return NextResponse.json({ user: null, message: "User with this name already exists"}, { status: 409 })
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: "User created successfully"}, { status: 201});
    }   catch(error) {
        return NextResponse.json({ message: "Something went wrong!"}, { status: 500});
    }
}