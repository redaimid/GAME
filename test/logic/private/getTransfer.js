const {
    Keyboard
} = require('vk-io')
const keyboards = require('../../addons/keyboards')
const config = require('../../config')
const util = require('../../addons/util')

module.exports = async function (db, vk, context, limits) {
    if (context.isChat) return
    if (context.messagePayload?.command == 'getTransfer') {
        let link = await context.question({
            message: `Укажи ссылку пользователя, которому ты хочешь перевести коины`,
            keyboard: Keyboard.builder()
            .textButton({
                label: `Главное меню`,
                payload: {
                    command: 'mainmenu'
                },
                color: 'negative'
            })
        })

        if(link.text == 'Главное меню') return

        if(link.messagePayload ) return context.send({
            message: `Перевод отменен, мы переместили тебя в главное меню`,
            keyboard: keyboards.main_menu
        })


        if(util.checkLink(link.text) != true ) {
            return context.send({
                message: `Перевод отменен, мы переместили тебя в главное меню`,
                keyboard: keyboards.main_menu
            })
        }
        // Инициализация пользователя 
        var data = link.text.split('com/')
        console.log(data[1])
       await vk.api.users.get({
            user_ids: data[1]
        }).then(async(response) => {
            console.log(response)



            if(!db.playersData[response[0].id]) {
                return context.send({
                    message: `❌ Этот пользователь не зарегистрирован в боте :(`,
                    keyboard: keyboards.main_menu
                })
            }

            // Получаем сумму перевода
            
        let amount = await context.question({
            message: `Введи сумму которую хочешь перевести игроку по имени [id${response[0].id}|${db.playersData[response[0].id].name}]`
        })

        // ? Лимит действий
        if(limits.users.includes(context.senderId)) {
            limits.users.push(context.senderId)
            context.send({
                message: `Что-то пошло не по плану...`,
                keyboard: main_keyboard
            })
            return setTimeout(async() => {
                limits.users.splice(-1, context.senderId)
            }, 250)
        }

        if(amount.text > db.playersData[context.senderId].balance) {
            return context.send({
                message: `У тебя не хватает коинов для перевода`,
                keyboard: keyboards.main_menu
            })
        }
        let colva = ((amount.text.match(/к/g) || []).length);
        amount.text = amount.text.replace(/к/g, '')
        amount.text = amount.text * Math.pow(1000,colva);

        if(amount.text < 1 || isNaN(amount.text)) {
            return context.send({
                message: `Не нужно багать бота <3. Я вернул тебя в главное меню`, 
                keyboard: keyboards.main_menu
            })
        }

        // Делаем перевод
        if(amount.text <= db.playersData[context.senderId].balance) {
            limits.users.push(context.senderId)
            setTimeout(async() => {
                limits.users.splice(-1, context.senderId)
            }, 250)

            db.playersData[context.senderId].balance -= Math.floor(amount.text)
          
          
            db.playersData[response[0].id].balance += Math.floor(amount.text)

            vk.api.messages.send({
                message: `[id${context.senderId}|Игрок] перевел тебе ${util.number_format(amount.text)} коинов`,
                peer_id: response[0].id,
                random_id: util.random(-200000000, 200000000)
            }).catch((err) => {
                console.error(err)
            })
            return context.send({
                message: `✅ Ты успешно перевел [id${response[0].id}|игроку] ${util.number_format(amount.text)} коинов`,
                keyboard: keyboards.main_menu
            })


        }



        }).catch((err) => { 
            console.error(err)
            return context.send({
                message: `Укажите валидную ссылку на пользователя <3`,
                keyboard: keyboards.main_menu
            })
        });






    }


}