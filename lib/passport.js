const passport = require('passport')
const googleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const Sentry = require('@sentry/node');

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (userId, done) => {
  const userSignedIn = await User.findById(userId)
  done(null, userSignedIn)
})

passport.use(
    new googleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        var user = await User.findOne({ providerId: profile.id })
        
        if(!user) {
          user = await new User({providerId: profile.id }).save()
        }
        done(null, user)

      } catch (err) {
        Sentry.captureMessage('Error authenticating:', err);
        done('Error Authenticating', null)
      } 
      
    })
  )
  