##############
# "Database"     #
##############

#Klassedeklarasjoner
@namespace
class SpriteKind:
    exit = SpriteKind.create()
    potions = SpriteKind.create()
    npc = SpriteKind.create()
    shop_level = SpriteKind.create()
    main_level = SpriteKind.create()


move_speed = 200
current_Bandit = 0
fighting_Check = False

    
# Oversikt over utstyret som finnes i spillet.
# Uttrykt som en ordbok nøkkel-verdi-par, en tekststreng som nøkkel og verdier som tupler.
equipmentDatabase = {
    "Tunic of speed" : ("speed", 5)
}

#######################
# Oppsett av karakter     #
#######################

# Setter startverdi for gull i en vanlig variabel 
# Vi oppdaterer denne senere når karakteren åpner en kiste og kjøper/selger ting i butikken.
gold = 20
teller = 0

# Grunnivået på ferdighetene til karakteren
# Uttrykt ved hjelp av en ordbok/dictionary (nøkkel : verdi)
stats = {
    "strength": 3,
    "intellect": 1,
    "agility": 2,
    "speed": 5
}

# Inventaret til karakteren, uttrykt ved hjelp av tekststrenger i en liste.
# Tekststrengene i listen skal være nøkkelverdien til elementer i equipmentDatabase,
# slik at man da kan hente ut de tilhørende verdiene derfra.
inventory = [""]

# Setter startanimasjon til å være idel/ledig.
# Bruker denne variabelen senere for å håndtere korrekt animering
current_animation = "idle"

###########################
# Oppsett av nivået/banen #
###########################

### Banen ###
# Setter tilemap, som er en samling av tiles/fliser som vi har satt sammen for å danne nivået vårt.
# Tilemaps og andre audiovisuelle elementer finner man under "Assets" i toppmenyen.

tiles.set_current_tilemap(tilemap("field_level"))

# Usikker på om det er en bug, men etter at sprites blir ødelagt, også 'created' på nytt, så fungerer ikke overlaps_with med den samme spriten lengre.
# Som en skitten workaround, så blir alle sprites generert ved oppstart, og flyttet off map, og flyttet inn igjen ved tilemap change.


### Karakteren ###
# Oppretter den visuelle representasjonen av karakteren som en sprite ("bevegelig bilde").
# SpriteKind er en enum som lar oss kategorisere spriten for å senere enkelt kunne utføre operasjoner på sprites av samme kategori.
playerChar = sprites.create(assets.image("heroIdleFront"), SpriteKind.player)
playerChar.set_position(128, 250) # Setter posisjonen til karakteren til å være nederst i midten av brettet
scene.camera_follow_sprite(playerChar) # Setter kameraet til å følge etter karakteren sin sprite.
# Angir karakteren sin sprite som "bevegelses-sprite", dvs. at standardkontrollene vil nå påvirke spillerens sprite.

if (fighting_Check == False):
    controller.move_sprite(playerChar)


### Mat ###
# Oppretter sprite for en taco og setter dens posisjon.
taco = sprites.create(assets.image("taco"), SpriteKind.food)

### Shop ###
shop = sprites.create(assets.image("house"), SpriteKind.main_level)
shopExit = sprites.create(assets.image("PlaceHolder_Ingenting"), SpriteKind.exit)
butikkEier = sprites.create(assets.image("ButikkEier"), SpriteKind.shop_level)
bodButikk = sprites.create(assets.image("bordbutikk"), SpriteKind.shop_level)

### Potions ###
strPotion = sprites.create(assets.image("strPotion"), SpriteKind.shop_level)

intellectPotion = sprites.create(assets.image("intPotion"), SpriteKind.shop_level)

agilityPotion = sprites.create(assets.image("aglPotion"), SpriteKind.shop_level)
    
speedPotion = sprites.create(assets.image("spdPotion"), SpriteKind.shop_level)

