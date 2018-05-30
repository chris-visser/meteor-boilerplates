import { Meteor } from 'meteor/meteor';

Meteor.methods({
  getArticles(limit) {
    return [{
      id: 'test-1',
      title: 'Article 1',
    },{
      id: 'test-2',
      title: 'Article 2',
    }];
  }
});