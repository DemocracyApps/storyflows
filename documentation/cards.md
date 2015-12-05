# Cards
A card consists of the following fields:

* ID (string or number | required | unique) - an identifier that allows the card to be retrieved from a card provider 
* Type (string | required) - used to indicate to tools that use cards what content and capabilities the card provides (see below)
* Attributes (json | optional) - key/value pairs that extend the content of the card (see below) 
* Body (string | optional) - content of the card, typically HTML or Markdown, possibly with plugin controls (see below)
* Meta (json | optional) - additional information for interpreting, editing and processing the card. Examples might include:
  1. Content type (beyond what is expected based on card type) and required preprocessors
  2. Variables
  4. Link to custom CSS

## Card Types

The main purpose of the card type is to allow external tools to know what kind of content and attributes to expect.

The default card type is _unspecified_, which just means that no specific information about the content of the card is being conveyed (but of course the system using the card can store whatever content and attributes it likes). Typically, though, such a card will have a body that is just a block of plain text, Markdown or HTML that is to be interpreted by a presentation component that uses it and the attributes section will probably contain only common attributes like _image_ or _link_.

Here are a few examples of other types we might create:

* _question-multiple-choice_ - This would have an array of options and associated links in the attributes,and optionally the question itself.
* _question-numeric-range_ - This might store the name of an input variable, an array of ranges and associated links, and optionally the question itself.
* _simple-slide_ - This might be a standard format for a simple presentation slide. It might use only common atributes like _title_ and _image_, along with the body for the main slide content.

The specific types will be determined and managed by the external system using the cards.

## Attributes
Attributes are key:value pairs that provide additional structured card content that may be used, sometimes based on the card type, by a presenter. 

### Common Attributes 
A few attributes are common across many card types. These include:

* title (string)
* image (url) - the URL of an image
* link (url) - a valid hyperlink
* group (string) - a tag or ID that allows a set of cards to be grouped together for easier retrieval (e.g., CBE cardsets)

### Special Attributes
As noted above, custom card types are likely to use the attributes to store additional type-specific information, such as the questions and answers/links for or ranges/links above. We probably want to use as small a set of standard attributes as possible here. For example, in both these cases we should store in a _branches_ attribute so that the Flow presenter and editor don't need special logic for branching based on the type of card.

## Card Plugins
In order to offer truly interactive story flows, we need to be able to use interactive controls inside the content (body) of a card. Examples might include radio buttons for selecting the answer to a question, links that tie into the system using the cards, and text inputs to get information like a user's name or some value (such as home tax value). We need controls for output as well - if someone inputs their name, we will need controls on later cards to display that name based on the variable we stored from the input. 

These capabilities are provided by card "plugins", bits of functionality that are associated with the external system using hte cards. These are described in the section on [card plugins](plugins.md).

## Card Provider

Cards should be provided to the StoryFlows system from an outside service, either the current data server or, more likely, by a separate card server service. In any case, it should be separate from the CBE. The provider should allow the usual CRUD operations on whole cards and ideally should allow individual fields to be updated as well.

We also need a local version that lets a developer (or presenter) create a story flow and cards on a laptop without the need for any server components.

