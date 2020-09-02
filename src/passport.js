import { global } from './utils/global'
import {NAME_SPACE} from './config/constants'
import apiWarn from 'comp/apiWarn'
import { SetRequestTime }  from 'comp/requestTime'
let setRequestTime = new SetRequestTime()

const passport = {
  init(opt) {
    let that = this
    opt = opt || {}
    this.mode = opt.mode || 'prod'
    this.entryQueue('wwwwww')
    setTimeout(function () {
      that.exitQueue({
        project:'wx',
        env:'dev',
        api:'wwwwww',
        type:0
      })
    },60)
  },
  apiWarn(data){
    apiWarn.apiWarn(data)
  },

  entryQueue(id){
    setRequestTime.entryQueue(id)
  },
  exitQueue(data){
    setRequestTime.exitQueue(data)
  }
}

const ns = global[NAME_SPACE]
global[NAME_SPACE] = ns ? { ...ns, ...passport } : passport

export default passport
