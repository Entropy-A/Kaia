import {Router} from "express";

export interface RouteModul {
    path: string;
    router: Router;
    init: () => Promise<void>;
}

class RouteModulRegistry {
    #routes: RouteModul[] = [];

    async loadRoutes(modules: RouteModul[]) {
        const router = Router();
        for (const module of modules) {
            this.#routes.push(module);
            router.use(module.path, module.router);
            await module.init()
        }

        return {
            path: "/api/t0",
            router,
        }
    }

    get routes() {
        return this.#routes.map(module => module.path);
    }
}

export default new RouteModulRegistry();