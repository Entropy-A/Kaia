import {Router} from "express";

interface Route {
    path: string;
    router: Router;
    init: () => Promise<void>;
}

class RoutesRegistry {
    #routes: Route[] = [];

    async loadRoutes(modules: Route[]) {
        const router = Router();
        for (const module of modules) {
            this.#routes.push(module);
            router.use(module.path, module.router);
            await module.init()
        }

        return {
            path: "/api/v0",
            router,
        }
    }

    get routes() {
        return this.#routes.map(module => module.path);
    }
}

export default new RoutesRegistry();