type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
  [key in Key]: Value;
};

declare namespace defs {
  export namespace iam {
    export class MessageInfo {
      /** 状态码 */
      code?: number;

      /** 數據 */
      data?: object;

      /** 消息 */
      msg?: string;
    }

    export class RescourceDataDTO {
      /** 歸檔編號 */
      achievedNum?: number;

      /** 資源內容 */
      content?: string;

      /** 資源描述 */
      contentDescribe?: string;

      /** 資源名稱 */
      resourceName?: string;

      /** 資源類型 */
      resourceType?: string;

      /** 資源擁有者/建立人工號 */
      useMan?: string;
    }

    export class ResponseMsg<T0 = any> {
      /** 状态码 */
      code?: number;

      /** 返回对象 */
      data?: T0;

      /** 消息信息 */
      msg?: string;
    }

    export class UserAuthorityEntity {
      /** 是否超級管理員 */
      isadmin?: number;

      /** 戶所對應的菜單權限 */
      menuList?: Array<defs.iam.SysMenuEntity>;

      /** 用戶所對應的資源數據信息 */
      userResourceDataList?: Array<defs.iam.RescourceDataEntity>;

      /** 用戶所對應的角色信息 */
      userRoleInforList?: Array<defs.iam.UserRoleInforEntity>;

      /** 暱稱 */
      useralias?: string;

      /** 工號 */
      userid?: string;

      /** 中文名 */
      username?: string;
    }

    export class authorityQueryDTO {
      /** 權限數據（菜單ID，數據資源(ID/Name/Content)） */
      authorityData?: string;

      /** 用戶工號 */
      userId?: string;
    }
  }
}

declare namespace API {
  export namespace iam {
    /**
     * 公共接口
     */
    export namespace common {
      /**
        * 建立數據信息及數據擁有著
建立數據信息及數據擁有著
        * /iam/Common/api/saveRescourceData
        */
      export namespace saveRescourceData {
        export class Params {}

        export type Response = defs.iam.MessageInfo;

        export const init: Response;

        export function request(
          params: Params,
          body: defs.iam.RescourceDataDTO,
          options?: any,
        ): Promise<Response>;
      }

      /**
        * 獲取用戶菜單、資源
根據用戶id查詢用戶權限（用戶、菜單、子功能、數據資源）
        * /iam/Common/queryAuthorityByUserId/{userId}
        */
      export namespace queryAuthorityByUserId {
        export class Params {
          /** 用戶工號 */
          userId: string;
        }

        export type Response = defs.iam.ResponseMsg<
          defs.iam.UserAuthorityEntity
        >;

        export const init: Response;

        export function request(
          params: Params,
          options?: any,
        ): Promise<Response>;
      }

      /**
        * 根據菜單ID，數據資源內容(ID/Name/Content)擁有權限廠區組織查詢（權限菜單(不包含子菜單及功能)/數據信息及廠區組織信息）
根據菜單ID/數據資源內容(ID/Name/Content)查詢是否擁有權限（返回權限菜單(不包含子菜單及功能)/數據信息及廠區組織信息）
        * /iam/Common/queryAuthorityOrganization
        */
      export namespace queryAuthorityOrganization {
        export class Params {}

        export type Response = defs.iam.MessageInfo;

        export const init: Response;

        export function request(
          params: Params,
          body: defs.iam.authorityQueryDTO,
          options?: any,
        ): Promise<Response>;
      }

      /**
        * 根據菜單ID，數據資源內容(ID/Name/Content)查詢是否擁有權限（返回子菜單及功能列表、數據資源信息）
根據菜單ID，數據資源內容(ID/Name/Content)查詢擁有權限（返回子菜單及功能列表、數據資源信息）
        * /iam/Common/queryIsExistAuthority
        */
      export namespace queryIsExistAuthority {
        export class Params {}

        export type Response = defs.iam.MessageInfo;

        export const init: Response;

        export function request(
          params: Params,
          body: defs.iam.authorityQueryDTO,
          options?: any,
        ): Promise<Response>;
      }

      /**
        * 獲取用戶數據資源權限
根據用戶id查詢用戶數據資源權限
        * /iam/Common/queryRescourceDataByUserId/{userId}
        */
      export namespace queryRescourceDataByUserId {
        export class Params {
          /** 用戶工號 */
          userId: string;
        }

        export type Response = defs.iam.MessageInfo;

        export const init: Response;

        export function request(
          params: Params,
          options?: any,
        ): Promise<Response>;
      }
    }
  }
}
