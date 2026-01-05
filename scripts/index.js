import * as server from '@minecraft/server';

server.system.runInterval(() => {
  for (const player of server.world.getAllPlayers()) {
    const inventory = player.getComponent('inventory').container;
    const selectItem = inventory.getItem(player.selectedSlotIndex);
    if (!selectItem) {
      return;
    } else {
      selectItem.setLore(selectItem.typeId);
      inventory.setItem(player.selectedSlotIndex, selectItem);
    }
  }
}, 10);
