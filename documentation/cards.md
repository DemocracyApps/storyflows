# Cards & Cardsets
## Cards
A card record consists of the following:

1. title
2. body - content of the card; see below for how presentation is determined
3. image - the URL of an image
4. link - a valid hyperlink
5. meta - a JSON object that stores information for editing and processing the card. Examples include:
  1. Content type and required preprocessors
  2. Variables
  4. Link to custom CSS
6. cardset - the id of the cardset to which the card belongs
7. ordinal - the index of the card in the cardset

In the simplest case, the card body is simply a block of plain text, Markdown or HTML that is to be interpreted/used by a presentation component that uses it. However, in order to offer truly interactive story flows, we need to be able to use input and output controls in the body of the card. The controls used will probably be reflected in information in the _meta_ field, but from the standpoint of the card system itself, the body is just a blob of content.

## Cardsets
Cards are organized in _cardsets_, which are nothing more than an ordered collection of cards. 

In the current CBE collection, a card belongs to one and only one cardset and order information is stored in the _ordinal_ field of the card. We may wish to change this and have a cardset simply store the list of card ids so that multiple cardsets could share the same card. If we do this, it implies that a card could be independent of any cardset. I'm not thrilled with that ID, but we can effectively avoid it just by not allowing the interface to cause it, while retaining the option later.

My feeling is that StoryFlows will only work with cardsets, not individual cards.

## Card Provider

Cards should be provided to the StoryFlows system from an outside service, either the current data server or, more likely, by a separate card server service. In any case, it should be separate from the CBE.

We also need a local version that lets a developer (or presenter) create a story flow and cards on a laptop without the need for any server components.

