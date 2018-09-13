'use strict';

const randomUsernames = [
  'anon_cat',
  'anon_dog',
  'anon_fox',
  'anon_bird',
  'anon_elephant',
  'anon_moose',
  'anon_elk'
];

function getRandomUser(req, res) {

  return res.redirect(`/chat/${randomUsernames[Math.floor(Math.random()*randomUsernames.length)]}`);

}

module.exports = {
  getRandomUser
};
