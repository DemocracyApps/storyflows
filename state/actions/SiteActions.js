import {apiFetchDatasets} from './ApiActions';
import * as types from './ActionTypes';

export function setSiteState (state) {
  return {
    type: types.SET_SITE_STATE,
    state
  };
}

export function setCardsState (state) {
  return {
    type: types.SET_CARDS_STATE,
    state
  };
}

export function setDataState (models) {
  return {
    type: types.SET_DATA_STATE,
    models
  };
}


export function receiveDataset (dataset) {
  return {
    type: types.RECEIVE_DATASET,
    dataset
  };
}

export function requestDatasets (datasetIds) {
  return {
    type: types.REQUEST_DATASETS,
    datasetIds
  };
}

export function fetchDatasets(datasetIds, dispatch) {
  let url = CBEVars.site[0].server.apiUrl + "/datasets/" + datasetIds.join();
  console.log("The server API url is " + url);
  dispatch(requestDatasets(datasetIds));
  return  fetch(url)
          .then(response => response.json())
          .then(
            (json)     => {
              for (let i=0; i<json.data.length; ++i) {
                dispatch(receiveDataset(json.data[i]));
              }
            }
          );
}

export function gotoPage(pageId) {
  return {
    type: types.GOTO_PAGE,
    pageId
  };
}

export function setComponentState(stateValue) {
  return {
    type: types.SET_COMPONENT_STATE,
    stateValue
  }
}
