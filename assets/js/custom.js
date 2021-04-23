function whenMuseSlidesChanged(){
    if(typeof(onYouTubeIframeAPIReady) == 'function'){
        onYouTubeIframeAPIReady();
    }    
}
function museWindowLoaded()
{
    whenMuseSlidesChanged();
    museUpdateInputs();
    const museObserver = new MutationObserver(museUpdateInputs);
          museObserver.observe(document.getElementById('main_content_place'),{attributes: false, childList: true, subtree: false });
    pageScrollIndi();
    //detectHomepage();
}
/*function detectHomepage(){
    let cnm = document.getElementsByTagName("body")[0];
    if(cnm !== null && typeof(cnm) != 'undefined' && cnm.classList.contains('nothomepage')){
        if(window.location.pathname === '/'){
            cnm.classList.remove("on");
        }else{
            cnm.classList.add("on");
        }
    }
}*/
function museUpdateInputs(){
    let inputs = document.querySelectorAll("input[type='file']");
    for(let m=0;m<inputs.length;m++){
        let inp = inputs[m];
        if(inp !== null && typeof(inp) != 'undefined'){
            inp.addEventListener('change',function(){
                for(let m=0;m<this.files.length;m++){
                    this.setAttribute('data-fname',this.files[m].name);
                }
            });
            let ww = window.getComputedStyle(inp,':before').width;
            if(ww !== null && typeof(ww) != 'undefined'){
                let wpx = parseInt(ww,10);
                if(wpx >= 100){
                   inp.setAttribute('style','width:'+ww);
                }
            }            
        }
    }
}
function musdeSwitchGotoTop(show){
    let btn = document.getElementById("gototop");
    if(btn !== null && typeof(btn) != 'undefined'){
        btn.style.opacity = show?'1':'0';
    }
}
function pageScrollIndi() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  
  let line = document.getElementById("page-scoll-indi");
  if(line !== null && typeof(line) != 'undefined'){
     line.style.width = scrolled + "%";
     line.style.visibility = scrolled === 0?'hidden':'visible';
  }
  let body = document.body;
  if(scrolled > 10){
    musdeSwitchGotoTop(true);
    body.classList.add('wscrolled');
  }else{
    musdeSwitchGotoTop(false);
    body.classList.remove('wscrolled');
  }
}

if(window.addEventListener)
{
  window.addEventListener('load', museWindowLoaded, false); // NB **not** 'onload'
  window.addEventListener('museSlidesChanged',whenMuseSlidesChanged, false);
  window.addEventListener('scroll',pageScrollIndi, false);
}
else if (window.attachEvent)
{
  window.attachEvent('onload', museWindowLoaded);
  window.attachEvent('onscroll',pageScrollIndi);
}