const windowContent = document.getElementById('window-content')
const close = document.getElementById('close')
const close2 = document.getElementById('close2')
const area = document.getElementById('area')
const area2 = document.getElementById('area2')
const desabafosbtn = document.getElementById("desabafosbtn")
const S1 = document.getElementById('s1')
const S2 = document.getElementById('s2')

S1.addEventListener('click', function() {

    console.log("oie")
    area.style.display = 'flex'
    windowContent.innerHTML = "<img src='https://web.archive.org/web/20090821122916/http://geocities.com/EnchantedForest/5921/tennisgame.gif' alt='' width='250px'> <p>'As vezes a vida cobra que saibamos exatamente oque fazer, esse não é um desses momentos.'</p>"

})

S2.addEventListener('click', function() {

    console.log("oie")
    area.style.display = 'flex'
    windowContent.innerHTML = "<div><img src='https://web.archive.org/web/20091022104759im_/http://www.geocities.com/ota_h2o/globe.gif' alt='' width='50px'><img src='https://web.archive.org/web/20091022021238im_/http://www.geocities.com/moz_compilation/homeswrl_e0.gif' alt=''></div> <p>'Viver é a arte de explorar o mundo como seu proprio lar.'</p>"

})

desabafosbtn.addEventListener('click', function() {

    console.log("oie")
    area2.style.display = 'flex'

})

close.addEventListener('click', function() {

    area.style.display = 'none'
    windowContent.innerHTML = 'none'
})

close2.addEventListener('click', function() {

    area2.style.display = 'none'
})
