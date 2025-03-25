import passport from "passport";
import  {Strategy} from "passport-local";
import {users} from "../server.js";


// serialize stuff vielleicht in index file idk
passport.serializeUser((user, done) => {
    done(null, user.id); // only safe id
})

passport.deserializeUser((id, done) => {
    try {
        const findUser = users.find(user => user.id === id);
        if(!findUser) throw new Error("User does not exist");

        done(null, findUser);
    } catch (e) {
        done(e, null);
    }
})

export default passport.use("local",
    // options um z.b. zu spezifizieren, ob man username oder email verwendet im object zum einloggen
    new Strategy({usernameField: "username"}, (username, password, done) => {
        try {
            const findUser = users.find((user) => user.username === username)

            if (!findUser) throw new Error("username not registered")
            if (findUser.password !== password) throw new Error("password wrong")

            done(null, findUser)
        } catch (e) {
            done(e, false)
        }
    })
)