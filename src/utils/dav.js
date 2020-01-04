import { create } from 'dva-core';
import createLoading from 'dva-loading';

let app;
let store;
let dispatch;



let onError = (err, dispatch) => {
  console.log('on error----------')
  console.log(err, dispatch)
  console.log('on error----------')
}

function createApp(opt) {
  app = create(app, onError);
  app.use(createLoading({}));

  if (!global.registered) opt.models.forEach(models => app.model(models));
  global.registered = true;
  app.start();

  store = app._store;
  app.getStore = () => store;

  dispatch = store.dispatch;

  app.dispatch = dispatch;
  return app;
}





export default {
  createApp,
  getDispatch() {
    return app.dispatch
  }
}
