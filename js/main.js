import './const/common.js';
// import './test/randomiser.js';
// import './test/get-adverts-data.js';
import './messages.js';
import './server.js';
import './create-adverts.js';
import './page-condition.js';
import './map.js';
import './form/form.js';
import './form/form-actions.js';
import './form/form-data.js';
import './form/form-validation.js';
import {initPins} from './map.js';
import {showLoadDataError} from './messages.js';
import {api} from './server.js';
import {DATA} from './const/urls.js';

api({
  url: DATA,
  method: 'GET',
  onSuccess: (data) => initPins(data),
  onError: (error) => showLoadDataError(error),
});
