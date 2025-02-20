const {
    Keyboard
} = require('vk-io')
const config = require('../../config')
const util = require('../../addons/util')

module.exports = async function (db, vk, context, limits) {
    if (context.messagePayload && !context.isChat) {
        if (context.messagePayload.command == 'getDayTop') {
            let top = []
            let topme = []
            let my = 0
            for (let i in db.playersData) { // перебор базы данных
                top.push({
                    id: db.playersData[i].id,
                    name: db.playersData[i].name,
                    win: db.playersData[i].userStatistics.winDay // создание массива

                })
            }
            const find = () => {
                let pos = 1000;

                for (let i = 0; i < top.length; i++) {
                    if (top[i].id === context.senderId) return pos = i;
                }
                return pos;
            }

            top.sort(function (a, b) {
                if (b.win > a.win) return 1
                if (b.win < a.win) return -1
                return 0
            }); //Сортировка

            let text = ""
            for (let s = 0; s < top.length; s++) {
                topme.push(top[s].id)
            }

            if (top.length < 10) {
                for (let j = 0; j < top.length; j++) {
                    my += Number(1)
                    text += `${my}. [id${db.playersData[top[j].id].id}|${db.playersData[top[j].id].name}] выиграл ${util.number_format(top[j].win)} коинов (Награда: ${util.shortnum(db.botSettings.topSettings.dayTop.amount[my - 1])})\n`
                }

            } else {
                for (let j = 0; j < 10; j++) {
                    my += Number(1)
                    text += `${my}. [id${db.playersData[top[j].id].id}|${db.playersData[top[j].id].name}] выиграл ${util.number_format(top[j].win)} коинов (Награда: ${util.shortnum(db.botSettings.topSettings.dayTop.amount[my - 1])})\n`
                }
            }


            return context.send({
                message: `🔥 ТОП 10 игроков за сегодня:\n\n${text}\n\n🏆 Ты находишься на ${find() + 1} месте, выиграв ${util.number_format(db.playersData[context.senderId].userStatistics.winDay)} коинов за сегодня\nВыдача наград в 00:00 по МСК`
            })



        }
    }

}