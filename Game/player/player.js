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

    this.encostou = function (tile, local_x, local_y) {

        if (local_x + tile.width > this.x &&
            local_y + tile.height - 6 > this.y &&
            local_y + 6 < this.y + this.height &&
            this.x > local_x) {
            this.x = local_x + tile.width;
            rc.innerHTML = " " + true + " ";
        } else {
            rc.innerHTML = " " + false + " ";
        }
        
        if (local_x - tile.width < this.x &&
            local_y - tile.height + 6 < this.y &&
            local_y - 6 > this.y - this.height &&
            this.x < local_x) {
            
            this.x = local_x - tile.width;
            lc.innerHTML = " " + true + " ";
        } else {
            lc.innerHTML = " " + false + " ";
        }

        if(local_y < this.y + this.height &&
            local_x >= this.x && local_x+ tile.width <= this.x  
        ){
            this.y = local_y - this.height;
            dc.innerHTML = " " + true + " ";
        }else{
            dc.innerHTML = " " + false + " ";
        }
    }
}



