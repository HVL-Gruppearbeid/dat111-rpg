// #############
//  "Database"     #
// #############
// Klassedeklarasjoner
namespace SpriteKind {
    export const exit = SpriteKind.create()
    export const potions = SpriteKind.create()
    export const npc = SpriteKind.create()
    export const shop_level = SpriteKind.create()
    export const main_level = SpriteKind.create()
}

let move_speed = 200
let current_Bandit = 0
let fighting_Check = false
//  Oversikt over utstyret som finnes i spillet.
//  Uttrykt som en ordbok nøkkel-verdi-par, en tekststreng som nøkkel og verdier som tupler.
let equipmentDatabase = {
    "Tunic of speed" : ["speed", 5],
}

// ######################
//  Oppsett av karakter     #
// ######################
//  Setter startverdi for gull i en vanlig variabel 
//  Vi oppdaterer denne senere når karakteren åpner en kiste og kjøper/selger ting i butikken.
let gold = 20
let teller = 0
//  Grunnivået på ferdighetene til karakteren
//  Uttrykt ved hjelp av en ordbok/dictionary (nøkkel : verdi)
let stats = {
    "strength" : 3,
    "intellect" : 1,
    "agility" : 2,
    "speed" : 5,
}

//  Inventaret til karakteren, uttrykt ved hjelp av tekststrenger i en liste.
//  Tekststrengene i listen skal være nøkkelverdien til elementer i equipmentDatabase,
//  slik at man da kan hente ut de tilhørende verdiene derfra.
let inventory = [""]
//  Setter startanimasjon til å være idel/ledig.
//  Bruker denne variabelen senere for å håndtere korrekt animering
let current_animation = "idle"
// ##########################
//  Oppsett av nivået/banen #
// ##########################
// ## Banen ###
//  Setter tilemap, som er en samling av tiles/fliser som vi har satt sammen for å danne nivået vårt.
//  Tilemaps og andre audiovisuelle elementer finner man under "Assets" i toppmenyen.
tiles.setCurrentTilemap(tilemap`field_level`)
//  Usikker på om det er en bug, men etter at sprites blir ødelagt, også 'created' på nytt, så fungerer ikke overlaps_with med den samme spriten lengre.
//  Som en skitten workaround, så blir alle sprites generert ved oppstart, og flyttet off map, og flyttet inn igjen ved tilemap change.
// ## Karakteren ###
//  Oppretter den visuelle representasjonen av karakteren som en sprite ("bevegelig bilde").
//  SpriteKind er en enum som lar oss kategorisere spriten for å senere enkelt kunne utføre operasjoner på sprites av samme kategori.
let playerChar = sprites.create(assets.image`heroIdleFront`, SpriteKind.Player)
playerChar.setPosition(128, 250)
//  Setter posisjonen til karakteren til å være nederst i midten av brettet
scene.cameraFollowSprite(playerChar)
//  Setter kameraet til å følge etter karakteren sin sprite.
//  Angir karakteren sin sprite som "bevegelses-sprite", dvs. at standardkontrollene vil nå påvirke spillerens sprite.
if (fighting_Check == false) {
    controller.moveSprite(playerChar)
}

// ## Mat ###
//  Oppretter sprite for en taco og setter dens posisjon.
let taco = sprites.create(assets.image`taco`, SpriteKind.Food)
// ## Shop ###
let shop = sprites.create(assets.image`house`, SpriteKind.main_level)
let shopExit = sprites.create(assets.image`PlaceHolder_Ingenting`, SpriteKind.exit)
let butikkEier = sprites.create(assets.image`ButikkEier`, SpriteKind.shop_level)
let bodButikk = sprites.create(assets.image`bordbutikk`, SpriteKind.shop_level)
// ## Potions ###
let strPotion = sprites.create(assets.image`strPotion`, SpriteKind.shop_level)
let intellectPotion = sprites.create(assets.image`intPotion`, SpriteKind.shop_level)
let agilityPotion = sprites.create(assets.image`aglPotion`, SpriteKind.shop_level)
let speedPotion = sprites.create(assets.image`spdPotion`, SpriteKind.shop_level)
// ## Bandits ###
let Banditt = sprites.create(assets.image`Banditt`, SpriteKind.npc)
let Banditt2 = sprites.create(assets.image`Banditt2`, SpriteKind.npc)
let Banditt3 = sprites.create(assets.image`Banditt3`, SpriteKind.npc)
// Dekker
let Dekker = sprites.create(assets.image`Dekker`, SpriteKind.Food)
// ## Vil kjøpe potion? ###
let choice = false
function purchaseYes() {
    
}

