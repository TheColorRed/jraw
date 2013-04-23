function Contrast(j){
    this.data;
    this.jraw = j;
    this.amount = 0;
    this.cwImage;
    this.ready = function(){
        this.data = this.jraw.ctx.getImageData(0, 0, this.jraw.canvas.width, this.jraw.canvas.height);
        this.cwImage = this.jraw.ctx.getImageData(0, 0, this.jraw.canvas.width, this.jraw.canvas.height);
    };
    
    this.setValue = function(amount){
        this.amount = parseInt(amount);
    };

    this.run = function(){
        var value = (255.0 + this.amount) / 255.0;
        value *= value;
        for(var i = 0; i < this.cwImage.data.length; i++){
            var r = this.cwImage.data[i];
            var g = this.cwImage.data[i+1];
            var b = this.cwImage.data[i+2];
            
            var red = r / 255.0;
            var green = g / 255.0;
            var blue = b / 255.0;
            
            red = (((red - 0.5) * value) + 0.5) * 255.0;
            green = (((green - 0.5) * value) + 0.5) * 255.0;
            blue = (((blue - 0.5) * value) + 0.5) * 255.0;

            var iR = red;
            iR = iR > 255 ? 255 : iR;
            iR = iR < 0 ? 0 : iR;
            var iG = green;
            iG = iG > 255 ? 255 : iG;
            iG = iG < 0 ? 0 : iG;
            var iB = blue;
            iB = iB > 255 ? 255 : iB;
            iB = iB < 0 ? 0 : iB;
            
            this.data.data[i] = iR;
            this.data.data[i+1] = iG;
            this.data.data[i+2] = iB;
            
            i += 3;
        }
        this.jraw.ctx.putImageData(this.data, 0, 0);
    }
}