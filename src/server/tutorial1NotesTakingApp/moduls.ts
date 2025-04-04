import { Router } from "express";
import { RouteModul } from "$/server/v0/moduls.js";
import { ApiLogger } from "$/server/app.js";

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