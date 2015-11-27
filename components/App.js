import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Site from './Site';
import * as SiteActions from '../state/actions/SiteActions';
import Cardsets from '../state/derived/Cardsets';

/*
 * In this routine we generate a couple derived sets of data. The redux store only stores raw cards and
 * datasets, but we want the cardsets and combined datasets used by components to be easily accessible.
 * In addition, in the case of datasets, we need to actually generate the merged datasets that the 
 * display components will use.
 */
function mapStateToProps(state) {
  let componentCardsets = Cardsets.updateComponentCardsets(state.site.get('components'), state.cards);
  return {
    site: state.site,
    cards: state.cards,
    componentCardsets: componentCardsets
  };
}

/*
 * We may not need this ... I think I'm ok with just passing down the dispatcher 
 * and letting components load action creators themselves.
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SiteActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Site);
