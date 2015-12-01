# Cards
A card consists of the following fields:

1. title
2. body - content of the card; see below for how presentation is determined
3. image - the URL of an image
4. link - a valid hyperlink
5. meta - a JSON object that stores information for editing and processing the card. Examples include:
  1. Content type and required preprocessors
  2. Variables
  4. Link to custom CSS
6. Group tag/ID (optional) - allows a set of cards to be grouped together for easier retrival (e.g., CBE cardsets)

In the simplest case, the card body is simply a block of plain text, Markdown or HTML that is to be interpreted by a presentation component that uses it. 

However, in order to offer truly interactive story flows, we need to be able to use input and output controls in the body of the card. These are described in the section on [card plugins](plugins.md).

## Card Provider

Cards should be provided to the StoryFlows system from an outside service, either the current data server or, more likely, by a separate card server service. In any case, it should be separate from the CBE.

We also need a local version that lets a developer (or presenter) create a story flow and cards on a laptop without the need for any server components.

