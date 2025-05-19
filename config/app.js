// let openPlantGrass = '-openPlantGrass-'

// 网络接口修改此字符 
// 聊天接口修改此字符 小程序聊天要求wss 例如：wss://mer.crmeb.net


// let httpApi = 'https://kangrentang.kangyitong.cn'
// let httpApi = 'http://127.0.0.1:48080'
// let httpApi = 'http://kangrentang.co'
let httpApi = ''
let port = '/app-api'


export const HEADER = {
	'content-type': 'application/json',
	'Form-type': 'app',
};

export const HTTP_REQUEST_URL = httpApi + port;
// export const openPlantGrass = openPlantGrass;
export const TOKENNAME = 'authorization';
export const EXPIRE = 0;