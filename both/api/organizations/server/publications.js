/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Organizations } from '../organizations.js';

import { getOrganizationIdsForUserId } from '../privileges';
import { publishPublicFields, publishPrivateFields } from '/server/publish';


publishPublicFields('organizations', Organizations);

publishPrivateFields(
  'organizations',
  Organizations,
  userId => ({ _id: { $in: getOrganizationIdsForUserId(userId) } })
);

// Publishes private fields for all documents that reference an organization you are member of.
// You can optionally supply a function to limit the retrieved documents to a more specific set.
// The function is called with a userId argument and should return a selector.

export function publishPrivateFieldsForMembers(
  publicationName,
  collection,
  selectorFn = () => ({})
) {
  check(publicationName, String);
  check(collection, Mongo.Collection);
  check(selectorFn, Function);

  const name = `${publicationName}.private`;

  console.log('Publishing', name, 'for referred organization members…');

  Meteor.publish(
    name,
    function publish() {
      if (!collection.privateFields) {
        this.ready();
        return [];
      }

      const organizationIds = getOrganizationIdsForUserId(this.userId);

      const specifiedSelector = selectorFn(this.userId);
      check(specifiedSelector, {});

      const selectorWithOrganizationId = Object.assign({}, specifiedSelector, {
        organizationId: { $in: organizationIds },
      });

      return collection.find(selectorWithOrganizationId, { fields: collection.privateFields });
    }
  );
}
