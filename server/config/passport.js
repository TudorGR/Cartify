import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../models/user.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        user = await UserModel.findOne({ email: profile.emails[0].value });

        if (user) {
          user.googleId = profile.id;
          user.provider = "google";
          await user.save();
          return done(null, user);
        }

        user = await UserModel.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          provider: "google",
        });
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id).select("-password");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
export default passport;
