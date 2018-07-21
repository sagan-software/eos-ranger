// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE
'use strict';

var Env = require("../Lib/Env.js");
var Util = require("../Lib/Util.js");
var Redis = require("../External/Redis.js");
var Npmlog = require("npmlog");
var Database = require("../Lib/Database.js");
var Endpoints = require("../Lib/Endpoints.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_primitive = require("bs-platform/lib/js/caml_primitive.js");

var redis = Redis.make(/* () */0);

Database.setup(/* () */0).then((function () {
          return Promise.all(/* tuple */[
                      Database.getLargestBlockNum(/* () */0),
                      Endpoints.updateInfoForStates(Endpoints.initialStates(Env.endpoints))
                    ]);
        })).then((function (param) {
        var largestDbBlockNum = param[0];
        Npmlog.info("FindBlocks", "Largest block number from database:", largestDbBlockNum);
        var largestEndpointBlockNums = Endpoints.getLargestBlockNums(param[1]);
        Npmlog.info("FindBlocks", "Largest block number from endpoints:", largestEndpointBlockNums[/* head */0]);
        var startBlockNum = Caml_primitive.caml_int_min(largestDbBlockNum + 1 | 0, largestEndpointBlockNums[/* irreversible */1]);
        var endBlockNum = largestEndpointBlockNums[/* head */0];
        var blockNumChunks = Util.chunkArray(Belt_Array.map(Belt_Array.range(startBlockNum, endBlockNum), (function (prim) {
                    return String(prim);
                  })), 1000);
        return Belt_Array.reduce(blockNumChunks, Promise.resolve(0), (function (promise, blockNums) {
                      return promise.then((function (totalAdded) {
                                    return redis.saddAsync("blockNums", blockNums).then((function (numAdded) {
                                                  Npmlog.info("FindBlocks", "Added " + (String(numAdded) + " items to the blockNums queue"), "");
                                                  return Promise.resolve(numAdded + totalAdded | 0);
                                                }));
                                  }));
                    }));
      }));

exports.redis = redis;
/* redis Not a pure module */