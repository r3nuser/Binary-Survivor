var Camera = function () {
    this.x = 0,
        this.y = 0,
        this.width = 0,
        this.height = 0,
        this.leftEdge = function () {
            return this.x + (this.width * 0.40);
        },
        this.rightEdge = function () {
            return this.x + (this.width * 0.60);
        },
        this.topEdge = function () {
            return this.y + (this.height * 0.40);
        },
        this.bottomEdge = function () {
            return this.y + (this.height * 0.60);
        }

        this.edgeLimit = function(player) {
            if (player.x < this.leftEdge()) {
                this.x = player.x - (this.width * 0.40);
            }
            if (player.x + player.width > this.rightEdge()) {
                this.x = player.x + player.width - (this.width * 0.60);
            }
            if (player.y < this.topEdge()) {
                this.y = player.y - (this.height * 0.40);
            }
            if (player.y + player.height > this.bottomEdge()) {
                this.y = player.y + player.height - (this.height * 0.60);
            }
        }

        this.cameraLimit = function(gameWorld) {
            if (this.x < 0) {
                this.x = 0;
            }
            if (this.x + this.width > gameWorld.width) {
                this.x = gameWorld.width - this.width;
            }
            if (this.y < 0) {
                this.y = 0;
            }
            if (this.y + this.height > gameWorld.height) {
                this.y = gameWorld.height - this.height;
            }
        }
}