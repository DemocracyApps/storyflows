# Flow
## Introduction
A StoryFlows flow is a collection of _sequences_ connected by branches and jumps. This together with a _state_ space comprises an entire StoryFlows system.

### Sequence
A sequence is a linear flow of content, with individual items of the sequence designated _sequence steps_. Each step corresponds to a [card](cards.md). A sequence consists of:

1. ID (required, unique)
2. Name (required)
3. Description (optional)
4. Steps - array of _steps_
5. Variables - a list of variable definitions and initial values that should be associated with this sequence in the system state (optional, see below)

### Sequence Step
A sequence step definition consists of:

1. ID of the card that provides its content (this can be undefined while a sequence is being constructed, but obviously doesn't make sense to leave undefined for actual presentation)
2. Variables - a list of variable definitions and initial values that should be associated with this step in the system state (optional, see below)
3. Branch - this optional structure associates a value obtained from the user (see input controls) with a step to branch to. There are at least two branch types:
  * _KeyMap_ - this is a simple set of value-to-stepId pairs, where values probably map to a set of choices a user may make at this step.
  * _RangeMap_ - this is a set of rage-to-stepId pairs that associate a numerical range of the input value with a step ID to move to. If the value maps to more than one of the ranges, the first match is used.

### State
The state of the system consists of a few global variables that track the current position and history, individual namespaces for each sequence and step that may be used by a flow, and shared-namespaces area where flows may create and share variables. The state is immutable - it may only be changed by creating and dispatching _actions_ (see details below).

## The System State
The system state is stored as a single immutable object that may be modified via _actions_. The object is a map containing the following keys:

* global - all system-global values are stored here
* sequences - a map of namespaces corresponding to individual sequences (keyed by ID)
* steps - a map of namespaces corresponding to individual cards (keyed by sequence ID + index))
* named - a map of named shared namespaces that may be created by variable definitions in sequences or steps

### Actions
All changes to system state occur via _actions_. An action is simply an object containing the action type and any parameters needed by the action. Actions are dispatched using _action creators_, a set of functions that are made available to the system. As a concrete example, an input from a user may be used to set the value of a variable in the sequence namespace. The action would be something like:

```json
 {
    type: SET_SEQUENCE_VARIABLE,
    args: {
        sequenceId: 12,
        variableName: "name",
        variableValue: "Rahim"
    }
 }
```
This might be actually called using a function like _setSequenceVariable(12, "name", "Rahim")_.


## Card Body Content

#### Input Controls
Still a lot to think through here, but we will obviously be using normal web controls with Javascript actions. The main job of the Javascript actions will be to call _action creators_ that will dispatch actions with the appropriate parameters (in the native implementation, using <a href="https://github.com/rackt/redux" target="_blank">Redux</a>. There are just a few types of actions that may be triggered:

1. __NEXT__: Advance to the next step in the current sequence
2. __PREVIOUS__: Advance to the previous step in the current sequence (or __RETURN__ if we are at the first step)
3. __FIRST__: Rewind to the first step in the current sequence
4. __LAST__: Advance to the last step in the current sequence
5. __RESTART__: Go back to the very beginning of the StoryFlow flow
6. __RETURN__: Go back to the last branch step (or __RESTART__ if there wasn't one)
7. __BRANCH (value)__: Branch to another sequence based on the provided value
8. __JUMP (card_id)__: Jump to the specified sequence

These commands pertain to the [Flow](flow.md) component of the StoryFlows system.

