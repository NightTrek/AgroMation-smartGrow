// const db      = require('./../models');
const sql       = require("./mysql2ORMController");
const jwt       = require('jwt-simple');
const config    = require('./../config/keys.js');
const bcrypt    = require('bcryptjs');
const moment    = require('moment');
const logger       = require('../logs/Wlogger.js');


const tokenForUser = function(user) {
  const timestamp = new Date().getTime();
  // Sub === subject
  // iat === issued at time
  // Its going to encode the whole 1st object and then add our secret to it
  // logger.log({
  //   level: 'info',
  //   message: `creating token for id ${user.id}  ||`
  // });
  // console.log(user);
  return jwt.encode({ sub: user.id, iat: timestamp}, config.secret);
};


module.exports = {
  signUp: async (req, res) => {
    const { fullName, email, password } = req.body;
    if(!email || !password) {
      logger.log({
        level: 'info',
        message: `failed Signup Missing info|||| email| ${email} |fullname|${fullName}| password |${password}|  `
      });
      return res.status(422).json({ error: 'You must provide an email and password' });
    }
    try {
      // Check if theres existing user
      let con = await sql.GetConnection();
      const existingUser = await sql.selectWhere(con,"users","email",email);
      // if user exist, throw error
      if(existingUser.length > 0) {
        logger.log({
          level: 'info',
          message: `failed Signup SESSION|||| BY| ${email}  email already in use|| `
        });
        return res.status(422).json({ error: 'Email is in use' });
      }
      let InsertObj = {};
      InsertObj.email=email;
      InsertObj.fullName=fullName;
      InsertObj.createdOn= moment().unix();
      const salt = await bcrypt.genSalt();
      // console.log('salt', salt);
      const hash = await bcrypt.hash(password, salt);
      // console.log('hash', hash);
      InsertObj.password=hash;
      let user = await sql.insertNewUser(con,"users",InsertObj);
      con.end();
      // console.log(user);
      user.id = user.insertId;
    logger.log({
        level: 'info',
        message: `SUCCESSFULL Signup SESSION|||| BY| ${JSON.stringify(user.id)} || for user ${JSON.stringify(user.insertId)} `
      });
      res.json({ token: tokenForUser({id:user.insertId})});
    } catch(e) {
      logger.log({
        level: 'error',
        message: `Failed Signup ERROR |||| ${e} || `
      });
      res.status(404).json({ e });
    }
  },
  signIn: (req, res) => {
    //check if
    res.send({ token: tokenForUser(req.user)});
  }
};
