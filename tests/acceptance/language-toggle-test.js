import Ember from 'ember';
import { module, test } from 'qunit';
import tHelper from "ember-i18n/helper";
import startApp from 'atlas-colombia/tests/helpers/start-app';

var application;

module('Acceptance | language toggle', {
  beforeEach: function() {
    application = startApp();
    application.$.cookie('locale', 'es');
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('language-toggle', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(_.trim(find('p.toggle__label--is--active').text()), 'es');
  });

  click('input[data-language-toggle]');

  andThen(function() {
    assert.equal(_.trim(find('p.toggle__label--is--active').text()), 'en');
  });
});
