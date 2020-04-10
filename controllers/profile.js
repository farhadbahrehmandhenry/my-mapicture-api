const handleProfile = (req, res) => {
  var {id} = req.params;

  database.select('*').from('Users').where({id})
  .then(user => {res.json(user[0])})
  .catch(error => res.status(400).json('user not found'));
}

module.exports = {
  handleProfile: handleProfile
};