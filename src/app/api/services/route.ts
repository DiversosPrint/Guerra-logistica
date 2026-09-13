import { NextResponse } from 'next/server';
import { createService, listServices } from '@/lib/store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vehicleId = searchParams.get('vehicleId');

  return NextResponse.json(await listServices(vehicleId || undefined));
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newService = await createService({ vehicleId: String(data.vehicleId), description: String(data.description),
      status: data.status || 'Concluído', mileage: data.mileage ? Number(data.mileage) : undefined,
      technician: data.technician || 'Fabiano Silva', notes: data.notes, parts: data.parts });
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar serviço' }, { status: 500 });
  }
}
