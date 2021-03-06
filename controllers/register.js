const handleRegister = (req, res, database, bcrypt) => {
  var {name, email, password, confirmPassword} = req.body;

  if (name && email && password && confirmPassword) {

    if (password === confirmPassword) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
      // TODO check if we already have the user in database
      // TODO use transcaction to insert to two tables because they are related

      database.transaction(trx => {
        return trx.insert({password: hash, email})
        .into('Signin')
        .returning('email')
        .then(signinEmail => {

          return trx.insert({name, email: signinEmail[0]})
            .into('Users')
            .returning('*')
            .then(user => {
              if (user[0].id) res.json(user[0]);
            })
        }).then(trx.commit).catch(trx.rollback)
      }).catch(err => res.status(400).json(err)) 
    }
    else {
      res.status(400).json('passwords not matched');
    }
  }
  else {
    res.status(400).json('all fields are required');
  }
}

module.exports = {
  handleRegister: handleRegister
};