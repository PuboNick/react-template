type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
  [key in Key]: Value;
};

declare namespace iam {
  export class authorityQueryDTO {
    /** 權限數據（菜單ID，數據資源(ID/Name/Content)） */
    authorityData?: string;

    /** 用戶工號 */
    userId?: string;
  }
}
