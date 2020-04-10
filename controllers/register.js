const handleRegister = (req, res, database, bcrypt) => {
  var {name, email, password, confirmPassword} = req.body;

  if (name && email && password && confirmPassword) {
    if (password === confirmPassword) {
      // TODO check if we already have the user in database
      // TODO use transcaction to insert to two tables because they are related
      database.transaction(function(trx) {
        return trx
          .insert({name, email})
          .into('Users')
          .then(function(ids) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            return trx.select('*').from('Users').where('id', '=', ids[0]).then(user => {
              if (user) {
                return trx('Signin').insert({password: hash, email}).then(ids => {
                  if (ids) {
                    res.json(user[0]);
                  }
                })
              }
            })
          }).then(trx.commit).catch(trx.rollback)
      })  
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