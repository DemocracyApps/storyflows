# Cards & Cardsets
A card record consists of the following:

1. title
2. body - content of the card; see below for how presentation is determined
3. image - the URL of an image
4. link - a valid hyperlink
5. cardset - the id of a cardset to which the card belongs
6. ordinal - the index of the card in the cardset
  * Note: the use of _ordinal_ in the Card record reflects the Community Budget Explorer platform implementation. It may make more sense to let the Cardset store an ordered list of card ids and drop the _cardset_ field so that a card could be used in multiple cardsets.
7. meta - a JSON object with information used to edit and process the card. This may include:
  1. Content type
  2. Required preprocessors
  3. CSS link
  4. ?


## Card Body
In the simplest case, the card body is simply a block of plain text, Markdown or HTML that is to be interpreted/used by a presentation component that uses it. However, in order to offer truly interactive story flows, we need to be able to use input and output controls in the body of the card.

### Input Controls


