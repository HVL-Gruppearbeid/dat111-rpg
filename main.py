##############
# "Database"     #
##############

#Klassedeklarasjoner
@namespace
class SpriteKind:
    exit = SpriteKind.create()
    
    potions = SpriteKind.create()

    npc = SpriteKind.create()
    
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


### Karakteren ###
# Oppretter den visuelle representasjonen av karakteren som en sprite ("bevegelig bilde").
# SpriteKind er en enum som lar oss kategorisere spriten for å senere enkelt kunne utføre operasjoner på sprites av samme kategori.
playerChar = sprites.create(assets.image("heroIdleFront"), SpriteKind.player)
playerChar.set_position(128, 250) # Setter posisjonen til karakteren til å være nederst i midten av brettet
scene.camera_follow_sprite(playerChar) # Setter kameraet til å følge etter karakteren sin sprite.
# Angir karakteren sin sprite som "bevegelses-sprite", dvs. at standardkontrollene vil nå påvirke spillerens sprite.
controller.move_sprite(playerChar)

### Mat ###
# Oppretter sprite for en taco og setter dens posisjon.
taco = sprites.create(assets.image("taco"), SpriteKind.food)
taco.set_position(10, 100)

### Potions ###
strPotion = sprites.create(assets.image("strPotion"), SpriteKind.potions)
strPotion.set_position(0, 0)

intellectPotion = sprites.create(assets.image("intPotion"), SpriteKind.potions)
intellectPotion.set_position(0, 0)

agilityPotion = sprites.create(assets.image("aglPotion"), SpriteKind.potions)
agilityPotion.set_position(0, 0)
    
speedPotion = sprites.create(assets.image("spdPotion"), SpriteKind.potions)
speedPotion.set_position(0, 0)

choice = False

def purchaseYes():
    global choice
    choice = game.ask("Kjøp en potion?", "Strength: 20 Gull")
    return True

###Teleportører###
Til_LoreTile = sprites.create(assets.image("Til_Lore"), SpriteKind.food)
Til_LoreTile.set_position(0, 100)

BandittEnter = sprites.create(assets.image("Til_Banditt"),SpriteKind.food)

BandittExit = sprites.create(assets.image("Til_Banditt"),SpriteKind.exit)
BandittExit.set_position(0, 0)



### Skattekiste ###
# Oppretter sprite for en skattekiste og setter dens posisjon.
treasure = sprites.create(assets.image("chestClosed"), SpriteKind.food)
treasure.set_position(200, 150)
# Angir at kisten ikke er åpnet enda, slik at vi senere unngå at gull gis mer enn en gang til spilleren.
treasureNotOpened = True 



### Banditter ###
Banditt: Sprite = None
Banditt2: Sprite = None
Banditt3: Sprite = None



### Musikk ###
# Starter bakgrunnsmusikk som er et lydspor lagret i Assets.
# Setter PlaybackMode til en verdi som gjør at sporet spilles kontinuerlig i bakgrunnen.
music.play(music.create_song(assets.song("backgroundSong")), 
music.PlaybackMode.LOOPING_IN_BACKGROUND)

shop = sprites.create(assets.image("house"), SpriteKind.food)
shopExit = sprites.create(assets.image("PlaceHolder_Ingenting"), SpriteKind.exit)


field_level()

##############
# Funksjoner #
##############

# Variabel for å holde kontroll på om spilleren vil inn i butikken.
enterShop = False
exitShop = False
Kjeks = False
Bro: Sprite = None
bod: Sprite = None


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

def Destroy_Sprites():
    sprites.destroy_all_sprites_of_kind(SpriteKind.food)
    sprites.destroy_all_sprites_of_kind(SpriteKind.npc)
    sprites.destroy_all_sprites_of_kind(SpriteKind.exit)

def VilHaKjeks():
    global Kjeks
    Kjeks = game.ask("Vil du kjøpe en Kjeks for 1 gull?")
    return True

###############
# LEVELS #
###############
def butikk_level():
    global strPotion, intellectPotion, agilityPotion, speedPotion

    tiles.set_current_tilemap(tilemap("shopInterior")) # Endrer tilemap
    shopExit.set_position(120,180)
    playerChar.set_position(120,160) # Oppdaterer spillerens posisjon
    ### Butikk-fyren ###
    butikkEier = sprites.create(assets.image("ButikkEier"), SpriteKind.Food)
    butikkEier.set_position(120, 65)
    
    ### Bod i butikken ###
    bodButikk = sprites.create(assets.image("bordbutikk"), SpriteKind.Food)
    bodButikk.set_position(120, 72)

    ### Potions Posisjon ###
    strPotion = sprites.create(assets.image("strPotion"), SpriteKind.potions)
    strPotion.set_position(90, 120)

    intellectPotion = sprites.create(assets.image("intPotion"), SpriteKind.potions)
    intellectPotion.set_position(110, 120)

    agilityPotion = sprites.create(assets.image("aglPotion"), SpriteKind.potions)
    agilityPotion.set_position(130, 120)
    
    speedPotion = sprites.create(assets.image("spdPotion"), SpriteKind.potions)
    speedPotion.set_position(150, 120)
 





def field_level():
    tiles.set_current_tilemap(tilemap("field_level")) #Endrer tilemap
    
    BandittEnter.set_position(128, 255)
    ### Butikk ###
    # Oppretter sprite for en butikk og setter dens posisjon.
    shop.set_position(128,20)
    shopExit.set_position(128,300)
    playerChar.set_position(128, 230) # Oppdaterer spillerens posisjon
    shopExit.set_position(128,300)

