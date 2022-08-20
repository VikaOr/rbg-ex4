const readlineSync = require('readline-sync');
const chalk = require('chalk')
const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [{
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0, // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20, // магическая броня
            "cooldown": 0 // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
}
const mag = {
    maxHealth: 0,
    name: "Евстафий",
    moves: [{
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4
        },
    ]
}
mag.maxHealth = readlineSync.question("Введите здоровье мага: ");

let game = true;


let monsterCount = [0, 0, 0, 0];

let MagicalCount = [0, 0, 0, 0];


while (game) {
    const strAttack = monster.moves;
    const magStr = mag.moves;
    let attack;


    let bool1 = true;
    let numAttack = Math.floor(Math.random() * 3);

    while (bool1) {
        attack = strAttack[numAttack];
        if (monsterCount[numAttack] == 0) {
            monsterCount[numAttack] = attack.cooldown + 1;
            let j = 0;
            while (j < monsterCount.length) {
                if (monsterCount[numAttack] != 0) {
                    monsterCount[numAttack]--;
                };
                j++
            }
            console.group(chalk.red("Атака монстра:"));
            console.log("название: ", chalk.red(attack.name));
            console.log("Физический урон: ", attack.physicalDmg);
            console.log("Магический урон: ", attack.magicDmg);
            console.log("Физическая броня: ", attack.physicArmorPercents);
            console.log("Магическая броня: ", attack.magicArmorPercents);
            console.groupEnd();
            bool1 = false
        } else {
            numAttack = Math.floor(Math.random() * 3)
        }
    }


    //  выбор атаки
    let bool = true;
    let magAttack;
    console.group(chalk.green("Список атак мага: "));
    console.log("1. Удар боевым кадилом. До возможности использовать осталось ", MagicalCount[0], " шагов");
    console.log("2. Вертушка левой пяткой. До возможности использовать осталось ", MagicalCount[1], " шагов");
    console.log("3. Каноничный фаербол. До возможности использовать осталось ", MagicalCount[2], " шагов");
    console.log("4. Магический блок. До возможности использовать осталось ", MagicalCount[3], " шагов");
    console.groupEnd();
    let numMagAttack = readlineSync.question("Выберите атаку:") - 1;
    while (bool) {


        magAttack = magStr[numMagAttack];
        if (MagicalCount[numMagAttack] != 0) {
            numMagAttack = readlineSync.question("Введите другой номер атаки: ") + 1;
        } else {
            MagicalCount[numMagAttack] = magAttack.cooldown + 1;
            let k = 0;
            while (k < MagicalCount.length) {
                if (MagicalCount[k] != 0) {
                    MagicalCount[k]--
                }
                k++
            };
            console.log(magAttack.name);
            bool = false
        }
    }
    //бой между магом и монстром

    let magArmorPhysic = magAttack.physicArmorPercents;
    let magArmorMagic = magAttack.magicArmorPercents;
    let magMagicDmg = magAttack.magicDmg;
    let magPhysicDmg = magAttack.physicalDmg;

    let monsterArmorPhysic = attack.physicArmorPercents;
    let monsterArmorMagic = attack.magicArmorPercents;
    let monsterMagDmg = attack.magicDmg;
    let monsterPhysicDmg = attack.physicalDmg;

    {
        //сравниваем урон и броню (физическое с физическим, магич с магич)
        if (magArmorMagic < monsterMagDmg) {
            mag.maxHealth = mag.maxHealth - monsterMagDmg
        };
        if (magArmorPhysic < monsterPhysicDmg) {
            mag.maxHealth = mag.maxHealth - monsterPhysicDmg
        };
        if (monsterArmorPhysic < magPhysicDmg) {
            monster.maxHealth = monster.maxHealth - magPhysicDmg
        };
        if (monsterArmorMagic < magMagicDmg) {
            monster.maxHealth = monster.maxHealth - magMagicDmg
        };
        if (monster.maxHealth <= 0) {
            console.log("Вы победили", "Здоровье мага", mag.maxHealth);
            game = false
        } else {
            console.log(chalk.red("Здоровье монстра: ", monster.maxHealth));
        };
        if (mag.maxHealth <= 0) {
            console.log("Вы проиграли", "Здоровье монстра", monster.maxHealth);
            game = false
        } else {
            console.log(chalk.green("Здоровье мага: ", mag.maxHealth))
        }
    }


};