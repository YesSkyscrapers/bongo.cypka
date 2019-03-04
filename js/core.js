var ActionEnum = {
    CHOOSE_FORM: 0,
    CLICK: 1,
    KRYA: 2
}
var ActionPerKeyEnum = {
    "1" : ActionEnum.CHOOSE_FORM,
    "2" : ActionEnum.CHOOSE_FORM,
    "3" : ActionEnum.CHOOSE_FORM,
    "A" : ActionEnum.CLICK,
    "D" : ActionEnum.CLICK,
    " " : ActionEnum.KRYA
}
var FormEnum = {
    SCHOOL: 0,
    TOSHA: 1,
    KIGURUMI: 2
}
var KeyEnum = {
    "A" : 1,
    "D" : 2,
    "1" : 1,
    "2" : 2,
    "3" : 3,
    " " : -1
}
var FormPerKeyEnum = {
    "1" : FormEnum.SCHOOL,
    "2" : FormEnum.TOSHA,
    "3" : FormEnum.KIGURUMI
}
var ClickKeyEquivalentEnum = {
    "1" : "A",
    "2" : " ",
    "3" : "D"
}
$.state = {
    l: false,
    r: false,
    m: false
}
//var pressed = [];
$(document).ready(function() {
    lowLag.init({'urlPrefix':'./sounds/'});
    lowLag.load(['bongo0.mp3','bongo0.wav'],'bongo0');
    lowLag.load(['bongo1.mp3','bongo1.wav'],'bongo1');
    lowLag.load(['keyboard1.mp3','keyboard1.wav'],'keyboard1');
    lowLag.load(['keyboard2.mp3','keyboard2.wav'],'keyboard2');
    lowLag.load(['keyboard3.mp3','keyboard3.wav'],'keyboard3');
    lowLag.load(['keyboard4.mp3','keyboard4.wav'],'keyboard4');
    lowLag.load(['keyboard5.mp3','keyboard5.wav'],'keyboard5');
    lowLag.load(['keyboard6.mp3','keyboard6.wav'],'keyboard6');
    lowLag.load(['keyboard7.mp3','keyboard7.wav'],'keyboard7');
    lowLag.load(['keyboard8.mp3','keyboard8.wav'],'keyboard8');
    lowLag.load(['keyboard9.mp3','keyboard9.wav'],'keyboard9');
    lowLag.load(['keyboard0.mp3','keyboard0.wav'],'keyboard0');
    lowLag.load(['meow.mp3','meow.wav'],'meow-1');
    lowLag.load(['cymbal.mp3','cymbal.wav'],'cymbal1');
    lowLag.load(['marimba1.mp3','marimba1.wav'],'marimba1');
    lowLag.load(['marimba2.mp3','marimba2.wav'],'marimba2');
    lowLag.load(['marimba3.mp3','marimba3.wav'],'marimba3');
    lowLag.load(['marimba4.mp3','marimba4.wav'],'marimba4');
    lowLag.load(['marimba5.mp3','marimba5.wav'],'marimba5');
    lowLag.load(['marimba6.mp3','marimba6.wav'],'marimba6');
    lowLag.load(['marimba7.mp3','marimba7.wav'],'marimba7');
    lowLag.load(['marimba8.mp3','marimba8.wav'],'marimba8');
    lowLag.load(['marimba9.mp3','marimba9.wav'],'marimba9');
    lowLag.load(['marimba0.mp3','marimba0.wav'],'marimba0');
});
Array.prototype.remove = function(el) {
    return this.splice(this.indexOf(el), 1);
}
$.wait = function(callback, ms) {
    return window.setTimeout(callback, ms);
}
$.chooseForm = function(form, key) {
    $('.catentity#main').css("background-image", "url('images/"+form+"/main.png')");
    $('.catentity#l1').css("background-image", "url('images/"+form+"/l1.png')");
    $('.catentity#l2').css("background-image", "url('images/"+form+"/l2.png')");
    $('.catentity#r1').css("background-image", "url('images/"+form+"/r1.png')");
    $('.catentity#r2').css("background-image", "url('images/"+form+"/r2.png')");
    $('.catentity#m1').css("background-image", "url('images/"+form+"/m1.png')");
    $('.catentity#m2').css("background-image", "url('images/"+form+"/m2.png')");
    
}
$.click = function(action, key, state){
    let bodyPrefix = (action == ActionEnum.KRYA ? 'm' : (key == 1 ? 'r' : 'l'));

    if ($.state[bodyPrefix] != state)
    {
        $('.catentity#'+bodyPrefix+'1').css("visibility", (state ? "hidden" : "visible"));
        $('.catentity#'+bodyPrefix+'2').css("visibility", (state ? "visible" : "hidden"));

        $.state[bodyPrefix] = state;
    }
}
$.play = function(instrument, key, state) {
    var instrumentName = Object.keys(InstrumentEnum).find(k => InstrumentEnum[k] === instrument).toLowerCase();
    var commonKey = KeyEnum[key];
    var paw = (instrument == InstrumentEnum.BONGO ? key : key <= 5 && key != 0 ? 0 : 1);
    var id = (instrument == InstrumentEnum.MEOW ? "#mouth" : '#' + (paw == 0 ? "l" : "r") + 'paw');
    if (state == true) {
        if (jQuery.inArray(commonKey, pressed) !== -1) {
            return;
        } else {
            pressed.push(commonKey);
        }
        if (instrument != InstrumentEnum.MEOW) {
            $(".instrument").each(function(index) {
              if ($(this).attr('id') === instrumentName) {
                $(this).css("visibility", "visible");
              } else {
                $(this).css("visibility", "hidden");
              }
            });
        }
        $.sound(instrumentName + key);
    } else {
        pressed.remove(commonKey);
    }
    if (instrument == InstrumentEnum.MEOW) {
        $('#mouth').css("background-image", "url('images/1/m" + (state === true ? "2" : "1") + ".png')");
    } else {
        $(id).css("background-image", "url('images/1/" + (paw == 0 ? "l" : "r") + (state === true ? "2" : "1") + ".png')");
    }
}
$.sound = function(filename) {
    lowLag.play(filename);
}
$(document).bind("contextmenu", function (e) {
    e.preventDefault();
});
/*
//users counter
$.getJSON('https://ipapi.co/json/', function(userCache) {
    $.get("https://api.myjson.com/bins/ie5be", function(data, textStatus, jqXHR) {
        if (!data.map(element => element.ip).includes(userCache.ip))
        {
            data.push(userCache);
        }
        $.ajax({
            url:"https://api.myjson.com/bins/ie5be",
            type:"PUT",
            data: JSON.stringify(data, null, 2),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(data, textStatus, jqXHR){
            }
        }); 
    });
});
*/
$(document).ready(function() {
    function isTouch() {
        var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        var mq = function(query) {
        return window.matchMedia(query).matches;
        }
        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            return true;
        }
        var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return mq(query);
    }
    if (isTouch()) {
        $.tap = function(e, keyboardEquivalent) {
            e.preventDefault();
            var action = ActionPerKeyEnum[keyboardEquivalent.toUpperCase()];
            var key = KeyEnum[keyboardEquivalent.toUpperCase()];
            if (instrument != undefined && key != undefined) {
                if (action == ActionEnum.CHOOSE_FORM)
                {
                    var form = FormPerKeyEnum[key];
                    $.chooseForm(form, key);
                }
                //$.play(instrument, key, true);
                //$.wait(function(){ $.play(instrument, key, false) }, (instrument == InstrumentEnum.MEOW ? 250 : 80));
            }
        }
        $("header").css("visibility", "hidden");
        $("#github").css("visibility", "hidden");
        $("#bongo-left").css("visibility", "visible").on("touchstart", function(e) { $.tap(e, "A") });
        $("#bongo-right").css("visibility", "visible").on("touchstart", function(e) { $.tap(e, "D") });
        $("#cymbal-left").css("visibility", "visible").on("touchstart", function(e) { $.tap(e, "C") });
        $("#piano-keys").css("visibility", "visible");
        $("#key1").on("touchstart", function(e) { $.tap(e, "1") });
        $("#key2").on("touchstart", function(e) { $.tap(e, "2") });
        $("#key3").on("touchstart", function(e) { $.tap(e, "3") });
        $("#key4").on("touchstart", function(e) { $.tap(e, "4") });
        $("#key5").on("touchstart", function(e) { $.tap(e, "5") });
        $("#key6").on("touchstart", function(e) { $.tap(e, "6") });
        $("#key7").on("touchstart", function(e) { $.tap(e, "7") });
        $("#key8").on("touchstart", function(e) { $.tap(e, "8") });
        $("#key9").on("touchstart", function(e) { $.tap(e, "9") });
        $("#key0").on("touchstart", function(e) { $.tap(e, "0") });
        $("#marimba-keys").css("visibility", "visible");
        $("#keyQ").on("touchstart", function(e) { $.tap(e, "Q") });
        $("#keyW").on("touchstart", function(e) { $.tap(e, "W") });
        $("#keyE").on("touchstart", function(e) { $.tap(e, "E") });
        $("#keyR").on("touchstart", function(e) { $.tap(e, "R") });
        $("#keyT").on("touchstart", function(e) { $.tap(e, "T") });
        $("#keyY").on("touchstart", function(e) { $.tap(e, "Y") });
        $("#keyU").on("touchstart", function(e) { $.tap(e, "U") });
        $("#keyI").on("touchstart", function(e) { $.tap(e, "I") });
        $("#keyO").on("touchstart", function(e) { $.tap(e, "O") });
        $("#keyP").on("touchstart", function(e) { $.tap(e, "P") });
        $("#meow").css("visibility", "visible").on("touchstart", function(e) { $.tap(e, " ") });
    }
});
$(document).on("mousedown mouseup", function (e) {
    var keyboardEquivalent = ClickKeyEquivalentEnum[e.which];
    if (keyboardEquivalent != undefined) {
        var instrument = InstrumentPerKeyEnum[keyboardEquivalent.toUpperCase()];
        var key = KeyEnum[keyboardEquivalent.toUpperCase()];
        if (instrument != undefined && key != undefined) {
            $.play(instrument, key, e.type === "mousedown");
        }
    }
});
/*
$(document).keydown(function (e) {
    console.log(e);
    console.log('down')
    console.log(e.key.toUpperCase());
});
$(document).keyup(function (e) {
    console.log('up')
    console.log(e.key.toUpperCase());
});*/

$(document).on("keydown keyup", function (e) {
    var action = ActionPerKeyEnum[e.key.toUpperCase()];
    var key = KeyEnum[e.key.toUpperCase()];
    if (action != undefined && key != undefined) {
        if (action == ActionEnum.CHOOSE_FORM)
        {
            var form = FormPerKeyEnum[key];
            $.chooseForm(form, key);
        }
        else
        {
            $.click(action, key, e.type == 'keydown');
        }
    }
});
