const User = require('./User')
const Publication = require('./Publication')


User.hasMany(Publication)
Publication.belongsTo(User)
