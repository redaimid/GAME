module.exports = {
    // Основная настройка бота
    botName: "RDMD GAMES", // Название бота
    botMainCurrency: "ℝ", // Валюта 
    botVirtualCurrency: "🍩", // Не трогать 
    
    // Подключение к группе ВКонтакте
    botToken: "vk1.a.GS-0hKlS0YwAN3eGUr_A4_OjAUAhk1gXH7qZ8C43R7k4ux2o5EU0SK6wj7OvJ-zKGTgBjeldNbOfQm4xKItpkeewnEts4vepnybfIHEufRlMXPCLhLQLhXIeH-GyK0qpj4DVrrbbBDbIhpFDfAZiL8zS7qj9vXMWrIU_Tjl5HWYohGZKK4c10m0Gl242_qPpm8qr_Ssm0D-3aRm7aCjK_Q", // Бот токен
    botPollingGroupId: 229419604, // айди группы 
    botSecondToken: "vk1.a.GS-0hKlS0YwAN3eGUr_A4_OjAUAhk1gXH7qZ8C43R7k4ux2o5EU0SK6wj7OvJ-zKGTgBjeldNbOfQm4xKItpkeewnEts4vepnybfIHEufRlMXPCLhLQLhXIeH-GyK0qpj4DVrrbbBDbIhpFDfAZiL8zS7qj9vXMWrIU_Tjl5HWYohGZKK4c10m0Gl242_qPpm8qr_Ssm0D-3aRm7aCjK_Q", // Введи сюда ещё раз токен группы
    projectVkPollingGroupCallbackSecret: "callkeymigames", // Не трогать

    // Подключение личной страницы
    botPrivateAccountToken: "vk1.a.lD3z9tRi4apoEITlNBlvqCnPfYt79ue60NRunP16wlb1QWl394TzmIKWui5kPzlfVdCstXlwLq0xEinFqszeaDMvG32nlU3v0GLLTWFH51W9ix8IdonUUxuIt4Pn9trhSBYKW2wZwR5iIZrEBIBW3h1eX-2p7VZRehcrDfWq2RqLMwfp-lgiMtFkV6rpCtsEbop8oRIwA9xv13lpjCHq-A", // Ваш токен от страницы вк ( брать здесь - https://vkhost.github.io/ ) 
    botPrivateAccountId: 376393143, // Айди страницы 

    // Admins (Люди, которые полностью могут управлять скриптом)
    globalAdmins: [376393143, 123], // Здесь тоже айди 

    // Админ беседа (Может быть только одна) 
    adminConv: 376393143, // Сюда свой айди 

    // Keksik API
    keksikKey: "токен кексика", // токен кексика

    // YooMoney, но он вырезан, так что не надо
    yooMoneyWalletId: 0,
    yooMoneyKey: "",

    // Qiwi Intergration, тоже не надо
    qiwiWalletId: 0,
    qiwiWalletKey: "",

    // VKCoin API, данные ВК Коин
    vkCoinId: 0, // айди пользователя от которого получен токен
    vkCoinKey: "ключ вк коин", // ключ вк коин 

    mainInfoLink: "https://vk.com/@multiplay_official-multiplay-chto-gde-i-kogda",
    hashCheckLink: "https://vk.com/test",
    dayTopInfo: "https://google.ru",
    privateConvInfo: "https://google.ru",
    clansInfoLink: "https://google.ru",
    marketInfoLink: "",

    // SQL Supabase Configuration
    supabaseUrl: "https://pccjtryqkpezpnynsvhm.supabase.co",
    supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjY2p0cnlxa3BlenBueW5zdmhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MTAzNTQsImV4cCI6MjA1NTM4NjM1NH0._KqipB5qGw2q1NZFcsD6V2d8766jOwwGZ9dri6LApDw",
    supabaseDatabase: "pccjtryqkpezpnynsvhm",
}
