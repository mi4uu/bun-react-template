import { GlobalRegistrator } from '@happy-dom/global-registrator'
import lightningcss from 'bun-lightningcss'
lightningcss()
GlobalRegistrator.register()
declare global {
  var IS_REACT_ACT_ENVIRONMENT : boolean
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true
