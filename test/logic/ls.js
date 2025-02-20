const keyboards = require('../addons/keyboards')

module.exports = async function(db, config, vk, context, limits) {

    require('./private/getMarket') (db, vk, context, limits)

    require('./private/getAllTimeTop') (db, vk, context, limits)
    require('./private/getDayTop') (db, vk, context, limits)
    require('./private/getTransfer') (db, vk, context, limits)

    require('./private/changeName') (db, vk, context, limits)
    require('./private/getKonkursTop') (db, vk, context, limits)
    require('./private/gamesList') (db, vk, context, limits)
    require('./private/getSettings') (db, vk, context, limits)

    // Админка
   require('./admin') (db, vk, context, limits)
    require('./admin/main.js') (db, vk, context, limits)
}