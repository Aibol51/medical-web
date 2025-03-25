
// let openPlantGrass = '-openPlantGrass-'

// 网络接口修改此字符 
// 聊天接口修改此字符 小程序聊天要求wss 例如：wss://mer.crmeb.net


// let httpApi = 'https://kangrentang.kangyitong.cn'
let httpApi = ''
let wsApi = 'wss://kyhospital.sdwanyue.com:9500/'


export const HEADER = {
    'content-type': 'application/json',
    'Form-type': 'app',
};

export const HTTP_REQUEST_URL = httpApi;
export const VUE_APP_WS_URL = `${wsApi}?`;
// export const openPlantGrass = openPlantGrass;
export const TOKENNAME = 'authorization';
export const EXPIRE = 0;
