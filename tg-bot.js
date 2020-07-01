// TODO: сделать модуль для вывода погоды в в городе city по запросу /weather city. Получение погоды реализовать отдельным модулем
// TODO: сначала получим погоду только в Киеве на /weather


const Telegraf = require('telegraf');
const fs = require('fs');
const weather = require('./weather/');

const token = '739553446:AAHHi4szgm7Q1dvu8_CPJx2-5PhJDZ1t_DI';

const bot = new Telegraf(token);
bot.start((ctx) => ctx.reply('Welcome!'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.hears('/test', (ctx) => {
    console.log('test received');
    console.log(ctx.update.message.chat.id);
    ctx.reply('Hey there');
    fs.writeFile('context.json', JSON.stringify(ctx, null, 2), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

});
bot.hears('/weather', async (ctx) => {
    ctx.reply(await weather());
});
bot.hears(/\/weather (.+)/, async (ctx) => {
    console.log(ctx.match[1]);
    ctx.reply(await weather(ctx.match[1]));
});
bot.launch();
