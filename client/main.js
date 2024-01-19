import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import "/imports/api/methods.js";

import './main.html';

Template.hello.onCreated(async function helloOnCreated() {
  this.taskIdAsync = new ReactiveVar('');
  this.taskSync = new ReactiveVar({ _id: "-", createdAt: "-" });
  this.taskAsync = new ReactiveVar({ _id: "-", createdAt: "-" });

  await Meteor.callAsync('createTaskAsync');

  Meteor.call('getLastTaskSync', (error, result) => {
    this.taskSync.set(result);
  });
});

Template.hello.helpers({
  taskIdAsync() {
    return Template.instance().taskIdAsync.get();
  },
  taskDateSync() {
    const taskSync = Template.instance().taskSync.get();
    return taskSync.createdAt;
  },
  taskDateAsync() {
    const taskAsync = Template.instance().taskAsync.get();
    return taskAsync.createdAt;
  },
});

Template.hello.events({
  async 'click #create-async'(event, instance) {
    const result = await Meteor.callAsync('createTaskAsync');
    instance.taskIdAsync.set(result);
  },
  'click #get-sync'(event, instance) {
    Meteor.call('getLastTaskSync', (error, result) => {
      instance.taskSync.set(result);
    });
  },
  async 'click #get-async'(event, instance) {
    const result = await Meteor.callAsync('getLastTaskAsync');
    instance.taskAsync.set(result);
  },
});
