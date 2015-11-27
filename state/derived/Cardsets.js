import { fromJS } from 'immutable';

var Cardsets = {
  rawCardsets: null,
  componentCardsets: null,

  initialize: function (components, cards) {
    this.rawCardsets = {initialized: true};
    if (components) components.forEach((item, index) => {
      let cardsets = {};
      item.get('cards').forEach((set, key) => {
        let ids = [];
        set.get('ids').forEach( (id) => {
          ids.push(cards.get(id));
        });
        cardsets[key] = ids;
      });
      this.rawCardsets[item.get('id')] = cardsets;
    });
  },

  updateComponentCardsets: function (components, cards) {
    if (this.componentCardsets == null) {
      this.initialize(components, cards);
      this.componentCardsets = fromJS(this.rawCardsets);
    }
    else {
      // There's not actually anything to do here right now since cards don't get loaded asynchronously.
    }
    return this.componentCardsets;
  }
};

export default Cardsets;