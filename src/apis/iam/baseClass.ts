class MessageInfo {
  /** 状态码 */
  code = undefined;

  /** 數據 */
  data = undefined;

  /** 消息 */
  msg = '';
}

class RescourceDataDTO {
  /** 歸檔編號 */
  achievedNum = undefined;

  /** 資源內容 */
  content = '';

  /** 資源描述 */
  contentDescribe = '';

  /** 資源名稱 */
  resourceName = '';

  /** 資源類型 */
  resourceType = '';

  /** 資源擁有者/建立人工號 */
  useMan = '';
}

class ResponseMsg {
  /** 状态码 */
  code = undefined;

  /** 返回对象 */
  data = new UserAuthorityEntity();

  /** 消息信息 */
  msg = '';
}

class UserAuthorityEntity {
  /** 是否超級管理員 */
  isadmin = undefined;

  /** 戶所對應的菜單權限 */
  menuList = [];

  /** 用戶所對應的資源數據信息 */
  userResourceDataList = [];

  /** 用戶所對應的角色信息 */
  userRoleInforList = [];

  /** 暱稱 */
  useralias = '';

  /** 工號 */
  userid = '';

  /** 中文名 */
  username = '';
}

class authorityQueryDTO {
  /** 權限數據（菜單ID，數據資源(ID/Name/Content)） */
  authorityData = '';

  /** 用戶工號 */
  userId = '';
}

export const iam = {
  MessageInfo,
  RescourceDataDTO,
  ResponseMsg,
  UserAuthorityEntity,
  authorityQueryDTO,
};
