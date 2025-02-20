const {
    Keyboard
} = require('vk-io')
const util = require('../../addons/util.js')
const config = require('../../config.js')
const keyboards = require('../../addons/keyboards')

module.exports = async function (db, vk, context, limits) {

    if (context.messagePayload) {
        // Показ меню вывода
        if (context.messagePayload.command == 'withdrawPrizeBalance') {
            if (db.playersData[context.senderId].prizeBalance > 0) {
                return context.send({
                    message: `Привет, победитель! Выбери, куда хочешь получить свой выигрыш :3`,
                    keyboard: Keyboard.builder()
                        .textButton({
                            label: `🔥 Обменять на коины`,
                            payload: {
                                command: `withdrawPrizeBalance_ChangeOnCoin`
                            },
                            color: 'positive'
                        }).row()
                        .textButton({
                            label: `QIWI`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        })
                        .textButton({
                            label: `YooMoney`,
                            payload: {
                                command: 'withdrawPrizeBalance_YooMoney'
                            }
                        }).row()
                        .textButton({
                            label: `На карту`,
                            payload: {
                                command: 'withdrawPrizeBalance_Card'
                            }
                        })
                        .textButton({
                            label: `В VKCoin`,
                            payload: {
                                command: 'withdrawPrizeBalance_VKCoin'
                            }
                        }).row()
                        .textButton({
                            label: `Главное меню`,
                            payload: {
                                command: "mainmenu"
                            },
                            color: 'negative'
                        })
                })


            }
        }
        // Обмен рублей на игровые коины
        if (context.messagePayload.command == 'withdrawPrizeBalance_ChangeOnCoin') {
            if (db.playersData[context.senderId].prizeBalance <= 0) return
            let confirm = await context.question({
                message: `Ты действительно хочешь обменять ${db.playersData[context.senderId].prizeBalance}р на ${util.number_format(db.playersData[context.senderId].prizeBalance * 1000)} коинов?`,
                keyboard: Keyboard.builder()
                    .textButton({
                        label: `Да, уверен`,
                        color: 'positive'
                    }).row()
                    .textButton({
                        label: `Нет, отмена`,
                        color: 'negative'
                    })
            })
            if (confirm.text != 'Да, уверен') {
                return context.send({
                    message: `Операция отменена`,
                    keyboard: Keyboard.builder()
                        .textButton({
                            label: `🔥 Обменять на коины`,
                            payload: {
                                command: `withdrawPrizeBalance_ChangeOnCoin`
                            },
                            color: 'positive'
                        }).row()
                        .textButton({
                            label: `QIWI`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        })
                        .textButton({
                            label: `YooMoney`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        }).row()
                        .textButton({
                            label: `На карту`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        })
                        .textButton({
                            label: `В VKCoin`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        }).row()
                        .textButton({
                            label: `Главное меню`,
                            payload: {
                                command: "mainmenu"
                            },
                            color: 'negative'
                        })
                })
            }
            // Ограничение действий
            if (limits.users.includes(context.senderId)) {
                limits.push(context.senderId)
                return setTimeout(async () => {
                    limits.users.splice(-1, context.senderId)
                }, 500)
            }
            limits.users.push(context.senderId)
            setTimeout(async () => {
                limits.users.splice(-1, context.senderId)
            }, 500)

            let colvo = db.playersData[context.senderId].prizeBalance
            db.playersData[context.senderId].balance += Math.floor(db.playersData[context.senderId].prizeBalance * 1000)
            db.playersData[context.senderId].prizeBalance = 0
            return context.send({
                message: `Ты успешно обменял ${colvo}р на ${util.number_format(colvo * 1000)}. Приятных тебе игр!`,
                keyboard: keyboards.main_menu
            })

        }

        // Вывод на QIWI
        if (context.messagePayload.command == 'withdrawPrizeBalance_Qiwi') {
            if (db.playersData[context.senderId].prizeBalance <= 0) return
            if (db.playersData[context.senderId].userData.bankData.qiwi == null) {
                return context.send({
                    message: `У вас не указан номер QIWI Кошелька\nУказать свои реквизиты можно в меню "Настройки"`
                })
            }


            let confirm = await context.question({
                message: `Ты действительно хочешь вывести ${db.playersData[context.senderId].prizeBalance}р на QIWI Кошелек ${db.playersData[context.senderId].userData.bankData.qiwi}?`,
                keyboard: Keyboard.builder()
                    .textButton({
                        label: `Да, уверен`,
                        color: 'positive'
                    }).row()
                    .textButton({
                        label: `Нет, отмена`,
                        color: 'negative'
                    })
            })
            if (confirm.text != 'Да, уверен') {
                return context.send({
                    message: `Операция отменена`,
                    keyboard: Keyboard.builder()
                        .textButton({
                            label: `🔥 Обменять на коины`,
                            payload: {
                                command: `withdrawPrizeBalance_ChangeOnCoin`
                            },
                            color: 'positive'
                        }).row()
                        .textButton({
                            label: `QIWI`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        })
                        .textButton({
                            label: `YooMoney`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        }).row()
                        .textButton({
                            label: `На карту`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        })
                        .textButton({
                            label: `В VKCoin`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        }).row()
                        .textButton({
                            label: `Главное меню`,
                            payload: {
                                command: "mainmenu"
                            },
                            color: 'negative'
                        })
                })
            }
            // Ограничение действий
            if (limits.users.includes(context.senderId)) {
                limits.push(context.senderId)
                return setTimeout(async () => {
                    limits.users.splice(-1, context.senderId)
                }, 500)
            }
            limits.users.push(context.senderId)
            setTimeout(async () => {
                limits.users.splice(-1, context.senderId)
            }, 500)


            vk.api.messages.send({
                peer_id: config.admin,
                message: `[id${context.senderId}|Игрок] запросил выплату ${db.playersData[context.senderId].prizeBalance}р на QIWI Кошелек ${db.playersData[context.senderId].userData.bankData.qiwi}`,
                random_id: util.random(-200000000, 200000000)
            })
            db.playersData[context.senderId].prizeBalance = 0

            return context.send({
                message: `Заявка на QIWI вывод создана!\nОжидай появления своих средств у себя на кошельке :3`,
                keyboard: keyboards.main_menu
            })

        }

        // Вывод на YooMoney
        if (context.messagePayload.command == 'withdrawPrizeBalance_YooMoney') {
            if (db.playersData[context.senderId].prizeBalance <= 0) return
            if (db.playersData[context.senderId].userData.bankData.YooMoney == null) {
                return context.send({
                    message: `У вас не указан номер YooMoney Кошелька\nУказать свои реквизиты можно в меню "Настройки"`
                })
            }


            let confirm = await context.question({
                message: `Ты действительно хочешь вывести ${db.playersData[context.senderId].prizeBalance}р на YooMoney Кошелек ${db.playersData[context.senderId].userData.bankData.qiwi}?`,
                keyboard: Keyboard.builder()
                    .textButton({
                        label: `Да, уверен`,
                        color: 'positive'
                    }).row()
                    .textButton({
                        label: `Нет, отмена`,
                        color: 'negative'
                    })
            })
            if (confirm.text != 'Да, уверен') {
                return context.send({
                    message: `Операция отменена`,
                    keyboard: Keyboard.builder()
                        .textButton({
                            label: `🔥 Обменять на коины`,
                            payload: {
                                command: `withdrawPrizeBalance_ChangeOnCoin`
                            },
                            color: 'positive'
                        }).row()
                        .textButton({
                            label: `QIWI`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        })
                        .textButton({
                            label: `YooMoney`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        }).row()
                        .textButton({
                            label: `На карту`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        })
                        .textButton({
                            label: `В VKCoin`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        }).row()
                        .textButton({
                            label: `Главное меню`,
                            payload: {
                                command: "mainmenu"
                            },
                            color: 'negative'
                        })
                })
            }
            // Ограничение действий
            if (limits.users.includes(context.senderId)) {
                limits.push(context.senderId)
                return setTimeout(async () => {
                    limits.users.splice(-1, context.senderId)
                }, 500)
            }
            limits.users.push(context.senderId)
            setTimeout(async () => {
                limits.users.splice(-1, context.senderId)
            }, 500)


            vk.api.messages.send({
                peer_id: config.admin,
                message: `[id${context.senderId}|Игрок] запросил выплату ${db.playersData[context.senderId].prizeBalance}р на YooMoney Кошелек ${db.playersData[context.senderId].userData.bankData.qiwi}`,
                random_id: util.random(-200000000, 200000000)
            })
            db.playersData[context.senderId].prizeBalance = 0

            return context.send({
                message: `Заявка на YooMoney вывод создана!\nОжидай появления своих средств у себя на кошельке :3`,
                keyboard: keyboards.main_menu
            })

        }

        // Вывод на Карту
        if (context.messagePayload.command == 'withdrawPrizeBalance_Card') {
            if (db.playersData[context.senderId].prizeBalance <= 0) return
            if (db.playersData[context.senderId].userData.bankData.Card == null) {
                return context.send({
                    message: `У вас не указан номер карты\nУказать свои реквизиты можно в меню "Настройки"`
                })
            }


            let confirm = await context.question({
                message: `Ты действительно хочешь вывести ${db.playersData[context.senderId].prizeBalance}р на карту ${db.playersData[context.senderId].userData.bankData.qiwi}?`,
                keyboard: Keyboard.builder()
                    .textButton({
                        label: `Да, уверен`,
                        color: 'positive'
                    }).row()
                    .textButton({
                        label: `Нет, отмена`,
                        color: 'negative'
                    })
            })
            if (confirm.text != 'Да, уверен') {
                return context.send({
                    message: `Операция отменена`,
                    keyboard: Keyboard.builder()
                        .textButton({
                            label: `🔥 Обменять на коины`,
                            payload: {
                                command: `withdrawPrizeBalance_ChangeOnCoin`
                            },
                            color: 'positive'
                        }).row()
                        .textButton({
                            label: `QIWI`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        })
                        .textButton({
                            label: `YooMoney`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        }).row()
                        .textButton({
                            label: `На карту`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        })
                        .textButton({
                            label: `В VKCoin`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        }).row()
                        .textButton({
                            label: `Главное меню`,
                            payload: {
                                command: "mainmenu"
                            },
                            color: 'negative'
                        })
                })
            }
            // Ограничение действий
            if (limits.users.includes(context.senderId)) {
                limits.push(context.senderId)
                return setTimeout(async () => {
                    limits.users.splice(-1, context.senderId)
                }, 500)
            }
            limits.users.push(context.senderId)
            setTimeout(async () => {
                limits.users.splice(-1, context.senderId)
            }, 500)


            vk.api.messages.send({
                peer_id: config.admin,
                message: `[id${context.senderId}|Игрок] запросил выплату ${db.playersData[context.senderId].prizeBalance}р на карту ${db.playersData[context.senderId].userData.bankData.qiwi}`,
                random_id: util.random(-200000000, 200000000)
            })
            db.playersData[context.senderId].prizeBalance = 0

            return context.send({
                message: `Заявка вывода на карту создана!\nОжидай появления своих средств у себя на кошельке :3`,
                keyboard: keyboards.main_menu
            })

        }

        // Вывод на VKCoin
        if (context.messagePayload.command == 'withdrawPrizeBalance_VKCoin') {
            if (db.playersData[context.senderId].prizeBalance <= 0) return


            let confirm = await context.question({
                message: `Ты действительно хочешь вывести ${db.playersData[context.senderId].prizeBalance}р в VKCoin?`,
                keyboard: Keyboard.builder()
                    .textButton({
                        label: `Да, уверен`,
                        color: 'positive'
                    }).row()
                    .textButton({
                        label: `Нет, отмена`,
                        color: 'negative'
                    })
            })
            if (confirm.text != 'Да, уверен') {
                return context.send({
                    message: `Операция отменена`,
                    keyboard: Keyboard.builder()
                        .textButton({
                            label: `🔥 Обменять на коины`,
                            payload: {
                                command: `withdrawPrizeBalance_ChangeOnCoin`
                            },
                            color: 'positive'
                        }).row()
                        .textButton({
                            label: `QIWI`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        })
                        .textButton({
                            label: `YooMoney`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        }).row()
                        .textButton({
                            label: `На карту`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        })
                        .textButton({
                            label: `В VKCoin`,
                            payload: {
                                command: 'withdrawPrizeBalance_Qiwi'
                            }
                        }).row()
                        .textButton({
                            label: `Главное меню`,
                            payload: {
                                command: "mainmenu"
                            },
                            color: 'negative'
                        })
                })
            }
            // Ограничение действий
            if (limits.users.includes(context.senderId)) {
                limits.push(context.senderId)
                return setTimeout(async () => {
                    limits.users.splice(-1, context.senderId)
                }, 500)
            }
            limits.users.push(context.senderId)
            setTimeout(async () => {
                limits.users.splice(-1, context.senderId)
            }, 500)


            vk.api.messages.send({
                peer_id: config.admin,
                message: `[id${context.senderId}|Игрок] запросил выплату ${db.playersData[context.senderId].prizeBalance}р в VKCoin ${db.playersData[context.senderId].userData.bankData.qiwi}`,
                random_id: util.random(-200000000, 200000000)
            })
            db.playersData[context.senderId].prizeBalance = 0

            return context.send({
                message: `Заявка на вывод создана!\nОжидай появления своих средств у себя на кошельке :3`,
                keyboard: keyboards.main_menu
            })

        }
    }
}