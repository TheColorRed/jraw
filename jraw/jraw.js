function jraw(id){
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.data;
    this.buffer;
    this.ready = false;
    this.sliders = [];
    var slidersCount = 0;
    var self = this;
    this.setImage = function(url){
        var img = new Image();
        img.src = url;
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            self.ctx.drawImage(img, 0, 0, img.width, img.height);
            self.data = self.ctx.getImageData(0, 0, self.canvas.width, self.canvas.height);
            self.ready = true;
            for(var i in self.sliders){
                self.sliders[i].ready = self.ready;
                self.sliders[i].init();
            }
        };
    };
    this.attachSlider = function(sliderId, attr){
        this.sliders[slidersCount] = document.getElementById(sliderId);
        var slider = this.sliders[slidersCount];
        slider.ready = this.ready;
        slider.init = function(){
            attr.ready();
        };
        slider.onchange = function(){
            if(slider.ready){
                attr.setValue(slider.value);
                attr.run();
            }
        };
        slidersCount++;
        return slider;
    };

    this.applyFilter = function(){
        this.ctx.putImageData(this.data, 0, 0);
        for(var i in this.sliders){
            this.sliders[i].init();
        }
    };
    
    this.cancelFilter = function(){
        this.ctx.putImageData(this.data, 0, 0);
        for(var i in this.sliders){
            this.sliders[i].init();
        }
    };

    this.RGBtoHSB = function(r, g, b){
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max === min){
            h = s = 0; // achromatic
        }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return [h, s, l];
    };

    this.HSBtoRGB = function(h, s, l){
        var r, g, b;

        if(s === 0){
            r = g = b = l; // achromatic
        }else{
            function hue2rgb(p, q, t){
                if(t < 0)
                    t += 1;
                if(t > 1)
                    t -= 1;
                if(t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if(t < 1 / 2)
                    return q;
                if(t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return [r * 255, g * 255, b * 255];
    };
}