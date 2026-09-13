import { NextResponse } from 'next/server';
import { createVehicle, listVehicles } from '@/lib/store';

export async function GET() {
  return NextResponse.json(await listVehicles());
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newVehicle = await createVehicle({ plate: String(data.plate).trim().toUpperCase(), vin: data.vin,
      make: String(data.make), model: String(data.model), color: String(data.color), year: data.year,
      photo: data.photo, status: data.status || 'Na Oficina', owner: data.owner || 'Guerra Logística' });
    return NextResponse.json(newVehicle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar veículo' }, { status: 500 });
  }
}
