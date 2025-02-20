const { Keyboard, NewAttachmentsContext } = require('vk-io')
const keyboards = require('../../addons/keyboards')
const util = require('../../addons/util')

module.exports = async function(db, vk, context, limits) {
    if(context.messagePayload && !context.isChat) {
        if(context.messagePayload.command == 'settings_ChangeName') {
            setTimeout(async function changeName() {
                    let name = await context.question({
                        message: `Введи новое имя:\n(не более 15-ти символов)\nСтоимость: 5 000 000 коинов`,
                        keyboard: Keyboard.builder()
                        .textButton({
                            label: `Отменить`,
                            color: 'negative',
                            payload: {
                                command: "changeCancel"
                            }
                        })
                    })
              if(!name.text) {
                        context.send(`Нельзя так делать :3`)
                        return changeName()
                    }
                    if(name.text < 1 || name.text > 15) {
                        context.send(`Имя не может быть короче 1 и длинее 15 символов`)
                        return changeName()
                    }
                    if(name.messagePayload) {
                        return context.send({
                            message: `Вы отменили смену ника`,
                            keyboard: keyboards.main_menu
                        })
                    }

                    if(db.playersData[context.senderId].balance < 5000000) {
                        context.send(`Недостаточно средств для смены ника`)
                        return changeName()
                    }
                    if(util.checkLink(name.text) == true) {
                        context.send(`Имя не может быть ссылкой`)
                        return changeName()
                    }


                    if(db.playersData[context.senderId].balance >= 5000000) {
                        db.playersData[context.senderId].balance -= Number(5000000)
                        db.playersData[context.senderId].name = name.text
                        return context.send({
                            message: `Вы сменили имя на "${name.text}"`,
                            keyboard: keyboards.main_menu
                        })
                    }

            })


        }
    }
}