###Utstyr###
Bow = sprites.create(assets.image("BowAndArrow"), SpriteKind.food)
Sheild = sprites.create(assets.image("Sheild"), SpriteKind.food)
Sword = sprites.create(assets.image("Sword"), SpriteKind.food)

### Bandits ###
Banditt = sprites.create(assets.image("Banditt"), SpriteKind.npc)
Banditt2 = sprites.create(assets.image("Banditt2"), SpriteKind.npc)
Banditt3 = sprites.create(assets.image("Banditt3"), SpriteKind.npc)

#Dekker
Dekker = sprites.create(assets.image("Dekker"),SpriteKind.food)

### Vil kjøpe potion? ###
choice = False


    

###Teleportører###
Til_LoreTile = sprites.create(assets.image("Til_Lore"), SpriteKind.food)

BandittEnter = sprites.create(assets.image("Til_Banditt"),SpriteKind.food)

BandittExit = sprites.create(assets.image("Til_Banditt"),SpriteKind.exit)

Til_Hund = sprites.create(assets.image("Til_Lore"),SpriteKind.food)

Lore_Exit = sprites.create(assets.image("Til_Lore"), SpriteKind.exit)

Hund_Exit = sprites.create(assets.image("Til_Lore"),SpriteKind.exit)

### Skattekiste ###
# Oppretter sprite for en skattekiste og setter dens posisjon.
treasure = sprites.create(assets.image("chestClosed"), SpriteKind.food)
# Angir at kisten ikke er åpnet enda, slik at vi senere unngå at gull gis mer enn en gang til spilleren.
treasureNotOpened = True 


### Musikk ###
# Starter bakgrunnsmusikk som er et lydspor lagret i Assets.
# Setter PlaybackMode til en verdi som gjør at sporet spilles kontinuerlig i bakgrunnen.
music.play(music.create_song(assets.song("backgroundSong")), 
music.PlaybackMode.LOOPING_IN_BACKGROUND)

#Hund#
Hund = sprites.create(assets.image("Hund_Front"),SpriteKind.food)
bod = sprites.create(assets.image("Bod"), SpriteKind.food)
Bro = sprites.create(assets.image("LoreBro"), SpriteKind.food)

#Lager en funksjon for å flytte alle sprites på en gang, for å 
#korte ned koden
def flytte_sprites():
    taco.set_position(0, 0)
    Bro.set_position(0, 0)
    bod.set_position(0, 0)
    shop.set_position(0, 0)
    shopExit.set_position(0,0)
    butikkEier.set_position(0,0)
    bodButikk.set_position(0,0)
    Bow.set_position(0, 0)
    Sheild.set_position(0, 0)
    Sword.set_position(0, 0)
    strPotion.set_position(0, 0)
    intellectPotion.set_position(0, 0)
    agilityPotion.set_position(0, 0)
    speedPotion.set_position(0, 0)
    Banditt.set_position(0, 0)
    Banditt2.set_position(0, 0)
    Banditt3.set_position(0, 0)
    Til_LoreTile.set_position(0, 0)
    BandittEnter.set_position(0, 0)
    BandittExit.set_position(0, 0)
    treasure.set_position(0, 0)
    Til_Hund.set_position(0, 0)
    Lore_Exit.set_position(0, 0)
    Hund.set_position(0, 0)
    Hund_Exit.set_position(0, 0)

    Dekker.set_position(15, 15)


field_level()

##############
# Funksjoner #
##############

# Variabel for å holde kontroll på om spilleren vil inn i butikken.
enterShop = False
exitShop = False
Kjeks = False


# Hjelpefunksjon som lar oss pause spillet frem til spilleren har utført et valg.
# Manglet implementasjon i Python for MakeCode Arcade.
def onPauseUntilEnter():
    global enterShop 
    enterShop = game.ask("Enter?")
    return True

def onPauseUntilExit():
    global exitShop
    exitShop = game.ask("Exit?")
    return True



def VilHaKjeks():
    global Kjeks
    Kjeks = game.ask("Vil du kjøpe en Kjeks for 1 gull?")
    return True

###############
# LEVELS #
###############




