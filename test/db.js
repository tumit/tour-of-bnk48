var bnk48 = require('./bnk48.json');

module.exports = function() {
  var data = { members: [], member: [] }
  data.members = bnk48;
  data.member = bnk48.members;
  return data
}
