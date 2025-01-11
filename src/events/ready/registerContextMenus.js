require('colors');

const { testServerId } = require('../../config.json');
const getApplicationContextMenus = require('../../utils/getApplicationCommands');
const getLocalContextMenus = require('../../utils/getLocalContextMenus');

module.exports = async(client) => {
  try {
    const localContextMenus = getLocalContextMenus();
    const getApplicationContextMenus = await getApplicationContextMenus(client, testServerId);

    for (const localContextMenu of localContextMenus) {
      const { data } = localContextMenu;

      const {
        name: contextMenuName,
        type: contextMenuType,
      } = data;

      const existingContextMenu  = await getApplicationContextMenus.cache.find(
        (cmd) => cmd.name === contextMenuName
      );

      if (existingContextMenu) {
        if (localContextMenu.deleted) {
          await getApplicationContextMenus.delete(existingContextMenu.id);
          console.log(`[CONTEXT MENUS REGISTERY] Application command ${contextMenuName} has been deleted.`.red);
        } else {
          console.log(`[COMMAND REGISTERY] Application command ${commandName} has been skipped, since property "deleted" is set to "true".`.grey);
        }
      } else if (existingCommand) {
        if (commandComparing(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {name: commandName, description: commandDescription, options: commandOptions});
          console.log(`[COMMAND REGISTERY] Application command ${commandName} has been edited.`.yellow);
        }
      } else {
        await applicationCommands.create({
          name: commandName,
          description: commandDescription,
          options: commandOptions
        });
        console.log(`[COMMAND REGISTERY] Application command ${commandName} has been registered.`.green);
      }
    }
  } catch(error) {
    console.error(`[ERROR] An error occured inside the command registery:\n ${error}`);
  }
}