const handlaSignin = (req, res,database, bcrypt) => {
  var {email, password} = req.body;

  if (email && password) {
    database('Users').where({email: email}).select('*')
    .then(user => {
      database.select('*').from('Signin').where({email: user[0].email})
      .then(login => {
        var isValid = bcrypt.compareSync(password, login[0].password);
  
        if (isValid) res.json(user[0]);
        else res.status(400).json('username or password not matched');
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