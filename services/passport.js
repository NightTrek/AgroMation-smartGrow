const passport      = require('passport');
const config        = require('./../config/keys');
const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const sql           = require('./../controllers/mysql2ORMController');
const bcrypt        = require("bcryptjs");
const logger        = require('../logs/Wlogger.js')



// Create local strategy

// By default LocalStrategy it is expecting a username and a password
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {

  try {
    let con = await sql.GetConnection();
    const user = await sql.selectWhere(con,"users","email",email);
    con.end();
    if(user.length==0) {
      logger.log({
        level: 'info',
        message: `LOCAL LOGIN FAIL |||| ${email} || ${password} || `
      });
      return done(null, false);
    }
    // console.log(user);
    logger.log({
      level: 'info',
      message: `LOCAL LOGIN attempt by |||| ${user} || ${email}|${password} || `
    });
    // console.log(password);
    // console.log(user[0].password);
    const isMatch = await bcrypt.compare(password, user[0].password);

    if(!isMatch){
      done(null, false);
    }
    logger.log({
      level: 'info',
      message: `LOCAL LOGIN success by |||| ${JSON.stringify(user[0])} || ${email}|${password} || `
    });
    done(null, user[0]);

  } catch(e) {
    done(e, false);
  }
});


// Setup options for Jwt Strategy
// We need to tell our strategy where to look for the token

const jwtOptions = {
  // Tells JWT strategy that whenever a request comes in
  // and we want passport to handle it
  // It needs to look in the header, for the property called "authorization"
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  // tells jwt strategy what secret we used to encode the token
  // so that it can decode it
  secretOrKey: config.secret
};


// We are going to get the payload argument from an incoming request
// The payload argument is coming frm the function that we will create in authRoutes
// done is the function we call once we tried to authenticate this user
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {//payload.sub
    let con = await sql.GetConnection();
    // console.log(payload);
    const user = await sql.selectWhere(con,"users","id",payload.sub);
    con.end();
    if(user.length == 0) {
      logger.log({
        level: 'info',
        message: `JWT LOGIN attempt by |||| ${user} || ${payload.sub}|| `
      });
      done(null, false);
    } else {
      logger.log({
        level: 'info',
        message: `JWT LOGIN success by |||| ${user} || ${payload.sub}|| `
      });
      done(null, user);
    }
  } catch(e) {
    logger.log({
      level: 'error',
      message: `JWT LOGIN error by |||| ${e} ||`
    });
    done(e, false);
  }
});


/// This tells passport that we declared these strategies.
// The local login says we have a strategy called "Local"
// The jwtLogin says we have a strategy called jwt

// When we say passport.authenticate('jwt')
// passport will look for a strategy called 'jwt'
passport.use(localLogin);
passport.use(jwtLogin);
