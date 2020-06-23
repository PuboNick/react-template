const defs = {
  BoxcodeReflectEntity: (...typeArgs) => {
    return {
      batchnolen: '我是字串',
      brand: '我是字串',
      capacity: '我是字串',
      codetype: '我是字串',
      createdate: '我是字串',
      creator: '我是字串',
      mno: '我是字串',
      modelType: '我是字串',
      production: '我是字串',
      productno: '我是字串',
    };
  },
  GlobalReturnInformation: (...typeArgs) => {
    return {
      code: '我是字串',
      data: typeArgs[0],
      message: '我是字串',
    };
  },
  InOrOutDTO: (...typeArgs) => {
    return {
      batchNo: '我是字串',
      ckDate: '我是字串',
      quantity: '我是字串',
      rkDate: '我是字串',
      sn: '我是字串',
      snType: '我是字串',
    };
  },
  InventoryEntity: (...typeArgs) => {
    return {
      batchNo: '我是字串',
      batchNoLen: '我是字串',
      brand: '我是字串',
      capacity: '我是字串',
      createDate: '我是字串',
      creator: '我是字串',
      expire: '我是字串',
      expireDays: '我是字串',
      factory: '我是字串',
      glueSn: '我是字串',
      id: '我是字串',
      inStoreNum: '我是字串',
      isSame: '我是字串',
      mno: '我是字串',
      modelType: '我是字串',
      outStoreNum: '我是字串',
      packageNo: '我是字串',
      productNo: '我是字串',
      production: '我是字串',
      quantity: 16.5189407262337,
      sn: '我是字串',
      store: '我是字串',
      unit: '我是字串',
      used: '我是字串',
      weight: '我是字串',
    };
  },
  OutStoreEntity: (...typeArgs) => {
    return {
      batchNo: '我是字串',
      clamp: '我是字串',
      createDate: '我是字串',
      dispose: '我是字串',
      expire: '我是字串',
      glueType: '我是字串',
      glueVolume: 80.24964629854117,
      identifyInfo: '我是字串',
      model: '我是字串',
      outman: '我是字串',
      part: '我是字串',
      pecipient: '我是字串',
      process: '我是字串',
      quantity: 88.67993374524978,
      receiveFactory: '我是字串',
      receiveUnit: '我是字串',
      sn: '我是字串',
      storeId: '我是字串',
      used: '我是字串',
      vendor: '我是字串',
    };
  },
  OutstockDTO: (...typeArgs) => {
    return {
      clamp: '我是字串',
      factory: '我是字串',
      model: '我是字串',
      part: '我是字串',
      process: '我是字串',
      unit: '我是字串',
    };
  },
  ResponseMsg: (...typeArgs) => {
    return {
      code: 76.49347696714462,
      data: null,
      msg: '我是字串',
    };
  },
  UserInfo: (...typeArgs) => {
    return {
      empNo: '我是字串',
      name: '我是字串',
    };
  },
  wipInfoDTO: (...typeArgs) => {
    return {
      batchNo: '我是字串',
      endDate: '我是字串',
      expireDays: '我是字串',
      factory: '我是字串',
      isExpired: '我是字串',
      otype: 30.143146868254654,
      packageNo: '我是字串',
      page: 45.42677377812338,
      pageSize: 83.1205597921328,
      startDate: '我是字串',
      store: '我是字串',
      unit: '我是字串',
    };
  },
};

const escapeDeadCycle = (fn, num = 30) => {
  let n = 0;

  return (...args) => {
    if (n > num) return {};
    n++;

    const res = fn(...args);

    return res;
  };
};

Object.keys(defs).forEach(key => {
  defs[key] = escapeDeadCycle(defs[key]);
});

export default {
  /** 庫存狀態預警盤點 */
  baseInfo: {
    /** 基本資料刪除 */
    baseinfoDelete: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 基本資料錄入 */
    baseinfoInsert: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 基本資料查詢 */
    baseinfoQuery: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 基本資料更新 */
    baseinfoUpdate: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 庫存狀態及預警信息查詢 */
    wipQuery: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
  },

  /** 出入庫記詳細記錄信息管理 */
  detail: {
    /** 刪除出入庫記錄 */
    delInOrOutRecords: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 出入庫詳細信息查詢 */
    detailQuery: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 出庫單對應的出庫詳情查詢 */
    rkDetailQuery: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
  },

  /** 入庫記錄操作頁面 */
  instock: {
    /** 若入庫時為膠水條碼返回所有型號信息 */
    getGluecodeType: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 入庫記錄信息錄入 */
    instockInput: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 查詢該條碼是否已重複入庫 */
    queryGlueIsInstock: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 根據產品碼映射膠水部分基本信息 */
    reflectPackageInfo: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 根據批次號帶出相關信息 */
    relatedQuery: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
  },

  /** 出庫記錄操作頁面 */
  outstock: {
    /** 出庫時對增加"先進先出"原則管控(所需參數:factory,unit,modelType,batchNo) */
    getEarlyGlueCode: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 獲取夾位列表 */
    getClamp: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 獲取處理方式列表 */
    getDispose: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 獲取廠區列表 */
    getFactory: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 獲取機種列表 */
    getModel: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 獲取品名列表 */
    getPart: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 獲取製程列表 */
    getProcess: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 獲取單位列表 */
    getUnit: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 出庫時驗證是否重複出庫 */
    judgeOutIsRepeat: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
    /** 出庫記錄信息錄入 */
    outstockInput: {
      code: 0,
      data: defs.ResponseMsg(),
      message: '',
    },
  },

  /** User Controller */
  userInfo: {
    /** 查詢UserInfo
查詢當前登錄UserInfo */
    getUser: {
      code: 0,
      data: defs.GlobalReturnInformation(defs.UserInfo()),
      message: '',
    },
    /** 用戶登出
查詢當前登錄UserInfo */
    loginOut: {
      code: 0,
      data: defs.GlobalReturnInformation('我是字串'),
      message: '',
    },
  },
};
