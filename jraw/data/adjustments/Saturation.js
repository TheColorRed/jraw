function Saturation(){
    this.data;
    this.jraw;
    this.amount = 0;
    this.cwImage;
    this.ready = function(){
        this.data = this.jraw.ctx.getImageData(0, 0, this.jraw.canvas.width, this.jraw.canvas.height);
        this.cwImage = this.jraw.ctx.getImageData(0, 0, this.jraw.canvas.width, this.jraw.canvas.height);
    };

    this.setLayer = function(layer){
        this.jraw = layer;
    };
    
    this.setValue = function(amount){
        this.amount = parseInt(amount);
    };

    this.run = function(){
        for(var i = 0; i < this.cwImage.data.length; i++){
            var red = this.cwImage.data[i];
            var green = this.cwImage.data[i + 1];
            var blue = this.cwImage.data[i + 2];

            var hsv = Color.RGBtoHSB(red, green, blue);
            hsv[1] += this.amount * 0.01;
            if(hsv[1] > 1){
                hsv[1] = 1;
            }else
            if(hsv[1] < 0){
                hsv[1] = 0;
            }

            var newpixel = Color.HSBtoRGB(hsv[0], hsv[1], hsv[2]);

            this.data.data[i] = newpixel[0];
            this.data.data[i+1] = newpixel[1];
            this.data.data[i+2] = newpixel[2];

            i += 3;
        }
        this.jraw.ctx.putImageData(this.data, 0, 0);
    };
}