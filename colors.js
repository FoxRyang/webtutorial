const Links = {
    setColor: function (color) {
        // var alist = document.querySelectorAll('a');
        // var i = 0;
        // while (i < alist.length) {
        //     alist[i].style.color = color;
        //     i = i + 1;
        // }
        $('a').css('color', color);
    }
}

function dayFunc() {
    ChangeBody('white', 'black', 'blue');
    this.value = 'night';
    this.onclick = function () { nightFunc.call(this) };
}
function nightFunc() {
    ChangeBody('black', 'white', 'yellow');
    this.value = 'day';
    this.onclick = function () { dayFunc.call(this) };
}
function ChangeBody(a, b, c) {
    Body.setColor(b);
    Body.setBackgroundColor(a);
    Links.setColor(c);
}
// document.write(`hello world`);

// var arrTexts = ["asdf", "asefasef", "your", "bad"];
// arrTexts.forEach(elem => {
//     document.write(`<a>${elem}<br></a>`);
// });


const Body = {
    setColor: function (color) {
        // document.querySelector('body').style.color = color;
        $('body').css('color', color);
    },
    setBackgroundColor: function (color) {
        // document.querySelector('body').style.backgroundColor = color;
        $('body').css('backgroundColor', color);
    }
}