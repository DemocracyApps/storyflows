# Flow

A StoryFlows flow is a collection of _sequences_ that are connected at branch points (although sequences may be dynamically connected as well through the use of [__JUMP__](cards.md) commands in a StoryFlow card control).

_Sequences_ define linear flows of content, with individual items of the sequence designated _steps_. Each step has a unique ID. The ID of the first step of a sequence doubles as the ID of that sequence.

A sequence step contains the following information:
* ID
* Card ID - the content associated with the current step
* Branch - an optional object that provides branching information based on a value obtained from interaction with a user (see details in next section).

## Branches
A _branch_ associates a value obtained from the user with a step ID to branch to. There are a couple of obvious branch types:
* KeyMap - this is a set of branchValue:stepId pairs that associate a value from a __BRANCH__ action with a step ID to move to.
* RangeMap - this is a set of range:stepId pairs that associate a numerical range with a step ID. It is assumed that the _BRANCH_ action value will be a number that maps to one of the ranges (if it maps to more than one, the first match is used).

