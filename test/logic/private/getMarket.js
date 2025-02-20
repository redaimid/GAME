const {
    Keyboard
} = require('vk-io')
const config = require('../../config.js')
const util = require('../../addons/util')

module.exports = async function (db, vk, context, limits) {
    if (context.messagePayload && !context.isChat) {
        if (context.messagePayload.command == 'getMarket') {

            return context.send({
                message: `Что хочешь купить?`,
                keyboard: Keyboard.builder()
                    .textButton({
                        label: `Бонусные коины`,
                        payload: {
                            command: `marketBuy_BonusCoin`
                        }
                    })

                    .row()
                    .textButton({
                        label: `Главное меню`,
                        payload: {
                            command: 'mainmenu'
                        },
                        color: `negative`
                    })
            })

        }




        // Покупка бонусных коинов


        if (context.messagePayload.command == 'marketBuy_BonusCoin') {

            // Ссылка на юмани
            
            // Ссылка на кексик
            let donutsLink = await vk.api.utils.getShortLink({
                url: `https://vk.com/app6887721_-${config.botPollingGroupId}#donate_null&op_100`,
                private: 0
            })

            return context.send({
                message: `💬 Бонусные коины выгоднее обычных на 10%, но вывести их нельзя\n💬 Однако при выигрыше они переходят на основной баланс\n\n🔥 Курс продажи бонусных коинов: 5.2 ₽ за 1 000 000\n\n🚀 Для авто-оплаты используй данную ссылку:\n${donutsLink.short_url}`
            })
        }
        if (context.messagePayload.command == 'marketBuy_VirtualCoin') {

            // Ссылка на юмани
            
            // Ссылка на кексик
            let donutsLink = await vk.api.utils.getShortLink({
                url: `https://vk.com/app6887721_-${config.botPollingGroupId}#donate_null&op_200`,
                private: 0
            })

            return context.send({
                message: `🔥 Курс продажи ${config.botVirtualCurrency}: 2.6 ₽ за 1 000 000\n\n🚀 Для авто-оплаты используй данную ссылку:\n${donutsLink.short_url}`
            })
        }

    }
}
