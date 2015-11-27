# Cards & Cardsets

A card record consists of the following:

1. title
2. body - content of the card; see below for how presentation is determined
3. image - the URL of an image
4. link - a valid hyperlink
5. cardset - the id of a cardset to which the card belongs
6. ordinal - the index of the card in the cardset (see note below)
5. meta - a JSON object with information used to edit and process the card

The __meta__ field may serve multiple purposes, but at least it is needed to flag the content type of the card body and perhaps a list of preprocessors to be used to prepare it for presentation or editing. At minimum, we can have __html__ and __markdown__ content types, but as soon as we start using UI controls, we'll need to have preprocessors that know how to deal with them and output the right thing. These should be explicitly indicated so that third-party tools know ot use them as well the the native presenter and editor.

**Note**: The use of __ordinal__ in the Card record reflects the current design in the Community Budget Explorer platform. It may make more sense to let the Cardset store the ordered list of card ids. If we do that we should probably not store the cardset ID and leave open the option of having a card belong to multiple cardsets.
