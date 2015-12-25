# Card Output Interpolations 

In order to support dynamic content, we need a way to insert a variable value from the StoryFlows state into the HTML, perhaps into the content (e.g., inserting a person's name) or as parameters (e.g., element attributes or URL parameters). 

I think we can keep this quite simple initially, something like this:
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

Later we'll need to figure out how to connect this to the WYSIWYG editor.

