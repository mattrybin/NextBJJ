import { useMachine } from "@xstate/react"
import { assign, createMachine } from "xstate"

const defaultConfig = {
  placeholder: "" as string,
  value: "" as string,
}

const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUwA8AuA6AogWwAcMBPAYgG0AGAXUVAIHtYBLDZhgOzpDUQEYAnAKwBmAGwBWACyURAJj4i+ADmliANCGL8A7BKwSBKnTMOyxfHQF8rm1JiwAxZgBsXkCjW6MWbTt14EQWVRPWU+SwFlMSk9TW0EEUpREWVlJLFxMTE5AR0xGzt0DFIAeQA5AH0AYQAJAEFygHEcKlokEB9Wdi4OwIBaPmksPMoxnQEpDMyJeMQJPlELMfkIqVGRCRtbEA4GCDhuewxvJm7-Pv4RLEoJEzkdTYFs5Uo5DS1EfrusPikxZRSBZ6PiUf6FEDHXCEEinXw9AKICw3O5SB5PF5vD4JUFyFGPdISHJSZQPPgQqHONyQOHnXqgQIiATJKSCPIiKTrCSkvhzIJvfEyP5pCRKDnbKxAA */
  createMachine({
    id: "Text",

    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import("./Text.typegen").Typegen0,
    schema: {
      context: {} as typeof defaultConfig,
      events: {} as { type: "ON_CHANGE"; value: string },
    },
    states: {
      Empty: {
        always: {
          target: "Filled",
          cond: "isString",
        },
      },

      Filled: {
        always: {
          target: "Empty",
          cond: "isEmpty",
        },
      },
    },

    initial: "Empty",

    on: {
      ON_CHANGE: {
        target: "#Text",
        internal: true,
        actions: "updateValue",
      },
    },
  })
export const Text = ({ config = {} }: { config?: typeof defaultConfig | {} }) => {
  const [current, send] = useMachine(machine, {
    context: { ...defaultConfig, ...config },
    actions: {
      updateValue: assign({
        value: (context, event) => {
          return event.value
        },
      }),
    },
    guards: {
      isString: ({ value }) => value !== "",
      isEmpty: ({ value }) => value === "",
    },
  })
  console.log(current.value)
  return (
    <div className="">
      <div className="text-slate-700 font-black mb-5">Default</div>
      <input
        className="text-slate-700 font-semibold h-15 rounded-sm w-full border-2 border-slate-300 placeholder:font-semibold placeholder-slate-400"
        onChange={(e) => send({ type: "ON_CHANGE", value: e.target.value })}
        type="text"
        value={current.context.value}
        placeholder="Your email address"
      />
    </div>
  )
}
