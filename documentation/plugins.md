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

To keep things simple, a plugin can trigger one and only one action and so (see [list of actions](flow.md#list-of-actions)) can only do one of two things: (a) set a variable value in the StoryFlows state or (b) trigger an action that advances the story to some other step. This implies a straightforward relationship between the control type and the type of action it triggers.

Let's look at a couple examples to see how we would actually represent these.

Here's a card asking for the tax value of a user's house:

```json
    {
        "type":"unspecified",
        "body": "<p>Enter the tax value of your property: <input class='sf-plugin form-control' type='text' 
                                                                 name='common:tax_value'
                                                                 validation='numeric|min:0' value='{!! tax_value !!}'
                                                                 onchange='sf_set_variable_value()'>.</p>",
        "attributes": {
            "input_required": ["common:tax_value"]
        }
    }
```
No card attributes are required for the basic plugin since this depends only on a standard action-creator function and a state variable defined by the StoryFlows system, but I've added one for validation. Some validation rules should be applied at the time the user makes a change - the specification for that (the _validation_ attribute) is inspired by the [validation rules used in Laravel](http://laravel.com/docs/5.1/validation#available-validation-rules). To _require_ an input before proceeding is a bit more work. We could parse through any _sf-plugins_ and look for _required_ in the validation attribute, but we could also just put the information in the attributes. Here _input_required_ is an array of variable names that must be set before proceeding. We can place error messages at the appropriate spots by looking for elements with the right _name_ attribute, or we can just put it in a more generic place.

Note that the _set_variable_value_ action creator will use the input _name_ attribute to determine which variable to set.

Now let's consider a branch case.

```json
    {
        "type":"question-multiple-choice",
        "body": "<p>Select which area you would like to explore:</p>
                 <select name='selected_area' class='sf-plugin form-control' onchange='sf_set_variable_value()'>
                    <option value='safety' selected>Public Safety</option>
                    <option value='admin'>Administration</option>
                    <option value='parks'>Parks &amp; Rec</option>
                    <option value='other'>Other</option>
                 </select><br>
                 <button class='sf-plugin btn btn-primary' onclick='sf_branch()'>Explore</button>",
        "attributes": {
            "branches": {
                "selected_area":[
                    {"value":"safety", "destination":{"type":"branch", "sequence":21, "step":0}},
                    {"value":"admin",  "destination":{"type":"branch", "sequence":21, "step":0}},
                    {"value":"parks",  "destination":{"type":"branch", "sequence":21, "step":0}},
                    {"value":"other",  "destination":{"type":"url",  "url":"http://www.ashevillenc.gov/Departments/CapitalProjectsManagement.aspx"}}
                ]
            }
        }
    }
```
When the user presses the __Explore__ button, the _sf_branch()_ routine will look for the _selected_area_ array in the _branches_ attribute, pick the entry corresponding to the selected option value, then trigger the jump to the appropriate destination, which can be an internal branch to a sequence+step or to an external URL. Note that the use of a hash for _branches_ allows us to have multiple sets of selections for branches.

__Note__: This does raise the question for me as to whether the _type_ field for cards is really needed ... let's discuss.

## Editing Cards
The representations above are straightforward to do as long as we are manually entering things, but the separation of the HTML control specification and the branches attribute is awkward (though I think it's important to keep them separated in the actual representation so that the Flow editor doesn't have to go digging into the HTML to figure out branches). As noted in the [issue discussion](https://github.com/DemocracyApps/storyflows/issues/1), however, we can always pre- and post-process the content when loading into and saving from the editor to generate a version that better matches its requirements. For now, we can certainly edit the HTML inside TinyMCE (though we may need to configure it to allow some additional attributes) and this has the advantage that the controls will show up properly as what they are in visual editor.


