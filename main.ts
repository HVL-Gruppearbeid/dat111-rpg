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
controller.moveSprite(playerChar)
let Guard = sprites.create(assets.image`GuardS`, SpriteKind.Food)
let Kjeks = sprites.create(assets.image`Cookie`, SpriteKind.Food)
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
// ##Utstyr###
let Bow = sprites.create(assets.image`BowAndArrow`, SpriteKind.Food)
let Sheild = sprites.create(assets.image`Sheild`, SpriteKind.Food)
let Sword = sprites.create(assets.image`Sword`, SpriteKind.Food)
// ## Bandits ###
let Banditt = sprites.create(assets.image`Banditt`, SpriteKind.npc)
let Banditt2 = sprites.create(assets.image`Banditt2`, SpriteKind.npc)
let Banditt3 = sprites.create(assets.image`Banditt3`, SpriteKind.npc)
// Dekker
let Dekker = sprites.create(assets.image`Dekker`, SpriteKind.Food)
// ## Vil kjøpe potion? ###
let choice = false
// ##Fighting###
let Heavy_Attack = sprites.create(assets.image`Soft_Attack`, SpriteKind.Food)
let Fast_Attack = sprites.create(assets.image`Hard_Attack`, SpriteKind.Food)
let Magic_Attack = sprites.create(assets.image`Amazing_Attack`, SpriteKind.Food)
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
    Bow.setPosition(0, 0)
    Sheild.setPosition(0, 0)
    Sword.setPosition(0, 0)
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
    Guard.setPosition(0, 0)
    Kjeks.setPosition(0, 0)
    Heavy_Attack.setPosition(0, 0)
    Fast_Attack.setPosition(0, 0)
    Magic_Attack.setPosition(0, 0)
    Dekker.setPosition(15, 15)
}

field_level()
// #############
//  Funksjoner #
// #############
//  Variabel for å holde kontroll på om spilleren vil inn i butikken.
let enterShop = false
let exitShop = false
let Har_du_hund = false
let Finnbar_hund = false
let Funnet_hund = false
let Fight = false
let Banditt_1 = false
let Banditt_2 = false
let Banditt_3 = false
//  Hjelpefunksjon som lar oss pause spillet frem til spilleren har utført et valg.
//  Manglet implementasjon i Python for MakeCode Arcade.
function fighting() {
    flytte_sprites()
    tiles.setCurrentTilemap(tilemap`Battle_Map`)
    Heavy_Attack.setPosition(130, 310)
    Fast_Attack.setPosition(130, 340)
    Magic_Attack.setPosition(130, 370)
    
    Fight = true
    info.startCountdown(80)
}

function Win() {
    game.showLongText("Fienden ble sliten og gikk sin vei", DialogLayout.Bottom)
    
    Fight = false
    Banditt_Level()
}

function Loose() {
    game.showLongText("Du tapte og gikk tilbake for å slappe av", DialogLayout.Bottom)
    field_level()
}

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
    Guard.setPosition(250, 110)
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
    //  Utstyrs Posisjon #
    Bow.setPosition(160, 120)
    Sheild.setPosition(75, 135)
    Sword.setPosition(160, 150)
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
    if (Har_du_hund) {
        Hund.setPosition(30, 140)
    }
    
    if (Funnet_hund) {
        Hund.setPosition(140, 70)
    }
    
    if (Funnet_hund) {
        Kjeks.setPosition(210, 45)
    }
    
}

function Hund_Level() {
    tiles.setCurrentTilemap(tilemap`Hund_Level`)
    flytte_sprites()
    if (Funnet_hund == false) {
        Hund.setPosition(39, 200)
    }
    
    Hund_Exit.setPosition(255, 125)
}

//  Spilløkken som sørger for interaktivitet i spillet.
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

