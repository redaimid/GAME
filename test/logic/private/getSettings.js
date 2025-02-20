const { Keyboard } = require('vk-io')
const config = require('../../config')
module.exports = async function(db, vk, context, limits) {
    if(context.messagePayload && !context.isChat) {
        if(context.messagePayload.command == 'getSettings') {






            return context.send({
                message: `Держи настройки :3`,
                keyboard: Keyboard.keyboard([
 
                    [
                        Keyboard.textButton({ label: `Кнопки ставок`, payload: { command: 'allowInlineButtons'}, color:  db.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true ? 'positive' : 'negative' }),
                        Keyboard.textButton({ label: `Рассылка`, payload: { command: `allowNewsMessage` }, color: db.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Упоминания от бота`, payload: { command: `allowCallNickname` }, color: db.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Сменить имя`, payload: { command: "settings_ChangeName"} , color: 'positive'})
                    ],
                    [
               
                    ],
            
                    [
                        Keyboard.textButton({ label: `Меню`, payload: { command: 'mainmenu' }, color: 'primary' }),
                    ]
            
                ])
            })
        }

        // Управление рассылкой
        if(context.messagePayload.command == 'allowNewsMessage') {
            let text = null
            if(db.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true) {
                db.playersData[context.senderId].userData.globalSettings.allowNewsMessage = false 
                return context.send({
                    message: `Вы отписались от новостной рассылки ${config.botName}`,
                    keyboard: Keyboard.keyboard([
 
                    [
                        Keyboard.textButton({ label: `Кнопки ставок`, payload: { command: 'allowInlineButtons'}, color:  db.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true ? 'positive' : 'negative' }),
                        Keyboard.textButton({ label: `Рассылка`, payload: { command: `allowNewsMessage` }, color: db.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Упоминания от бота`, payload: { command: `allowCallNickname` }, color: db.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Сменить имя`, payload: { command: "settings_ChangeName"} , color: 'positive'})

                    ],
                    [
               
                    ],
            
                    [
                        Keyboard.textButton({ label: `Меню`, payload: { command: 'mainmenu' }, color: 'primary' }),
                    ]
            
                ])
                })
            }
            if(db.playersData[context.senderId].userData.globalSettings.allowNewsMessage == false) {
                db.playersData[context.senderId].userData.globalSettings.allowNewsMessage = true 
                return context.send({
                    message: `Вы подписались на новостную рассылку ${config.botName}`,
                    keyboard: Keyboard.keyboard([
 
                    [
                        Keyboard.textButton({ label: `Кнопки ставок`, payload: { command: 'allowInlineButtons'}, color:  db.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true ? 'positive' : 'negative' }),
                        Keyboard.textButton({ label: `Рассылка`, payload: { command: `allowNewsMessage` }, color: db.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Упоминания от бота`, payload: { command: `allowCallNickname` }, color: db.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Сменить имя`, payload: { command: "settings_ChangeName" } , color: 'positive'})

                    ],
                    [
               
                    ],
            
                    [
                        Keyboard.textButton({ label: `Меню`, payload: { command: 'mainmenu' }, color: 'primary' }),
                    ]
            
                ])
                })
            }
        }


        if(context.messagePayload.command == 'allowCallNickname') {
            let text = null
            if(db.playersData[context.senderId].userData.globalSettings.allowCallNickname == true) {
                db.playersData[context.senderId].userData.globalSettings.allowCallNickname = false 
                return context.send({
                    message: `Теперь бот не будет отмечать тебя в беседах`,
                    keyboard: Keyboard.keyboard([
 
                    [
                        Keyboard.textButton({ label: `Кнопки ставок`, payload: { command: 'allowInlineButtons'}, color:  db.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true ? 'positive' : 'negative' }),
                        Keyboard.textButton({ label: `Рассылка`, payload: { command: `allowNewsMessage` }, color: db.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Упоминания от бота`, payload: { command: `allowCallNickname` }, color: db.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Сменить имя`, payload: { command: "settings_ChangeName" } , color: 'positive'})

                    ],
                    [
               
                    ],
            
                    [
                        Keyboard.textButton({ label: `Меню`, payload: { command: 'mainmenu' }, color: 'primary' }),
                    ]
            
                ])
                })
            }
            if(db.playersData[context.senderId].userData.globalSettings.allowCallNickname == false) {
                db.playersData[context.senderId].userData.globalSettings.allowCallNickname = true 
                return context.send({
                    message: `Теперь бот будет отмечать тебя в беседах`,
                    keyboard: Keyboard.keyboard([
 
                    [
                        Keyboard.textButton({ label: `Кнопки ставок`, payload: { command: 'allowInlineButtons'}, color:  db.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true ? 'positive' : 'negative' }),
                        Keyboard.textButton({ label: `Рассылка`, payload: { command: `allowNewsMessage` }, color: db.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Упоминания от бота`, payload: { command: `allowCallNickname` }, color: db.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Сменить имя`, payload: { command: "settings_ChangeName" } , color: 'positive'})

                    ],
                    [
               
                    ],
            
                    [
                        Keyboard.textButton({ label: `Меню`, payload: { command: 'mainmenu' }, color: 'primary' }),
                    ]
            
                ])
                })
            }
        }

        if(context.messagePayload.command == 'allowInlineButtons') {
            let text = null
            if(db.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true) {
                db.playersData[context.senderId].userData.globalSettings.allowInlineButtons = false 
                return context.send({
                    message: `Кнопки ставок отключены`,
                    keyboard: Keyboard.keyboard([
 
                    [
                        Keyboard.textButton({ label: `Кнопки ставок`, payload: { command: 'allowInlineButtons'}, color:  db.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true ? 'positive' : 'negative' }),
                        Keyboard.textButton({ label: `Рассылка`, payload: { command: `allowNewsMessage` }, color: db.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Упоминания от бота`, payload: { command: `allowCallNickname` }, color: db.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Сменить имя`, payload: { command: "settings_ChangeName"}, color: 'positive'})

                    ],
                    [
               
                    ],
            
                    [
                        Keyboard.textButton({ label: `Меню`, payload: { command: 'mainmenu' }, color: 'primary' }),
                    ]
            
                ])

                })
            }
            if(db.playersData[context.senderId].userData.globalSettings.allowInlineButtons == false) {
                db.playersData[context.senderId].userData.globalSettings.allowInlineButtons = true 
                return context.send({
                    message: `Кнопки ставок включены`,
                    keyboard:Keyboard.keyboard([
 
                    [
                        Keyboard.textButton({ label: `Кнопки ставок`, payload: { command: 'allowInlineButtons'}, color:  db.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true ? 'positive' : 'negative' }),
                        Keyboard.textButton({ label: `Рассылка`, payload: { command: `allowNewsMessage` }, color: db.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Упоминания от бота`, payload: { command: `allowCallNickname` }, color: db.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Сменить имя`, payload: { command: "settings_ChangeName"} , color: 'positive'})

                    ],
                    [
               
                    ],
            
                    [
                        Keyboard.textButton({ label: `Меню`, payload: { command: 'mainmenu' }, color: 'primary' }),
                    ]
            
                ])
                })
            }
        }



    }
}