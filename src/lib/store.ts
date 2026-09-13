import fs from 'fs/promises';
import path from 'path';

export type Vehicle = {
  id: string; plate: string; vin?: string; make: string; model: string; color: string;
  year?: string; photo?: string; owner: string; status: string; createdAt: string; updatedAt: string;
};
export type Service = {
  id: string; vehicleId: string; description: string; status: string; date: string;
  mileage?: number; technician?: string; notes?: string; parts?: string;
};
type Store = { vehicles: Vehicle[]; services: Service[] };

const file = path.join(process.cwd(), 'data', 'guerra.json');
const empty: Store = { vehicles: [], services: [] };

async function read(): Promise<Store> {
  try { return JSON.parse(await fs.readFile(file, 'utf8')); }
  catch { return empty; }
}
async function write(data: Store) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
}
export async function listVehicles() { return (await read()).vehicles.sort((a,b) => b.updatedAt.localeCompare(a.updatedAt)); }
export async function createVehicle(input: Omit<Vehicle, 'id'|'createdAt'|'updatedAt'>) {
  const data = await read(); const now = new Date().toISOString();
  const vehicle = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  data.vehicles.unshift(vehicle); await write(data); return vehicle;
}
export async function listServices(vehicleId?: string) {
  const data = await read(); return data.services.filter(s => !vehicleId || s.vehicleId === vehicleId).sort((a,b) => b.date.localeCompare(a.date));
}
export async function createService(input: Omit<Service, 'id'|'date'>) {
  const data = await read(); const service = { ...input, id: crypto.randomUUID(), date: new Date().toISOString() };
  data.services.unshift(service); const v = data.vehicles.find(x => x.id === service.vehicleId); if (v) v.updatedAt = service.date;
  await write(data); return service;
}
