import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const dramas = await db.drama.findMany(); // Fetch semua data drama
        return NextResponse.json(dramas);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch dramas' }, { status: 500 });
    }
}