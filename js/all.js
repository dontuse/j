// A — базовый тип
var A = $.inherit(
    {

        // __constructor — специальный метод, вызываемый при создании экземпляра
        __constructor:function (property) {
            this.property = property;
        },

        getProperty:function () {
            return this.property + ' of A';
        },

        getType:function () {
            return 'A';
        }

    },
    {
        // статическое свойство, доступное изнутри как this.__self.staticMember
        staticMember:'staticA'
    });

// B — тип, наследуемый от A
var B = $.inherit(
    A,
    {

        // перекрытие с вызовом одноименного метода базового класса
        getProperty:function () {
            return this.__base() + ' of B';
        },

        // просто перекрытие
        getType:function () {
            return 'B';
        }

    },
    {
        staticMember:'staticB'
    });

var instance = new B('value');

console.log(instance.getProperty());
console.log(instance.getType());
console.log(instance.__self.staticMember);

//-------------------------------------


j = {};

j.Popoup = $.inherit(
    {

        __constructor:function (o) {
            this.o = o;
            this.o.$block = $('.' + this.o.block);
            this.init();
        },
        config:{
            block:'js-modal',
            $backdrop:$('.b-modal-backdrop'),
            $closes:$('.b-modal__close'),
            zIndex:1111,
            owners:$('.c1')
        },
        getProperty:function () {
            return this.property + ' of A';
        },
        init:function () {
            this.o.$block.css('z-index', this.o.zIndex);
            this.binding();
            //this.self.instanceCount++;
        },
        binding:function () {
            var that = this;
            $('.b-modal-backdrop').on('click', function (e) {
                that.close();
            });
            this.o.$closes.on('click', function (e) {
                e.preventDefault();
                that.close();
            });
            this.o.owners.click(function (e) {
                e.preventDefault();
                that.open();
            });
        },
        open:function () {
            this.o.$backdrop.show();
            this.o.$block.show();
            this.toPosition();
        },
        close:function () {
            this.o.$backdrop.hide();
            this.o.$block.hide();
        },
        toPosition:function () {
            var margin = this.o.$block.width() / 2,
                height = this.o.$block.height(),
                winHeight = $(window).height();

            this.o.$block.css('margin-left', -margin);

            if (height > winHeight) {
                this.o.$block.css("top", $(window).scrollTop() + "px");
            }
            else {
                this.o.$block.css("top", $(window).scrollTop() + height + "px");
            }
        }
    },
    {
        instanceCount:0,
        factory:function (brand) {
            // 'this' in static methods refer to the class itself
            //return new this({brand:brand});
        }
    });

j.Carusel = $.inherit(
    {

        __constructor:function (o) {
            this.o = o;
            this.o.$block = $('.' + this.o.block);
            this.init();
        },
        config:{

        }
    });

j.Calendar = $.inherit(
    {
        __constructor:function (o) {
            this.o = o;
            this.o.$block = $('.' + this.o.block);
            this.init();
        },
        config:{

        }
    });

j.Tooltip = $.inherit(
    {
        __constructor:function (o) {
            this.o = o;
            this.o.$block = $('.' + this.o.block);
            this.init();
        },
        config:{

        }
    });

j.forms = {};

j.forms.InpSel = $.inherit(
    {

        __constructor:function (o) {
            this.o = o;
            this.o.$block = $('.' + this.o.block);
            this.init();
        },
        config:{

        }
    });

j.forms.validator = {};

/*===========================================================*/

$(function () {
    var dialog = new j.Popoup({
        block:'js-modal',
        $backdrop:$('.b-modal-backdrop'),
        $closes:$('.b-modal__close'),
        zIndex:1111,
        owners:$('.dialog-caller-1'),
        OnBeforeOpen:function () {
        },
        onAfterOpen:function () {
        }
    });

    var dialog2 = new j.Popoup({
        block:'js-modal2',
        $backdrop:$('.b-modal-backdrop'),
        $closes:$('.b-modal__close'),
        zIndex:1111,
        owners:$('.dialog2'),
        OnBeforeOpen:function () {
        },
        onAfterOpen:function () {
        }
    });
});
