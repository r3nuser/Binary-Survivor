var Player = function () {
    this.img,
        this.x = 0,
        this.y = 0,
        this.width = 32,
        this.height = 32,
        this.mvLeft = false,
        this.mvUp = false,
        this.mvRight = false,
        this.mvDown = false,
        this.block_x = 0,
        this.block_y = 0;
        this.blc_left,
        this.blc_right,
        this.blc_up,
        this.blc_down;

    var uc = document.getElementById("uc"),
        dc = document.getElementById("dc"),
        rc = document.getElementById("rc"),
        lc = document.getElementById("lc");

    this.moviment_player = function () {

        if (this.mvLeft && !this.mvRight) {
            this.x -= 5;
        }
        if (!this.mvLeft && this.mvRight) {
            this.x += 5;
        }
        if (this.mvDown && !this.mvUp) {
            this.y += 5;
        }
        if (!this.mvDown && this.mvUp) {
            this.y -= 5;
        }

    }

    this.player_limit = function (gameWorld) {
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.x + this.width > gameWorld.width) {
            this.x = gameWorld.width - this.width;
        }
        if (this.y + this.height > gameWorld.height) {
            this.y = gameWorld.height - this.height;
        }
    }

    this.leftCollision = function(tile){
        if(tile.collision && this.x < tile.width*(this.block_x)+5){
            this.x += 6;
        }
    }
}



