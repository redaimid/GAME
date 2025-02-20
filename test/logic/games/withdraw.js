const util = require('../../addons/util')
const config = require('../../config.js')
const axios = require('axios')
async function getBalance() {
    let data = await axios.post('https://coin-without-bugs.vkforms.ru/merchant/score/', {
        merchantId: config.vkCoinId,
        key: config.vkCoinKey,
        userIds: [ config.vkCoinId ]
    })
    console.log(data.data)
    return Math.floor(data.data.response[config.vkCoinId] / 1000)
}


async function getWithdraw(toId, amount) {
    let data = await axios.post('https://coin-without-bugs.vkforms.ru/merchant/send/', {
        merchantId: config.vkCoinId,
        key: config.vkCoinKey,
        toId: Number(toId),
        amount: Math.floor(amount * 1000),
	markAsMerchant: true
    }).then((response) => {
        return {
            status: true
        }
    }).catch((err) => {
        return {
            status: false
        }
    })
    return data
}


module.exports = async function (db, vk, context, limits) {
    if (!context.isChat) return

    if (db.gamesData[context.peerId].convData.isActive == true && context.messagePayload && context.messagePayload.command == 'withdraw') {


         //  return context.send({
           //   message: `${db.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${db.playersData[context.senderId].name}]` : `${db.playersData[context.senderId].name}`}, выводы в боте временно приостановлены.\n\n Причина: Обнаружен баг с выводом, планируется все решить до 22.09.2021 к 15:00 по МСК.\n\n Не беспокойтесь, если вы играли честно, то все ваши балансы будут сохранены. Приносим извинения за неудобства`
           // })

        if (db.playersData[context.senderId].balance <= 0) {
            return context.send({
                message: `${db.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${db.playersData[context.senderId].name}]` : `${db.playersData[context.senderId].name}`}, у вас нету коинов на балансе`
            })
        }

        if(db.playersData[context.senderId].balance > 0) {
let rezerv = await getBalance()
if(db.playersData[context.senderId].balance > db.botSettings.maxWithdraw.currentAmount) {
            return context.send({
                message: `${db.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${db.playersData[context.senderId].name}]` : `${db.playersData[context.senderId].name}`}, на балансе бота недостаточно коинов. Ожидайте пополнения`
            })
}

if(db.playersData[context.senderId].balance > rezerv) {
            return context.send({
                message: `${db.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${db.playersData[context.senderId].name}]` : `${db.playersData[context.senderId].name}`}, на балансе бота недостаточно коинов. Ожидайте пополнения`
            })
}
        // Ограничение действий
        if (limits.users.includes(context.senderId)) {
            limits.users.push(context.senderId)
            console.log('лимит')
            return setTimeout(async () => {
                limits.users.splice(-1, context.senderId)
            }, 3500)
        }
        limits.users.push(context.senderId)
        console.log('123')
        setTimeout(async () => {
            limits.users.splice(-1, context.senderId)
        }, 3500)

	



            // Обновляем баланс
            let saveBalance = Number(db.playersData[context.senderId].balance)
            db.playersData[context.senderId].balance = 0
db.botSettings.maxWithdraw.currentAmount -= Math.floor(saveBalance)
            let withDraw = await getWithdraw(context.senderId, saveBalance)
            if(withDraw.status == false) {
                db.playersData[context.senderId].balance = saveBalance
                return context.send({
                    message: `${db.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${db.playersData[context.senderId].name}]` : `${db.playersData[context.senderId].name}`}, произошла ошибка. Попробуйте еще раз`
                })
            }
            if(withDraw.status == true) {
                 context.send({
                    message: `${db.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${db.playersData[context.senderId].name}]` : `${db.playersData[context.senderId].name}`}, выведено ${util.number_format(saveBalance)}`
                })
                        for( i in config.globalAdmins) {
                        vk.api.messages.send({
                            message: `🔥 [id${context.senderId}|Пользователь] вывел ${util.number_format(saveBalance)} VkCoin.`,
                            peer_id: config.globalAdmins[i],
                            random_id: util.random(-2000000000, 2000000000)
                        }).catch((err) => {
                            console.error('VK API Error: ', err)
                        })
                    }
return 
            }
            
        }




    }

}