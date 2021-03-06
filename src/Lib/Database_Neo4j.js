// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE
'use strict';

var Neo4jDriver = require("neo4j-driver");

function Make(I) {
  var auth = Neo4jDriver.v1.auth.basic(I[/* user */1], I[/* pass */2]);
  var driver = Neo4jDriver.v1.driver(I[/* uri */0], auth);
  var session = driver.session();
  var setup = function () {
    return Promise.resolve(/* () */0);
  };
  var count = function () {
    return Promise.resolve(0);
  };
  var save = function (json) {
    return session.run("CREATE (b:Block $block) RETURN b", {
                block: json
              });
  };
  var largestBlockNum = function () {
    return Promise.resolve(0);
  };
  var findMissing = function () {
    return Promise.resolve(/* () */0);
  };
  return /* module */[
          /* setup */setup,
          /* count */count,
          /* save */save,
          /* largestBlockNum */largestBlockNum,
          /* findMissing */findMissing
        ];
}

exports.Make = Make;
/* neo4j-driver Not a pure module */
