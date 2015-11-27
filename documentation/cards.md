# Cards & Cardsets

A card record consists of the following:

1. title
2. body - content of the card; see below for how presentation is determined
3. image - the URL of an image
4. link - a valid hyperlink
5. cardset - the id of a cardset to which the card belongs
6. ordinal - the index of the card in the cardset**
7. meta - a JSON object with information used to edit and process the card. This may include:
  1. Content type
  2. Required preprocessors
  3. CSS link
  4. ?


## Card Body

In the simplest case, the card body is simply a block of plain text, Markdown or HTML that is to be interpreted/used by a presentation component it uses it.


**The use of __ordinal__ in the Card record reflects the current design in the Community Budget Explorer platform. It may make more sense to let the Cardset store the ordered list of card ids. If we do that we should probably not store the cardset ID and leave open the option of having a card belong to multiple cardsets.
