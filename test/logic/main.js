const keyboards = require('../addons/keyboards')
module.exports = async function(db, config, vk, context, limits) {
	
    require('./game')(db, config, vk, context)

    // Кланы
    require('./clans/clansTop')  (db, vk, context, limits)
    require('./clans/clansGet') (db, vk, context, limits)
    require('./clans/clansCreate') (db, vk, context, limits)

    // Частные беседы
    require('./chatControl/convBuy') (db, vk, context, limits)


    // Общие игровые команды
    require('./games/bank') (db, vk, context, limits)
    require('./games/balance') (db, vk, context, limits)
    require('./games/withdraw') (db, vk, context, limits)

    // Dice 
    require('./games/dice/even') (db, vk, context, limits)
    require('./games/dice/noteven') (db, vk, context, limits)
    require('./games/dice/one') (db, vk, context, limits)
    require('./games/dice/two') (db, vk, context, limits)
    require('./games/dice/three') (db, vk, context, limits)
    require('./games/dice/four') (db, vk, context, limits)
    require('./games/dice/five') (db, vk, context, limits)
    require('./games/dice/six') (db, vk, context, limits)

    // Double 
    require('./games/double/x2') (db, vk, context, limits)
    require('./games/double/x3') (db, vk, context, limits)
    require('./games/double/x5') (db, vk, context, limits)
    require('./games/double/x50') (db, vk, context, limits)

    // Dream Catcher 
    require('./games/dreamcatcher/x1') (db, vk, context, limits)
    require('./games/dreamcatcher/x2') (db, vk, context, limits)
    require('./games/dreamcatcher/x5') (db, vk, context, limits)
    require('./games/dreamcatcher/x10') (db, vk, context, limits)
    require('./games/dreamcatcher/x20') (db, vk, context, limits)
    require('./games/dreamcatcher/x40') (db, vk, context, limits)

    // Down7Up
    require('./games/down7up/down') (db, vk, context, limits)
    require('./games/down7up/seven') (db, vk, context, limits)
    require('./games/down7up/up') (db, vk, context, limits)

    // Wheel
    require('./games/wheel/red') (db, vk, context, limits)
    require('./games/wheel/black') (db, vk, context, limits)
    require('./games/wheel/even') (db, vk, context, limits)
    require('./games/wheel/noteven') (db, vk, context, limits)
    require('./games/wheel/int112') (db, vk, context, limits)
    require('./games/wheel/int1324') (db, vk, context, limits)
    require('./games/wheel/int2536') (db, vk, context, limits)
    require('./games/wheel/numbers') (db, vk, context, limits)

    // Crash
    require('./games/crash/crash.js') (db, vk, context, limits)
    require('./admin') (db, vk, context, limits)
    // ! Виртуальные ставки
    // require('./games/virtualPlay/virtualMain.js') (db, vk, context, limits)
}