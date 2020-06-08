import {Region,startDebug } from './index'

;(async()=>{
	try{
		await startDebug(Region["ap-guangzhou"],'default','bcd')
	}catch(e){
		console.error(e)
	}
})()