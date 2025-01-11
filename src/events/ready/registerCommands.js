require('colors');

const { testServerId } = require('../../config.json');
const commandComparing = require('../../utils/commandComparing');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async(client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(client)//, testServerId);

    for (const localCommand of localCommands) {
      const {data} = localCommand;
      const {
        name: commandName,
        description: commandDescription,
        options: commandOptions
      } = data;

      const existingCommand  = await applicationCommands.cache.find(
        (cmd) => cmd.name === commandName
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`[COMMAND REGISTERY] Application command ${commandName} has been deleted.`.red);
          continue;
        };

        if (commandComparing(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {name: commandName, description: commandDescription, options: commandOptions});
          console.log(`[COMMAND REGISTERY] Application command ${commandName} has been edited.`.yellow);
        };
      } else {
        if (localCommand.deleted) {
          console.log(`[COMMAND REGISTERY] Application command ${commandName} has been skipped, since property "deleted" is set to "true".`.grey)
          continue;
        }

        await applicationCommands.create({
          name: commandName,
          description: commandDescription,
          options: commandOptions
        });
        console.log(`[COMMAND REGISTERY] Application command ${commandName} has been registered.`.green);
      };
    };
  } catch(e) {
    console.error(`[ERROR] An error occured inside the command registery:\n ${e}`);
  }
}