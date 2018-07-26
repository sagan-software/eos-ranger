// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE
'use strict';

var Redis = require("../External/Redis.js");
var Queue_Redis = require("./Queue_Redis.js");
var Database_Arango = require("./Database_Arango.js");

var client = Redis.make(/* () */0);

var Q = Queue_Redis.Make(/* module */[
      /* client */client,
      /* name */"blockNums"
    ]);

var Db = Database_Arango.Make(/* module */[
        /* db */"eos",
        /* user */"root",
        /* pass */"openSesame"
      ])(Q);

var endpoints = /* array */[
  "http://api.bitmars.one",
  "http://api.eosargentina.io",
  "http://api.eosgeneva.io",
  "http://api.eosmedi.com",
  "http://api.eosn.io",
  "http://api.eosnewyork.io",
  "http://api.eossocal.io",
  "http://api.eossweden.eu",
  "http://api.eossweden.se",
  "http://api.eostitan.com",
  "http://api.eosuk.io",
  "http://api1.eosasia.one",
  "http://api1.eostheworld.io:4865",
  "http://api2.eosgeneva.io",
  "http://eos.greymass.com",
  "http://eu.eosdac.io",
  "http://mainnet.eoscalgary.io",
  "http://mainnet.eoscanada.com",
  "http://node.eosflare.io",
  "http://node1.bp2.io"
];

var dbUser = "root";

var dbPass = "openSesame";

var dbName = "eos";

var throttleTime = 1500;

var responseTimeMultiplier = 1.5;

var maxBlocksPerCycle = 5000;

var reportStatsTimeout = 30000;

var chainId = "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906";

exports.dbUser = dbUser;
exports.dbPass = dbPass;
exports.dbName = dbName;
exports.throttleTime = throttleTime;
exports.responseTimeMultiplier = responseTimeMultiplier;
exports.maxBlocksPerCycle = maxBlocksPerCycle;
exports.reportStatsTimeout = reportStatsTimeout;
exports.Q = Q;
exports.Db = Db;
exports.chainId = chainId;
exports.endpoints = endpoints;
/* Q Not a pure module */