// ##Teleportører###
let Til_LoreTile = sprites.create(assets.image`Til_Lore`, SpriteKind.Food)
let BandittEnter = sprites.create(assets.image`Til_Banditt`, SpriteKind.Food)
let BandittExit = sprites.create(assets.image`Til_Banditt`, SpriteKind.exit)
let Til_Hund = sprites.create(assets.image`Til_Lore`, SpriteKind.Food)
let Lore_Exit = sprites.create(assets.image`Til_Lore`, SpriteKind.exit)
let Hund_Exit = sprites.create(assets.image`Til_Lore`, SpriteKind.exit)
// ## Skattekiste ###
//  Oppretter sprite for en skattekiste og setter dens posisjon.
let treasure = sprites.create(assets.image`chestClosed`, SpriteKind.Food)
//  Angir at kisten ikke er åpnet enda, slik at vi senere unngå at gull gis mer enn en gang til spilleren.
let treasureNotOpened = true
// ## Musikk ###
//  Starter bakgrunnsmusikk som er et lydspor lagret i Assets.
//  Setter PlaybackMode til en verdi som gjør at sporet spilles kontinuerlig i bakgrunnen.
music.play(music.createSong(assets.song`backgroundSong`), music.PlaybackMode.LoopingInBackground)
// Hund#
let Hund = sprites.create(assets.image`Hund_Front`, SpriteKind.Food)
let bod = sprites.create(assets.image`Bod`, SpriteKind.Food)
let Bro = sprites.create(assets.image`LoreBro`, SpriteKind.Food)
// Lager en funksjon for å flytte alle sprites på en gang, for å 
// korte ned koden
function flytte_sprites() {
    taco.setPosition(0, 0)
    Bro.setPosition(0, 0)
    bod.setPosition(0, 0)
    shop.setPosition(0, 0)
    shopExit.setPosition(0, 0)
    butikkEier.setPosition(0, 0)
    bodButikk.setPosition(0, 0)
    strPotion.setPosition(0, 0)
    intellectPotion.setPosition(0, 0)
    agilityPotion.setPosition(0, 0)
    speedPotion.setPosition(0, 0)
    Banditt.setPosition(0, 0)
    Banditt2.setPosition(0, 0)
    Banditt3.setPosition(0, 0)
    Til_LoreTile.setPosition(0, 0)
    BandittEnter.setPosition(0, 0)
    BandittExit.setPosition(0, 0)
    treasure.setPosition(0, 0)
    Til_Hund.setPosition(0, 0)
    Lore_Exit.setPosition(0, 0)
    Hund.setPosition(0, 0)
    Hund_Exit.setPosition(0, 0)
    Dekker.setPosition(15, 15)
}

field_level()
// #############
//  Funksjoner #
// #############
//  Variabel for å holde kontroll på om spilleren vil inn i butikken.
let enterShop = false
let exitShop = false
let Kjeks = false
//  Hjelpefunksjon som lar oss pause spillet frem til spilleren har utført et valg.
//  Manglet implementasjon i Python for MakeCode Arcade.
// ##############
//  LEVELS #
// ##############
function field_level() {
    tiles.setCurrentTilemap(tilemap`field_level`)
    // Endrer tilemap
    flytte_sprites()
    BandittEnter.setPosition(128, 255)
    // ## Butikk ###
    //  Oppretter sprite for en butikk og setter dens posisjon.
    shop.setPosition(128, 20)
    shopExit.setPosition(128, 300)
    playerChar.setPosition(128, 230)
    //  Oppdaterer spillerens posisjon
    shopExit.setPosition(128, 300)
    taco.setPosition(30, 100)
    Til_LoreTile.setPosition(2, 100)
    treasure.setPosition(200, 150)
}

function butikk_level() {
    
    flytte_sprites()
    tiles.setCurrentTilemap(tilemap`shopInterior`)
    //  Endrer tilemap
    shopExit.setPosition(120, 180)
    playerChar.setPosition(120, 160)
    //  Oppdaterer spillerens posisjon
    //  Butikk-fyren #
    butikkEier.setPosition(120, 65)
    //  Bod i butikken #
    bodButikk.setPosition(120, 72)
    //  Potions Posisjon #
    strPotion.setPosition(90, 100)
    intellectPotion.setPosition(110, 100)
    agilityPotion.setPosition(130, 100)
    speedPotion.setPosition(150, 100)
}

