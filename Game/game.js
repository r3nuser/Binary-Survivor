(function () {
    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");
    var texteditor = document.getElementById("text-lines");
    // debug
    var plr_x_d = document.getElementById("plr-x"),
        plr_y_d = document.getElementById("plr-y"),
        cam_x_d = document.getElementById("cam-x"),
        cam_y_d = document.getElementById("cam-y"),
        blc_x_d = document.getElementById("blc-x"),
        blc_y_d = document.getElementById("blc-y");

    // game resources
    var monster = new Image();
    monster.src = "monster.png";

    var torch_img = new Image();
    torch_img.src = "Object/torch/torch.png"

    var grass_img = new Image();
    grass_img.src = "tiles/grass.png";

    var stone_img = new Image();
    stone_img.src = "tiles/stone.png";

    var sand_img = new Image();
    sand_img.src = "tiles/sand.png";

    var shadow = new Image();
    shadow.src = "tiles/shadow.png";

    // objects
    var sprites = [];
    var grass = new Tile();
    grass.width = 32;
    grass.height = 32;
    grass.img = grass_img;
    grass.id = 1;
    grass.collision = false;

    var sand = new Tile();
    sand.width = 32;
    sand.height = 32;
    sand.img = sand_img;
    sand.id = 3;
    sand.collision = false;

    var stone = new Tile();
    stone.width = 32;
    stone.height = 32;
    stone.img = stone_img;
    stone.id = 2;
    stone.collision = true;

    var torch = new Light();
    torch.width = 32;
    torch.height = 32;
    torch.img = torch_img;
    torch.id = 5;
    torch.x = 32 * 20;
    torch.y = 32 * 20;
    torch.collision = true;

    var player = new Player();
    player.img = monster;
    player.width = 32;
    player.height = 64;
    player.light_font = true;
    player.light_radius = 8;

    var gameWorld = new World();
    gameWorld.i_size = 60;
    gameWorld.j_size = 60;
    gameWorld.generateWorld();
    gameWorld.width = gameWorld.i_size * grass.width;
    gameWorld.height = gameWorld.j_size * grass.height;


    console.log(gameWorld.shadow);
    sprites.push(torch);
    sprites.push(player);


    player.x = (gameWorld.width - player.width) / 2;
    player.y = (gameWorld.height - player.height) / 2;

    //criando a camera
    var cam = new Camera();
    cam.width = cnv.width;
    cam.height = cnv.height;

    //centralizar a camera
    cam.x = (gameWorld.width - cam.width) / 2;
    cam.y = (gameWorld.height - cam.height) / 2;

    //controls
    window.addEventListener('keydown', function (e) {
        if (texteditor != document.activeElement) {
            var key = e.keyCode;
            switch (key) {
                case 37:
                    player.mvLeft = true;
                    break;
                case 38:
                    player.mvUp = true;
                    break;
                case 39:
                    player.mvRight = true;
                    break;
                case 40:
                    player.mvDown = true;
                    break;
            }
        }
    }, false);
    window.addEventListener('keyup', function (e) {
        if (texteditor != document.activeElement) {
            var key = e.keyCode;
            switch (key) {
                case 37:
                    player.mvLeft = false;
                    break;
                case 38:
                    player.mvUp = false;
                    break;
                case 39:
                    player.mvRight = false
                    break;
                case 40:
                    player.mvDown = false;
                    break;
            }
        }
    }, false);

    function loop() {
        window.requestAnimationFrame(loop, cnv);
        update();
        render();
        debug();
    }
    function debug() {
        plr_x_d.innerHTML = player.x + " ";
        plr_y_d.innerHTML = player.y + " ";
        cam_x_d.innerHTML = cam.x + " ";
        cam_y_d.innerHTML = cam.y + " ";
        blc_x_d.innerHTML = player.block_x + " ";
        blc_y_d.innerHTML = player.block_y + " ";
    }
    function update() {
        player.moviment_player();
        // limite do edge
        cam.edgeLimit(player);
        // limite da camera
        cam.cameraLimit(gameWorld);
        // limite do personagem
        player.player_limit(gameWorld);

        player.block_x = parseInt((player.x / grass.width));
        player.block_y = parseInt((player.y / grass.height));

        //colisao do personagem

    }


    function render() {
        ctx.save();
        ctx.translate(-cam.x, -cam.y);
        drawCleanBackground();
        dynamicDraw(10);
        for (var i in sprites) {
            var sp = sprites[i];
            ctx.drawImage(sp.img, 0, 0, sp.width, sp.height, sp.x, sp.y, sp.width, sp.height);
        }
        ctx.globalAlpha = 1;
        ctx.restore();
        //hud
    }
    function dynamicDraw(range) {
        var alpha = 1 / range;
        var mid = false;
        var a = 0;
        for (var i = player.block_x - range; i < player.block_x + range + 2; i++) {

            for (var j = player.block_y - range; j < player.block_y + range + 2; j++) {
                if (i >= 0 && j >= 0 && i < gameWorld.i_size && j < gameWorld.j_size){
                    gameWorld.shadow[i][j] = 1;
                }
            }

            var mid_up = ((player.block_y - range) + (player.block_y + range + 2)) / 2 - 1;
            var mid_down = mid_up + 1;
            
            for (var k = mid_up; k > mid_up - a; k--) {
                if (i < 0 || k < 0) break;
                if (i > gameWorld.i_size || k > gameWorld.j_size) continue;
                gameWorld.shadow[i][k] = 1 - (alpha * a) - ((k - mid_up) * alpha);

            }
            for (var k = mid_down; k < mid_down + a; k++) {
                if (i < 0 || k < 0) break;
                if (i > gameWorld.i_size || k > gameWorld.j_size) continue;
                gameWorld.shadow[i][k] = 1 - (alpha * a) + ((k - mid_down) * alpha);


            }

            if (a == range) {
                a = 0;
                mid = true;
            }
            if (mid) a--;
            else a++;

        }


        for (var i = player.block_x - range; i < player.block_x + range + 2; i++) {
            for (var j = player.block_y - range; j < player.block_y + range + 2; j++) {
                if (i >= 0 && j >= 0 && i < gameWorld.i_size && j < gameWorld.j_size) {
                    var tile;
                    switch (gameWorld.matrix[i][j]) {
                        case 1:
                            tile = grass;
                            break;
                        case 2:
                            tile = stone;
                            break;
                        case 3:
                            tile = sand;
                            break;
                        default:
                            tile = grass;
                            break;
                    }
                    ctx.globalAlpha = 1;
                    ctx.drawImage(tile.img, 0, 0, tile.width, tile.height, tile.width * i, tile.height * j, tile.width, tile.height);
                    if (tile.collision == true) {
                        player.encostou(tile, 32 * i, 32 * j);
                    }
                    ctx.globalAlpha = gameWorld.shadow[i][j];
                    ctx.drawImage(shadow, 0, 0, 32, 32, 32 * i, 32 * j, 32, 32);
                }
            }

        }
        ctx.globalAlpha = 1;
    }


    function drawCleanBackground() {
        ctx.fillRect(0, 0, gameWorld.width, gameWorld.height);
    }



    loop();
}());