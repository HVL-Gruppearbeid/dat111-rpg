// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "Hund_Level":
            case "Hund_Level1":return tiles.createTilemap(hex`1000100007070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070704040404040202020202020207070707040505050401010101010101070707070405060504010101010101010707070704050505040101010101010107070707040404040403030303030303070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707070707`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.castle.tilePath5,sprites.castle.tilePath2,sprites.castle.tilePath8,sprites.dungeon.floorLight2,myTiles.tile2,sprites.dungeon.floorDark2,sprites.castle.tileGrass1], TileScale.Sixteen);
            case "Slott_Level":
            case "Slott_Level1":return tiles.createTilemap(hex`1000100008010101080808080909090909090909080101010108090809090909090909090808010108080108090909090909090909080808080101080909090909090909090808080801010909090909090909090404040404040404040404040404050902020202020202020202020202020709020202020202020202020202020207090202020202020202020202020202070903030303030303030303030303030609090909090909090909090909090909080909090909090909090909090909080808080808090909090909080808080101080101010809090808080808080801010801010101080808080801010108080101010101080801010101010808080801`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.castle.tileGrass2,sprites.castle.tilePath5,sprites.castle.tilePath8,sprites.castle.tilePath2,sprites.castle.tilePath3,sprites.castle.tilePath9,sprites.castle.tilePath6,sprites.castle.tileGrass1,sprites.skillmap.islandTile4], TileScale.Sixteen);
            case "level":
            case "level1":return tiles.createTilemap(hex`1000100004040c0404040c0404040c04040404020606060606060606060606060606060506060606060606060606060606060605060606060606060606060606060606050606060606060606060606060606060e06060606060606060606060606060605080707070809080707080606060606050a0908070b070b080808060606060605070808090808070708070606060606050b070a08070709080b08060606060605060606060606060606060606060606050606060606060606060606060606060e06060606060606060606060606060605060606060606060606060606060606050606060606060606060606060606060501010d0101010d0101010d0101010103`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.dungeon.greenOuterSouth0,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenOuterNorth0,sprites.dungeon.greenOuterEast0,sprites.dungeon.floorDark2,sprites.dungeon.floorLight2,sprites.dungeon.floorLight5,sprites.dungeon.floorLightMoss,sprites.dungeon.floorLight3,sprites.dungeon.floorLight4,sprites.dungeon.greenOuterNorth2,sprites.dungeon.greenOuterSouth2,sprites.dungeon.greenOuterEast2], TileScale.Sixteen);
            case "Lore_Level":
            case "Lore_Level1":return tiles.createTilemap(hex`1000100001030105050404040404040404040404050105010104040404040404040404040103050103040404040404040404040401010101040404040404040404040404040505040404040404040404040404040404040404040404040404040404040406060606060606060606060606060606020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202070707070707070707070707070707070101010105010101010101010101010101030101010105010303030301010501010101010301010101010103010103010105010101010101050301010103010101010301010103010101010105010101`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . 2 2 . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.castle.tileGrass2,sprites.castle.tilePath5,sprites.castle.tileGrass1,sprites.skillmap.islandTile4,sprites.castle.tileGrass3,sprites.castle.tilePath2,sprites.castle.tilePath8], TileScale.Sixteen);
            case "field_level":
            case "fieldLevel1":return tiles.createTilemap(hex`1000100006060606060606020306060606060606060606060606060203060606060606060606060606060602030606060606060606060606060606020306060606060606070707070707070203070707070707070505050505050501010505050505050504040404040404010104040404040404060606060606060203060606060606060606060606060602030606060606060606060806060606020306080606060606060606060606060203060606080606060606060608060602030608060806060606080806060606020306060608060806060608080606060203060606080806060606060806060602030606060606060606060606060606020306060606060606`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
2 2 2 2 2 2 2 . . 2 2 2 2 2 2 2 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.castle.tilePath5,sprites.castle.tilePath4,sprites.castle.tilePath6,sprites.castle.tilePath8,sprites.castle.tilePath2,sprites.skillmap.islandTile4,sprites.builtin.brick,sprites.castle.tileGrass3], TileScale.Sixteen);
            case "shopInterior":
            case "shopInterior1":return tiles.createTilemap(hex`1000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000308080808080400000000000000000007010101010109000000000000000000070101010101090000000000000000000701010101010900000000000000000007010101010109000000000000000000060a0a010a0a050000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . 2 2 2 2 2 2 2 2 2 . . . . 
. . . 2 . . 2 2 2 . . 2 . . . . 
. . . 2 . . . . . . . 2 . . . . 
. . . 2 . . . . . . . 2 . . . . 
. . . 2 . . . . . . . 2 . . . . 
. . . 2 . . . . . . . 2 . . . . 
. . . 2 . . . . . . . 2 . . . . 
. . . 2 2 2 2 . 2 2 2 2 . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.dungeon.darkGroundCenter,sprites.dungeon.stairNorth,sprites.dungeon.darkGroundNorthWest0,sprites.dungeon.darkGroundNorthEast0,sprites.dungeon.darkGroundSouthEast0,sprites.dungeon.darkGroundSouthWest0,sprites.dungeon.darkGroundWest,sprites.dungeon.darkGroundNorth,sprites.dungeon.darkGroundEast,sprites.dungeon.darkGroundSouth], TileScale.Sixteen);
            case "Banditt_Level":
            case "Banditt_level1":return tiles.createTilemap(hex`10001000090909090b090302020409090a010a08090909090b090302020409090901010a090808080b0903020204090909080a080b0b0b0b0b090302020409090909080a08010a0a080903020204080909090808080801080909030202040109090909090a0808080909030202040808090909090108080809090302020408010909090908080108090906050507090909090909080a080a0909090909090909090909090a080808090909090909090909090909090a09090909090909090909090809090909090901010809090909090a0801080909090101010a090909090908010108090909090a08090909090901080a080a09090909090909090909090a01010a08`, img`
. . . . 2 . . . . . . . . . . . 
. . . . 2 . . . . . . . . . . . 
. . . . 2 . . . . . . . . . . . 
2 2 2 2 2 . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.castle.tileGrass2,sprites.castle.tilePath5,sprites.castle.tilePath4,sprites.castle.tilePath6,sprites.castle.tilePath8,sprites.castle.tilePath7,sprites.castle.tilePath9,sprites.castle.tileGrass1,sprites.skillmap.islandTile4,sprites.castle.tileGrass3,sprites.builtin.brick], TileScale.Sixteen);
            case "battle_map":
            case "battle_map1":return tiles.createTilemap(hex`1000100001010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101020202020202020202020202020202020404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040303030303030303030303030303030301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.castle.tileGrass1,sprites.castle.tilePath2,sprites.castle.tilePath8,sprites.castle.tilePath5], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "Water":
            case "tile2":return tile2;
            case "myTile":
            case "tile1":return tile1;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
