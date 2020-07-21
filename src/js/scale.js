function scaleAdapt(){
    if (window.innerWidth > 960) {
        document.documentElement.style.fontSize = '96px';
    } else {
        document.documentElement.style.fontSize = window.innerWidth / 10 + 'px';
    }
    console.log('11111111');
}

scaleAdapt(); 


