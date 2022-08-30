// import UserModel from "../models/userModel";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as FacebookStrategy } from "passport-facebook";
import UserModel from "./models/user.js";
import dotenv from "dotenv";
dotenv.config({ path: "./routes/.env" });

// const GOOGLE_CLIENT_ID = '20191912233-pb3iapilc3ihoqvkaeasmtrqdud610rv.apps.googleusercontent.com';
// const GOOGLE_CLIENT_SECRET = "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";


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/user/auth/google/callback"
},

    function (accessToken, refreshToken, profile, done) {
        console.log("profile");
        console.log(profile);
        console.log("accessToken");
        console.log(accessToken);
        console.log("refreshToken");
        console.log(refreshToken);
        done(null, profile);
    }
)
);





// const GITHUB_CLIENT_ID = 'b9eea084e8b7dd5c723a';
// const GITHUB_CLIENT_SECRET = 'e15dd6e7faaf222afb9b0983a97d93ceaf63511d';

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/user/auth/github/callback"
},
    (accessToken, refreshToken, profile, done) => {
        UserModel.findOne({ githubId: profile.id }).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            } else {
                new UserModel({
                    email: profile.username,
                    // _id: profile.id,
                    token: accessToken,
                })
                    .save()
                    .then((newUser) => {
                        done(null, newUser);
                    });
            }
        });
    }
)
);
// function (accessToken, refreshToken, profile, done) {
//     console.log("profile");
//     console.log(profile.username);
//     console.log(profile.id);
//     console.log("accessToken");
//     console.log(accessToken);
//     console.log("refreshToken");
//     console.log(refreshToken);
//     done(null, profile);
//   }
// )
// );

// const FACEBOOK_CLIENT_ID = '409312587969780';
// const FACEBOOK_CLIENT_SECRET = '729bdeb1b5577546fc49496053f59310';


passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: "/api/user/auth/facebook/callback",
            // profileFields: ["id", "displayName", "photos", "email"],
        },
        (accessToken, refreshToken, profile, done) => {
            UserModel.findOne({ firstName: profile.displayName.split(" ")[0]}).then((currentUser) => {
                if (currentUser) {
                    console.log("currentUser");
                } else {
            const fname = profile.displayName.split(" ")[0];
            const lname = profile.displayName.split(" ")[1];
            console.log(profile);

            // console.log("profileName   " + profile.displayName);
            // console.log("profileID     " + profile.id);
            console.log("accessToken   " + accessToken);
            const firstName = profile.displayName.split(" ")[0];
            const lastName = profile.displayName.split(" ")[1];
            console.log("firstName   " + firstName);
            console.log("lastName   " + lastName);

            const newUser = new UserModel({
                firstName: fname,
                lastName: lname,
                token: accessToken,
            });
            newUser.save()
                        .then((newUser) => {
                            done(null, newUser);
                        });
                }
            });
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
}
);

passport.deserializeUser(function (user, done) {
    done(null, user);
}
);


export default passport;