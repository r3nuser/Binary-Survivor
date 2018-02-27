(function () {
    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");
    var texteditor = document.getElementById("text-lines");

    // debug
    var plr_x_d = document.getElementById("plr-x"),
        plr_y_d = document.getElementById("plr-y"),
        cam_x_d = document.getElementById("cam-x"),
        cam_y_d = document.getElementById("cam-y");

    // game resources
    var background = new Image();
    background.src = "scene.png";

    var monster = new Image();
    monster.src = "monster.png";

    var grass = new Image();
    grass.src = "tiles/grass.png"

    // objects
    var sprites = [];
    var tile = {
        width: 64,
        height: 64,
        img: grass
    }
    var gameWorld = {
        i_size: 30,
        j_size: 30,
        matrix: [],
        x: 0,
        y: 0,
        width: 30*64,
        height: 30*64
    };

    var char = {
        img: monster,
        x: 0,
        y: 0,
        width: 64,
        height: 64
    }

    sprites.push(char);

    char.x = (gameWorld.width - char.width) / 2;
    char.y = (gameWorld.height - char.height) / 2;

    var cam = {
        x: 0,
        y: 0,
        width: cnv.width,
        height: cnv.height,
        leftEdge: function () {
            return this.x + (this.width * 0.40);
        },
        rightEdge: function () {
            return this.x + (this.width * 0.60);
        },
        topEdge: function () {
            return this.y + (this.height * 0.40);
        },
        bottomEdge: function () {
            return this.y + (this.height * 0.60);
        }
    };
    console.log(cnv.height);
    //centralizar a camera
    cam.x = (gameWorld.width - cam.width) / 2;
    cam.y = (gameWorld.height - cam.height) / 2;
    //mover o char
    var mvLeft = mvRight = mvUp = mvDown = false;
    window.addEventListener('keydown', function (e) {
        if (texteditor != document.activeElement) {
            var key = e.keyCode;
            switch (key) {
                case 37:
                    mvLeft = true;
                    break;
                case 38:
                    mvUp = true;
                    break;
                case 39:
                    mvRight = true;
                    break;
                case 40:
                    mvDown = true;
                    break;
            }
        }
    }, false);
    window.addEventListener('keyup', function (e) {
        if (texteditor != document.activeElement) {
            var key = e.keyCode;
            switch (key) {
                case 37:
                    mvLeft = false;
                    break;
                case 38:
                    mvUp = false;
                    break;
                case 39:
                    mvRight = false
                    break;
                case 40:
                    mvDown = false;
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
    function debug(){
        plr_x_d.innerHTML = char.x + " ";
        plr_y_d.innerHTML = char.y + " ";
        cam_x_d.innerHTML = cam.x + " ";
        cam_y_d.innerHTML = cam.y + " ";
    }
    function update() {
        if (mvLeft && !mvRight) {
            char.x -= 5;
        }
        if (!mvLeft && mvRight) {
            char.x += 5;
        }
        if (mvDown && !mvUp) {
            char.y += 5;
        }
        if (!mvDown && mvUp) {
            char.y -= 5;
        }
        // limite do edge
        if (char.x < cam.leftEdge()) {
            cam.x = char.x - (cam.width * 0.40);
        }
        if (char.x + char.width > cam.rightEdge()) {
            cam.x = char.x + char.width - (cam.width * 0.60);
        }
        if (char.y < cam.topEdge()) {
            cam.y = char.y - (cam.height * 0.40);
        }
        if (char.y + char.height > cam.bottomEdge()) {
            cam.y = char.y + char.height - (cam.height * 0.60);
        }
        // limite da camera
        if (cam.x < 0) {
            cam.x = 0;
        }
        if (cam.x + cam.width > gameWorld.width) {
            cam.x = gameWorld.width - cam.width;
        }
        if (cam.y < 0) {
            cam.y = 0;
        }
        if (cam.y + cam.height > gameWorld.height) {
            cam.y = gameWorld.height - cam.height;
        }
        // limite do personagem
        if (char.x < 0) {
            char.x = 0;
        }
        if (char.y < 0) {
            char.y = 0;
        }
        if (char.x + char.width > gameWorld.width) {
            char.x = gameWorld.width - char.width;
        }
        if (char.y + char.height > gameWorld.height) {
            char.y = gameWorld.height - char.height;
        }
    }


    function render() {
        ctx.save();
        ctx.translate(-cam.x, -cam.y);
        drawTerrain();
        for (var i in sprites) {
            var sp = sprites[i];
            ctx.drawImage(sp.img, 0, 0, sp.width, sp.height, sp.x, sp.y, sp.width, sp.height);
        }
        ctx.restore();
        //hud
    }

    function drawTerrain() {
        for (var i = 0; i < 30; i++) {
            for (var j = 0; j < 30; j++) {
                //if(matrix[i][j]==1){
                ctx.drawImage(tile.img, 0, 0, tile.width, tile.height, 64 * i, 64 * j, tile.width, tile.height);
                //}
            }
        }
    }

    loop();
}());