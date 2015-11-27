import { fromJS } from 'immutable';


export function initializeSite (inputSite) {
  // This is a global ID - we'll need to to access other parts of the state
  // associated with a component.
  let componentId = 0; 
  let site = {
    name:             inputSite.name,
    slug:             inputSite.slug,
    embedded:         inputSite.embedded
  };

  return fromJS(site);
}

export function initializeCards (inputCards) {
  let cards = {};
  inputCards.forEach(function (item, index) {
    let card = {
      id: item.id,
      title: item.title,
      body: item.body,
      image: item.image,
      link: item.link
    };
    cards[item.id] = card;
  });

  return fromJS(cards);
}


