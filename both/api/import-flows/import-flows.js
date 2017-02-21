import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ImportFlows = new Mongo.Collection('ImportFlows');

ImportFlows.schema = new SimpleSchema({
  sourceId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  name: {
    label: 'Name',
    type: String,
  },
  createdAt: {
    type: Number,
  },
  streams: {
    type: Array,
    label: 'Stream chain setup',
    optional: true,
  },
  'streams.$': {
    type: Object,
    blackbox: true,
  },
  'streams.$.type': {
    type: String,
  },
});

ImportFlows.attachSchema(ImportFlows.schema);

ImportFlows.helpers({
  getStreams() {
    return this.streams;
  },
  getFirstStream() {
    return this.streams[0];
  },
});

if (Meteor.isServer) {
  ImportFlows._ensureIndex({ sourceId: 1 });
}
