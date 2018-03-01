var World = function () {
    this.i_size = 60,
        this.j_size = 60,
        this.matrix = [],
        this.shadow = [],
        this.x = 0,
        this.y = 0,
        this.width = 60 * 32,
        this.height= 60 * 32;

        this.generateWorld = function(){
            for (var i = 0; i < this.i_size; i++) {
                this.matrix.push([]);
                this.shadow.push([]);
                for (var j = 0; j < this.j_size; j++) {
                    this.matrix[i].push(1);
                    this.shadow[i].push(1);
                }
            }
            
           
           
            this.matrix[6][6] = 2;
        }


}