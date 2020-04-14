import { Meteor } from 'meteor/meteor';
import { Tasks } from '/imports/api/tasks.js';
import { Accounts } from 'meteor/accounts-base';


function insertFixture() {
    const demoUser = Meteor.users.findOne({ username: 'demoUser' });
    if (demoUser) return;

    const userId = Accounts.createUser({ username: 'demoUser', password: 'password' });
    const otherUserId = Accounts.createUser({ username: 'Béka Pali', password: 'password' });

    Tasks.insert({
      text: 'demoTask',
      createdAt: new Date(),
      owner: userId,
      username: 'demoUser',
      private: false,
    });

    Tasks.insert({
      text: 'second task',
      createdAt: new Date(),
      owner: userId,
      username: 'demoUser',
      private: false,
    });
    
    Tasks.insert({
      text: 'Pali feladata',
      createdAt: new Date(),
      owner: otherUserId,
      username: 'Pali',
      private: false,
    });

    Tasks.insert({
      text: 'Third task',
      createdAt: new Date(),
      owner: userId,
      username: 'demoUser',
      private: false,
    });

    Tasks.insert({
      text: 'másik Pali feladat',
      createdAt: new Date(),
      owner: otherUserId,
      username: 'Pál',
      private: false,
    });
};

if (Meteor.isServer) {
  Meteor.startup(() => insertFixture());
}