// # Fighting er uferdig
// def fighting():
//     global fighting_Check
//     fighting_Check = True
//     playerChar.set_velocity(0, 0)
//     tiles.set_current_tilemap(tilemap("battle_map"))
//    Til_LoreTile.set_position(0, 0)
//   playerChar.set_position(20,130)
//  scaling.scale_to_percent(playerChar, 500, ScaleDirection.UNIFORMLY, ScaleAnchor.MIDDLE)
// playerChar.set_stay_in_screen(True)
//     game.show_long_text("A wild Bandit appears!", DialogLayout.BOTTOM)
//  Prøvde ein while loop her for å "holde" spillet i combat. Men med den ekstremt awkward number selectoren, så ser du jo ikkje nåke anna.
//    if (current_Bandit == 1):
//       Banditt2.set_position(0,0)
//      Banditt3.set_position(0,0)
//     Banditt.set_position(130, 130)
//    scaling.scale_to_percent(Banditt, 300, ScaleDirection.UNIFORMLY, ScaleAnchor.MIDDLE)
//     Banditt.set_stay_in_screen(True)
//     elif (current_Bandit == 2):
//        Banditt.set_position(0,0)
//       Banditt3.set_position(0,0)
//      Banditt2.set_position(130, 130)
//     scaling.scale_to_percent(Banditt2, 300, ScaleDirection.UNIFORMLY, ScaleAnchor.MIDDLE)
//    Banditt2.set_stay_in_screen(True)
// else:
//    Banditt.set_position(0,0)
//   Banditt2.set_position(0,0)
//         Banditt3.set_position(130, 130)
//        scaling.scale_to_percent(Banditt3, 300, ScaleDirection.UNIFORMLY, ScaleAnchor.MIDDLE)
//       Banditt3.set_stay_in_screen(True)
//     pause(100)
//    attack_type = game.ask_for_number("1 =  Fast attack, 2 =  Heavy attack, 3 = Smart attack")
//   if (attack_type == 1):
//      attack_type = 1
//     elif (attack_type == 2):
//        attack_type = 2
//   else:
//      attack_type = 3
//   pause(1000)
//  Oppgir at vår on_update-funksjon skal fungere som on_update,
//  dvs. det som fungerer som spilløkken som oppdateres kontinuerlig
//  og sørger for at spillet blir interaktivt.
game.onUpdate(function on_update() {
    let choice: boolean;
    let purchasePotion: boolean;
    let gull: any;
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
            playerChar.setPosition(125, 160)
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
    // #########
    // #Utstyr##
    // #########
    if (Sword !== null && playerChar.overlapsWith(Sword)) {
        choice = game.ask("Kjøp et Sverd?", "Sverd: 50 Gull")
        if (choice) {
            if (gold >= 50) {
                gold = gold - 50
                inventory.push("Sword")
                game.showLongText("Du har fått Sverd", DialogLayout.Bottom)
            } else {
                game.showLongText("Du har mindre enn 50 gull", DialogLayout.Bottom)
            }
            
        }
        
        playerChar.setPosition(145, 150)
    }
    
    //  Flytter karakteren til en posisjon som ikke overlapper med butikken.
    if (Sheild !== null && playerChar.overlapsWith(Sheild)) {
        choice = game.ask("Kjøp et Skjold?", "Skjold: 30 Gull")
        if (choice) {
            if (gold >= 30) {
                gold = gold - 30
                inventory.push("Sheild")
                game.showLongText("Du har fått Skjold", DialogLayout.Bottom)
            } else {
                game.showLongText("Du har mindre enn 30 gull", DialogLayout.Bottom)
            }
            
        }
        
        playerChar.setPosition(90, 135)
    }
    
    //  Flytter karakteren til en posisjon som ikke overlapper med butikken.
    if (Bow !== null && playerChar.overlapsWith(Bow)) {
        choice = game.ask("Kjøp en Bue?", "Bue: 25 Gull")
        if (choice) {
            if (gold >= 25) {
                gold = gold - 25
                inventory.push("Bow")
                game.showLongText("Du har fått Bue", DialogLayout.Bottom)
            } else {
                game.showLongText("Du har mindre enn 25 gull", DialogLayout.Bottom)
            }
            
        } else {
            playerChar.setPosition(145, 120)
        }
        
    }
    
    //  Flytter karakteren til en posisjon som ikke overlapper med butikken.
    // #Hund quest
    if (playerChar.overlapsWith(Bro) && !Finnbar_hund && !Har_du_hund && !Funnet_hund) {
        game.showLongText("Har du sett hunden min? Hvis du ser den, ta den me tilbake så får du får 50 gull", DialogLayout.Bottom)
        
        Finnbar_hund = true
        playerChar.setPosition(150, 90)
    }
    
    if (playerChar.overlapsWith(Hund) && Finnbar_hund && !Funnet_hund) {
        game.showLongText("Woof", DialogLayout.Bottom)
        Hund.follow(playerChar, 70)
        playerChar.setPosition(100, 200)
        
        Finnbar_hund = false
        Har_du_hund = true
    }
    
    if (playerChar.overlapsWith(Hund) && !Finnbar_hund && !Har_du_hund && !Funnet_hund) {
        game.showLongText("Wooof", DialogLayout.Bottom)
        playerChar.setPosition(70, 200)
    }
    
    if (playerChar.overlapsWith(Hund) && !Finnbar_hund && !Har_du_hund && Funnet_hund) {
        game.showLongText("Wooof", DialogLayout.Bottom)
        playerChar.setPosition(150, 90)
    }
    
    if (playerChar.overlapsWith(Bro) && Har_du_hund == true) {
        game.showLongText("Du fant hunden min! Tusen takk, her har du 50 gull", DialogLayout.Bottom)
        game.showLongText("Du fikk 50 gull", DialogLayout.Bottom)
        gull = gull + 50
        playerChar.setPosition(150, 90)
        Hund.follow(playerChar, 0)
        Hund.setPosition(135, 70)
        Har_du_hund = false
        
        Funnet_hund = true
    }
    
    if (playerChar.overlapsWith(Bro) && Funnet_hund == true) {
        choice = game.ask("Vil du kjøpe en kjeks for 1 gull?")
        if (choice) {
            if (gold >= 1) {
                game.showLongText("Du fikk en Kjeks", DialogLayout.Bottom)
                gold = gold - 1
            } else {
                game.showLongText("Du har ikke nokk gull", DialogLayout.Bottom)
            }
            
        }
        
        playerChar.setPosition(150, 90)
    }
    
    // ###Fighting
    info.onCountdownEnd(function on_countdown_end() {
        Win()
        if (Banditt_1 == true) {
            Banditt.lifespan = 0
        }
        
        if (Banditt_2 == true) {
            Banditt2.lifespan = 0
        }
        
        if (Banditt_3 == true) {
            Banditt3.lifespan = 0
        }
        
        let Fight = false
    })
    if (playerChar.overlapsWith(Banditt) && Fight == true) {
        Loose()
        Banditt_Level()
        
        Fight = false
        Banditt.follow(playerChar, 0)
        info.stopCountdown()
    }
    
    if (playerChar.overlapsWith(Banditt2) && Fight == true) {
        Loose()
        Banditt_Level()
        
        Fight = false
        Banditt2.follow(playerChar, 0)
        info.stopCountdown()
    }
    
    if (playerChar.overlapsWith(Banditt3) && Fight == true) {
        Loose()
        Banditt_Level()
        
        Fight = false
        Banditt3.follow(playerChar, 0)
        info.stopCountdown()
    }
    
    if (playerChar.overlapsWith(Banditt) && !Fight) {
        game.showLongText("Ikke vær nærri Banditten, hvis du klarer å ikke bli fanget gjennom hele countdownen, så har du vunnet. De fargerike knappene er angrep du kan gjøre, å være nærri de vil slite ut banditten og korte ned tiden", DialogLayout.Bottom)
        fighting()
        
        Fight = true
        
        Banditt_1 = true
        playerChar.setPosition(100, 350)
        Banditt.setPosition(200, 350)
        Banditt.follow(playerChar, 60)
    }
    
    if (playerChar.overlapsWith(Banditt2) && !Fight) {
        game.showLongText("Ikke vær nærri Banditten, hvis du klarer å ikke bli fanget gjennom hele countdownen, så har du vunnet. De fargerike knappene er angrep du kan gjøre, å være nærri de vil slite ut banditten og korte ned tiden", DialogLayout.Bottom)
        fighting()
        playerChar.setPosition(100, 350)
        Banditt2.setPosition(200, 350)
        
        Fight = true
        
        Banditt_2 = true
        Banditt2.setPosition(200, 350)
        Banditt2.follow(playerChar, 80, 30)
    }
    
    if (playerChar.overlapsWith(Banditt3) && !Fight) {
        game.showLongText("Ikke vær nærri Banditten, hvis du klarer å ikke bli fanget gjennom hele countdownen, så har du vunnet. De fargerike knappene er angrep du kan gjøre, å være nærri de vil slite ut banditten og korte ned tiden", DialogLayout.Bottom)
        
        Banditt_3 = true
        
        Fight = true
        fighting()
        playerChar.setPosition(100, 350)
        Banditt3.setPosition(200, 350)
        Banditt3.follow(playerChar, 70, 50)
    }
    
    if (playerChar.overlapsWith(Heavy_Attack)) {
        info.changeCountdownBy(-20)
        Heavy_Attack.setPosition(0, 0)
    }
    
    if (playerChar.overlapsWith(Fast_Attack)) {
        info.changeCountdownBy(-5)
        Fast_Attack.setPosition(0, 0)
    }
    
    if (playerChar.overlapsWith(Magic_Attack)) {
        info.changeCountdownBy(-10)
        Magic_Attack.setPosition(0, 0)
    }
    
    // ##Litt Story
    if (playerChar.overlapsWith(Guard)) {
        choice = game.ask("Trenger du hjelp?")
        if (choice) {
            game.showLongText("Her i vår verden er det 3 ting en kan gjøre.", DialogLayout.Bottom)
            game.showLongText("Du kan gå i butikken for å kjøpe oppgraderinger og utstyr. Hvis du er nokk oppgradert så kan du kanskje ta hånd om bandittene som har plaget byen.", DialogLayout.Bottom)
            game.showLongText("Vanligvis kan en få kjøpt kjeks av boden, men eieren har mistet hunden sin og klarer ikke lage kjeks lenger", DialogLayout.Bottom)
        } else {
            game.showLongText("Kom tilbake om du står fast", DialogLayout.Bottom)
        }
        
        playerChar.setPosition(230, 110)
    }
    
    //  Oppdaterer karakterens animasjon
    update_character_animation()
})
