import { Meteor } from 'meteor/meteor';

import articlesWithContent, { articles } from '../../articles';

Meteor.methods({
  getArticles(withoutBody) {
    return withoutBody ? articles : articlesWithContent;
  }
});