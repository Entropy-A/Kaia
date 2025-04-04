import { Router } from "express";
import { ApiLogger } from "$/app.js";

export interface RouteModul {
    path: string;
    router: Router;
    init: () => Promise<void>;
}

// Version
const version = "/t1";

class RouteModulRegistry {
    #routes: RouteModul[] = [];

    async loadRoutes(modules: RouteModul[]) {
        const router = Router();
        for (const module of modules) {
            this.#routes.push(module);
            await module.init();

            router.use(module.path, module.router);
        }

        ApiLogger.log(`Loaded ${version} routes`);
        return {
            version,
            router,
        };
    }

    get routes() {
        return this.#routes.map(module => module.path);
    }
}

export default new RouteModulRegistry();