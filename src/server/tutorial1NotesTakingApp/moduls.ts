import { Router } from "express";
import { RouteModul } from "$/server/v0/moduls.js";

class RouteModulRegistry {
    #routes: RouteModul[] = [];

    async loadRoutes(modules: RouteModul[]) {
        const router = Router();
        for (const module of modules) {
            this.#routes.push(module);
            await module.init();

            router.use(module.path, module.router);
        }

        return {
            version: "/t1",
            router,
        };
    }

    get routes() {
        return this.#routes.map(module => module.path);
    }
}

export default new RouteModulRegistry();