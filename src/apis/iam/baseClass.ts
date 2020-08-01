class MessageInfo {
  /** 状态码 */
  code = undefined;

  /** 數據 */
  data = undefined;

  /** 消息 */
  msg = '';
}

class authorityQueryDTO {
  /** 權限數據（菜單ID，數據資源(ID/Name/Content)） */
  authorityData = '';

  /** 用戶工號 */
  userId = '';
}

export const iam = {
  MessageInfo,
  authorityQueryDTO,
};
