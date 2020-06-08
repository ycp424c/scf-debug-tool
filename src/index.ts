
const tencentCloudTools = require('@serverless/utils-china');
const openBrowsers = require('open-browsers')

interface IUserAuth{
	SecretId: string
	SecretKey: string
	token?: string
}

export enum Region{
	'ap-guangzhou' ='ap-guangzhou',
	'ap-shanghai'= 'ap-shanghai',
	'ap-beijing' = 'ap-beijing',
	'ap-hongkong' = 'ap-hongkong',
	'ap-chengdu'='ap-chengdu' ,
	'ap-singapore'='ap-singapore',
	'ap-mumbai'='ap-mumbai'
}

export async function startDebug(region:Region,namespace:string = 'default',functionName:string,userAuth?:IUserAuth){
	if(!userAuth || !userAuth.SecretId || !userAuth.SecretKey){
		console.log('new login')
		const login = new tencentCloudTools.Login();
		console.log('do login')
		const tencent_credentials = await login.login();
		console.log(tencent_credentials)
		userAuth = {
			SecretId: tencent_credentials.secret_id,
			SecretKey: tencent_credentials.secret_key,
			token: tencent_credentials.token
		}
	}
	const debugSdk = new tencentCloudTools.Debug(userAuth,{
		functionName,
		nameSpace: namespace,
		qualifier: '$LATEST'
	},region)
	try {
		await debugSdk.standardRemoteDebug({
		  logger: console.log,
		  stdout: process.stdout,
		});
		openBrowsers('chrome://inspect')
	} catch (e) {
		console.error(e);
	}

};

