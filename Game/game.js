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
    var background = new Image();
    background.src = "scene.png";

    var monster = new Image();
    monster.src = "monster.png";

    var grass_img = new Image();
    grass_img.src = "tiles/grass.png";

    var stone_img = new Image();
    stone_img.src = "tiles/stone.png";

    var shadow = new Image();
    shadow.src = "tiles/shadow.png";

    // objects
    var sprites = [];
    var grass = new Tile();
    grass.width = 32;
    grass.height = 32;
    grass.img = grass_img;
    grass.id = 1;

    var stone = new Tile();
    stone.width = 32;
    stone.height = 32;
    stone.img = stone_img;
    stone.id = 2;
    stone.collision = true;

    var player = new Player();
    player.img = monster;
    player.width = player.height = 32;


    var gameWorld = {
        i_size: 60,
        j_size: 60,
        matrix: [],
        x: 0,
        y: 0,
        width: 60 * grass.width,
        height: 60 * grass.height
    };

    function generateWorld(gameWorld) {

        for (var i = 0; i < gameWorld.i_size; i++) {
            gameWorld.matrix.push([]);
            for (var j = 0; j < gameWorld.j_size; j++) {
                gameWorld.matrix[i].push(1);
            }
        }
        gameWorld.matrix[2][2] = 2;

        console.log(gameWorld.matrix);
    }

    generateWorld(gameWorld);

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
        blc_x_d.innerHTML = parseInt((player.x / player.width)) + " ";
        blc_y_d.innerHTML = parseInt((player.y / player.height)) + " ";
    }
    function update() {
        player.moviment_player(texteditor);
        // limite do edge
        cam.edgeLimit(player);
        // limite da camera
        cam.cameraLimit(gameWorld);
        // limite do personagem
        player.player_limit(gameWorld);
    }


    function render() {
        ctx.save();

        ctx.translate(-cam.x, -cam.y);
        drawTerrain();
        dynamicDraw(3);
        for (var i in sprites) {
            var sp = sprites[i];
            ctx.drawImage(sp.img, 0, 0, sp.width, sp.height, sp.x, sp.y, sp.width, sp.height);
        }
        ctx.restore();
        //hud
    }

    function dynamicDraw(range) {
        var block_x = parseInt((player.x / player.width)),
            block_y = parseInt((player.y / player.height));

        for (var i = block_x - range; i < block_x + range + 2; i++) {
            for (var j = block_y - range; j < block_y + range + 2; j++) {
                if (i >= 0 && j >= 0 && i < gameWorld.i_size && gameWorld.j_size) {
                    var tile;
                    switch (gameWorld.matrix[i][j]) {
                        case 1:
                            tile = grass;
                            break;
                        case 2:
                            tile = stone;
                            break;
                        default:
                            tile = grass;
                            break;
                    }

                    ctx.drawImage(tile.img, 0, 0, tile.width, tile.height, 32 * i, 32 * j, tile.width, tile.height);
                }
            }
        }

    }

    function drawTerrain() {
        for (var i = 0; i < 60; i++) {
            for (var j = 0; j < 60; j++) {
                //if(matrix[i][j]==1){
                ctx.drawImage(shadow, 0, 0, grass.width, grass.height, 32 * i, 32 * j, grass.width, grass.height);
                //}
            }
        }
    }



    loop();
}());