# StoryFlows Card Plugins

In order to present anything other than a simple linear sequence of slides, we need to be able to interact with the user around the content. In effect, we need to be able to place elements within the card body that are able to take user input and trigger actions, or to show dynamic data. To do this, we need to connect the flow presenter portion of StoryFlows to the content of cards, whether for input or output.

I've struggled quite a bit with the design of this. Would love to discuss anything here that seems overly complex or that is likely to create problems down the road.

## Interpolations (Output Plugins)

Input and output sides seem to me to be quite different. As far as I can think, _output_ "plugins" are nothing more than a way to insert a variable value from the StoryFlows state into the HTML, perhaps into the content (e.g., inserting a person's name) or as parameters (e.g., element attributes or URL parameters). They don't really deserve the name plugin, I'm more inclined to call them _interpolations_, but not sure where else to document them. In any case, for the time being, my call would be just to do something like this:
```html
    <p>Hello, {!! first_name !!}, how are you?</p>
```
In this case, _first_name_ would refer to a variable with that name in the current StoryFlows sequence state. To access a shared namespace, the variable name would be prefixed thus:
```html
    <p>Current page: {!! common:current_page !!}.</p>
```
which would access the _current_page_ variable in the shared namespace called _common_. The global namespace might just be done with a colon without a name prefix, e.g.,
```html
    <p>Current sequence: {!! :current_sequence !!}
```
although I'm open to other suggestions on that and on the escape sequence used for interpolations.

## Input Plugins

A StoryFlows _input_ plugin is a normal HTML control (input, select, button, textarea, etc.) that uses a Javascript event handler to trigger actions in StoryFlows. We may consider extending to custom elements in the future, but I don't see a need initially.

To keep things simple, a plugin can trigger one and only one action and so (see [list of actions](flow.md#list-of-actions)) can only do one of two things: (a) set a variable value in the StoryFlows state or (b) trigger an action that advances the story to some other step. Of course, given that these are the only things the current 






## Discussion of Approach

I'm struggling with this one.  On this iteration, I'm going to take on various questions and try to answer them as a way of creating a more specific design.

### 1. How do we represent interactive elements in a card?
We need to figure out both out to represent interactive elements and the parameters associated with them in the card in a way that not only allows us to display them and interact with the user, but also to enable easy-to-use tools for creating and editing them (at least in a relatively near future version). I think there are 3 basic perspectives that we need to account for: the StoryFlows _Presenter_, the _Card Editor_ and the _Flow Editor_.

__Presenter__: It actually doesn't much matter whether we have all the information encoded in the parameters of some special element in the body or we have to match some control in the body to some set of attributes. Either way, we'll need to generate code to display the controls and trigger actions appropriately. I think this perspective is not determinative.

__Card Editor__: From this perspective, it's definitely easier to keep all the information about a control together, i.e., not to separate the "HTML" and the attributes. That makes it much easier to write a TinyMCE plugin, for example since all the information is just stored in the field being edited. Of course we can always strip it out again on save, but there needs to be a good reason to do this.

__Flow Editor__: This perspective demands the opposite. We'd much rather not have to peer inside the body of the card. If we know that the card is a branch type, then the easiest thing to do is, say, to look for an attribute called "branches" and then we have everything we need to properly display and open up the branches. As soon as we have to look for a special element, we have the problem of what to do if we (a) can't find one or (b) find more than one.

#### Answer
I think we end up with a kind of compromise here. In terms of what is actually stored in the card, the _Flow Editor_ perspective needs to win. However, as I noted in the [issue discussion](https://github.com/DemocracyApps/storyflows/issues/1), we can always pre- and post-process the content when loading into and saving from the editor to generate a version that better matches its requirements.

### 2. How do we actually implement the actions associated with controls?
Any user interaction on a card does one of two things: save a variable value or advance the story to some next step.

My feeling is that we ensure that every control does one or the other, but not both (i.e., if you hit return in a text field, it will store the value, but will not cause an advance to the next card since there may be ambiguity if we have both a next card and a branch that, e.g., allows a user to explore something more deeply).

So any control embedded into the content of a card

-- THIS IS IN PROGRESS. CONTENT BELOW IS OLD -- 

Creating input controls that trigger actions is straightforward since we can use normal HTML elements and tie events there to the action creators in the system. As standard methods for doing this are developed, we can add plugins to the [card editor](cardeditor) to handle them in the WYSIWYG interface. Early on we'll need to figure out how best to represent actions for branching versus just going to the next step if they are both present. For an initial implementation of the Asheville CIP storyflow, however, simple links with action triggers will suffice.

Still to be figured out is how to implement _output_ controls. 

Finally, we need to figure out how to embed more complex elements, such as a visualization or table that depends on the values of some parameters in the state.

There are a couple ways we can approach representing output controls and complex components that we want to embed. One is to use some sort of escape that TinyMCE ignores and to dynamically generate the appropriate code when we are preprocessing the card (e.g., {!! _code that only StoryFlows interprets_ !!}). The other is to introduce them through new non-HTML element types, e.g., something like:

```html
    <div>
        <p>This is a paragraph containing an output control with a 
           value = <StoryFlowsValue type="sequence" name="userName"/>.</p>
    </div>
```
This is probably the best way to go, but we need to think through where we register the definitions of such elements, how we extend TinyMCE to allow them, etc.

