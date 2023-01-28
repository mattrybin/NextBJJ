import { useMachine } from "@xstate/react"
import { assign, createMachine } from "xstate"

const defaultConfig = {
  placeholder: "Placeholder here" as string,
  value: "" as string,
  label: "Label here" as string,
  focused: false,
  disabled: false,
}

const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUwA8AuBiA8gOQH0BhACQEE8BxAUQG0AGAXUVAAcB7WASwy-YDsWINIgC0ARgCsAFgB0ATgDs9FYvnSAzPQBs2jZIA0IAJ6JJ42Ru3iVGgEzjx0pfX0BfN0dSZZ1ALasGMZYDMxIIBzcvAJCIgji8vKW2jKuDhriABwy2kam8YqSspLyWYrS9CWu1ooeXugYsgBiXAA2rZAhTEKRPHyC4XEJmZaFmY5qmdrShXmIWpYamZlaerradkradSDe2PgEAEIAMgCqAEqhPZx9MYNiUiPairriGok6KeJ2cwVJmS8rMMNpJFFYdntcIQmjgiKcAMpXcK9aIDUBxCQLGbZXR2OyKOzmeQ-EzzehJbSVeh2HQzfTEjyeED8dgQOBCPbXKL9WKIN6ySrlfH03SZam5UkIUSg2RObSZaTmQo2aTbJl7XwBIJc25o4SIawC0HSYUlUXi342OxGsErSQbaSZfHiCENZptDoQHWo3kId70WTSBJKDTSZySJ3iS3Um0VJzLSQZUOMtxAA */
  createMachine({
    id: "Text",

    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import("./Text.typegen").Typegen0,
    schema: {
      context: {} as typeof defaultConfig,
      events: {} as
        | { type: "ON_CHANGE"; value: string }
        | { type: "ON_BLUR"; value: boolean }
        | { type: "ON_FOCUS"; value: boolean },
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

      ON_BLUR: {
        target: "#Text",
        internal: true,
        actions: "updateFocused",
      },

      ON_FOCUS: {
        target: "#Text",
        internal: true,
        actions: "updateFocused",
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
      updateFocused: assign({
        focused: (context, event) => {
          return event.value
        },
      }),
    },
    guards: {
      isString: ({ value }) => value !== "",
      isEmpty: ({ value }) => value === "",
    },
  })
  const { disabled, focused, placeholder, value, label } = current.context
  const onFocusedAndNotDisabled = focused && !disabled
  const onUnfocusedAndNotDisabled = !focused && !disabled
  return (
    <div className="mb-12">
      <div className="text-slate-700 font-black mb-6">{label}</div>
      <div className="relative group">
        <input
          className={`text-slate-700 caret-blue-500 selection:bg-blue-300 focus:shadow-none focus:ring-0 focus:border-2 focus:border-slate-300 relative font-semibold h-15 rounded-md w-full border-2 border-slate-300 placeholder:font-semibold placeholder-slate-400
          ${disabled && "bg-slate-100 text-slate-400 cursor-not-allowed	"}`}
          type="text"
          readOnly={disabled}
          onBlur={() => send({ type: "ON_BLUR", value: false })}
          onFocus={() => send({ type: "ON_FOCUS", value: true })}
          onChange={(e) => send({ type: "ON_CHANGE", value: e.target.value })}
          value={value}
          placeholder={placeholder}
        />
        {onFocusedAndNotDisabled && (
          <div className="absolute inset-0 -m-6 border-blue-500 border-2 border-solid pointer-events-none rounded-md" />
        )}
        {onUnfocusedAndNotDisabled && (
          <div className="absolute inset-0 -m-6 group-focus:border-blue-500 group-focus:border-2 group-hover:border-blue-500 group-hover:border-dashed group-hover:border-2 pointer-events-none rounded-md" />
        )}
      </div>
    </div>
  )
}
