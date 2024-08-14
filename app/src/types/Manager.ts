
import type { Sale } from "./sales";

interface Manager {
    id: number;
    lastName: string;
    firstName: string;
    email: string;
    avatar: string;
    roleId: number;
    createdAt: string;
}


interface CA {
    name: string;
    value: number;
    previousValue: number;
    variation: number;
    symbol: string;
}

interface TotalSales {
    name: string;
    value: number;
    previousValue: number;
    variation: number;
    symbol: string;
}

export interface ManagerStats {
    manager: Manager;
    lastSales: Sale[];
    ca: CA;
    totalSales: TotalSales;
}