function Brightness(layer){
    this.data;
    this.cwImage;
    this.jraw = layer;
    this.amount = 0;
    this.ready = function(){
        this.data = this.jraw.ctx.getImageData(0, 0, this.jraw.canvas.width, this.jraw.canvas.height);
        this.cwImage = this.jraw.ctx.getImageData(0, 0, this.jraw.canvas.width, this.jraw.canvas.height);
    };
    
    this.setValue = function(amount){
        this.amount = parseInt(amount);
    };

    this.run = function(){
        for(var i = 0; i < this.cwImage.data.length; i++){
            var red = this.cwImage.data[i];
            var green = this.cwImage.data[i + 1];
            var blue = this.cwImage.data[i + 2];
            
            red += this.amount;
            if(red > 255){
                red = 255;
            }else if(red < 0){
                red = 0;
            }

            green += this.amount;
            if(green > 255){
                green = 255;
            }else if(green < 0){
                green = 0;
            }

            blue += this.amount;
            if(blue > 255){
                blue = 255;
            }else if(blue < 0){
                blue = 0;
            }
            
            this.data.data[i] = red;
            this.data.data[i+1] = green;
            this.data.data[i+2] = blue;
            i += 3;
        }
        this.jraw.ctx.putImageData(this.data, 0, 0);
    };
}