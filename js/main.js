import './const/common.js';
import './utils/util.js';
// import './test/randomiser.js';
// import './test/get-adverts-data.js';
import './messages.js';
import './server.js';
import './create-adverts.js';
import './page-condition.js';
import './map/map.js';
import './map/map-filter.js';
import './form/form.js';
import './form/form-actions.js';
import './form/form-data.js';
import './form/form-validation.js';
import './form/form-preview.js';
import {initPins} from './map/map.js';
import {showLoadDataError} from './messages.js';
import {api} from './server.js';
import {DATA} from './const/urls.js';

let currentAdverts;

api({
  url: DATA,
  method: 'GET',
  onSuccess: (data) => {
    currentAdverts = data;
    initPins(currentAdverts);
  },
  onError: (error) => showLoadDataError(error),
});

export {currentAdverts};
