# Card Plugins

In order to present anything other than a simple linear sequence of slides, we need to be able to interact with the user around the content. In effect, we need to be able to place elements within the card body that are able to take user input and trigger actions, or to show dynamic data.

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

