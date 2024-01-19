import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../db/TasksCollection';

Meteor.methods({
  'createTaskAsync': async () => {
    const newTaskId = TasksCollection.insert({
      createdAt: new Date(),
    });
    return newTaskId;
  },
});

Meteor.methods({
  'getLastTaskAsync': async () => {
    return await TasksCollection.findOneAsync({}, { sort: { createdAt: -1 } });
  },
});

Meteor.methods({
  'getLastTaskSync': () => {
    return TasksCollection.findOne({}, { sort: { createdAt: -1 } });
  },
})
