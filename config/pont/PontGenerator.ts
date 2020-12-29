/**
 * pont 生成文件模板
 */
import { Interface, BaseClass, Property, CodeGenerator } from 'pont-engine';

export default class PontGenerator extends CodeGenerator {
  getInterfaceContentInDeclaration(inter: Interface) {
    const requestParams = inter.getRequestParams();
    const paramsCode = inter.getParamsCode('Params');

    return `
      export ${paramsCode}

      export type Response = ${inter.responseType}

      export const init: Response;

      export function request(${requestParams}): Promise<Response>;
    `;
  }

  getBaseClassInDeclaration(base: BaseClass) {
    const originProps = base.properties;

    base.properties = base.properties.map(prop => {
      return new Property({
        ...prop,
        required: false,
      });
    });

    const result = super.getBaseClassInDeclaration(base);
    base.properties = originProps;

    return result;
  }

  getInterfaceContent(inter: Interface) {
    const method = inter.method.toUpperCase();
    const requestParams = inter.getRequestParams(this.surrounding);
    const paramsCode = inter.getParamsCode('Params', this.surrounding);
    const pathParams = inter.parameters.filter(item => item.in === 'path');
    let path = inter.path;
    pathParams.forEach(item => (path += `/\$\{params.${item.name}\}`));
    if (pathParams.length > 0) {
      path = '`' + path + '`';
    } else {
      path = '"' + path + '"';
    }

    return `
    /**
     * @desc ${inter.description}
     */

    import * as defs from '../../baseClass';
    import { PontCore } from '../../pontCore';

    export ${paramsCode}

    export const init = ${inter.response.getInitialValue()};

    export function request(${requestParams}) {
      return PontCore.fetch(PontCore.getUrl(${path}, params, "${method}"), ${inter.getRequestContent()});
    }
  `;
  }
}
