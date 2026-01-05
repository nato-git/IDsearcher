import * as server from '@minecraft/server';

server.system.runInterval(() => {
  //プレイヤー取得
  for (const player of server.world.getAllPlayers()) {
    //インベントリの取得
    const inventory = player.getComponent('inventory').container;
    //インベントリスロットを確認
    for (let i = 0; i < inventory.size; i++) {
      //スロットのアイテム
      const selectItem = inventory.getItem(i);
      //アイテムがない場合スキップ
      if (!selectItem) {
        continue;
      }
      //ある場合
      else {
        //アイテムid
        const selectItemId = [selectItem.typeId];
        //耐久値取得
        const selectItemData = selectItem.getComponent('durability');
        //耐久値がある場合
        if (selectItemData) {
          //現耐久値
          const currentHP =
            selectItemData.maxDurability - selectItemData.damage;
          //表示テキスト
          const dataString = `Durability: ${currentHP}/${selectItemData.maxDurability}`;
          selectItemId.push(dataString);
        }
        //説明欄にセット
        selectItem.setLore(selectItemId);
        inventory.setItem(i, selectItem);
      }
    }
  }
}, 10);
