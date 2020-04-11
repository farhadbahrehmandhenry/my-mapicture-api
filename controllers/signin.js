const handlaSignin = (req, res,database, bcrypt) => {
  var {email, password} = req.body;

  if (email && password) {
    database.select('*').from('users').where({email})
    .then(user => {
      database.select('*').from('signin').where({email: user[0].email})
      .then(login => {
        var isValid = bcrypt.compareSync(password, login[0].password);
  
        if (isValid) {
          console.log(user[0])
          res.json(user[0]);
        }
        else {
          res.status(400).json('username or password not matched');
        }
      }).catch(error => res.status(400).json('unable to get users'));
    }).catch(error => res.status(400).json('wrong credentials'));
  }
  else {
    res.status(400).json('all field are required');
  }
}

module.exports = {
  handlaSignin: handlaSignin
};