def field_level():
    tiles.set_current_tilemap(tilemap("field_level")) #Endrer tilemap
    flytte_sprites()



    BandittEnter.set_position(128, 255)
    ### Butikk ###
    # Oppretter sprite for en butikk og setter dens posisjon.
    shop.set_position(128,20)
    shopExit.set_position(128,300)
    playerChar.set_position(128, 230) # Oppdaterer spillerens posisjon
    shopExit.set_position(128,300)
    taco.set_position(30, 100)
    Til_LoreTile.set_position(2,100)
    treasure.set_position(200, 150)



def butikk_level():
    global strPotion, intellectPotion, agilityPotion, speedPotion
    flytte_sprites()

    tiles.set_current_tilemap(tilemap("shopInterior")) # Endrer tilemap
    shopExit.set_position(120,180)
    playerChar.set_position(120,160) # Oppdaterer spillerens posisjon
    # Butikk-fyren #
    
    butikkEier.set_position(120, 65)
    
    # Bod i butikken #
    
    bodButikk.set_position(120, 72)

    # Potions Posisjon #
    strPotion.set_position(90, 100)
    intellectPotion.set_position(110, 100)
    agilityPotion.set_position(130, 100)
    speedPotion.set_position(150, 100)

    # Utstyrs Posisjon #
    Bow.set_position(160, 120)
    Sheild.set_position(75, 135)
    Sword.set_position(160, 150)

def Banditt_Level():
    global Banditt, Banditt2, Banditt3, BandittExit
    tiles.set_current_tilemap(tilemap("Banditt_Level"))
    playerChar.set_position(128, 70)
    flytte_sprites()


    Banditt.set_position(128, 145)
    Banditt2.set_position(148, 130)
    Banditt3.set_position(100, 130)

    BandittExit.set_position(128, 0)

def Lore_Level():
    tiles.set_current_tilemap(tilemap("Lore_Level")) # Endrer tilemap
    flytte_sprites()
    
    playerChar.set_position(245,140)

    
    bod.set_position(210, 45)

    
    Bro.set_position(150,70)

    Til_Hund.set_position(2, 140)
    Lore_Exit.set_position(250, 140)

    #Fjener butikken
    shop.set_position(0, 0)

def Hund_Level():
    tiles.set_current_tilemap(tilemap("Hund_Level"))
    flytte_sprites()

    Hund.set_position(39,200)
    Hund_Exit.set_position(255,125)



    
