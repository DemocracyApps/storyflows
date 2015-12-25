# Cards
All of the content in a StoryFlow is contained in _cards_, which are just blobs of HTML or Markdown plus some meta-information that allows interactive controls within the content to connect to the rest of the system.

A card consists of the following fields:

* ID (string or number | required | unique) - an identifier that allows the card to be retrieved from a card provider
* Body (string | optional) - content of the card, typically HTML or Markdown, possibly with plugin controls (see below)
* Attributes (json | optional) - key/value pairs that extend the content of the card with anything from images to input validation information (see below) 
* Meta (json | optional) - additional information for interpreting, editing and processing the card. It's possible this can be taken care of in the attributes section, but leaving for now. A few possible examples:
  1. Content type (beyond what is expected based on card type) and required preprocessors
  2. Variables
  4. Link to custom CSS

## Attributes
Attributes are key:value pairs that provide additional structured card content that may be used, sometimes based on the card type, by a StoryFlows presenter or editor. There is no limit to what we might use this for, but examples of common attributes might include:

* type - a hint to other parts of the system about the role or content of the card
* title (string)
* image (url) - the URL of an image
* link (url) - a valid hyperlink
* group (string) - a tag or ID that allows a set of cards to be grouped together for easier retrieval (e.g., CBE cardsets)
* validation - for cards that use input controls, these may specify input requirements for validation.

Other examples crop up elsewhere in the documentation (see, e.g., the section on [card plugins](plugins) for input and variable output).

## Card Plugins
In order to offer truly interactive story flows, we need to be able to use interactive controls inside the content (body) of a card. Examples might include radio buttons for selecting the answer to a question, links that tie into the system using the cards, and text inputs to get information like a user's name or some value (such as home tax value). We need controls for output as well - if someone inputs their name, we will need controls on later cards to display that name based on the variable we stored from the input. 

These capabilities are provided by card "plugins", bits of functionality that are associated with the external system using the cards. These are described in the section on [card plugins](plugins.md).

## Card Provider

Cards should be provided to the StoryFlows system from an outside service, either the current data server or, more likely, by a separate card server service. In any case, it should be separate from the CBE. The provider should allow the usual CRUD operations on whole cards and ideally should allow individual fields to be updated as well.

We also need a local version that lets a developer (or presenter) create a story flow and cards on a laptop without the need for any server components.

