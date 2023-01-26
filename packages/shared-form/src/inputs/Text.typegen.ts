
// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
    '@@xstate/typegen': true;
    internalEvents: {
        "": { type: "" };
        "xstate.init": { type: "xstate.init" };
    };
    invokeSrcNameMap: {

    };
    missingImplementations: {
        actions: "updateValue";
        delays: never;
        guards: "isEmpty" | "isString";
        services: never;
    };
    eventsCausingActions: {
        "updateValue": "ON_CHANGE";
    };
    eventsCausingDelays: {

    };
    eventsCausingGuards: {
        "isEmpty": "";
        "isString": "";
    };
    eventsCausingServices: {

    };
    matchesStates: "Empty" | "Filled";
    tags: never;
}
