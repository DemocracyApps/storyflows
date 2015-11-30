# Flow

A StoryFlows flow is a collection of _sequences_ that are connected by branches and jumps.

_Sequences_ define linear flows of content, with individual items of the sequence designated _steps_. Each step has a unique ID, as does each sequence.

A sequence step contains the following information:
* ID
* Card ID - the content associated with the current step
* Branch - an optional object that provides branching information based on a value obtained from interaction with a user (see details in next section).

## Branches
A _branch_ associates a value obtained from the user with a step ID to branch to. There are a couple of obvious branch types:
* KeyMap - this is a set of branchValue:stepId pairs that associate a value from a __BRANCH__ action with a step ID to move to.
* RangeMap - this is a set of range:stepId pairs that associate a numerical range with a step ID. It is assumed that the _BRANCH_ action value will be a number that maps to one of the ranges (if it maps to more than one, the first match is used).


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

