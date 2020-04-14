import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict(); 
    /* reaktív változót tudunk létrehozni így:
      https://docs.meteor.com/api/reactive-dict.html */
    Meteor.subscribe('tasks'); // Itt iratkozunk fel a tasks.js-ben megírt publikációra
  });

Template.body.helpers({
    tasks() {
        const instance = Template.instance(); //http://blazejs.org/api/templates.html#Template-instances
        if (instance.state.get('hideCompleted')) {  // reactiveDict változó értékét elkérjük
          // If hide completed is checked, filter tasks
          return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
        }
        // Otherwise, return all of the tasks
        return Tasks.find({}, { sort: { createdAt: -1 } });
    },
    incompleteCount() {
        return Tasks.find({ checked: { $ne: true } }).count();
      },
});

Template.body.events({
    'submit .new-task'(event) {
      // Prevent default browser form submit
      event.preventDefault();
  
      // Get value from form element
      const target = event.target;
      const text = target.text.value;
  
      // Insert a task into the collection
      Meteor.call('tasks.insert', text);
  
      // Clear form
      target.text.value = '';
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);  // reactiveDict változó értékét beállítjuk
      },
  });