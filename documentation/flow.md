# Flow
## Introduction
A StoryFlows flow is a collection of _sequences_ that are interconnected by branches and jumps embedded in the cards that comprise the individual steps of a sequence. The collection of sequences and cards together with a _state_ space make up the StoryFlows system.

## Sequences
A sequence is a linear flow of content comprised of an array of [cards](cards.md) and definitions of state variables associated with the sequence. The fields describing a sequence are:

* ID (string or number | required | unique)
* Name (string | required)
* Description (string | optional)
* Cards (array of string or number | may be empty) - array of card IDs
* Variables (json | optional) - a list of variable definitions and initial values that should be associated with this sequence in the system state (optional, see below)

## The System State
The system state is used by the [Presenter](presenter.md) component, but its structure is defined as part of the Flow module. It stores the current state of a StoryFlows presentation in several namespaces:

* global - all system-global values are stored here, e.g., the current position
* sequences - a map of namespaces for variables associated with individual sequences
* named - a map of named shared namespaces that may be accessed from any sequence.

We will adhere to the <a href="https://github.com/rackt/redux" target="_blank">Redux</a> approach in which the system state is a single immutable object that may only be modified via _actions_. 

### Actions
All changes to system state occur via _actions_. An action is a plain Javascript object containing the action type and any parameters needed by the action. Actions are dispatched using _action creators_, a set of functions that are made available to the system as properties passed into front-end components. As a concrete example, an input from a user may be used to set the value of a variable in the sequence namespace. The action would be something like:

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

The following section details some of the actions which may be triggered.

#### List of Actions

* __NEXT__: Advance to the next card in the current sequence
* __PREVIOUS__: Advance to the previous card in the current sequence (or __RETURN__ if we are at the first card)
* __FIRST__: Rewind to the first card in the current sequence
* __LAST__: Advance to the last card in the current sequence
* __RESTART__: Go back to the very beginning of the StoryFlow flow
* __RETURN__: Go back to the last card from which we branched or jumped to the current sequence (or __RESTART__ if there wasn't one)
* __JUMP (sequence_id)__: Jump to the specified sequence
* __BRANCH (value)__: Branch to another sequence based on the provided value
* __SET_VARIABLE_VALUE__: set the value of a state variable associated with this sequence or a shared namespace





