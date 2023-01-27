// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "": { type: "" }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {}
  missingImplementations: {
    actions: "updateFocused" | "updateValue"
    delays: never
    guards: "isEmpty" | "isString"
    services: never
  }
  eventsCausingActions: {
    updateFocused: "ON_BLUR" | "ON_FOCUS"
    updateValue: "ON_CHANGE"
  }
  eventsCausingDelays: {}
  eventsCausingGuards: {
    isEmpty: ""
    isString: ""
  }
  eventsCausingServices: {}
  matchesStates: "Empty" | "Filled"
  tags: never
}
