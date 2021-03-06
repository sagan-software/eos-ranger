type t;

[@bs.get] external statusCode : t => int = "";
[@bs.get] external statusText : t => string = "statusMessage";
[@bs.get] external body : t => string = "";
[@bs.get] external headers : t => Js.Dict.t(string) = "";
let header = (t, key) => t |> headers |. Js.Dict.get(key);
[@bs.get] external httpVersionMajor : t => int = "";
[@bs.get] external httpVersionMinor : t => int = "";
[@bs.get] external httpVersionMinor : t => int = "";
[@bs.get] [@bs.scope "request"] external url : t => URL.t = "uri";

module Options = {
  [@bs.deriving abstract]
  type t = {
    url: string,
    [@bs.as "method"]
    method_: string,
    [@bs.optional]
    json: bool,
    [@bs.optional]
    resolveWithFullResponse: bool,
    [@bs.optional]
    body: string,
    [@bs.optional]
    simple: bool,
    [@bs.optional]
    time: bool,
    [@bs.optional]
    timeout: int,
    [@bs.optional]
    headers: Js.Dict.t(string),
    [@bs.optional]
    encoding: Js.Null_undefined.t(string),
  };
};

[@bs.module]
external make_ : Options.t => Js.Promise.t(t) = "request-promise";

exception TimedOut(string);
exception UnknownError(Js.Promise.error);

module Error = {
  type t;
  [@bs.get] external options : t => Options.t = "";
  [@bs.get] external name : t => string = "";
  [@bs.get] external message : t => string = "";
  [@bs.get] external error : t => Js.Exn.t = "";
  [@bs.get] [@bs.scope "error"] external code : t => string = "";
  external fromPromiseError : Js.Promise.error => t = "%identity";
};

let make =
    (
      ~url,
      ~method_="GET",
      ~json=false,
      ~body=?,
      ~timeout=0,
      ~headers=?,
      ~encoding=Js.Null_undefined.undefined,
      ~simple=?,
      ~time=?,
      (),
    ) =>
  Options.t(
    ~url,
    ~method_,
    ~json,
    ~resolveWithFullResponse=true,
    ~body?,
    ~simple?,
    ~time?,
    ~timeout,
    ~headers=headers |> Js.Option.getWithDefault([||]) |> Js.Dict.fromArray,
    ~encoding,
    (),
  )
  |> make_
  |> Js.Promise.catch(e =>
       (
         switch (e |> Error.fromPromiseError |> Error.code) {
         | "ETIMEDOUT" => TimedOut(url)
         | _ => UnknownError(e)
         }
       )
       |> Js.Promise.reject
     );

module TimingPhases = {
  [@bs.deriving abstract]
  type t = {
    wait: float,
    dns: float,
    tcp: float,
    firstByte: float,
    download: float,
    total: float,
  };
};

[@bs.get] external timingPhases : t => Js.Nullable.t(TimingPhases.t) = "";

module Timings = {
  [@bs.deriving abstract]
  type t = {
    socket: float,
    lookup: float,
    connect: float,
    response: float,
    [@bs.as "end"]
    end_: float,
  };
};

[@bs.get] external timings : t => Js.Nullable.t(Timings.t) = "";
