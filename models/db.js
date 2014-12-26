var settings = require('../settings'),
Db = require('mongodb').Db,
Connection = require('mongodb').Connection,
Server = require("mongodb").Server;
ObjectID = require('mongodb').ObjectID;

module.exports = new Db(settings.db,new Server(settings.host,Connection.DEFAULT_PORT),{safe:true});