var Player = function () {
    this.img,
        this.x = 0,
        this.y = 0,
        this.width = 32,
        this.height = 32,
        this.mvLeft = false,
        this.mvUp = false,
        this.mvRight = false,
        this.mvDown = false

    this.moviment_player = function (texteditor) {

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

}



