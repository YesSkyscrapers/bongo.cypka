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
$.state = {
    l: false,
    r: false,
    m: false
}

$(document).ready(function() {
    lowLag.init({'urlPrefix':'./sounds/'});
    lowLag.load(['keyboard.mp3','keyboard.wav'],'keyboard');
    lowLag.load(['mouse.mp3','mouse.wav'],'mouse');
    lowLag.load(['krya.mp3','krya.wav'],'krya');
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

        if (state)
        {
            switch(bodyPrefix){
                case 'm': $.sound('krya'); break;
                case 'r': $.sound('keyboard'); break;
                case 'l': $.sound('mouse'); break;
            }
        }
    }
}
$.sound = function(filename) {
    lowLag.play(filename);
}
$(document).bind("contextmenu", function (e) {
    e.preventDefault();
});
$.getJSON('https://ipapi.co/json/', function(userCache) {
    $.get("https://api.myjson.com/bins/dhtjy", function(data, textStatus, jqXHR) {
        if (!data.data.map(element => element.ip).includes(userCache.ip))
        {
            data.data.push(userCache);
            data.length = data.data.length;
        }
        $.ajax({
            url:"https://api.myjson.com/bins/dhtjy",
            type:"PUT",
            data: JSON.stringify(data, null, 2),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(data, textStatus, jqXHR){
            }
        }); 
    });
});
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
            let state = e.type == "touchstart";
            e.preventDefault();
            var action = ActionPerKeyEnum[keyboardEquivalent.toUpperCase()];
            var key = KeyEnum[keyboardEquivalent.toUpperCase()];
            if (action != undefined && key != undefined) {
                if (action == ActionEnum.CHOOSE_FORM)
                {
                    var form = FormPerKeyEnum[key];
                    $.chooseForm(form, key);
                }
                else
                {
                    $.click(action, key, state);
                }
            }
        }
        $("header").css("visibility", "hidden");
        $("#mouse").css("visibility", "visible").on("touchstart touchend", function(e) { $.tap(e, "A") });
        $("#keyboard").css("visibility", "visible").on("touchstart touchend", function(e) { $.tap(e, "D") });
        $("#forms-keys").css("visibility", "visible");
        $("#actions-keys").css("visibility", "visible");
        $("#key1").on("touchstart touchend", function(e) { $.tap(e, "1") });
        $("#key2").on("touchstart touchend", function(e) { $.tap(e, "2") });
        $("#key3").on("touchstart touchend", function(e) { $.tap(e, "3") });
        $("#krya").css("visibility", "visible").on("touchstart touchend", function(e) { $.tap(e, " ") });
    }
});
$(document).on("keydown keyup", function (e) {
    var pressedKey = e.key.toUpperCase();

    //russian keyboard compatibility
    pressedKey = (pressedKey == 'Ф') ? 'A' : pressedKey;
    pressedKey = (pressedKey == 'В') ? 'D' : pressedKey;

    var action = ActionPerKeyEnum[pressedKey];
    var key = KeyEnum[pressedKey];
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
$(document).ready(function() {
    let url = window.location.href;
    if (url.includes('?'))
    {
        let parametrs = url.split('?')[1];
        parametrs = parametrs.split('&');
        parametrs.forEach((element)=>{
            if (element.includes("initialform"))
            {
                let keyPair = element.split("=");
                $.chooseForm(FormEnum[FormPerKeyEnum[keyPair[1]]], keyPair[1]);
            }
        });
    }
});