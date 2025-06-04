export const character = {
    green: require('../../assets/images/Exercise/초록이 캐릭터.png'),
    blue: require('../../assets/images/Exercise/파랑이 캐릭터.png'),
    yellow: require('../../assets/images/Exercise/노랑이 캐릭터.png'),
    red: require('../../assets/images/Exercise/빨강이 캐릭터.png'),
};

export const FEEDBACK_THEME = {
    blue: {
        gradient: {
            colors: ['#70B8FF', '#3B5BD1', '#70B8FF', '#3B5BD1'],
            locations: [0, 0.4, 0.7, 1],
        },
        textColor: '#ffffff',
        character: character.blue,
    },
    green: {
        gradient: {
            colors: ['#D4FF70', '#3BD165', '#D4FF70', '#3BD165'],
            locations: [0, 0.4, 0.7, 1],
        },
        textColor: '#000000',
        character: character.green,
    },
    yellow: {
        gradient: {
            colors: ['#FFDB70', '#EAA462', '#FFDB70', '#EAA462'],
            locations: [0, 0.4, 0.7, 1],
        },
        textColor: '#ffffff',
        character: character.yellow,
    },
    red: {
        gradient: {
            colors: ['#FF7E70', '#EAA462', '#FF7E70', '#EAA462'],
            locations: [0, 0.4, 0.7, 1],
        },
        textColor: '#ffffff',
        character: character.red,
    },
};
