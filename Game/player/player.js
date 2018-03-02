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
        if (this.x + this.width - 10 > local_x &&
            this.x < local_x + tile.width - 10 &&
            this.y <= local_y) {
            if (this.y + this.height > local_y) {
                this.y = local_y - this.height - 1;
            }
        }
        if (this.x + this.width - 10 > local_x &&
            this.x < local_x + tile.width - 10 &&
            this.y >= local_y) {
            if (this.y < local_y + tile.height) {
                this.y = local_y + tile.height + 1;
            }
        }
        if (this.y + this.height - 10 > local_y &&
            this.y < local_y + tile.height - 10 &&
            this.x > local_x) {
            if (this.x < local_x + tile.width) {
                this.x = local_x + this.width + 1;
            }
        }
        if (this.y + this.height - 10 > local_y &&
            this.y < local_y + tile.height - 10 &&
            this.x < local_x) {
            if (this.x + this.width > local_x) {
                this.x = local_x - this.width;
            }
        }
    }
}