# Spilløkken som sørger for interaktivitet i spillet.
def on_update():


    # Taco-spriten blir "spist" dersom spillerkarakteren sin sprite overlapper den.
    # Dette gjøres ved å spille av et lydklipp og sette resterende livstid for sprite til 0.
    if(playerChar.overlaps_with(taco)):
        music.play(music.create_song(assets.song("upgrade")), music.PlaybackMode.IN_BACKGROUND)
        taco.lifespan = 0

    # Sørger for at vi bruker de globale verdiene til disse variablene
    # (som vi definerte tidligere), ellers ville det blitt opprettet lokale
    # variabler med samme navn når vi endrer verdi på de.
    global treasureNotOpened
    global gold
    global move_speed
    global current_Bandit
    global fighting_Check
    

    # En skattekiste blir åpnet dersom spillerens sprite overlapper og kisten ikke har vært åpnet før.
    # Ved flere enn en kiste på kartet bør 
    if(playerChar.overlaps_with(treasure) and treasureNotOpened):
        gold = gold + 100 # Oppdaterer gullbeholdningen til spilleren
        treasure.setImage(assets.image("chestOpen")) # Bytter ut spriten til kisten med en åpnet variant.
        treasureNotOpened = False # Sier at kisten har blitt åpnet, slik at vi ikke går inn i denne if-en igjen.
        # Spiller av "upgrade"-lydsporet. PlaybackMode IN_BACKGROUND gjør at spillet fortsetter samtidig som den spiller.
        music.play(music.create_song(assets.song("upgrade")), music.PlaybackMode.IN_BACKGROUND)
        # Spilleren får en beskjed i en dialogboks om at de har fått mer gull.
        game.show_long_text("You got " + str(100) + " gold!", DialogLayout.BOTTOM)
        
    

    # Dersom spillerens sprite overlapper med butikken vil de kunne gå inn i den.
    if(playerChar.overlaps_with(shop)):
        pause_until(onPauseUntilEnter) # Hjelpefunksjon som holder spillet pauset til brukeren avgir svar.
        if (enterShop):
            butikk_level()
        else:
            playerChar.set_position(128, 70) # Flytter karakteren til en posisjon som ikke overlapper med butikken.

    if(playerChar.overlaps_with(shopExit)):
        pause_until(onPauseUntilExit) # Hjelpefunksjon som holder spillet pauset til brukeren avgir svar.
        if (exitShop):
            field_level()
            playerChar.set_position(128, 70)
        else:
            playerChar.set_position(125,160) # Flytter karakteren til en posisjon som ikke overlapper med butikken.
        ##Lore_Level##
    if(playerChar.overlaps_with(Til_LoreTile)):
        Lore_Level()
        playerChar.set_position(220, 130)
        
    if(playerChar.overlaps_with(Lore_Exit)):
        field_level()
        playerChar.set_position(15, 90)
        ##Banditt_Level##
    if(playerChar.overlaps_with(BandittEnter)):
        Banditt_Level()
        playerChar.set_position(128, 20)
    
    if(playerChar.overlaps_with(BandittExit)):
        
        field_level()
        playerChar.set_position(128, 228)
        ##Hund_Level##
    if(playerChar.overlaps_with(Til_Hund)):
        Hund_Level()
        playerChar.set_position(230, 125)
            
    if(playerChar.overlaps_with(Hund_Exit)):
        Lore_Level()
        playerChar.set_position(30, 140)
            



### Spør spiller om de vil kjøpe strength potion ###
    if(strPotion is not None and playerChar.overlaps_with(strPotion)):
        choice = game.ask("Kjøp en potion?", "Strength: 20 Gull")
        if(choice):
            if(gold >= 20):
                gold= gold - 20
                stats["strength"] += 2
                game.show_long_text("Du har fått +2 Strength", DialogLayout.BOTTOM)
                playerChar.set_position(90,120)
                purchasePotion = True
            else:
                game.show_long_text("Du har mindre enn 20 gull", DialogLayout.BOTTOM)
                purchasePotion = False
                playerChar.set_position(90,120) # Flytter karakteren til en posisjon som ikke overlapper med butikken.
        else:
            purchasePotion = False
            playerChar.set_position(90, 120)
### Spør spiller om de vil kjøpe intellect potion ###

    if(intellectPotion is not None and playerChar.overlaps_with(intellectPotion)):
        
        choice = game.ask("Kjøp en potion?", "Intelligens: 20 Gull")
        if(choice):
            if(gold >= 20):
                gold = gold - 20
                stats["intellect"] += 2
                game.show_long_text("Du har fått +2 Intelligens", DialogLayout.BOTTOM)
                playerChar.set_position(110,120)
                purchasePotion = True
            else:
                game.show_long_text("Du har mindre enn 20 gull", DialogLayout.BOTTOM)
                purchasePotion = False
                playerChar.set_position(110,120)
        else:
            purchasePotion = False
            playerChar.set_position(110,120) # Flytter karakteren til en posisjon som ikke overlapper med butikken.

### Spør spiller om de vil kjøpe agility potion ###
    if(agilityPotion is not None and playerChar.overlaps_with(agilityPotion)):
            
            choice = game.ask("Kjøp en potion?", "Agility: 20 Gull")
            if(choice):
                if(gold >= 20):
                    gold = gold - 20
                    stats["agility"] += 2
                    game.show_long_text("Du har fått +2 Agility", DialogLayout.BOTTOM)
                    playerChar.set_position(130,120)
                    purchasePotion = True
                else:
                    game.show_long_text("Du har mindre enn 20 gull", DialogLayout.BOTTOM)
                    purchasePotion = False
                    playerChar.set_position(130,120)
            else:
                purchasePotion = False
                playerChar.set_position(130,120) # Flytter karakteren til en posisjon som ikke overlapper med butikken.

