import {Router} from "express";

const router = Router();

router.get("/", async (request, response) => {
    console.log(request.cookies)
    response.send([{id: 123, name: "chicken", price: 12.99}])
})

export default router;