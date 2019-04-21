(function () {
    let score = Math.random()*10;
    console.log(score>=5);
})();
(function (ne) {
    let score = Math.random()*10;
    console.log(score>=5-ne);
})(5);