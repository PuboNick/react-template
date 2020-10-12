import { StandardDataSource } from 'pont-engine';

// iam 接口模块白名单
const iamFilterModsName = ['common'];

export default function(dataSource: StandardDataSource): StandardDataSource {
  dataSource.mods.forEach(item => {
    item.interfaces.forEach(mod => {
      mod.path = '/' + dataSource.name + mod.path;
    });
  });

  if (dataSource.name === 'iam') {
    let { mods, baseClasses } = filterModsAndBaseClass(
      iamFilterModsName,
      dataSource,
    );
    dataSource.mods = mods;
    dataSource.baseClasses = baseClasses;
  }
  return dataSource;
}

/**
 * 过滤mod及所依赖的baseClass
 * @param filterMods Mod.name数组
 * @param data StandardDataSource
 */
function filterModsAndBaseClass(
  filterMods: string[],
  data: StandardDataSource,
) {
  let mods = data.mods.filter(mod => {
    return filterMods.includes(mod.name);
  });
  let typeNames: any = JSON.stringify(mods).match(/"typeName":".+?"/g);
  typeNames = Array.from(new Set(typeNames)).map((item: any) =>
    item.split(':')[1].replace(/\"/g, ''),
  );
  let baseClasses = data.baseClasses.filter(cls =>
    typeNames.includes(cls.name),
  );

  return { mods, baseClasses };
}
