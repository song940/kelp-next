/* eslint-disable */
const path       = require('path');
const { Module } = require('module');
const config     = require('./config');

const findPath = Module._findPath;
Module._findPath = (request, paths, isMain) => {
  for (const key in config.path) {
    const prefix = `@${key}/`;
    if (request.startsWith(prefix)) {
      request = request.replace(prefix, '');
      request = path.join(config.path[key], request);
      break;
    }
  }
  return findPath(request, paths, isMain);
};