def Banditt_Level():
    global Banditt, Banditt2, Banditt3, BandittExit
    tiles.set_current_tilemap(tilemap("Banditt_Level"))
    sprites.destroy_all_sprites_of_kind(SpriteKind.food)
    sprites.destroy_all_sprites_of_kind(SpriteKind.potions)
    playerChar.set_position(128, 30)


    Banditt = sprites.create(assets.image("Banditt"), SpriteKind.npc)
    Banditt.set_position(128, 145)

    Banditt2 = sprites.create(assets.image("Banditt2"), SpriteKind.npc)
    Banditt2.set_position(148, 130)

    Banditt3 = sprites.create(assets.image("Banditt3"), SpriteKind.npc)
    Banditt3.set_position(100, 130)

    BandittExit.set_position(128, 0)

def Lore_Level():
    tiles.set_current_tilemap(tilemap("Lore_Level")) # Endrer tilemap
                        # Fjerner alle sprites av type food (som vi her har brukt som en generell kategori)
    sprites.destroy_all_sprites_of_kind(SpriteKind.food)
    playerChar.set_position(245,140)
    global bod
    bod = sprites.create(assets.image("Bod"), SpriteKind.food)
    bod.set_position(210, 45)
    global Bro    
    Bro = sprites.create(assets.image("LoreBro"), SpriteKind.food)
    Bro.set_position(150,70)
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
            
        else:
            playerChar.set_position(120,150) # Flytter karakteren til en posisjon som ikke overlapper med butikken.


    if(playerChar.overlaps_with(Til_LoreTile)):
        pause_until(onPauseUntilEnter) # Hjelpefunksjon som holder spillet pauset til brukeren avgir svar.
        if (enterShop):
            Lore_Level()
        else:
            playerChar.set_position(40, 90) # Flytter karakteren til en posisjon som ikke overlapper med butikken.

### Spør spiller om de vil kjøpe strength potion ###
    if(strPotion is not None and playerChar.overlaps_with(strPotion)):
        purchaseYes()
        if(choice):
            stats["strength"] += 2
            game.show_long_text("You got + 2 Strength", DialogLayout.BOTTOM)
        else:
            purchasePotion = False 
            playerChar.set_position(120,150) # Flytter karakteren til en posisjon som ikke overlapper med butikken.    



    ##Prøver å Gi mulighet for Kjeks

    if(Bro and playerChar.overlaps_with(Bro) and teller == 0):
        pause_until(VilHaKjeks)
        if(Kjeks and gold > 1):
            inventory.append("Kjeks x1")
            playerChar.set_position(150, 90)
            teller = 4
        else:
            playerChar.set_position(150,90)
        



    if(playerChar.overlaps_with(BandittEnter)):
        pause_until(onPauseUntilEnter)
        if(enterShop):
            Banditt_Level()
        else:
            playerChar.set_position(120,120)

    if(playerChar.overlaps_with(BandittExit)):
        pause_until(onPauseUntilExit)
        if(enterShop):
            sprites.destroy_all_sprites_of_kind(SpriteKind.npc)
            sprites.destroy_all_sprites_of_kind(SpriteKind.exit)
            field_level()
        else:
            playerChar.set_position(128,30)
        
    


# Oppdaterer karakterens animasjon
    update_character_animation()
        


                

#def venstre_slipp():
 #   animation.run_image_animation(playerChar,
  #      assets.animation("Hero_StandStill_Left"),
   #     0)
    



# Funksjon som sørger for at animasjonene passer med bevegelsen som foregår.
def update_character_animation():
    global current_animation # Variabel som hjelper oss til å unngå å overskrive pågående animasjoner.

    # Akriverer venstrestilt animasjon dersom venstre tast er trykket.
    if(controller.left.is_pressed()):

        if(current_animation != "walk_left"): # Unngår å overskrive pågående animasjon
            # Starter animasjon på spillerens karakter, med gitt animasjon og hastighet, og setter den til å loope.
            animation.run_image_animation(playerChar, 
            assets.animation("heroWalkLeft"), 200, True)
            current_animation = "walk_left"
        
        
            #controller.left.on_event(ControllerButtonEvent.RELEASED, venstre_slipp)


    if(controller.right.is_pressed()):
         if(current_animation != "walk_right"): # Unngår å overskrive pågående animasjon
              # Starter animasjon på spillerens karakter, med gitt animasjon og hastighet, og setter den til å loope.
                 animation.run_image_animation(playerChar,
                 assets.animation("heroWalkRight"), 200, True)
                 current_animation = "walk_right"

    if(controller.down.is_pressed()):
         if(current_animation != "walk_down"): # Unngår å overskrive pågående animasjon
              # Starter animasjon på spillerens karakter, med gitt animasjon og hastighet, og setter den til å loope.
                 animation.run_image_animation(playerChar,
                 assets.animation("heroWalkDown"), 200, True)
                 current_animation = "walk_down"

    if(controller.up.is_pressed()):
            if(current_animation != "walk_up"): # Unngår å overskrive pågående animasjon
                 # Starter animasjon på spillerens karakter, med gitt animasjon og hastighet, og setter den til å loope.
                 animation.run_image_animation(playerChar,
                assets.animation("heroWalkUp"), 200, True)
                 current_animation = "walk_up"

# Skal bli Fighting
def Fighting():

    if(playerChar.overlaps_with(Banditt) and controller.A.is_pressed()):
            if(current_animation == "walk_down"):
                current_animation = "Hero_Stab_Down"

# Oppgir at vår on_update-funksjon skal fungere som on_update,
# dvs. det som fungerer som spilløkken som oppdateres kontinuerlig
# og sørger for at spillet blir interaktivt.
game.on_update(on_update)