### Spør spiller om de vil kjøpe speed potion ###

    if(speedPotion is not None and playerChar.overlaps_with(speedPotion)):
            choice = game.ask("Kjøp en potion?", "Speed: 20 Gull")
            if(choice):
                if(gold >= 20):
                    gold = gold - 20
                    stats["speed"] += 2
                    game.show_long_text("Du har fått +2 Speed", DialogLayout.BOTTOM)
                    playerChar.set_position(150,120)
                    purchasePotion = True
                else: 
                    game.show_long_text("Du har mindre enn 20 gull", DialogLayout.BOTTOM)
                    purchasePotion = False
                    playerChar.set_position(150,120)
            else:
                
                purchasePotion = False
                playerChar.set_position(150,120) # Flytter karakteren til en posisjon som ikke overlapper med butikken.

        ##########
        ##Utstyr##
        ##########

    if(Sword is not None and playerChar.overlaps_with(Sword)):
        choice = game.ask("Kjøp et Sverd?", "Sverd: 50 Gull")
        if(choice):
            if(gold >= 50):
                gold = gold - 50
                inventory.append("Sword")       
                game.show_long_text("Du har fått Sverd", DialogLayout.BOTTOM)
            else:
                game.show_long_text("Du har mindre enn 50 gull", DialogLayout.BOTTOM)
        playerChar.set_position(145,150) # Flytter karakteren til en posisjon som ikke overlapper med butikken.

    if(Sheild is not None and playerChar.overlaps_with(Sheild)):
        choice = game.ask("Kjøp et Skjold?", "Skjold: 30 Gull")
        if(choice):
            if(gold >= 30):
                gold = gold - 30
                inventory.append("Sheild")
                game.show_long_text("Du har fått Skjold", DialogLayout.BOTTOM)
            else:
                game.show_long_text("Du har mindre enn 30 gull", DialogLayout.BOTTOM)
        playerChar.set_position(90,135) # Flytter karakteren til en posisjon som ikke overlapper med butikken.

    if(Bow is not None and playerChar.overlaps_with(Bow)):
        choice = game.ask("Kjøp en Bue?", "Bue: 25 Gull")
        if(choice):
            if(gold >= 25):
                gold = gold - 25
                inventory.append("Bow")
                game.show_long_text("Du har fått Bue", DialogLayout.BOTTOM)
            else:
                game.show_long_text("Du har mindre enn 25 gull", DialogLayout.BOTTOM)
        else:      
            playerChar.set_position(145,120) # Flytter karakteren til en posisjon som ikke overlapper med butikken.





    ##Prøver å Gi mulighet for Kjeks

    if(Bro and playerChar.overlaps_with(Bro) and teller == 0):
        pause_until(VilHaKjeks)
        if(Kjeks and gold > 1):
            inventory.append("Kjeks x1")
            playerChar.set_position(150, 90)
            teller = 4
        else:
            playerChar.set_position(150,90)
        

    ### Fight check ###

    if(playerChar.overlaps_with(Banditt)):
        move_speed = 0
        current_Bandit = 1
        fighting_Check = True
        fighting()
    
    if(playerChar.overlaps_with(Banditt2)):
            move_speed = 0
            current_Bandit = 2
            fighting()

    if(playerChar.overlaps_with(Banditt3)):
        move_speed = 0
        current_Bandit = 3
        fighting()
    


# Oppdaterer karakterens animasjon
    update_character_animation()
        


                

#def venstre_slipp():
 #   animation.run_image_animation(playerChar,
  #      assets.animation("Hero_StandStill_Left"),
   #     0)
    



