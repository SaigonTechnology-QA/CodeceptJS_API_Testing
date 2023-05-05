/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type Web = import('./helper/web_helper.js');
type Mobile = import('./helper/mobile_helper.js');
type Api = import('./helper/api_helper.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface Methods extends Puppeteer, Web, Mobile, Api, REST, JSONResponse {}
  interface I extends ReturnType<steps_file>, WithTranslation<Web>, WithTranslation<Mobile>, WithTranslation<Api>, WithTranslation<JSONResponse> {}
  namespace Translation {
    interface Actions {}
  }
}