function Banditt_Level() {
    
    tiles.setCurrentTilemap(tilemap`Banditt_Level`)
    playerChar.setPosition(128, 70)
    flytte_sprites()
    Banditt.setPosition(128, 145)
    Banditt2.setPosition(148, 130)
    Banditt3.setPosition(100, 130)
    BandittExit.setPosition(128, 0)
}

function Lore_Level() {
    tiles.setCurrentTilemap(tilemap`Lore_Level`)
    //  Endrer tilemap
    flytte_sprites()
    playerChar.setPosition(245, 140)
    bod.setPosition(210, 45)
    Bro.setPosition(150, 70)
    Til_Hund.setPosition(2, 140)
    Lore_Exit.setPosition(250, 140)
    // Fjener butikken
    shop.setPosition(0, 0)
}

function Hund_Level() {
    tiles.setCurrentTilemap(tilemap`Hund_Level`)
    flytte_sprites()
    Hund.setPosition(39, 200)
    Hund_Exit.setPosition(255, 125)
}

//  Spilløkken som sørger for interaktivitet i spillet.
// def venstre_slipp():
//    animation.run_image_animation(playerChar,
//       assets.animation("Hero_StandStill_Left"),
//      0)
//  Funksjon som sørger for at animasjonene passer med bevegelsen som foregår.
function update_character_animation() {
    
    //  Variabel som hjelper oss til å unngå å overskrive pågående animasjoner.
    //  Aktiverer venstrestilt animasjon dersom venstre tast er trykket.
    if (controller.left.isPressed()) {
        if (current_animation != "walk_left") {
            //  Unngår å overskrive pågående animasjon
            //  Starter animasjon på spillerens karakter, med gitt animasjon og hastighet, og setter den til å loope.
            animation.runImageAnimation(playerChar, assets.animation`heroWalkLeft`, move_speed, true)
            current_animation = "walk_left"
        }
        
    }
    
    // controller.left.on_event(ControllerButtonEvent.RELEASED, venstre_slipp)
    if (controller.right.isPressed()) {
        if (current_animation != "walk_right") {
            //  Unngår å overskrive pågående animasjon
            //  Starter animasjon på spillerens karakter, med gitt animasjon og hastighet, og setter den til å loope.
            animation.runImageAnimation(playerChar, assets.animation`heroWalkRight`, move_speed, true)
            current_animation = "walk_right"
        }
        
    }
    
    if (controller.down.isPressed()) {
        if (current_animation != "walk_down") {
            //  Unngår å overskrive pågående animasjon
            //  Starter animasjon på spillerens karakter, med gitt animasjon og hastighet, og setter den til å loope.
            animation.runImageAnimation(playerChar, assets.animation`heroWalkDown`, move_speed, true)
            current_animation = "walk_down"
        }
        
    }
    
    if (controller.up.isPressed()) {
        if (current_animation != "walk_up") {
            //  Unngår å overskrive pågående animasjon
            //  Starter animasjon på spillerens karakter, med gitt animasjon og hastighet, og setter den til å loope.
            animation.runImageAnimation(playerChar, assets.animation`heroWalkUp`, move_speed, true)
            current_animation = "walk_up"
        }
        
    }
    
}