# Funksjon som sørger for at animasjonene passer med bevegelsen som foregår.
def update_character_animation():
    global current_animation # Variabel som hjelper oss til å unngå å overskrive pågående animasjoner.
    
    
    # Aktiverer venstrestilt animasjon dersom venstre tast er trykket.
    if(controller.left.is_pressed()):

        if(current_animation != "walk_left"): # Unngår å overskrive pågående animasjon
            # Starter animasjon på spillerens karakter, med gitt animasjon og hastighet, og setter den til å loope.
            animation.run_image_animation(playerChar, 
            assets.animation("heroWalkLeft"), move_speed, True)
            current_animation = "walk_left"
        
        
            #controller.left.on_event(ControllerButtonEvent.RELEASED, venstre_slipp)
        

    if(controller.right.is_pressed()):
        if(current_animation != "walk_right"): # Unngår å overskrive pågående animasjon
            # Starter animasjon på spillerens karakter, med gitt animasjon og hastighet, og setter den til å loope.
                animation.run_image_animation(playerChar,
                assets.animation("heroWalkRight"), move_speed, True)
                current_animation = "walk_right"

    if(controller.down.is_pressed()):
        if(current_animation != "walk_down"): # Unngår å overskrive pågående animasjon
            # Starter animasjon på spillerens karakter, med gitt animasjon og hastighet, og setter den til å loope.
                animation.run_image_animation(playerChar,
                assets.animation("heroWalkDown"), move_speed, True)
                current_animation = "walk_down"

    if(controller.up.is_pressed()):
            if(current_animation != "walk_up"): # Unngår å overskrive pågående animasjon
                # Starter animasjon på spillerens karakter, med gitt animasjon og hastighet, og setter den til å loope.
                animation.run_image_animation(playerChar,
                assets.animation("heroWalkUp"), move_speed, True)
                current_animation = "walk_up"


def fighting():

    global fighting_Check
    fighting_Check = True
    playerChar.set_velocity(0, 0)

    tiles.set_current_tilemap(tilemap("battle_map"))
    Til_LoreTile.set_position(0, 0)
    playerChar.set_position(20,130)
    scaling.scale_to_percent(playerChar, 500, ScaleDirection.UNIFORMLY, ScaleAnchor.MIDDLE)
    playerChar.set_stay_in_screen(True)
    game.show_long_text("A wild Bandit appears!", DialogLayout.BOTTOM)

    # Prøvde ein while loop her for å "holde" spillet i combat. Men med den ekstremt awkward number selectoren, så ser du jo ikkje nåke anna.
    if (current_Bandit == 1):
        Banditt2.set_position(0,0)
        Banditt3.set_position(0,0)
        Banditt.set_position(130, 130)
        scaling.scale_to_percent(Banditt, 300, ScaleDirection.UNIFORMLY, ScaleAnchor.MIDDLE)
        Banditt.set_stay_in_screen(True)
        
    elif (current_Bandit == 2):
        Banditt.set_position(0,0)
        Banditt3.set_position(0,0)
        Banditt2.set_position(130, 130)
        scaling.scale_to_percent(Banditt2, 300, ScaleDirection.UNIFORMLY, ScaleAnchor.MIDDLE)
        Banditt2.set_stay_in_screen(True)

    else:
        Banditt.set_position(0,0)
        Banditt2.set_position(0,0)
        Banditt3.set_position(130, 130)
        scaling.scale_to_percent(Banditt3, 300, ScaleDirection.UNIFORMLY, ScaleAnchor.MIDDLE)
        Banditt3.set_stay_in_screen(True)

    pause(100)
    attack_type = game.ask_for_number("1 =  Fast attack, 2 =  Heavy attack, 3 = Smart attack")
    if (attack_type == 1):
        attack_type = 1
        
        
    elif (attack_type == 2):
        attack_type = 1
    else:
        attack_type = 1


    pause(1000)


    


# Oppgir at vår on_update-funksjon skal fungere som on_update,
# dvs. det som fungerer som spilløkken som oppdateres kontinuerlig
# og sørger for at spillet blir interaktivt.
game.on_update(on_update)


