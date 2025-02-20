const { Keyboard } = require('vk-io')

module.exports = async function(db, vk, context, limits) {
    if(context.messagePayload && !context.isChat) {
                    if(context.messagePayload.command == 'gamesList') {
                        if(db.playersData[context.senderId].userData.privateSettings.allowNewGamesList != true) {
                        return context.send({
                            message: `Выбирай режим :3`,
                            keyboard: Keyboard.builder()
                       .textButton({ label: `Dream Catcher`, payload: { command: 'gamesList_dreamcatcher'}, color: 'secondary'}).row()
                           
                        .textButton({ label: `Wheel`, payload: { command: 'gamesList_wheel'}, color: 'secondary'})
                        .textButton({ label: `Dice`, payload: { command: 'gamesList_dice'}, color: 'secondary'}).row()

                    .textButton({ label: `Down7Up`, payload: { command: 'gamesList_down7up'}, color: 'secondary'})
                    .textButton({ label: `Double`, payload: { command: 'gamesList_double'}, color: 'secondary'}).row()
                    .textButton({ label: `Crash`, payload: { command: 'gamesList_crash'}, color: 'secondary'}).row()

                    .inline()
                        })
                    }

            }

            // Crash
            if(context.messagePayload.command == 'gamesList_crash') {
                return context.send({
                    message: `Заходи в беседу: https://vk.me/join/Z7IvQI22TDDsfdqs/xqXaNMEwcXmUwDwK6E=`
                })
            }


            // Double link
            if(context.messagePayload.command == 'gamesList_double') {
                return context.send({
                    message: `Заходи в беседу: https://vk.me/join/_G5RQyF11eJ1Lq4/ozo/2VlF_jhAX8NhIdA=`
                })
            }
            if(context.messagePayload.command == 'gamesList_wheel') {
                return context.send({
                    message: `Заходи в беседу: https://vk.me/join/wh4F4_qiisp0ZfSE9/W0rbYKwuluYBnW8Fo=`
                })
            }
            // Dream Catcher

            if(context.messagePayload.command == 'gamesList_dreamcatcher') {
                return context.send({
                    message: `Заходи в беседу: https://vk.me/join/NpTQeMVMJWn4vdpz5mu76jpfev8kxleFlK0=`
                })
            }

            // DIce
            if(context.messagePayload.command == 'gamesList_dice') {
                return context.send({
                    message: `Заходи в беседу: https://vk.me/join/2MF/la3tF3sI_afF/oNhONCCYrN8dOXB5iM=`
                })
            }
            if(context.messagePayload.command == 'gamesList_down7up') {
                return context.send({
                    message: `Заходи в беседу: https://vk.me/join/4SYZeGgpKcGdNik_qW1EQP/ROuLGS8OmL8s=`
                })
            }
    }
}