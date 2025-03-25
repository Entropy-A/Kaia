import {Router} from "express";

const router = Router();

router.get("/", async (request, response) => {
    console.log(request.cookies)
    if (request.signedCookies.hello === "world") {
        return response.send({id: 12, name: "cookie", price: 0.00})
    }

    return response.status(403).send({message: "Sorry. Wrong Cookie"})
})

export default router;