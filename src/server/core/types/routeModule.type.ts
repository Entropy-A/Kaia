import { Router } from "express";

export interface RouteModul {
    path: string;
    router: Router;
    init: () => Promise<void>;
}