function fighting() {
    
    fighting_Check = true
    playerChar.setVelocity(0, 0)
    tiles.setCurrentTilemap(tilemap`battle_map`)
    Til_LoreTile.setPosition(0, 0)
    playerChar.setPosition(20, 130)
    scaling.scaleToPercent(playerChar, 500, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    playerChar.setStayInScreen(true)
    game.showLongText("A wild Bandit appears!", DialogLayout.Bottom)
    //  Prøvde ein while loop her for å "holde" spillet i combat. Men med den ekstremt awkward number selectoren, så ser du jo ikkje nåke anna.
    if (current_Bandit == 1) {
        Banditt2.setPosition(0, 0)
        Banditt3.setPosition(0, 0)
        Banditt.setPosition(130, 130)
        scaling.scaleToPercent(Banditt, 300, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        Banditt.setStayInScreen(true)
    } else if (current_Bandit == 2) {
        Banditt.setPosition(0, 0)
        Banditt3.setPosition(0, 0)
        Banditt2.setPosition(130, 130)
        scaling.scaleToPercent(Banditt2, 300, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        Banditt2.setStayInScreen(true)
    } else {
        Banditt.setPosition(0, 0)
        Banditt2.setPosition(0, 0)
        Banditt3.setPosition(130, 130)
        scaling.scaleToPercent(Banditt3, 300, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        Banditt3.setStayInScreen(true)
    }
    
    pause(100)
    let attack_type = game.askForNumber("1 =  Fast attack, 2 =  Heavy attack, 3 = Smart attack")
    if (attack_type == 1) {
        attack_type = 1
    } else if (attack_type == 2) {
        attack_type = 1
    } else {
        attack_type = 1
    }
    
    pause(1000)
}

//  Oppgir at vår on_update-funksjon skal fungere som on_update,
//  dvs. det som fungerer som spilløkken som oppdateres kontinuerlig
//  og sørger for at spillet blir interaktivt.
game.onUpdate(function on_update() {
    let choice: boolean;
    let purchasePotion: boolean;
    let teller: number;
    //  Taco-spriten blir "spist" dersom spillerkarakteren sin sprite overlapper den.
    //  Dette gjøres ved å spille av et lydklipp og sette resterende livstid for sprite til 0.
    if (playerChar.overlapsWith(taco)) {
        music.play(music.createSong(assets.song`upgrade`), music.PlaybackMode.InBackground)
        taco.lifespan = 0
    }
    
    //  Sørger for at vi bruker de globale verdiene til disse variablene
    //  (som vi definerte tidligere), ellers ville det blitt opprettet lokale
    //  variabler med samme navn når vi endrer verdi på de.
    
    
    
    
    
    //  En skattekiste blir åpnet dersom spillerens sprite overlapper og kisten ikke har vært åpnet før.
    //  Ved flere enn en kiste på kartet bør 
    if (playerChar.overlapsWith(treasure) && treasureNotOpened) {
        gold = gold + 100
        //  Oppdaterer gullbeholdningen til spilleren
        treasure.setImage(assets.image`chestOpen`)
        //  Bytter ut spriten til kisten med en åpnet variant.
        treasureNotOpened = false
        //  Sier at kisten har blitt åpnet, slik at vi ikke går inn i denne if-en igjen.
        //  Spiller av "upgrade"-lydsporet. PlaybackMode IN_BACKGROUND gjør at spillet fortsetter samtidig som den spiller.
        music.play(music.createSong(assets.song`upgrade`), music.PlaybackMode.InBackground)
        //  Spilleren får en beskjed i en dialogboks om at de har fått mer gull.
        game.showLongText("You got " + ("" + 100) + " gold!", DialogLayout.Bottom)
    }
    
    //  Dersom spillerens sprite overlapper med butikken vil de kunne gå inn i den.
    if (playerChar.overlapsWith(shop)) {
        pauseUntil(function onPauseUntilEnter(): boolean {
            
            enterShop = game.ask("Enter?")
            return true
        })
        //  Hjelpefunksjon som holder spillet pauset til brukeren avgir svar.
        if (enterShop) {
            butikk_level()
        } else {
            playerChar.setPosition(128, 70)
        }
        
    }
    
    //  Flytter karakteren til en posisjon som ikke overlapper med butikken.
    if (playerChar.overlapsWith(shopExit)) {
        pauseUntil(function onPauseUntilExit(): boolean {
            
            exitShop = game.ask("Exit?")
            return true
        })
        //  Hjelpefunksjon som holder spillet pauset til brukeren avgir svar.
        if (exitShop) {
            field_level()
            playerChar.setPosition(128, 70)
        } else {
            playerChar.setPosition(128, 70)
        }
        
    }
    
    //  Flytter karakteren til en posisjon som ikke overlapper med butikken.
    // #Lore_Level##
    if (playerChar.overlapsWith(Til_LoreTile)) {
        Lore_Level()
        playerChar.setPosition(220, 130)
    }
    
    if (playerChar.overlapsWith(Lore_Exit)) {
        field_level()
        playerChar.setPosition(15, 90)
    }
    
    // #Banditt_Level##
    if (playerChar.overlapsWith(BandittEnter)) {
        Banditt_Level()
        playerChar.setPosition(128, 20)
    }
    
    if (playerChar.overlapsWith(BandittExit)) {
        field_level()
        playerChar.setPosition(128, 228)
    }
    
    // #Hund_Level##
    if (playerChar.overlapsWith(Til_Hund)) {
        Hund_Level()
        playerChar.setPosition(230, 125)
    }
    
    if (playerChar.overlapsWith(Hund_Exit)) {
        Lore_Level()
        playerChar.setPosition(30, 140)
    }
    
    // ## Spør spiller om de vil kjøpe strength potion ###
    if (strPotion !== null && playerChar.overlapsWith(strPotion)) {
        choice = game.ask("Kjøp en potion?", "Strength: 20 Gull")
        if (choice) {
            if (gold >= 20) {
                gold = gold - 20
                stats["strength"] += 2
                game.showLongText("Du har fått +2 Strength", DialogLayout.Bottom)
                playerChar.setPosition(90, 120)
                purchasePotion = true
            } else {
                game.showLongText("Du har mindre enn 20 gull", DialogLayout.Bottom)
                purchasePotion = false
                playerChar.setPosition(90, 120)
            }
            
        } else {
            //  Flytter karakteren til en posisjon som ikke overlapper med butikken.
            purchasePotion = false
            playerChar.setPosition(90, 120)
        }
        
    }
    
    // ## Spør spiller om de vil kjøpe intellect potion ###
    if (intellectPotion !== null && playerChar.overlapsWith(intellectPotion)) {
        choice = game.ask("Kjøp en potion?", "Intelligens: 20 Gull")
        if (choice) {
            if (gold >= 20) {
                gold = gold - 20
                stats["intellect"] += 2
                game.showLongText("Du har fått +2 Intelligens", DialogLayout.Bottom)
                playerChar.setPosition(110, 120)
                purchasePotion = true
            } else {
                game.showLongText("Du har mindre enn 20 gull", DialogLayout.Bottom)
                purchasePotion = false
                playerChar.setPosition(110, 120)
            }
            
        } else {
            purchasePotion = false
            playerChar.setPosition(110, 120)
        }
        
    }
    
    //  Flytter karakteren til en posisjon som ikke overlapper med butikken.
    // ## Spør spiller om de vil kjøpe agility potion ###
    if (agilityPotion !== null && playerChar.overlapsWith(agilityPotion)) {
        choice = game.ask("Kjøp en potion?", "Agility: 20 Gull")
        if (choice) {
            if (gold >= 20) {
                gold = gold - 20
                stats["agility"] += 2
                game.showLongText("Du har fått +2 Agility", DialogLayout.Bottom)
                playerChar.setPosition(130, 120)
                purchasePotion = true
            } else {
                game.showLongText("Du har mindre enn 20 gull", DialogLayout.Bottom)
                purchasePotion = false
                playerChar.setPosition(130, 120)
            }
            
        } else {
            purchasePotion = false
            playerChar.setPosition(130, 120)
        }
        
    }
    
    //  Flytter karakteren til en posisjon som ikke overlapper med butikken.
    // ## Spør spiller om de vil kjøpe speed potion ###
    if (speedPotion !== null && playerChar.overlapsWith(speedPotion)) {
        choice = game.ask("Kjøp en potion?", "Speed: 20 Gull")
        if (choice) {
            if (gold >= 20) {
                gold = gold - 20
                stats["speed"] += 2
                game.showLongText("Du har fått +2 Speed", DialogLayout.Bottom)
                playerChar.setPosition(150, 120)
                purchasePotion = true
            } else {
                game.showLongText("Du har mindre enn 20 gull", DialogLayout.Bottom)
                purchasePotion = false
                playerChar.setPosition(150, 120)
            }
            
        } else {
            purchasePotion = false
            playerChar.setPosition(150, 120)
        }
        
    }
    
    //  Flytter karakteren til en posisjon som ikke overlapper med butikken.
    // #Prøver å Gi mulighet for Kjeks
    if (Bro && playerChar.overlapsWith(Bro) && teller == 0) {
        pauseUntil(function VilHaKjeks(): boolean {
            
            Kjeks = game.ask("Vil du kjøpe en Kjeks for 1 gull?")
            return true
        })
        if (Kjeks && gold > 1) {
            inventory.push("Kjeks x1")
            playerChar.setPosition(150, 90)
            teller = 4
        } else {
            playerChar.setPosition(150, 90)
        }
        
    }
    
    // ## Fight check ###
    if (playerChar.overlapsWith(Banditt)) {
        move_speed = 0
        current_Bandit = 1
        fighting_Check = true
        fighting()
    }
    
    if (playerChar.overlapsWith(Banditt2)) {
        move_speed = 0
        current_Bandit = 2
        fighting()
    }
    
    if (playerChar.overlapsWith(Banditt3)) {
        move_speed = 0
        current_Bandit = 3
        fighting()
    }
    
    //  Oppdaterer karakterens animasjon
    update_character_animation()
})
