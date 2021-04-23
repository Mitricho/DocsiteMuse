var language;
if (window.navigator.languages) {
    language = window.navigator.languages[0];
} else {
    language = window.navigator.userLanguage || window.navigator.language;
}
/*---------------------------------------------------------*/
var rem = function rem() {
    var html = document.getElementsByTagName('html')[0];
    return function () {
        return parseInt(window.getComputedStyle(html)['fontSize']);
    }
}();
function toRem(length) {
        return (parseInt(length) / rem());
    }
/*---------------------------------------------------------*/
var animaStyle = 'fadeInDown';//rubberBand
var animaDelay = ' animaDelay025s';
var animaClasses = ' ' + animaStyle + ' ' + animaDelay + ' animated';
var initDestroyTimeOutPace = function() {
    var counter = 0;

    var refreshIntervalId = setInterval( function(){
        var progress; 

        if( typeof $( '.pace-progress' ).attr( 'data-progress-text' ) !== 'undefined' ) {
            progress = Number( $( '.pace-progress' ).attr( 'data-progress-text' ).replace("%" ,'') );
        }

        if( progress === 99 ) {
            counter++;
        }

        if( counter > 50 ) {
            clearInterval(refreshIntervalId);
            Pace.stop();
        }
    }, 100);
}
var sharer = [
    ['Yandex','https://yandex.ru/collections/share/?url=[urla]&description=[desc]&image=[pict]&utm_source=share2'],
    ['Vk','https://vk.com/share.php?url=[urla]&title=[desc]&image=[pict]&utm_source=share2'],
    ['Facebook','https://www.facebook.com/sharer.php?src=sp&u=[urla]&image=[pict]&title=[desc]&utm_source=share2'],
    ['Telegram','https://t.me/share/url?url=[urla]&text=[desc]&image=[pict]&utm_source=share2'],
    ['Twitter','https://twitter.com/intent/tweet?url=[urla]&text=[desc]&image=[pict]']
];
var doNotStoreThis = [
    'switchCoverMiniPreview'
];
/*---------------------------------------------------------*/
initDestroyTimeOutPace();
/*---------------------------------------------------------*/
var forEach = function (array, callback, scope){for (var i = 0; i < array.length; i++){callback.call(scope, i, array[i]);}};
/*---------------------------------------------------------*/
Array.prototype.swapItems = function(a, b){
    this[a] = this.splice(b, 1, this[a])[0];
    return this;
}
/*---------------------------------------------------------*/
function filename(path){
    path = path.substring(path.lastIndexOf("/")+ 1);
    return (path.match(/[^.]+(\.[^?#]+)?/) || [])[0];
}
/*---------------------------------------------------------*/
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}
/*---------------------------------------------------------*/
function rgbaToHex(clr){
    let cnv = document.createElement('canvas');
    var ctx = cnv.getContext('2d');
    ctx.strokeStyle = clr;
    $(cnv).detach();
    return ctx.strokeStyle;
}
function rgbaToArray(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    //delete(parts[0]);
    return parts;
}
/*---------------------------------------------------------*/
var copyright;
function cookieNote(){
    let str = '<div class="cookie-notification cookie-notification_hidden_no animated slideInRight animaDelay3s">' + tr(
        'Используя этот сайт, вы соглашаетесь на обработку данных о вас в порядке и целях, указанных,',
        'We use cookies to give you the best experience.') + 
        ' <a target="_blank" href="' + getDomain() + '/current/help.php?p=4#terms">' + tr('здесь','Read more about what data we collect and how.') + '</a>' + 
        ' <a id="yes">' + tr('Скрыть это сообщение','Hide this') + '</a></div><script src="' + getDomain()+ '/current/assets/js/yandex.js"></script>';
    $('body').append(str);    
    let d = new Date();
    let year = d.getUTCFullYear();
    copyright = '2019 - ' + year + ' © Dmitry Philonenko';
    $('.muse-copyright').append(copyright);    
}
/*---------------------------------------------------------*/
var design_changed = false;
var localForageAvail = false;
var proMode = false;
var standaloneMode = false;
var customLang = '';
var store_prfx = 'muse_';
var projectMainKey = store_prfx + 'thumb';
var maxButtons = 6;
var slidesMax = 10;
var swatchesMax = 35;
var globalPalette = [];
var paletteGarbage = [];
var buttonsGarbage = [];
var buttonsSeparator = '^';
var buttonsValuesSeparator = ';';
var commonSeparator = ',';
var projectFileName = 'project.json';
var socialIcons = [];
var urlas = {
	valid:false,
	naming:'',
	newdesign:'',
	myimages:''
}
var loadedExternalProjectKey = 'loaded_external_project';
var useAutoUploadFeature = true;
var zoomCoeff = 1.0;
var installed = false;
/*-----------------------------------------------------------*/
let zipopts = {
  types: [{
    description: 'Zip file',
    accept: {'application/zip': ['.zip']},
  }],
  excludeAcceptAllOption: true,
  multiple: false
};
let jsonopts = {
  types: [
  {
    description: 'JSON file',
    accept: {'application/json': ['.json']},
  },
  {
    description: 'Zip file',
    accept: {'application/zip': ['.zip']},
  }
  ],
  excludeAcceptAllOption: true,
  multiple: false
};
testIfInstalled();
/*---------------------------------------------------------*/
function resultButtonText(){
    return installed? tr('Сохранить дизайн','Save design') :tr('Скачать дизайн','Download design');
}
/*---------------------------------------------------------*/
function testIfInstalled(){
    try{
        if(window.matchMedia('(display-mode: standalone)').matches){  
            installed = true;
        }else{
            //console.log('Web mode');
            installed = false;
        }
    }catch(err){
        console.log(err);
        installed = false;
    }  
}
/*---------------------------------------------------------*/
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
/*---------------------------------------------------------*/
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
/*---------------------------------------------------------*/
function validLang(customLang){
    return customLang == 'ru' || customLang == 'en' || customLang == 'ru-RU' || customLang == 'en-US' || customLang == 'en-GB'?true:false;
}
/*---------------------------------------------------------*/
function tr(ru,en){
    let uls = '';
    if(validLang(customLang)){
        uls = customLang;
    }else{
	    var userLang = navigator.language || navigator.userLanguage; 
	    uls = String(userLang);
    }
	if(uls == 'ru' || uls == 'ru-RU'){
		return ru;
	}else{
		return en;
	}
}
/*---------------------------------------------------------*/
function gotoElement(hash){
	document.getElementById('mainpane').contentWindow.location.hash = hash;
}
/*---------------------------------------------------------*/
function makeid(length) {
   var result           = '';
   var characters       = 'abcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
/*---------------------------------------------------------*/
function getLang(){
    let lng = getUrlParam('lang');
    if(validLang(lng)){
       customLang = lng;
    }
}
getLang();
var lng = tr('ru','en');
/*---------------------------------------------------------*/
function getUrlParam(name){
    let url = new URL(window.location.href);
    let c = url.searchParams.get(name);
    return c;
}
/*---------------------------------------------------------*/
/*function removeUrlParam(name){
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    params.delete(name);
    console.log(params.toString());
    return params.toString();
}*/
/*---------------------------------------------------------*/
function gen(){
    hideDialog();
	var s = '';
	var $doc = $(document.getElementById('mainpane').contentWindow.document);
	let go = true;
	for(var a=0;a<styles.length;a++)
	{
	    let current = styles[a];
    	for(var i=0;i<current.items.length;i++)
    	{
    		let style = current.items[i];
    		if(style !== null && typeof(style) !== 'undefined')
    		{
        		go = true;
        		if((typeof(style.separator)!=='undefined' && style.separator === true) || 
        		   (typeof(style.onoffkey) !=='undefined' && getStoredValue(style.onoffkey,'false') == 'false'))
        		{
        		    go = false;
        		}    		    
        		let css =  go?style.css:'';
        		let vars = go?style.vars:[];
        		if(go){
            		for(var m=0;m<vars.length;m++)
            		{
            		    var myvar = vars[m];
            			var stn = myvar[0];
            			var def = myvar[1];
            			if(stn.includes('switch'))
            			{
            			    var srch = style.hash.includes('#')?style.hash:'#' + style.hash;
            			    let item = $doc.find(srch);
            			    let bdy = $doc.find('body');
            			    if(item.length > 0){
            			        let sv = getStoredValue(stn,false);
                                if(sv == 'false'){
                                    item.removeClass(def);
                                    bdy.removeClass(def + '-applied');
                                }else{
                                    if(sv == 'true'){
                                        item.addClass(def);
                                        bdy.addClass(def + '-applied');
                                    }
                                }
            			    }else{
            			        //console.log('Cannot find #' + style.hash);
            			    }
            			}
            			else if(stn.includes('array'))
            			{
            			    var arrayContainer = $doc.find('#' + style.hash);
            			    var arrString = getStoredValue(style.hash);
            			    var arr = arrString.split('|');
            			    if(arr.length > 0){
            			       arrayContainer.empty(); 
            			    }
            			    for(var q=0;q<arr.length;q++){//"<>\^`{|}
            			        var line = arr[q];
            			        var values = line.split('>');
            			        if(values.length >= 4 && values[0] == 'button')
            			        {
            			            let btn = '<a href="' + values[1] + '" class="btn btn-lg cover-btn mx-1" target="' + values[3] + '">' + values[2] + '</a>'
            			            arrayContainer.append(btn);
            			        }
            			        else if(values.length >= 2 && values[0] == 'slide')
            			        {
            			            let slide = '<div class="carousel-item active" id="carousel-item-'+q+'"><img class="d-block w-100" src="' + values[1] + '"></div>';
            			            arrayContainer.append(slide);
            			        }
            			    }
            			}
            			else if(stn.includes('setPath'))
            			{
            			    let path = $doc.find('#' + style.hash);
            			    let data = getStoredValue(style.hash + '-' + stn,def);
        			        try {
                                let decoded = atob(data);
                			    //console.log('stn: ' + stn + ', decoded:' + decoded);
                			    if(decoded.startsWith('M 0')){
                                    path.attr('d',decoded);
                			    }else{
                			        path.attr('d','');
                			        css = '';
                			    }
                            }catch(e){
                			    if(data.includes(commonSeparator))
                			    {
                			        console.log('Unable to base64 decode string, but it includes a "' + commonSeparator + '" - will try to parse: ' + data);
                    			    let path = data.split(commonSeparator);
                    			    if(path.length >= 2){
                        			    //console.log(stn + ' data to decode: ' + path[0]);
                        			    let decoded = atob(path[0]);
                        			    //console.log('stn: ' + stn + ', decoded:' + decoded);
                        			    if(decoded.startsWith('M 0')){
                                            path.attr('d',decoded);
                        			    }else{
                        			        css = '';
                        			    }
                    			    }
                			    }
                            }
            			}			
            			else if(stn.includes('imageBase64'))
            			{
            			    let image = $doc.find('#' + style.hash);
            			    let mdata = getStoredValue(style.hash);
                            image.attr('src',mdata);
            			}
            			else{
            			   if(Array.isArray(def)){
            			      def = def[0][0];
            			   }
            			   if((stn.includes('height') || stn.includes('width') || stn.includes('size')) && def.includes(',')){
            			      let arra = def.split(','); 
                			  if(Array.isArray(arra)){
                			     cleanupArray(arra); 
                			     if(arra.length > 0){
                			        def = arra[0];
                			     }
                			  }  
                		   }
                		   let valu = getStoredValue(style.hash + '-' + stn,def);
                		   if(css.includes('data:image/svg+xml') && valu.startsWith('#')){
                		       valu = hexToRgbA(valu);
                		   }
            			   css = replaceAll(css,'['+stn+']',valu);
            			}
            		}
        		}
        		s += css;
    	    }
    	}
	}
	$doc.find('head').find('style:not(.system)').remove();
	$doc.find('html').find('script:not(.system)').remove();
	$doc.find('head').find('link:not(.system)').remove();
	$doc.find('head').find('style#cssmain').remove();
	$doc.find('head').append($("<style />", {
		html:s,
		'id':'cssmain',
		'class':'system'
    }));
    readLayoutSetting();
}
/*---------------------------------------------------------*/
function clear(str){return str.replace(/\s/g,"");/*.replace(/[^a-zA-Z ]/g, "")*/}
/*---------------------------------------------------------*/
function weHaveAproject(){
    let keys = [
        'mainLayout',
        'sitelogoimage'
    ];
    let defv = 'foooo';
    let found = 0;
    for(let m=0;m<keys.length;m++){
        let ret = getStoredValue(keys[m],defv);
        if(ret !== defv){
            found++;
        }
    }
    if(found == keys.length){
        return true;
    }else{
        return false;
    }
}
/*---------------------------------------------------------*/
function getStoredValue(valueName,defValue,useCookies){
	let defv = typeof(defValue)!='undefined'? Array.isArray(defValue)?defValue[0]:defValue:''; 
	let _useCookies = typeof(useCookies)!='undefined'?useCookies:false;
	let v;
	if(!_useCookies){
    	v = localStorage.getItem(store_prfx+valueName);
    	if(v===null){
    	   v = Cookies.get(valueName); 
    	}
	}else{
	    v = Cookies.get(valueName);
	    //console.log('Using cookie to get ' + valueName + '. Got: ' + v);
	}
	let ret = v!==null && typeof(v)!='undefined' && v.length > 0?v:defv;
	//console.log('Cookie ' + valueName + ' value is ' + ret);
	return ret;
}
/*---------------------------------------------------------*/
function designChanged()  {design_changed = true; }
function designUnchanged(){design_changed = false;}
function ifDesignChanged(){return design_changed; }
/*---------------------------------------------------------*/
function storeValue(name,val,useCookies)
{
    let _useCookies = typeof(useCookies)!='undefined'?useCookies:false;
    designChanged();
    if(name.includes('fonts') || _useCookies){
        var expDate = new Date();
        expDate.setTime(expDate.getTime() + (365 * 24 * 60 * 60 * 1000));
	    Cookies.set(name,val,{expires: expDate });
    }
    try{
	    localStorage.setItem(store_prfx + name,val);
    }catch (e) {
        console.log('Failed to store ' + name + ': ' + val + ' due to the error: ' + e)
    }
}
/*---------------------------------------------------------*/
function cookiesSet(name,val){
	name = clear(name);
	var m = name.split('-');
	storeValue(name,val);
	gen();
}
/*---------------------------------------------------------*/
function updFrame(){
    iframeStartToLoad();
    document.getElementById('mainpane').contentWindow.location.reload();
}
/*---------------------------------------------------------*/
function checkDownloadIsReady(){
    loadedTotal++;
    if(loadedTotal >= shouldBeLoaded){
        //console.log('Packing. Should have load: ' + shouldBeLoaded + 'itms. Actually loaded: ' + loadedTotal + 'itms');
        loadedTotal = 0;
        shouldBeLoaded = 0;
        downloadIsReady();
    }
}
/*---------------------------------------------------------*/
var shouldBeLoaded = 0;
var loadedTotal = 0;
var Thumb = '';
var Preview = '';
function drawPic(canvas,cwidth,cheight,quality){
    let manvas = document.createElement('canvas');
    manvas.height = cwidth;
    manvas.width = cwidth;
    manvas.style.height = cheight;
    manvas.style.width = cheight;
    let ctx = manvas.getContext("2d");
    ctx.drawImage(canvas,0,0,canvas.width,canvas.height,0,0,manvas.width,manvas.height);
    let ret = manvas.toDataURL('image/jpeg',quality);//image/jpeg, image/png, image/webp
    $(manvas).detach();
    return ret;
}
/*---------------------------------------------------------*/
function downloadThis(array,dirName,getAttr)
{
    shouldBeLoaded = shouldBeLoaded + array.length;
    $.each(array,function(index,value){
        let nk = $(value).attr(getAttr);
        if(typeof(nk)!='undefined' && nk !== null && nk.length > 0){
            let req = $.ajax({
              url: nk,
              targt:value,
              initialUrl:nk
            });
            $.when(req).done(function(response){//,status,jqXHR
                let urla = this.url;
                let line = [dirName,filename(urla),response];
                if(!download.includes(line)){
                    download.push(line);
                }
                checkDownloadIsReady();
            });
        }
    });
}
/*-----------------------------------------------------------*/
var download = [];
function clearDownload(){
    clearArray(download);
}
/*-----------------------------------------------------------*/
function clearArray(arr){
    while(arr.length > 0){arr.pop();}
    arr.splice(0,arr.length);
    arr.length = 0;
    arr = [];
}
/*-----------------------------------------------------------*/
function prepareCssAndScripts(docu,html,tagName,tagAttrName){
    var stringsToBeReplaced = [];
    var csslinks = docu.querySelectorAll(tagName + '['+tagAttrName+'^=\'assets/\']');
    for(var q=0;q<csslinks.length;q++){
        var str = csslinks[q].getAttribute(tagAttrName);
        if(typeof(str)!='undefined' && str.length > 0 && !stringsToBeReplaced.includes(str)){
            stringsToBeReplaced.push(str);
        }
    }
    for(var r=0;r<stringsToBeReplaced.length;r++){
        //console.log('Replaced ' + stringsToBeReplaced[r],'to RESOURCE' + stringsToBeReplaced[r]);
        html = replaceAll(html,stringsToBeReplaced[r],'RESOURCE' + stringsToBeReplaced[r]);
    }
    return html;
}
/*-----------------------------------------------------------*/
function dayStamp(){
    let d = new Date();
    let month = d.getUTCMonth() + 1; //months from 1-12
    let day = d.getUTCDate();
    let year = d.getUTCFullYear();
    let hou = d.getHours();
    let min = d.getMinutes();
    let newdate = year + '-' + month + '-' + day + '@' + hou + '-' + min;
    return newdate;
}
/*-----------------------------------------------------------*/
var stageCleared = false;
function clearTheStage(){
    stageCleared = true;
    document.getElementById('mainpane').src = '';
    $('#rightpane').empty();
    $('#navpane').empty();
}
/*-----------------------------------------------------------*/
function stringToJSON(str){
    try{
        let regex = /\,(?=\s*?[\}\]])/g;
        let correct = str.replace(regex, ''); // remove all trailing commas
        let jsonFile = JSON.parse(correct); // build a new JSON object based on correct string
        return jsonFile;
    }catch(e){
        console.log('Error: ' + e)
        return '';
    }
}
/*-----------------------------------------------------------*/
function createProjectFile(){
    let projectFile = '{\n';
        projectFile += '    "' + projectMainKey +'":"' + Thumb + '",\n';
        projectFile += '    "timestamp":"' + timeStamp() + '",\n';
    for(let ls=0;ls< localStorage.length;ls++){
       let ky = localStorage.key(ls);
       if(ky.startsWith(store_prfx) && !ky.includes('#') && ky != projectMainKey && !ky.endsWith('switchCoverMiniPreview')){;
            projectFile += '    "' + ky + '":"' + localStorage.getItem(ky) + '",\n';   
       }
    }
    projectFile += '}\n'; 
    return projectFile;
}
/*-----------------------------------------------------------*/
var buildStarted = false;
function downloadIsReady()
{
    if(buildStarted){
        return;
    }
    hideDialog();
    buildStarted = true;
    var zip = new JSZip();
    var docu = document.getElementById('mainpane').contentWindow.document;
    var html = '<!DOCTYPE html>\n<html>' + docu.getElementsByTagName("html")[0].innerHTML + '</html>';
    
    html = replaceAll(html,'<!--<ruby>','');
    html = replaceAll(html,'</ruby>-->','');
    html = replaceAll(html,'<ruby>','');
    html = replaceAll(html,'</ruby>','');
    html = replaceAll(html,'&lt;','<');
    html = replaceAll(html,'&gt;','>');
    html = replaceAll(html,'<maincol>','');
    html = replaceAll(html,'</maincol>','');
    html = replaceAll(html,'<leftcol>','');
    html = replaceAll(html,'</leftcol>','');
    html = replaceAll(html,'<rightcol>','');
    html = replaceAll(html,'</rightcol>','');
    html = replaceAll(html,'#siteroot','/');
    
    let mla = getStoredValue('mainLayout','');
    if(mla == '2'){
        html = replaceAll(html,'SIDE_LINKS','SIDE_LINKS_R');
    }
    
    html = html.replace(/(^[ \t]*\n)/gm, "");
    
    html = prepareCssAndScripts(docu,html,'link','href');
    html = prepareCssAndScripts(docu,html,'script','src');

    zip.file("template.html",html);
    var assets = zip.folder("assets");
    
    var info =  ':original_author: '+appName+'\n'+
                ':name: Nice Muse\n' +
                ':version:\n' + 
                ':type:\n';
    zip.file("info.yml",info);
    zip.file("thumb.jpg", Thumb.substr(Thumb.indexOf(',')+1), {base64: true});
    zip.file("preview.jpg", Preview.substr(Thumb.indexOf(',')+1), {base64: true});
    let projectFile = createProjectFile();
    if(ifDesignChanged()){
       saveThisProjectToForage(projectFile);
       designUnchanged();
    }
    let jsonFile = stringToJSON(projectFile);
    zip.file(projectFileName,JSON.stringify(jsonFile));
    
    Thumb = '';
    Preview = '';
    let css = assets.folder('css');
    let js = assets.folder('js');
    for(let c=0;c<download.length;c++){
        let line = download[c];
        if(Array.isArray(line) && line.length >= 3){
            //console.log('Adding file: ' + line[1]);
            if(line[0] == 'css')
            {
               css.file(line[1],line[2],{base64:false});
            }
            else if(line[0] == 'js')
            {
                if(line[1].toLowerCase() != 'jquery.js'){
                    js.file(line[1],line[2],{base64:false}); 
                }
            }
        }
    }
    zip.generateAsync({type:"blob",compression:'DEFLATE'})
    .then(function(content){
        let zipname = "Design_Muse_" + dayStamp() + '_' + makeid(5) + ".zip";
        let autoupload = autoUploadIsPossible();
    	if(autoupload.possible && 0)
    	{
    	    useAutoUploadFeature = false;
    	    //https://stackoverflow.com/questions/30993442/how-to-get-the-final-url-after-an-ajax-redirect
	        //let address = cutWebsiteAddress(autoupload.url);
    	    let uploadurl = 'https://' + autoupload.url + '.edit.' + autoupload.shortname + '/design_templates/create';//address.protocol
    	    console.log('Will upload to ' + uploadurl);
            var files = new File([content], zipname);
            var formData = new FormData();
            formData.append('zip_data', files);
            formData.append('type','MuseDesign');//https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
            $.ajax({
                data: formData,
                url : uploadurl,
                type : 'POST',
                timeout:3*60000,
                processData: false,
                contentType: false,
                success : function(response, textStatus, jqXHR){
                    console.log("Upload success: " + textStatus);
                    //window.open('');
                    onZipBuildComplete();
                },
                error:function(jqXHR, textStatus, errorThrown){
                    setDialogReady('<h3>' + tr('Ошибка','Error') + '</h3>' + 
                    renderErrorMessage(tr('Автоматическая загрузка не удалась. Загрузите дизайн вручную','Auto Upload has failed. Upload your design manually') + 
                    '. ' + textStatus + '. ' + errorThrown + 
                    '<div class="msg-container"><button class="activebtn" style="width:100%" onclick="updFrame()">' + tr('Понятно','Got it!') + '</button></div>'),false);
                    useAutoUploadFeature = false;
                    saveAs(content, zipname);
                    clearDownload();
                    buildStarted = false;
                    setTimeout(function(){updFrame();},5000)
                }
            });    	    
    	}else{
    	    useAutoUploadFeature = false;
            if(installed){
                saveFileAs(content);
            }else{
                saveAs(content, zipname);                
            }
            onZipBuildComplete();
    	}
    });
}
/*-----------------------------------------------------------*/
function autoUploadIsPossible(){
    let out = {};
    let websiteUrl = getUrlParam('project');
    out.rawurl = websiteUrl;
	if(websiteUrl != null && typeof(websiteUrl)!== 'undefined' && websiteUrl.length > 0 && websiteUrl.includes('.') && (websiteUrl.startsWith('http://') || websiteUrl.startsWith('https://') || websiteUrl.startsWith('//'))){
	    out.possible = false;
	    let u = cutWebsiteAddress(websiteUrl);
        out.url = u.url;
        out.shortname = u.shortname;
	}else{
	    out.possible = false;
	    out.url = '';
        out.shortname = '';
	}
	//console.log('autoUploadIsPossible:');
	//console.log(out);
	return out;
}
/*-----------------------------------------------------------*/
function cutWebsiteAddress(url){
    let protocols = ['http://','https://','//'];
    let m = '';
    let prot = '';
    for(let i=0;i<protocols.length;i++){
        let p = protocols[i];
    	if(url.startsWith(p)){
           m = url.substr(p.length,url.length);
           prot = protocols[i];
           break;
        }
    }
    let out = {};
    out.protocol = prot;
    if(m.includes('/')){
        out.url = m.substr(0,m.indexOf('/'));
    }else{
        out.url = m;
    }
    if(out.url.startsWith('www.')){
       out.shortname = out.url.substr(4,out.url.length);
    }else{
       out.shortname = out.url;
    }
    //console.log('cutWebsiteAddress:');
    //console.log(out);
    return out;
}
/*-----------------------------------------------------------*/
function onZipBuildComplete(){
    buildStarted = false;
    clearDownload();
    $('#zanaves').hide();
    updFrame();
}
/*-----------------------------------------------------------*/
function getDomain(){
    return location.protocol + '//' + location.host;
}
function getPureCurrentUrl(){
    return getDomain() + location.pathname
}
/*-----------------------------------------------------------*/
function generateReloadUrl(arr){
    let ret = getPureCurrentUrl() + '?';
    if(Array.isArray(arr)){
        for(let m=0;m<arr.length;m++){
            let itm = arr[m];
            if(Array.isArray(itm) && itm.length >= 2){
                ret += '&' + itm[0] + '=' + itm[1];
            }
        }
    }
    return ret;
}
/*-----------------------------------------------------------*/
let cW = 998; 
let cH = 1100;
/*-----------------------------------------------------------*/
async function build()
{   
    shouldBeLoaded++;
    const PaintCanvas = document.createElement('canvas');
    PaintCanvas.width =  cW;
    PaintCanvas.height = cH;
    
    let w = document.getElementById('mainpane');	
    $('#zanaves').show();

	let cloned = $('<iframe frameborder="0" scrolling="no" id="cloned" sandbox="allow-same-origin allow-forms allow-downloads allow-popups"></iframe>').appendTo('html');	
	let data = w.contentWindow.document.getElementsByTagName("html")[0].innerHTML;
	
	/*let ci = $(w.contentWindow.document.querySelector('.carousel-inner'));
    let activPic = w.contentWindow.document.getElementById("carousel-item-img-1");
        activPic.setAttribute('crossOrigin','Anonymous');
    firstPicData = drawPic(activPic,ci.width(),ci.height(),0.72);
    console.log('activPic is ' + activPic + ' - ' + firstPicData);*/
	
	cloned.attr({"srcdoc":data});
	cloned.on("load",function(){
		$(this).contents().find(".animated").removeClass("animated");
		$(this).contents().find("link[href*='fonts.googleapis']").remove();
		$(this).contents().find("iframe").remove();
		$(this).contents().find("script").remove();
		/*let slide = $(this).contents().find(".carousel-item.active img");
		    slide.attr("src",firstPicData);
		    slide.on("load",function(){*/
    		html2canvas(document.getElementById('cloned').contentWindow.document.getElementsByTagName("html")[0],{
    			logging:false,
    			allowTaint:false,
    			removeContainer:false,
    			canvas:PaintCanvas,
    			//letterRendering: 1,
    			foreignObjectRendering:false,
    			useCORS:true,
    			x:0,
    			y:0,
    			scrollY:0,
    			scrollX:0,
    			imageTimeout:20000,
    			width: cW,
    			height:cH,
    			windowWidth: cW,
    			windowHeight:cH
    			}).then(canvas => {
    				document.body.appendChild(canvas);
    				Thumb =   drawPic(canvas,cW/2.5,cH/2.5,0.72);
    				Preview = drawPic(canvas,cW*0.8,cH*0.8,0.72);
    				checkDownloadIsReady();
    				document.body.removeChild(canvas);
    				$('#cloned').remove();
    		    });	
    		/*}).each(function() {
              if(this.complete) {
                 $(this).trigger('load'); // For jQuery >= 3.0 
              }
            });*/
	});
	
	clearDownload();
	var $doc = $(w.contentWindow.document);
	$doc.find('.placeholder').remove();
	$doc.find('#scalingcss').remove();
	$doc.find('html').removeAttr('style');
	downloadThis($doc.find("link[href^='assets/css']"),'css','href');
	downloadThis($doc.find("script[src^='assets/js']"),'js','src');    
}
/*-----------------------------------------------------------*/
function langswitch(obj){
    var el = $(obj);
    var rep = el.attr(tr('ru','en'));
    if(typeof(rep) != 'undefined' && rep.length>0){
        if(el.prop('tagName').toLowerCase() == 'input'){
            el.val(rep);
        }else{
            obj.replaceWith(rep);
        }   
    }
}
function applyLang(lang){
	for(var a=0;a<lang.length;a++){
	    langswitch(lang[a]);
	}    
}
/*-----------------------------------------------------------*/
function applyStyles(){
    let $doc = $(document.getElementById('mainpane').contentWindow.document);
    applyLang($doc.find('lang'));
    applyLang($doc.find('input'));
    
    let $rp = $(document.getElementById('banner'));
    applyLang($rp.find('lang'));
    
    setPreviewVariables($doc,'title','#brand-inner span.placeholder, #covertitle','text');
    setPreviewVariables($doc,'slogan','#slogan span.placeholder','text');
    setPreviewVariables($doc,'logoimage','#sitelogoimage','src');

    gen();
}
/*---------------------------------------------------------*/
function toggler(id,key,initial,updateFrame){
    var v = getStoredValue(key,'false');
    if(!initial){
        //console.log('v0=' + v);
        if(v == 'true'){v = 'false'}else{v='true';}
        //console.log('v1=' + v);
        storeValue(key,v);
        v = getStoredValue(key,'false');
    }
    if(v == 'true'){
        //console.log('v2=' + v);
        $(id).addClass('toggled');
    }else{
        $(id).removeClass('toggled');
    }
    if(!initial)
    {
        gen();
        var _updateFrame = typeof(updateFrame)!='undefined'?updateFrame:false;
        if(_updateFrame){
            updFrame();
        }
    }
}
/*-----------------------------------------------------------*/
function ToggleButton(current,text,updateFrame){
    var title = typeof(text)!='undefined'?text:tr('Включено','Enabled');
    var _updateFrame = typeof(updateFrame)!='undefined'?updateFrame:false;
    var idi = makeid(6);
    return '<div id="'+idi+'" class="mytoggle" onclick="toggler(\'#'+idi+'\',\''+current+'\',false)">' + title + '<script>toggler(\'#'+idi+'\',\''+current+'\',true,'+updateFrame+')</script></div>';
}
/*-----------------------------------------------------------*/
function chk(txt){return typeof(txt)!='undefined'?txt:'';}
/*-----------------------------------------------------------*/
function makeIconMenuItem(name,icon,id){
    var ide = '';
    if(id == 'help' || id == 'palette'  || id == 'gallery' || id == 'loadproject' || id == 'pickcolor' || id == 'recent'){
        ide = 'javascript:showDialog(\'\',\''+id+'\',false)';
    }else{
        ide = '#' + id;
    }
    return '<div class="sett-icon" id="icon_btn_'+id+'" ><object alt="' + name + '" data="assets/images/icons.svg#'+icon+'" type="image/svg+xml"></object><a id="btn_'+id+'" data-tooltip="' + name + '" href="'+ide+'"></a></div>';
}
/*-----------------------------------------------------------*/
function toggle(el,className){
    if(el.classList.contains(className)){
        el.classList.remove(className);
    }else{
        el.classList.add(className);
    }
}
/*-----------------------------------------------------------*/
function sel(el){
    if(!el.classList.contains('active')){
        forEach(el.parentElement.children,function(index, value){
            value.classList.remove('active');
        });
        el.classList.add('active');
        el.parentElement.setAttribute('data-current',el.textContent);
    }
}
/*-----------------------------------------------------------*/
function makeAList(hash,stn,lst,label){
    let ttl = label.length>0? '<div class="listHeader">'+label+'</div>':'';
    let currentValue = getStoredValue(hash + '-' + stn);
    let currentText = '';
    for(let a=0;a<lst.length;a++){
        if(currentValue == lst[a][0]){
            currentText =  lst[a][1];
        }
    }
    if(lst.length > 0 && currentText == ''){
        currentText =  lst[1][1];
    }
    let css = ttl + '<div class="select collapsed" data-current="' + currentText + '" onclick="toggle(this,\'pointed\')">'; 
    for(let l=0;l<lst.length;l++){
        let valu = lst[l][0];
        let active = currentValue == valu?' current':'';
        css += '<div class="select-item'+active+'" onclick="sel(this);cookiesSet(\''+ hash + '-' + stn+'\',\''+ valu +'\')">'+ lst[l][1] +'</div>';    
    }
    css += '</div>';
    return css;
}
/*-----------------------------------------------------------*/
function hi(el){
	el.parentElement.classList.toggle("action");
}
/*-----------------------------------------------------------*/
function bytesToKb(bytes){
    return (bytes / 1024).toFixed(2) + '&nbsp;' + tr('Кб','Kb');
}
/*-----------------------------------------------------------*/
function calcLocalStorageItemSize(itemValue,itemName){
    return (itemValue + itemName) * 2
}
function getStorageSize(){
    if (!localStorage) {
        console.log('unavailable');
    } else {
        let max = 'x', s;
        let lower_bound = 1, upper_bound = 1, middle;
        try {
            while (true) {
                localStorage.setItem('test', max);
                lower_bound = upper_bound;
                upper_bound *= 2;
                max = max + max;
            }
        } catch (e) {
        }
        while (upper_bound - lower_bound > 2) {
            try {
                middle = (lower_bound + upper_bound) / 2;
                s = max.substr(0, middle);
                localStorage.setItem('test', s);
                lower_bound = middle;
            } catch (e) {
                upper_bound = middle;
            }
        }
        let _u;
        storageUsedSize = 0;
        for (_u in localStorage){
            if(_u.startsWith(store_prfx)){
                if(!localStorage.hasOwnProperty(_u)) {
                    continue;
                }
                storageUsedSize += calcLocalStorageItemSize(localStorage[_u].length,_u.length);
            }
        } 
        //console.log('size=' + lower_bound + '/' + upper_bound + '=' + (lower_bound / 1024).toFixed(1) + 'k');
        storageUsedSizeStr = bytesToKb(storageUsedSize);
        storageTotalSizeStr = bytesToKb(lower_bound);
        let w = Number(storageUsedSize / lower_bound * 100).toFixed(2) + "%";
        $('#bottompane').append('<span class="storagesize" data-text="'+ storageUsedSizeStr + tr(' из ',' of ') + storageTotalSizeStr + '"><span class="size-gauge" style="width:'+w+'"></span></span>')
        clearStorageFromOthers();
        return lower_bound;
    }    
}
/*-----------------------------------------------------------*/
var version = '1.10';
var appName = '';
function gui()
{
    appName = tr('Доксайт Muse','Docsite Muse') + ' ' + version + ' (β)';
    $('meta[name="description"]').attr('content',tr(
        'Доксайт: cоздание веб-сайта из файла Word - Простой и быстрый способ управления контентом сайта. Ипользуйте Word, ONLYOFFICE, OpenOffice для создания контента Вашего сайта',
        'Docsite: Turn a Word File into Website - Simple and fast website content author. Use proven robust Word, OpenOffice to author your website content'))
    $('#banner').attr('data-text',appName);
    $('title').text(appName);
    var t = '';
	var g = '';
	    t += makeIconMenuItem(tr('Справка','Help'),'help','help');
	    t += installed? '':makeIconMenuItem(tr('Внешний загруженный проект','Load saved project'),'loadproject','loadproject');
	    t += makeIconMenuItem(tr('Недавние проекты','Recent projects'),'recent','recent');
	    t += makeIconMenuItem(tr('Галерея','Gallery'),'gallery','gallery');
	    t += makeIconMenuItem(tr('Редактор палитры','Palette editor'),'palette','palette');
	    t += makeIconMenuItem(tr('Получить цвет','Pick color'),'pickcolor','pickcolor');
	for(var a=0;a<styles.length;a++)
	{
	    var idy = 'block_' + a;
	    var current = styles[a];
	    var mainToggle = '';
		g += '<div class="sett-box">';
	    g += '<h3 class="sett-title" id="'+idy+'" onmouseout="hi(this);hidePointer()" onmouseover="hi(this);drawPointer(\'' + chk(current.hash) + '\',\'' + idy + '\')">' + mainToggle + chk(current.name) + '</h3>';
	    t += makeIconMenuItem(current.name,current.icon,idy);
    	for(var i=0;i<current.items.length;i++)
    	{
    		var style = current.items[i];
    		if(style !== null && typeof(style) !== 'undefined')
    		{
        		let css = '';
    		    let go = true;
    		    if(typeof(style.separator)!='undefined' && style.separator === true){  go = false;}  
    		    if(go){
            		let gogo = '';
            		let vars = style.vars;
            		let titleid = makeid(8);
            		let subtitle = chk(style.name);
            		let subTitleElem = subtitle.length>0? '<h6 id="'+titleid+'" title="' + subtitle + '">'+ subtitle +'</h6>':'';// onmouseover="drawPointer(\'' + chk(style.hash) + '\',\'' + titleid + '\')"
            		css = '<div class="gui-item ' + animaClasses + '">'+ subTitleElem;
            		for(var m=0;m<vars.length;m++){
            			var stn = clear(vars[m][0]);
            			var def = vars[m][1];
            			var label = vars[m].length>=3 && vars[m][2].length >0 ?'<span title="'+vars[m][2]+'">'+vars[m][2]+'</span>':'';
            			var ide = makeid(6);
            			if(stn.includes('color'))
            			{ 
            			   css += '<div class="gui-item-value" id="'+ide+'-box"><input style="margin-left:0.5rem;" id="'+ide+'" onchange="'+gogo+'" type="text" value="'+def+'"/>'+label+'</div><script>showPicker(\''+ide+'\',\'' + style.hash + '\',\''+stn+'\',\''+def+'\')</script>';
            			}
            			else if(stn.includes('height') || stn.includes('width') || stn.includes('size'))
            			{
            			   let ann = def.split(commonSeparator);
            			   let min = ann[0];
            			   let max = ann[2];
            			   let step = (Number(ann[2]) - Number(ann[0]))/100;
            			   let units = ann.length>=4 && ann[3] != null && typeof(ann[3])!='undefined'?ann[3]:'px';
            			   let sttle = ann.length>=5 && ann[4] != null && typeof(ann[4])!='undefined'?'<h6>'+ann[4]+'</h6>':'';
            			   css += sttle + '<input id="'+ide+'" type="range" min="'+ min +'" max="'+ max +'" value="'+ann[1]+'" step="' + step +'" />' + 
            			   '<script>$("#'+ ide + '").rangeslider({polyfill:false,onSlide:function(position,value){cookiesSet(\''+ style.hash + '-' + stn+'\',value + \''+units+'\');}});</script>' 
            			}
            			else if(stn.includes('list'))
            			{
            			    css += makeAList(style.hash,stn,def,label);
            			}
            			else if(stn.includes('switch'))
            			{
            			    css += ToggleButton(stn,label,false);
            			}
            			else if(stn.includes('imageBase64'))
            			{
            			    css += '<label for="file-upload" class="custom-file-upload" onclick="document.getElementById(\''+ide+'\').click();">' + tr('Загрузить','Upload') + '</label> ' + label + '<input type="file" id="'+ide+'" onchange="imageInputChanged(this.files,\''+style.hash+'\')">';
            			}
            			else if(stn.includes('showdialog'))
            			{
            			    css +='<button role="button" onclick="showDialog(\''+style.hash+'\',\'' + def + '\',false)">' + label +'</button>';
            			}
            			else if(stn.includes('fontList')){
            			    css +='<button role="button" onclick="showDialog(\''+style.hash+'\',\'fonts\',false)">' + label +'</button>';
            			}
            		}
            		if(typeof(style.onoffkey)!='undefined'){
        	            css += ToggleButton(style.onoffkey);
        	        }
    		    }else{
    		        css = '<div class="gui-item-separator"><h4>' + chk(style.name) + '</h4>'
    		    }
        		css += '</div>\n'
        		g += css + '\n';
    	    }
    	}
		g += '</div>';
	}
	$('#navpane').append(t);
	$('#rightpane').append(g);
	$('#rightpane').scroll(function(){
        window.location.hash = 'scrolled';
    });
    readGlobalPalette();
    cookieNote();
	let lnks = [
		['https://docsite.su',tr('Доксайт','Docsite')],
		['https://docsite.su/current/help.php',tr('Справка','Help')]
	];
	$('#bottompane').empty();
    for(let a=0;a<lnks.length;a++){$('#bottompane').append('<a href="'+lnks[a][0]+'" data-text="'+lnks[a][1]+'" target="_blank"></a>');}
	$('#bottompane').append('<div id="zommsle" style="width:10rem"><input title="'+tr('Увеличение области превью','Preview area zoom')+'" type="zoomslider" min="10" max="100" step="1" value="100" data-orientation="horizontal"></div>');
	$('#bottompane').append('<button role="button" class="zoomrevert" onclick="displayZoom(100)">100%</button>');
    $('input[type="zoomslider"]').rangeslider({
	    polyfill:false,
	    onInit:function(){
    	    displayZoom();
    	},
    	onSlideEnd:function(position,value){
    	    displayZoom(value);
    	}
	}); 	
    const prom = new Promise(function(value){
        getStorageSize();
    }).then(function(value){
    });    
}
/*-----------------------------------------------------------*/
function readGlobalPalette(){
    var plt = getStoredValue('globalPalette');
    if(plt !== null){
        var parr = plt.split(buttonsSeparator);
        for(var m=0;m<parr.length;m++){
            insertColorToPalette(parr[m]);
        }
    }
    showPaletteCount();
}
/*-----------------------------------------------------------*/
function isTransp(color){
    return color === 'rgba(0, 0, 0, 0)' || color === 'transparent'?true:false;
}
/*-----------------------------------------------------------*/
function PickerMoveEvent(event)
{
    let w = document.getElementById('mainpane').contentWindow;
    let b = w.document;
    var top  = w.pageYOffset || w.document.documentElement.scrollTop,
        left = w.pageXOffset || w.document.documentElement.scrollLeft;
    
    var posy = event.pageY - top;
    var posx = event.pageX - left;
    var hex = $(event.target).css('background-color');
    console.log('scroll top: ' + top);
    var p = $('#picker');
    if(isTransp(hex)){
        hex = '#000000 url("assets/images/muse-error.svg")';
    }
    p.css({
        position:"absolute",
        top: posy - p.width(),
        left:posx - p.width(), 
        'background':hex,
        'background-repeat':'no-repeat',
        'background-position':'center center',
        zIndex:9100
    });
    $('#'+event.data.boxid).spectrum("set",hex);
}
/*-----------------------------------------------------------*/
function attachColorPickerEvent(colorBoxId)
{
    let w = document.getElementById('mainpane').contentWindow;
    let dcmnt = w.document.getElementsByTagName("body")[0];
    $(dcmnt).on("mousemove",{boxid:colorBoxId},PickerMoveEvent);
    $(dcmnt).on("click",removeColorPickerEvent);
}
/*-----------------------------------------------------------*/
function hideColorPicker(){
    $('#picker').css({
        position:"absolute",
        top:-120,
        left:-120, 
        'background':'#FFFFFF',
        zIndex:5000
    });    
}
/*-----------------------------------------------------------*/
function removeColorPickerEvent(event){
    event.preventDefault();
    hideColorPicker();
    let w = document.getElementById('mainpane').contentWindow;
    let dcmnt = w.document.getElementsByTagName("body")[0];
    let d = $(dcmnt);
    d.off("mousemove",PickerMoveEvent);
    d.off("click",removeColorPickerEvent);
}
/*-----------------------------------------------------------*/
function hidePointer(){
    $('#line').fadeOut();
    $('#svgstart').fadeOut();
    $('#svgend').fadeOut();
    $('#svgrect').fadeOut();
    clearTimeout(htmr);
    htmr = -1;
}
/*-----------------------------------------------------------*/
var htmr = -1;
function drawPointer(sourceId,targetId)
{
    if(sourceId.length == 0 || targetId.length == 0){
        hidePointer();
        return;
    }
    let clr = '#0791f9';//00a1ff
    let rect = $('#svgrect');
    let line = $('#line');
    let start = $('#svgstart');
    let end = $('#svgend');
    let div1 = $('#'+targetId);
    if(div1.length == 0){ return;}
    let $doc = $(document.getElementById('mainpane').contentWindow.document);
    let st = $doc.scrollTop();
    let div2 = $doc.find('#'+sourceId);
    if(div2.length == 0 || !div2.is(":visible")){
        hidePointer();   
        return;
    }
    line.fadeIn();
    rect.fadeIn();
    let styl = 'stroke-width:1px;fill:transparent;stroke:'+ clr;//stroke-dasharray:3,3
    let divH = div2.outerHeight();
    let x1 = div1.offset().left;
    let y1 = div1.offset().top  + (div1.outerHeight()/2);
    let x2 = div2.offset().left + (div2.outerWidth()/2);
    let y2 = div2.offset().top  - st + (divH/2);
    rect.attr('x',div2.offset().left*zoomCoeff).attr('y',(div2.offset().top - st)*zoomCoeff).attr('width',div2.outerWidth()*zoomCoeff).attr('height',div2.outerHeight()*zoomCoeff).attr('style',styl).attr('rx',6);
    let size = Math.abs(y1 - y2);
    let d = 'M ' + x1 + ' ' + y1 + ' C ' + Number(x1 - size) + ' ' + y1 + ', ' + x2 + ' ' + Number(y2 + size) + ', ' + x2 + ' ' + y2;
    start.attr('cx',x1).attr('cy',y1).attr('style','fill:' + clr);
    end.attr('cx',x2).attr('cy',y2).attr('style','fill:'+ clr);
    line.attr('style',styl);
    line.attr('d',d);
    if(htmr == -1){
        htmr = setTimeout(function(){
            hidePointer();
        },2500)
    }
}
/*-----------------------------------------------------------*/
function showResultExplainer(){
    checkIfStandalone();
	let gotoYourAcc = urlas.valid && !installed ? tr(
                    'Мы сжимаем все ресурсы и код шаблона в один zip-файл. Чтобы применить дизайн, войдите в Ваш аккаунт на '+urlas.naming+'. Перейдите <b>Внешний вид и дизайн&rarr;Поменять дизайн&rarr;Редактировать</b> или <a target="_blank" href="'+urlas.newdesign+'">Создайте новый дизайн</a> и загрузите этот zip-архив.',
                    'We compress all the assets and template code into a single zip file. To apply your design, please log in to your '+urlas.naming+' account, go to <b>Appearance and Design&rarr;Change Design&rarr;Edit</b> or <a target="_blank" href="'+urlas.newdesign+'">Create new Design</a> and upload your ZIP-archive.'
	):'';
	let txt = resultButtonText() + ': ' + tr('Экспорт в Zip','Zip Exports');
	let method = 'build()';//installed? 'openSaveDialog()':'build()';
	let btnWidth = '100%';
	let autoupload = autoUploadIsPossible();
	let autoUploadButton = '';
    if(autoupload.possible){
        btnWidth = '49%';
        autoUploadButton = '<button class="activebtn" style="width:' + btnWidth + '" onclick="' + method + '">' + tr('Загрузить на ','Upload to ') + autoupload.shortname + '</button>';
    }
    let verb = installed? tr('Сохранить','Save'):tr('Скачать','Download');
    let line = '<h3>' + txt + '</h3>';
        line += '<div class="panno"></div><div class="msg-container">' +
                '<p>' +
                gotoYourAcc +
                '</p>' + 
                '<button class="activebtn" style="width:' + btnWidth + '" onclick="build()">' + verb + tr(' ZIP-архив',' file (ZIP-archive)') + '</button>' +
                autoUploadButton + '</div>'
    setDialogReady(line,false);
}/*

                renderMessage(tr(
                    '',
                    ''
                )) +
*/
/*-----------------------------------------------------------*/
function hideDialog(){
    $('#dialog-fon').off('click',hideDialog);
    //$('#dialog-window').removeClass('fadeIn').addClass('fadeOut');
    $('#dialog').hide();
    $('#dialog-window').removeAttr('style');
    $('#dialog-window-container').empty();
}
function callDialog(){
    $('#dialog').show();
}
/*-----------------------------------------------------------*/
function setDialogPrepared(maximized){
    let max = typeof(maximized)!='undefined'?maximized:false;
    $('#dialog-fon').on('click',hideDialog);
    $('#dialog').css({display:'flex'});
    if(max){
        $('#dialog-window').css({
            display:'block',
            position:'fixed',
            top:0,
            left:0,
            right:0,
            bottom:0,
            width:'100%',
            height:'100%'
        });
    }else{
        $('#dialog-window').removeAttr('style');
    }
    $('#dialog-window-container').empty();
}
/*-----------------------------------------------------------*/
function setDialogWaiting(){
    $('#dialog-window-container').append('<div class="dialog-loader"></div>');
}
/*-----------------------------------------------------------*/
function setDialogReady(content,maximized){
    setDialogPrepared(maximized);
    $('#dialog-window-container').empty();
    $('#dialog-window-container').append(content);
}
/*-----------------------------------------------------------*/
function showDialog(hash,type,maximized)
{
	checkVendor();	
    let max = typeof(maximized)!='undefined'?maximized:false;
    setDialogPrepared(max);
    if(type == 'fonts')
    {
        loadFontEditor(max);
    }
    else if(type == 'gallery')
    {
        loadGallery(max);
    }
    else if(type == 'loadproject')
    {
        loadExternalProject(maximized,getUrlParam('project'));
    }
    else if(type == 'covercontents')
    {
        readButtonsToEdit();
    }
    else if(type == 'pickcolor')
    {
        imageColorPicker()
    }
    else if(type == 'palette')
    {
        readPaletteToEdit();
    }
    else if(type == 'download')
    {
        setDialogWaiting();
        showResultExplainer();
    }
    else if(type == 'recent'){
        getProjectsFromForage();
    }
    else if(type =='help')
    {
        termsAndConditions();
    }
    else if(type == 'slides')
    {
        setDialogReady('');
        readSlidesToEdit();
    }
    else
    {
        setDialogReady('');
    }
    callDialog();
}
/*-----------------------------------------------------------*/
function isObject(val) {
    if (val === null) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
}
/*-----------------------------------------------------------*/
var tempGallerry = [];
function clearStorage(){
    for(var s=0;s< localStorage.length;s++){
       var ky = localStorage.key(s);
       //if(ky.startsWith(store_prfx)){;
            localStorage.removeItem(ky);
       //}
    }
}
function clearStorageFromOthers(){
    for(var s=0;s< localStorage.length;s++){
       var ky = localStorage.key(s);
       if(!ky.startsWith(store_prfx)){;
          localStorage.removeItem(ky);
       }
    }
}
/*-----------------------------------------------------------*/
async function fillStorageWithData(obj){
    for(const property in obj){
        let valu = obj[property];
        if(property.length > 0 && property.startsWith(store_prfx) && valu.length > 0 && property != projectMainKey && !property.endsWith('switchCoverMiniPreview')){
           let kay = await replaceAll(property,store_prfx,''); 
           //console.log(property + ' (' + kay + '):' + valu);
           await cookiesSet(kay,valu);
        }
    }
}
/*-----------------------------------------------------------*/
async function readProjectObj(obj)
{
    if(obj.hasOwnProperty(projectMainKey))
    {
        const promise0 = new Promise(function(hideDialog, reject) {
            
            hideDialog();
            //iframeStartToLoad();
            $('#zanaves').show();
            
        }).then(function(value){
               
           clearStorage();
          
        }).then(function(value){
            fillStorageWithData(obj);
        }).then(function(value){
            location.reload();
        });
    }else{
        console.log('readProjectObj: not a project');
    }
    
}
/*-----------------------------------------------------------*/
async function loadProject(g,isExternal){
    if(Number.isInteger(g) && g>=0 && g<tempGallerry.length){
        let _isExternal = typeof(isExternal)!='undefined'?isExternal:false;
        if(!_isExternal){
            console.log('Loading from gallery');
            storeValue(loadedExternalProjectKey,'-loaded-fom-gallery',true);
        }else{
            let ext = getUrlParam('project');
            if(strOkay(ext)){
               storeValue(loadedExternalProjectKey,ext,true);
            }
        }
        await readProjectObj(tempGallerry[g]);
    }
}
/*-----------------------------------------------------------*/
function removeCurrentProject(){
    clearStorage();
    location.reload();
}
/*-----------------------------------------------------------*/
async function loadLocalProject(){
  try{
    let fileHandle;
    fileHandle = await getFileHandle();
    const file = await fileHandle.getFile();
    if(file.type == 'application/json'){
        const projectAsText = await readFile(file, fileHandle);
        if(strOkay(projectAsText)){
            let json = stringToJSON(projectAsText);
            await readProjectObj(json);
        }else{
            console.log('Unable to read local file: ' + projectAsText);
        }
    }else if(file.type == 'application/zip'){
        JSZip.loadAsync(file).then(function(zip){
            return zip.files[projectFileName].async('text');
        }).then(function (txt) {
            console.log(txt);
            let json = stringToJSON(txt);
            readProjectObj(json);
        });
    }else{
        console.log('Unsupported file type');
    }
  }catch(e){
      console.log(e);
  }
}
//https://docsite.su/current/muse/current/index.html?lang=en&project=https://docsite.su/current/muse/current/json.php#block_2
function setPreviewVariables($iframedoc,parame,selector,attr){
    let custo = getUrlParam(parame);
    if(strOkay(custo)){
        if(attr == 'text'){
            $iframedoc.find(selector).text(custo);
        }else if(attr == 'src'){
            $iframedoc.find(selector).attr('src',custo);
        }
    }
}
function loadExternalProject(maximized,jsonUrl)
{
    if(strOkay(jsonUrl))
    {
		let address = getPureCurrentUrl();
		let url = address.substr(0,address.lastIndexOf('/')+1) + "json.php?q=" + jsonUrl;
		setDialogWaiting();
		var jqxhr = $.getJSON(url,function(data){
			//console.log(data);
			let line = '<h3>' + tr('Загрузить проект','Load Project') + '</h3><div class="slides-grid recent-projects"><div>';
			line += processGalleryItem('',data,true);
			line += '</div></div>';
			line += '<div class="msg-container ' + animaClasses + '">';
			line += '<button class="activebtn fullwidth-btn" role="button" onclick="loadProject(0)"><span>'+tr('Загрузить проект','Load project')+'</span></button>';
			line += renderMessage(tr(
				'При загрузке проекта, Ваш текущий проект будет полностью заменен новым',//превью проекта или кнопку Кликните <b>Загрузить проект</b> для загрузки проекта. 
				'Click the thumbnail or <b>Load project</b> button to load the project. The current project will be completely removed and replaced with a selected one'));
			line += '</div>';
			setDialogReady(line,maximized);
		})
		.done(function() {
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			setDialogReady('<h3>' + tr('Ошибка','Error') + '</h3>' + renderErrorMessage(tr('Ошибка загрузки','Error loading screen') + '. ' + textStatus + '.'),maximized);
		})
		.always(function(){
		});		
    }else{
        setDialogReady('<h3>' + tr('Внешний загруженный проект','External Loaded Project') + '&nbsp;' + inlineButton('removeCurrentProject()',tr('Удалить всё','Clear all'),'inlinebutton') + '</h3><div class="slides-grid"></div>' + renderMessage(tr('Нет внешнего загруженного проекта','No external loaded project')),maximized);
    }
}
/*-----------------------------------------------------------*/
function inlineButton(call,text,css){
	return '<button class="' + css + '" onclick="'+ call +'">' + text + '</button>';	
}
/*-----------------------------------------------------------*/
function renderErrorMessage(text){
    return '<div class="error"><b>' + tr('Сообщение об ошибке','Error message') + ':</b> ' + text + '</div>';
}
/*-----------------------------------------------------------*/
function localesSupported() {
  try {
    new Date().toLocaleDateString('i');
  } catch (e) {
    return e.name === 'RangeError';
  }
  return false;
}
function timeStamp(){
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    let now = new Date();
    let segobdya = now.toLocaleDateString(language,options);
    let seychas =  now.toLocaleTimeString(language, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    return segobdya + ' ' + seychas;
}
/*-----------------------------------------------------------*/
function processGalleryItem(key,val,isExternal){
    let line = '';
    let obj;
    if(typeof(val) == 'string'){
        obj = JSON.parse(val);
    }else{
        obj = val;
    }
    if(typeof(obj[projectMainKey]) !== 'undefined'){
        tempGallerry.push(obj);
        let deleteBtn = typeof(obj.storekey)!=='undefined' && String(obj.storekey).length > 0?'<div class="delbtn" onclick="removeFromForage(\'' + obj.storekey + '\')"></div>':'';
        let local = obj.local? ' localproj ':'';
        let recent= obj.local? 'data-recent="' + tr('Недавний','Recent') + '"':'';
        let tstamp= obj.local && typeof(obj.timestamp)!=='undefined'? 'data-tstamp="' + obj.timestamp + '"':'';
        let indx = tempGallerry.length - 1;
        line += '<div '+recent+' ' + tstamp + ' class="static-item slide-img '+ animaClasses + ' ' + local + '" style="background-image:none;"><div class="slide-img-inner" onclick="loadProject(' + indx + ',' + isExternal + ')" style="background-image:url(\''+ obj[projectMainKey]+'\')"></div>'+deleteBtn+'</div>';    
    }
    else
    {
        if(obj.hasOwnProperty('message')){
            line = renderErrorMessage(obj['message']);
        }
        console.log('loadGallery: not an object');
    }
    return line;
}
/*-----------------------------------------------------------*/
function renderGallery(data,title,customArray){
    let line = '<h3>' + title + '</h3><div class="slides-grid readymade-projects"><div>';
    let arr;
    if(Array.isArray(customArray)){
        arr = customArray.concat(data);
        //console.log('Added: ' + customArray.length + ' items to received array. Now ' + arr.length);
    }else{
        arr = data;
    }
    clearArray(tempGallerry);
    $.each(arr,function(key,val){
        line += processGalleryItem(key,val,false);
    });
    clearArray(recentProjectsArray);
    //console.log('Loading projects. Total: ' + tempGallerry.length);
    line += '</div></div>';
    line += '<div class="msg-container">';
    line += renderMessage(tr(
        'Выберите проект для создания нового дизайна на его основе. Текущий проект будет полностью заменен выбранным',
        'Choose a project to be used as a template for your new design. The current project will be completely removed and replaced with a selected one'));
    line += '</div>';
    setDialogReady(line,false);
}
/*-----------------------------------------------------------*/
function loadGallery(maximized){
    setDialogWaiting();
    let address = getPureCurrentUrl();
    let url = address.substr(0,address.lastIndexOf('/')+1) + "/gallery.php";
    var jqxhr = $.getJSON(url,function(data){
        renderGallery(data,tr('Галерея проектов','Gallery'));
    })
    .done(function() {
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("error " + textStatus);
        //console.log("incoming Text " + jqXHR.responseText);
        setDialogReady(renderMessage(tr('Ошибка загрузки','Error loading screen') + '. ' + textStatus + '.'),maximized);
    })
    .always(function(){
    });
}
/*-----------------------------------------------------------*/
function loadFontEditor(maximized){
    setDialogWaiting();
    let address = getPureCurrentUrl();
    $.getJSON(address.substr(0,address.lastIndexOf('/')+1) + "fonts.php",function(data){
        let line = '<h3>' + tr('Указать шрифты','Set up fonts') + '</h3>';
        for(var f=0;f<fontMenu.length;f++){
            let piece = fontMenu[f];
            let current = getStoredValue(piece[1],'0'); 
            line += '<div class="gui-item '+ animaClasses + '" style="width:33.3%"><h5>'+ piece[0] +'</h5><div class="select" style="max-height: 26rem;">';
            $.each(data,function(key,val){
                if(Array.isArray(val)){
                    let active = String(key) == current?' current':'';
                    line += '<div class="select-item'+active+'" onclick="cookiesSet(\'' + piece[1] + '\',\''+ key +'\');updFrame();">'+val[0]+'</div>';
                }
            });
            line += '</div></div>';
        }
        setDialogReady(line,maximized);
    }); 
}
/*-----------------------------------------------------------*/
function makeShareIcons(){
    /*let ret = '<div class="socialicons">';
    for(let u=0;u<sharer.length;u++){
        let lne = sharer[u];
        if(Array.isArray(lne)){
            let url = lne[1];
            url = replaceAll(url,'[urla]',encodeURIComponent(getPureCurrentUrl()));
            url = replaceAll(url,'[desc]',encodeURIComponent('Docsite - ' + tr('Превратите ваш офисный документ в веб-сайт','Turn your office document into a website')));
            url = replaceAll(url,'[pict]',encodeURIComponent('https://docsite.su/current/assets/images/splash.png'));
            ret += '<div class="share-icon" data-type="'+lne[0]+'" title="'+lne[0]+'" onclick="window.open(\''+url+'\',\'\',\'width=736,height=576\');"></div>';
        }
    }
    ret += '</div>';*/
    return '';
}
/*-----------------------------------------------------------*/
function termsAndConditions(){
    setDialogWaiting();
    let req = $.ajax({url:"../../cache/micro_menu_cached_" + lng + '?a=' + makeid(6)});
    $.when(req).done(function(response){
         let line = '';
         line += '<div style="height:5rem;margin-bottom: 2rem;"><div class="about" data-text="' + tr('Редактор дизайна веб-сайта','Website Template Editor') + ' ' + appName + '. ' + copyright + '."></div></div>';
         let enablePro = '';
         checkIfPro();
         let address = getPureCurrentUrl();
         if(proMode){
             enablePro = '<a href="'+ address + '?pro=false" target="_self">' + tr('Включить обычный режим','Enable normal mode') + '</a>';
         }else{
             enablePro = '<a href="'+ address + '?pro=true" target="_self">' + tr('Включить профессиональный режим','Enable Pro mode') + '</a>';
         }
         let docsRoot = '<a href="'+location.href.substr(0,location.href.lastIndexOf('/muse')+1) + 'help.php" target="_blank">' + tr('Документация сервиса','Service Documentation') + '</a>';
         var inst = installed?'<span class="msg-box">'+ tr('Установлено','Installed')+'</span>':'';
         line += '<div class="urllist '+ animaClasses + '">' + enablePro + docsRoot + response + makeShareIcons() + inst + '</div>';
         setDialogReady(line,false);
    });
}
/*-----------------------------------------------------------*/
var grid;
function addSorting(classId,func){
    if(grid !== null && typeof(grid)!='undefined'){
       grid.destroy();
    }
	grid = new Muuri(classId, {
		dragEnabled: true,
		dragStartPredicate: function (item, event){
		    //if (grid.getItems().indexOf(item) === 0) {	return false;	}
			return Muuri.ItemDrag.defaultStartPredicate(item, event);
		},
		dragSortPredicate: function (item) {
    		var result = Muuri.ItemDrag.defaultSortPredicate(item,{	action: 'swap',	threshold: 50,fillGaps: true, });//move, swap
    		return result && result.index === 0 ? false : result;
		}
	});
    grid.on('move',func);
}
/*------------------------------------------------------------*/
function getValueFromInput(id,isUrl){
    let txt = $('#'+id).val();
    if(txt !== null && typeof(txt)!='undefined')
    {
        txt = txt.trim();
        if(isUrl){
            //txt = encodeURIComponent(txt);
            //console.log('Leave input unchanged');
        }else{
            txt = escapeRegExp(txt);
        }
    }else{
        txt = '';
    }
    return txt.trim();
}
/*------------------------------------------------------------*/
function addCoverButton(){
    let btns = readPropertyToArray('globalCoverButtons',buttonsSeparator);
    let url = getValueFromInput('add-btn-url',true);
    let txt = getValueFromInput('add-btn-txt',false);
    if(url.length > 0 && txt.length > 0)
    {
        let idy = makeid(6);
        let newBtn = idy + buttonsValuesSeparator + btoa(encodeURIComponent(url)) + buttonsValuesSeparator + txt + buttonsValuesSeparator + '_blank';
        console.log('button: ' + newBtn);
        if(btns.length <= maxButtons && !btns.includes(newBtn)){
            btns.push(newBtn);
        }
        //console.log('addCoverButton(): ' +url + ' ' + txt + ', Total btns.length=' + btns.length);
        storeValue('globalCoverButtons',arrayToString(btns,buttonsSeparator));
        readButtonsToEdit();
    }
}
/*------------------------------------------------------------*/
function undoRemoveCoverButton(){
    let btns = readPropertyToArray('globalCoverButtons',buttonsSeparator);
    if(buttonsGarbage.length>0){
        var last = buttonsGarbage.pop();
        console.log('buttonsGarbage last item: ' + last);
        if(btns.indexOf(last) == -1){
            btns.push(last);
        }else{
            console.log('Dublicate. btns.length = ' + btns.length);
        }
    }
    storeValue('globalCoverButtons',arrayToString(btns,buttonsSeparator));
    readButtonsToEdit();
}
/*------------------------------------------------------------*/
function removeCoverButton(id){
    let btns = readPropertyToArray('globalCoverButtons',buttonsSeparator);
    for(var b=0;b<btns.length;b++){
        let btn = btns[b].split(buttonsValuesSeparator);
        if(btn[0] == id){
            //console.log('Remove button with ' + id + ' id');
            let removed = btns.splice(b,1);
            cleanupArray(buttonsGarbage);
            buttonsGarbage.push(removed);
            //console.log('buttonsGarbage.length = ' + buttonsGarbage.length + ', ' + removed);
        }
    }
    storeValue('globalCoverButtons',arrayToString(btns,buttonsSeparator));
    readButtonsToEdit();
}
/*------------------------------------------------------------*/
function renderCoverButtons()
{
    var $doc = $(document.getElementById('mainpane').contentWindow.document);
    var btnsBox = $doc.find('#cover-buttons');
    btnsBox.empty();
    checkIfPro();
    if(proMode){
        let btns = readPropertyToArray('globalCoverButtons',buttonsSeparator);
        cleanupArray(btns);
            
        //console.log('readPropertyToArray globalCoverButtons: ' + btns);    
        for(var b=0;b<btns.length;b++){
            let btn = btns[b].split(buttonsValuesSeparator);
            //console.log('Button: ' + btn);
            if(Array.isArray(btn) && btn.length >= 4)
            {
                let btnIdy  = btn[0];
                let btnUrla = decodeURIComponent(atob(btn[1]));
                let btnText = btn[2];
                let btnTarg = btn[3];
                btnsBox.append('<a href="'+btnUrla+'" target="'+btnTarg+'" class="btn btn-lg cover-btn">'+btnText+'</a>');
            }
        }
    }
}
/*------------------------------------------------------------*/
function readButtonsToEdit()
{
    let key = 'globalCoverButtons';
    //storeValue(key,'');
    let sv = getStoredValue(key,'');
    if(sv.includes(buttonsValuesSeparator)){
    }else{
        console.log('Clean wrong value for ' + key + ': ' + sv);
        storeValue(key,'');
    }
    let btns = readPropertyToArray(key,buttonsSeparator);
    cleanupArray(btns);
    
    var plt = '<h3>' + tr('Редактор кнопок обложки','Cover buttons editor') + '&nbsp;<button class="inlinebutton" title="' + tr('Отменить удаление','Undo deletion') + '" onclick="undoRemoveCoverButton()">&nbsp;</button></h3>';
        plt += '<div id="add-btn-block"><input placeholder="'+tr('Текст кнопки','Button text')+'" type="text" id="add-btn-txt"><input type="text" placeholder="'+tr('Веб-адрес кнопки','Button url')+'" id="add-btn-url"><button onclick="addCoverButton()">'+tr('Добавить','Add new')+'</button></div>';
    plt += '<div class="buttons-grid buttons-edit"><div class="buttons-grid-inn">';   

    for(var b=0;b<btns.length;b++){
        let btn = btns[b].split(buttonsValuesSeparator);
        if(Array.isArray(btn) && btn.length >= 4)
        {
            let btnIdy  = btn[0];
            let btnUrla = decodeURIComponent(atob(btn[1]));
            let btnText = btn[2];
            let btnTarg = btn[3];
            plt +=  '<div class="item"><div class="item-content buttons-itm '+ animaClasses + '"><span class="editor-cover-btn">' + btnText + '</span>' + '<a href="'+btnUrla+'" target="_blank" title="'+btnUrla+'" class="check-url"></a>' + removeButton('removeCoverButton',btnIdy) + '</div></div>';
        }
    }
    plt += '</div></div>';
    plt += '<div class="msg-container">';
    plt += renderMessage(tr('Перетаскивайте элементы, чтобы поменять порядок кнопок','Drag items to rearrange buttons'));
    plt += '</div>';
    setDialogReady(plt,false);
    addSorting('.buttons-grid-inn',function(data){
        let bt = readPropertyToArray('globalCoverButtons',buttonsSeparator);
        if(Array.isArray(bt)){
            console.log('swap...');
            bt.swapItems(data.fromIndex,data.toIndex);
            storeValue('globalCoverButtons',arrayToString(bt,buttonsSeparator));
            setTimeout(function(){
                renderCoverButtons();
            },1000);
        }
    });
    renderCoverButtons();
}
/*------------------------------------------------------------*/
function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
    }
    console.log('Unable to process hex: ' + hex);
}
/*------------------------------------------------------------*/
function rgb2hex2(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}
/*------------------------------------------------------------*/
function getPosition(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}
/*------------------------------------------------------------*/
function contextDataToHex(p){
    return "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);  
}
/*------------------------------------------------------------*/
function imageColorPickerPick(xOffset,yOffset,canvas,ctx,e,setColor){
    let x = e.layerX;// - xOffset;
    let y = e.layerY;// - yOffset;
    let p = ctx.getImageData(x, y, 1, 1).data; 
    var hex = contextDataToHex(p);//"#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    const div = document.getElementById('image-pick-sample');
    div.setAttribute('style','background-color:' + hex);
    if(setColor){
        saveToPalette(hex);
        updateImageColorPickerPalette();
    }
}
function updateImageColorPickerPalette(){
    $('#image-pick-grid').empty();
    $('#image-pick-grid').append(makeEditablePalette(true,'updateImageColorPickerPalette'));  
    addSorting('#image-pick-grid',function (data) {
      globalPalette.swapItems(data.fromIndex,data.toIndex);
      savePalette();
    });    
}
function imageColorPicker()
{
    var plt = '<h3>' + tr('Получить цвет','Color Picker') + '</h3>';
    plt += '<div id="image-pick-sample"></div><div id="image-pick-div" style="background-image:url(\'assets/images/muse_loading.svg\');"></div>';
    plt += '<div class="pickcolor-box">';
    plt += '<div class="palette-grid" id="image-pick-grid">';
    plt += '</div>';
    //plt += '<div class="msg-container">';
    //plt += renderMessage(tr('Перетаскивайте элементы, чтобы поменять их порядок. Двойной клик позволит искать по оттенку на ','Doubleclick item to search pics by tint at ') + ' <a href="https://unsplash.com" target="_blank">Unsplash.com</a>');
    plt += '</div>';
    setDialogReady(plt);
    updateImageColorPickerPalette();
    let str = '';
    var slds = readPropertyToArray('mainSlides',',');
    if(Array.isArray(slds)){
        for(var w=0;w<slds.length;w++){
            var url = slds[w];
            if(String(url).length !== 0){
                str = url;
                break;
            }
        }
    }
    if(urlIsYoutubeVideo(str)){
        let ytkey = youtubeParser(str);
        str = 'youtubecover.php?key='+ytkey;//youtubeKeyToCoverUrl(ytkey,'mqdefault');
    }
    let img = $('<img crossorigin="anonymous" src="'+ str +'">');
    img.attr('crossOrigin','Anonymous');
    img.css({'display':'none'});
    img.on('error',function(){
        $('#image-pick-div').empty().attr('style','background-image:url(\'assets/images/muse-error.svg\')');
    });
    img.on('load', function(){
        //console.log('Loaded: ' + this.src);
        let dv = $('#image-pick-div');
        dv.empty();
        const div = document.getElementById('image-pick-div');
        const canvas = document.createElement('canvas');
              div.appendChild(canvas);
        canvas.width = dv.outerWidth();
        canvas.height = dv.outerHeight();
        canvas.style.width = dv.outerWidth();
        canvas.style.height = dv.outerHeight();
        const ctx = canvas.getContext('2d');
        let wrh = this.width / this.height;
        let newWidth = canvas.width;
        let newHeight = newWidth / wrh;
        if (newHeight > canvas.height){
			newHeight = canvas.height;
        	newWidth = newHeight * wrh;
      	}
        let xOffset = newWidth  < canvas.width ? ((canvas.width  - newWidth) / 2) : 0;
        let yOffset = newHeight < canvas.height? ((canvas.height - newHeight)/ 2) : 0;
      	ctx.drawImage(this, xOffset, yOffset, newWidth, newHeight);
      	ctx.beginPath();
        ctx.rect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = contextDataToHex(ctx.getImageData(xOffset + 2,yOffset + 2,10,10).data);
        ctx.fill();
        ctx.drawImage(this, xOffset, yOffset, newWidth, newHeight);
        canvas.addEventListener('mousemove', function(event){
          imageColorPickerPick(xOffset,yOffset,canvas,ctx,event,false);
        });
        canvas.addEventListener('click', function(event){
          imageColorPickerPick(xOffset,yOffset,canvas,ctx,event,true);
        });   
        //this.remove();
        
    }).each(function() {
      if(this.complete) {
         $(this).trigger('load'); // For jQuery >= 3.0 
      }
    });
}
/*------------------------------------------------------------*/
function makeEditablePalette(hasRemoveBtn,callbackName){
    let _hasRemoveBtn = typeof(hasRemoveBtn)!='undefined'?hasRemoveBtn:true;
    let plt = '';
    for(var c=0;c<globalPalette.length;c++){
        var clr = globalPalette[c];
        let remb = _hasRemoveBtn? removeButton('removeColorFromPalette',clr,callbackName):''
		let isrgba = clr.startsWith('rgba');
		let nameArr = isrgba? ntc.name(rgb2hex2(clr)):ntc.name(rgbaToHex(clr));
		let searchTint = escape(nameArr[1]);
		let search  = searchTint.length>0 ? 'ondblclick="window.open(\'https://unsplash.com/s/photos/' + searchTint+ '\')"':'';
        plt +=  '<div class="item"><div '+search+' class="item-content palette-itm ' + animaClasses + '"  title="'+ nameArr[1] + ' (' + clr +')" style="background-color:'+ clr +'">' + remb + '</div></div>';
    }
    return plt;
}
/*------------------------------------------------------------*/
function readPaletteToEdit()
{
    var plt = '<h3>' + tr('Редактор палитры','Palette editor') + '&nbsp;<button class="inlinebutton" title="' + tr('Отменить удаление','Undo deletion') + '" onclick="undoRemoveColor()">&nbsp;</button></h3><div class="palette-grid">';
    plt += makeEditablePalette(true,'readPaletteToEdit');
    plt += '</div>';
    plt += '<div class="msg-container">';
    plt += renderMessage(tr('Перетаскивайте элементы, чтобы поменять их порядок. Двойной клик позволит искать по оттенку на ','Doubleclick item to search pics by tint at ') + ' <a href="https://unsplash.com" target="_blank">Unsplash.com</a>');
    plt += '</div>';
    setDialogReady(plt);
    addSorting('.palette-grid',function (data) {
      //console.log('From:' + data.fromIndex + ' to: ' + data.toIndex);
      globalPalette.swapItems(data.fromIndex,data.toIndex);
      savePalette();
    });
}
/*-----------------------------------------------------------*/
function undoRemoveColor(){
    if(paletteGarbage.length > 0){
        var clr = paletteGarbage.pop();
        insertColorToPalette(clr);
        readPaletteToEdit();
        savePalette();
    }
}
function removeColorFromPalette(clr,callback){
    for(var c=0;c<globalPalette.length;c++){
        if(globalPalette[c].includes(clr)){
           globalPalette.splice(c,1);
           paletteGarbage.push(clr);
        }
    }
    let _showPalletteWhenDone = typeof(showPalletteWhenDone)!=='undefined'?showPalletteWhenDone:true;
    showPaletteCount();
    if(typeof(callback)==='function'){
        callback.call(this);
    }
    savePalette();
}
/*-----------------------------------------------------------*/
function insertColorToPalette(clr){
    if(globalPalette.indexOf(clr) == -1 && isColor(clr) && globalPalette.length < swatchesMax)
    {
        globalPalette.push(clr);
    }else{
        //console.log('Rejected color: ' + clr);
    }
    showPaletteCount();
}
/*-----------------------------------------------------------*/
function showPaletteCount(){
    $('#btn_palette').attr('data-count',globalPalette.length);
    //console.log($('#btn_palette').length)
}
/*-----------------------------------------------------------*/
function savePalette(){
    storeValue('globalPalette',arrayToString(globalPalette,buttonsSeparator));    
}
/*-----------------------------------------------------------*/
function saveToPalette(val){
    if(globalPalette.length <= swatchesMax)
    {
        insertColorToPalette(rgbaToHex(val));
        cleanupArray(globalPalette);
    }
    else
    {
       globalPalette.pop();
       globalPalette.unshift(val);
    }
    savePalette();
}
/*-----------------------------------------------------------*/
function isColor(strColor){
  var s = new Option().style;
  s.color = strColor;
  var test1 = s.color == strColor;
  var test2 = /^#[0-9A-F]{6}$/i.test(strColor);
  var test3 = /^rgba([0-9A-F])/i.test(strColor);
  var test4 = /^rgb([0-9A-F])/i.test(strColor);
  if(test1 == true || test2 == true || test3 == true || test4 == true){
    return true;
  } else{
    return false;
  }
}
/*-----------------------------------------------------------*/
function applyColor(pickerId,name,color){
    //console.log('#'+pickerId + ' - ' + color)
    $('#'+pickerId).spectrum('set',color);
    saveToPalette(color);
    cookiesSet(name,color); 
}
/*-----------------------------------------------------------*/
function showPicker(ide,hash,stn,def){
    var currentValue = getStoredValue(hash + '-' + stn,def);
    $('#'+ide).spectrum({
        palette:[],
        showPalette:false,
        beforeShow:function(color){
            var pickerBtn = '';//'<button role="button" class="picker" onclick="attachColorPickerEvent(\''+ide+'\')">'+tr('Указать','Picker')+'</button>';
            var plt = '<span class="hidePicker" onclick="$(\'#' + ide + '\').spectrum(\'toggle\')"></span><div class="palette-box">';
            for(var g=0;g<globalPalette.length;g++){
                let colo = globalPalette[g];
                if(isColor(colo)){
                    plt +='<div class="palette-item" title="'+colo+'" style="background-color:'+colo+';" onclick="applyColor(\'' + ide + '\',\'' + hash + '-' + stn + '\',\''+colo+'\')"></div>'
                }
            }
            if(globalPalette.length < swatchesMax){
               var loops = swatchesMax - globalPalette.length;     
               for(var z=0;z<=loops;z++){
                  plt +='<div class="palette-item" style="background-color:#FEFEFE;"></div>' 
               }
            }
            plt += '</div>';
            
            var s = $(this).spectrum("container");
            s.css({width:172*2});
            s.find('.palette-box').remove();
            s.find('.hidePicker').remove();
            s.append(plt);
            var cnt = s.find('.sp-button-container');
            cnt.find('.picker').remove();
            cnt.append(pickerBtn);
        },
        change:function(color){
            applyColor(ide,hash + '-' + stn,color.toRgbString());
            hideColorPicker();
        },
        move:function(color){
            //console.log('set to ' + hash + '-' + stn + ' this value: ' + color.toRgbString());
            cookiesSet(hash + '-' + stn,color.toRgbString());
            drawPointer(hash,ide+'-box');
            hideColorPicker();
        },
        hide: function(color) {
            hideColorPicker();
        },
        localStorageKey:ide+'_key',
        color:currentValue,
        showInput:true,
        allowEmpty:false,
        showInitial:true,
        showAlpha:true,
        clickoutFiresChange:true,
        chooseText:tr("Выбрать","Choose")
    });
}
/*-----------------------------------------------------------*/
function imageInputChanged(files,targetImgId){
    if(files.length > 0)
    {
        var max = 40;
        var $doc = $(document.getElementById('mainpane').contentWindow.document);
        var pic = $doc.find('#'+targetImgId);
        if(pic.length > 0){
            var prop = 1;
            var reader  = new FileReader();
            var preview = new Image();
            preview.addEventListener('load', function()
            {
                prop = preview.height>0?preview.width/preview.height:1;
                var canvas = document.createElement('canvas');
                canvas.height = max;
                canvas.style.height = max;
                canvas.width = canvas.height*prop;
                canvas.style.width = canvas.height*prop;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(preview,0,0,preview.width,preview.height,0,0,canvas.width,canvas.height);
                var data = canvas.toDataURL('image/png',0.92);
                //console.log(data);
                //pic.attr('src',data);
                //console.log('get picture for #' + targetImgId + ' as ' + data);
                storeValue(targetImgId,data);
                $(canvas).detach();
                updFrame();
            }, false);
            reader.addEventListener('load', function(){
                preview.src = reader.result;
                if(preview.src.substr(preview.src.length - 4,4) == '.svg'){
                    //preview.width = max;
                    preview.height = max;
                }
            }, false);
            reader.readAsDataURL(files[0]);
        }else{
            console.log('Target image id ('+targetImgId+') not found');
        }
    }else{
        console.log('Empty files list');
    }
}
/*-----------------------------------------------------------*/
function checkIfPro(){
    proMode = checkKeySet('pro');
    checkIfStandalone();
}
function checkIfStandalone(){
    standaloneMode = checkKeySet('standalone');
    if(standaloneMode){
        proMode = true;
    }
}
/*-----------------------------------------------------------*/
function checkKeySet(keyn){
    let key = getUrlParam(keyn);
    if(strOkay(key) && key == 'true'){
        return true;
    }else{
        return false;
    }
}
/*-----------------------------------------------------------*/
function iframeStartToLoad(){
    $('.iframeloader').show();
}
/*-----------------------------------------------------------*/
function checkVendor(){	
	let vendor = getUrlParam('vendor');
	let vendors = [
		['lact','http://www.lineactworld.com','LineAct'],
		['lepshy','http://www.lepshy.by',tr('Лепшы','Lepshy')]
	];
	let vndrs = [];
	for(let v=0;v<vendors.length;v++){
		vndrs.push(vendors[v][0]);
	}
	let ind = vndrs.indexOf(vendor);	
	if(vendor == null || typeof(vendor)=='undefined' || (typeof(vendor)=='string' && vendor.length == 0) || ind == -1)
	{	
		vendor = 'lact';
		ind = vndrs.indexOf(vendor);	
	}
	vendor = vendor.toLowerCase();	
	if(ind!= -1)
	{
		urlas.valid = true;
		urlas.naming = vendors[ind][2];
		urlas.newdesign = vendors[ind][1] + '/admin/follow/design_templates/new';
		urlas.designupload = vendors[ind][1] + '/admin/follow/design_templates/design_templates/create';
		urlas.myimages  = vendors[ind][1] + '/admin/follow/engine/manage_pics#main_content_place';
	}else{
		urlas.valid = false;
		urlas.naming = '';
		urlas.newdesign = '';
		urlas.myimages  = '';				
	}
	//console.log(vendor + ', index:' + ind + ', ' + urlas.newdesign + ', ' + urlas.myimages);				
}
/*-----------------------------------------------------------*/
function displayZoom(value){
    if(typeof(value)=='undefined' || value == null){
        let cv = $('#zommsle').find('input').val();
        value = cv;
    }
	let zoom = value/100;
    $('#zommsle').attr('data-val',value + '%');
    setIframeZoom(zoom);
}
function setIframeZoom(zoom){
    if(zoom >0.25 && zoom <= 1.0){
        //console.log('Set zoom: ' + zoom);
        let val = zoom * 100;
        $('input[type="zoomslider"]').val(val).change();
        let ifw = $("#mainpane").width();
        zoomCoeff = zoom;
        $(document.getElementById('mainpane').contentWindow.document).find('html').css('zoom',zoom);
    }
}
/*-----------------------------------------------------------*/
function message(text){
    console.log(text);
}
/*-----------------------------------------------------------*/
function checkForageAvail(){
    if(!localForageAvail){
        message(tr('Локальное хранение страниц невозможно в Вашем браузере','Local storage of pages is not available'));
    }
    return localForageAvail;
}
/*-----------------------------------------------------------*/
function clearForage(){
    localforage.clear();
}
/*-----------------------------------------------------------*/
var recentProjectsArray = [];
function getProjectsFromForage()
{
    //setDialogWaiting();
    localforage.iterate(function(value, key, iterationNumber){
        if(key.startsWith(store_prfx)){
            let obj = stringToJSON(value);
            if(typeof(obj[projectMainKey]) !== 'undefined'){
                obj['local'] = true;
                obj['storekey'] = key;
                recentProjectsArray.push(obj);
                //console.log('Adding recent project. Now total: ' + recentProjectsArray.length);
            }
            //console.log(typeof(obj) + ' >>> ' +  value);
        }
    }).then(function(){
        renderGallery(recentProjectsArray,tr('Недавние проекты','Recent Projects'));
    }).catch(function(err) {
        setDialogReady(renderMessage(tr('Не удалось прочитать сохраненные проекты','Unable to read stored projects')));
        console.log(err);
    });
}
/*-----------------------------------------------------------*/
function saveToForage(key,string)
{
    let len = 0;    
    localforage.keys().then(function(keys){
        for(let k=0;k<keys.length;k++){
            if(keys[k].startsWith(store_prfx)){
               len++;    
            }
        }
    }).then(function(){
        if(len < 6){
            localforage.setItem(store_prfx + key,string).then(function(value){
            }).catch(function(err) {
                console.log(err);
            });
        }else{
            console.log('Recent projects quota exeeded');
        }
    }).catch(function(err) {
        setDialogReady(renderMessage(tr('Не удалось прочитать сохраненные проекты','Unable to read stored projects')));
        console.log(err);
    });
}
/*-----------------------------------------------------------*/
function removeFromForage(key){
    localforage.removeItem(key).then(function() {
    // Run this code once the key has been removed.
        //console.log(key + ' key is cleared!');
        getProjectsFromForage();
    }).catch(function(err){
        console.log(err);
    });
}
/*-----------------------------------------------------------*/
function saveThisProjectToForage(proj){
    saveToForage(makeid(8),proj);
}
/*-----------------------------------------------------------*/
function readFromForage(key){
    if(checklocalForageAvail()){
        localforage.getItem(key).then(function(value) {
            return value;
        }).catch(function(err){
            console.log(err);
        }); 
    }
}
/*-----------------------------------------------------------*/
function* visitCssRule(cssRule){
    if (cssRule.type == cssRule.IMPORT_RULE)
        yield* visitStyleSheet(cssRule.styleSheet);

    if (cssRule.type == cssRule.MEDIA_RULE)
        yield cssRule;
}
/*-----------------------------------------------------------*/
function* visitStyleSheet(styleSheet) {
    try {
        var cssRules = styleSheet.cssRules;
        for (var i = 0, cssRule; cssRule = cssRules[i]; i++)
            yield* visitCssRule(cssRule);
    } catch (ignored) {}
}
/*-----------------------------------------------------------*/
function* findAllMediaRules() {
    var styleSheets = document.getElementById('mainpane').contentWindow.document.styleSheets;
    for (var i = 0, styleSheet; styleSheet = styleSheets[i]; i++)
        yield* visitStyleSheet(styleSheet);
}
/*-----------------------------------------------------------*/
function iframeLoaded()
{
    if(stageCleared){
        return;
    }
    designUnchanged();
    localforage.ready().then(function()
    {
        localForageAvail = true;
        localforage.keys().then(function(keys)
        {
           let myKeys = []; 
           for(let m=0;m<keys.length;m++){
               if(keys[m].startsWith(store_prfx)){
                  myKeys.push(keys[m]);
               }
           }
           let last = myKeys.length - 1;
           let first = last - 4;
           for(let u=0;u<myKeys.length;u++){
               let k = myKeys[u];
               if(u < first){
                   console.log('Removing recent project ' + k);
                   localforage.removeItem(k);
               }else{
                   //console.log('Found recent project ' + k);
               }
           }
        }).catch(function(err) {
            console.log(err);
        });
    }).catch(function (e) {
        console.log(e);
    });

    let $iframedoc = $(document.getElementById('mainpane').contentWindow.document);
    if(typeof($iframedoc)==='undefined'){
        console.log('Cannot access mainpane');
        return;
    }
    
    checkIfStandalone();
    checkIfPro();

    if(!standaloneMode){
        $iframedoc.find('#footer-row, #gototop').remove();
    }
    let downloadBtnText = resultButtonText();

    $('#buildbtn').text(downloadBtnText);
    $('#openfile').remove();
    $('<button />',{text:tr('Открыть','Open'),'id':'openfile','class':'regularbutton','onclick':'loadLocalProject()'}).insertBefore('#buildbtn');
    
	checkVendor();
    storeValue('titleImage','');
    let himage = getUrlParam('himage');	
    if(strOkay(himage)){
        storeValue('titleImage',himage);
    }
    applyStyles();
    makeSomeSlides();
    renderCoverButtons();
    $('.iframeloader').hide();
	
	for(let a=0;a<styles.length;a++)
	{
	    let current = styles[a];
    	for(let i=0;i<current.items.length;i++)
    	{
    		let style = current.items[i];
    		if(style !== null && typeof(style) !== 'undefined'){
        		if(typeof(style.hash)!='undefined' && style.hash.length > 0)
        		{
                    var trgts = $iframedoc.find('#'+style.hash);
                    $(trgts).on("click",function(event){
                        event.stopPropagation();
                        location.hash = 'block_' + a;
                    });
        		}
    		}
    	}
	}
	
	let continueLoad = true;
	let data_in_url = getUrlParam('data');
	if(strOkay(data_in_url)){
	    let df = stringToJSON(data_in_url);
	    if(df.length > 0){
    	    continueLoad = false;
            readProjectObj(df);
	    }
	}

	if(continueLoad)
	{
    	let loadble_extProject = getUrlParam('project');
    	let current_extProject = getStoredValue(loadedExternalProjectKey,'',true);
    	console.log('current_extProject=' + current_extProject + ' loadble_extProject=' + loadble_extProject);
    	if(strOkay(loadble_extProject) && current_extProject !=='-loaded-fom-gallery' && loadble_extProject !== current_extProject)
    	{
    	    console.log('We have a new external project and it differs from the current one ('+loadble_extProject+' - >'+current_extProject+'<)');
    	    storeValue(loadedExternalProjectKey,loadble_extProject,true);
            showDialog('','loadproject',false); 
    	}
    	else
    	{
    	    if(weHaveAproject()){
    	        //console.log('We have a project. No need to suggest a setup');
    	    }else{
    	        let req = $.ajax({url:getDefaultProjectUrl()});
                $.when(req).done(function(response){
                    let str = JSON.stringify(response)
                    let jsonFile = stringToJSON(str);			 				 
                    readProjectObj(jsonFile);
                }).fail(function(response){
                   showGallery();
                });
    	    }
    	}
	}
	checkIframeSize();
	$(window).resize(function(){
       checkIframeSize();
    });
}
/*-----------------------------------------------------------*/
async function readProjectAsync(jsonFile){
    await readProjectObj(jsonFile);
}
/*-------------------------------------------
1380 = 12.5
--------------------------------------------*/
var remIframeW = 68;
function checkIframeSize(){
   let wndw = $(window);//$("#mainpane");
   let fontSze = 16;//rem();
   let coeff = (wndw.width()/1700);
   let reducer = coeff<1.0? 0.91:1.0;
   let fs = ((fontSze*coeff)*reducer) + 0.2;
    //console.log('iframe new fontSze: ' + fs + ', coeff: ' + coeff);
    let fontSize = Math.min(16,Math.max(10,fs));
    $('html').css('font-size',fontSize);
    if(fontSize <= 13){
        $('body.panel #rightpane').css('font-size','100%');
    }else{
        $('body.panel #rightpane').css('font-size','90%');
    }
    coeff = coeff*1.2;
    setIframeZoom(coeff);
}
/*-----------------------------------------------------------*/
function showGallery(){
    showDialog('','gallery',false); 
}
/*-----------------------------------------------------------*/
function getDefaultProjectUrl(){
    let address = getPureCurrentUrl();
    let url = address.substr(0,address.lastIndexOf('/')+1) + "assets/files/default.json";   
    return url;
}
/*-----------------------------------------------------------*/
function readPropertyToArray(name,separator){
    let sep = typeof(separator)!='undefined'?separator:',';
    let sl = getStoredValue(name,'');
    let arr = sl.split(sep);
    let out = [];
    for(let x=0;x<arr.length;x++){
        if(typeof(arr[x]) !== 'undefined' && arr[x] !== null && strOkay(arr[x]) && arr[x] !== 'undefined'){
            out.push(arr[x]);
        }
    }
    return out;
}
/*-----------------------------------------------------------*/
function youtubeKeyToCoverUrl(key,type){
    let _type = typeof(type)!=='undefined'? type:'default';
    return 'https://img.youtube.com/vi/'+key+'/'+_type+'.jpg';
    
}
/*-----------------------------------------------------------*/
function readSlidesToEdit(){
    $('#dialog-window-container').empty();
    var ide = makeid(6);
    line = '<div class="urladder '+ animaClasses + '"><h3>' + tr('Редактор слайдов','Slides editor') +  '</h3><input placeholder="'+tr('Введите веб-адрес изображения','Enter image url here')+'" id="'+ide+'" type="text" class="inputUrladder"><button role="button" onclick="storeSlideData($(\'#' + ide + '\').val());">'+tr('Добавить','Add new')+'</button></div><div class="slides-grid slides-edit"><div class="slides-grid-inn"></div></div>';
    $('#dialog-window-container').append(line);
    var slds = readPropertyToArray('mainSlides',',');
    if(Array.isArray(slds)){
        for(var w=0;w<slds.length;w++){
            var url = slds[w];
            if(String(url).length !== 0){
                if(urlIsYoutubeVideo(url)){
                    let ytkey = youtubeParser(url);
                    if(ytkey !== null && typeof(ytkey)!=='undefined'){
                        url = youtubeKeyToCoverUrl(ytkey,'default');//'https://img.youtube.com/vi/' + ytkey + '/default.jpg';
                    }
                }
                $('#dialog-window-container .slides-grid-inn').append('<div class="item"><div class="item-content slide-img '+ animaClasses + '"><div class="slide-img-inner" style="background-image:url(\''+url+'\')"></div>' + removeButton('removeSlide',url) + '</div></div>')
            }
        }
    }
	let addYourPics = urlas.valid && !standaloneMode ? inlineButton('window.open(\'' + urlas.myimages + '\');',tr('Вставьте картинки с Вашего аккаунта на ' + urlas.naming,'Insert pictures from your ' + urlas.naming + ' account'),' w100 ' + animaClasses):'';
    $('#dialog-window-container').append('<div class="msg-container">' + 
		addYourPics + 
		renderMessage(tr(
        'Перетаскивайте элементы, чтобы поменять порядок слайдов. Также попробуйте',
        'Drag thumbnails to rearrange slides. Also try to ') + ' <a target="_blank" href="https://unsplash.com/">' + tr('Подобрать изображения на Unsplash.com','Get images at Unsplash.com') + '</a>') + '</div>');
    addSorting('.slides-grid-inn',function(data){
        var sl = getStoredValue('mainSlides','');
        var slds = sl.split(',');
        if(Array.isArray(slds)){
            slds.swapItems(data.fromIndex,data.toIndex);
            storeValue('mainSlides',arrayToString(slds,commonSeparator));
            makeSomeSlides();
        }
    });
}
/*-----------------------------------------------------------*/
function renderMessage(txt){
    return '<div class="msg-box ' + animaClasses + '">'+txt+'</div>'
}
/*-----------------------------------------------------------*/
function removeButton(funcName,value,bool){
    if(bool == null || typeof(bool) == 'undefined')bool = '';
    return '<div class="remove-slide" onclick="'+funcName+'(\'' + value + '\','+bool+')"></div>';
}
/*-----------------------------------------------------------*/
function storeSlideData(str)
{
    if(str.startsWith('https://www.youtube.com/'))
    {
        saveSlideAndReload(str);
    }
    else
    {
        if(String(str).length == 0){
            return;
        }
        $('#currenly-loading-img').remove();
        var img = $('<img src="'+ str +'">');
        $('#dialog-window-container  .slides-grid-inn').append('<div class="slide-img" style="background-image:url(\'assets/images/muse_loading.svg\');" id="currenly-loading-img"></div>');
        img.css({'display':'none'});
        $('#currenly-loading-img').append(img);
        img.on('error',function(){
            $('#currenly-loading-img').empty();
            $('#currenly-loading-img').attr('style','background-image:url(\'assets/images/muse-error.svg\')');
        });
        img.on('load', function(){
            //console.log('Loaded: ' + this.src);
            $('#currenly-loading-img').attr('style','background-image:url(\'' + this.src + '\')');
            $('#currenly-loading-img').append(removeButton('removeSlide',this.src));
            saveSlideAndReload(str);
        }).each(function() {
          if(this.complete) {
             $(this).trigger('load'); // For jQuery >= 3.0 
          }
        });
    }
}
/*-----------------------------------------------------------*/
function saveSlideAndReload(str){
    var sl = getStoredValue('mainSlides','');
    var slds = sl.split(',');
    cleanupArray(slds);
    if(slds.length < slidesMax && !str.includes(',') && !slds.includes(str)){
        slds.push(str);
    }
    storeValue('mainSlides',arrayToString(slds,commonSeparator));
    readSlidesToEdit();
    makeSomeSlides();
}
/*-----------------------------------------------------------*/
function arrayToString(arr,separator){
    let separ = typeof(separator)!=='undefined'?separator:commonSeparator;
    let line = '';
    let last = arr.length - 1;
    for(var q=0;q<arr.length;q++){
        let sep = q != last?separ:'';
        line += arr[q] + sep;
    }
    return line;
}
/*-----------------------------------------------------------*/
function removeSlide(str)
{
    let videokey = '~^';
    let ytThumbUrl = 'https://img.youtube.com/vi/';
    if(str.startsWith(ytThumbUrl))//https://img.youtube.com/vi/fcJlKYsrl0Q/default.jpg
    {
        let key = str.substr(ytThumbUrl.length,11);
        //console.log('ytkey = ' + videokey);
        if(key !== null || typeof(key)!=='undefined'){
            videokey = key;
        }
    }
            
    var sl = getStoredValue('mainSlides','');
    var slds = sl.split(',');
    cleanupArray(slds);
    if(!str.includes(','))
    {
        for(var q=0;q<slds.length;q++){
            let urle = slds[q];
            if(urle == str || urle.includes(videokey))
            {
                slds.splice(q,1);
            }
        }
    }
    storeValue('mainSlides',arrayToString(slds,commonSeparator));
    readSlidesToEdit();
    makeSomeSlides();
}
/*-----------------------------------------------------------*/
function youtubeParser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
/*-----------------------------------------------------------*/
function urlIsYoutubeVideo(url){
    return url.startsWith('https://www.youtube.com/') && (url.includes('/watch?v=') || url.includes('/embed'))? true:false;
}
/*-----------------------------------------------------------*/
function cutoffProtocol(str,prot){
    return str.substr(prot.length,str.length);
}
/*-----------------------------------------------------------*/
function addSlide(obj,active,index,urla){
    let url = ''
    if(Array.isArray(urla)){
        url = urla[0]; 
    }else if(typeof(urla).toLowerCase() == 'string'){
        url = urla;
    }
    if(url !== null && typeof(url) != 'undefined' && url !== 'null' && url !== 'undefined')
    {
        if(url.startsWith('https:')){
            url = cutoffProtocol(url,'https:');
        }else if(url.startsWith('http:')){
            url = cutoffProtocol(url,'http:');
        }
        //console.log('addSlide: ' + url);
        let videokey = '';
        let isVideo = false;
        if(urlIsYoutubeVideo(url)){
            videokey = youtubeParser(url);
            if(videokey === null || typeof(videokey)=='undefined'){
                isVideo = false;
            }else{
                isVideo = true;
            }
        }
        let ide = makeid(6);
        let videoSlide = '<div class="video-background d-block w-100"><div id="'+ ide +'" class="video-foreground"></div></div>';//<div class="carousel-item video-slide active" id="carousel-item-2" data-video="'+url+'">
        let videoSlideClass = isVideo?'video-slide':'';
        let videoDataUrl = isVideo?'data-video="'+videokey+'"':'';
        let imageSlide = '<img id="carousel-item-img-' + index + '" class="d-block w-100" src="' + url + '">';
        let cont = isVideo? videoSlide:imageSlide;
        var sitem = '<div class="carousel-item ' + active + ' ' + videoSlideClass + '" id="carousel-item-' + index + '" '+videoDataUrl+'>' + cont + '</div>';
        
        obj.prepend(sitem);
    }
}
/*-----------------------------------------------------------*/
function strOkay(text){
    return notnull(text) && text.length > 0? true:false;
}
function notnull(text){
    return text !== null && typeof(text) != 'undefined'?true:false;
}
/*-----------------------------------------------------------*/
function cleanupArray(arr){
    for(var o=0;o<arr.length;o++){
        if(typeof(arr[o]) === 'undefined' || arr[o] === null || arr[o] === 'undefined'  || arr[o] === 'null'){
            arr.splice(o,1);
        }else if(!strOkay(arr[o])){
            arr.splice(o,1);
        }
    }
}
/*-----------------------------------------------------------*/
function makeSomeSlides()
{
    let cw = document.getElementById('mainpane').contentWindow;
    var $doc = $(cw.document);
    var carousel = $doc.find('#carouselMain');
    carousel.find('.carousel-control-prev,.carousel-control-next, ol.carousel-indicators li').each(function(){
        $(this).remove();
    })
    var inner = carousel.find('.carousel-inner')
    inner.find('div.carousel-item').each(function(){
       $(this).remove();
    });
    var slds;
    checkIfStandalone();
    checkIfPro();
    let timg = getStoredValue('titleImage','');
    if(strOkay(timg) && !proMode){
        slds = [timg];
    }else{
        let sl = getStoredValue('mainSlides','');
        slds = sl.split(',');
        if(strOkay(timg) && slds.length < slidesMax && !slds.includes(timg)){
            slds.push(timg);    
        }
    }
    cleanupArray(slds);
    if(Array.isArray(slds) && slds.length > 0){
        storeValue('mainSlides',arrayToString(slds,commonSeparator));
    }
    if(Array.isArray(slds))
    {
        for(var s=0;s<slds.length;s++)
        {
            var active = s == 0?'active':'';
            if(slds.length > 1){
                var litem = '<li data-target="#carouselMain" class="' + active + '" data-slide-to="' + s + '"></li>';
                carousel.find('ol.carousel-indicators').append(litem);
            }
            addSlide(inner,active,Number(s + 1),slds[s]);
        }
        if(slds.length > 1){
            var arrowLeft  = '<a class="carousel-control-prev" href="#carouselMain" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">' + tr('Предыдущий','Previous') + '</span></a>';
            var arrowRight = '<a class="carousel-control-next" href="#carouselMain" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">' + tr('Следующий','Next') + '</span></a>';
            carousel.append(arrowLeft);
            carousel.append(arrowRight);
        }
        var event = new CustomEvent('museSlidesChanged');
        cw.dispatchEvent(event);
    }
    else
    {
        addSlide(inner,'active',1,'https://docsite.su/muse/v1/assets/images/bg.png');
    }
}
/*-----------------------------------------------------------*/
function readLayoutSetting(){
    let cl = getStoredValue('bodyContainer-listColumnsLayout','');
    resetLayout(cl);
    
    let gl = getStoredValue('page-scoll-indi-listGaugeLayout','');
    resetGaugeLayout(gl);
}
/*-----------------------------------------------------------*/
function resetGaugeLayout(mode){
    if(mode === null || typeof(mode)==='undefined' || String(mode).length == 0){
        return -1;
    }
    let doc = $(document.getElementById('mainpane').contentWindow.document);
    let bx  = doc.find('#page-scoll-box');
    if(mode === '0'){
        let by  = doc.find('#myBody');
        bx.appendTo(by);
    }
    else if(mode === '1'){
        let nv  = doc.find('#topnav');
        bx.appendTo(nv);
    }
}
/*-----------------------------------------------------------*/
function resetLayout(mode){
    if(mode === null || typeof(mode)==='undefined' || String(mode).length == 0){
        return -1;
    }
    let $doc = $(document.getElementById('mainpane').contentWindow.document);
    let leftCol  = $doc.find('#colLeft');
    let rightCol = $doc.find('#colRight');
    let mainCol = $doc.find('#main_content_place');
    
    let leftContent  = $doc.find('leftcol');
    let rightContent = $doc.find('rightcol');
    let mainContent = $doc.find('maincol');
    
    let tmp = $('<div id="temp">');
    
    storeValue('mainLayout',mode);
    if(mode === '0')
    {
        leftCol.show();
        rightCol.show();
        mainCol.show();
        
        leftContent.appendTo(tmp);
        rightContent.appendTo(tmp);
        mainContent.appendTo(tmp);
        
        leftCol.empty();
        rightCol.empty();
        mainCol.empty();
        
        leftContent.appendTo(leftCol);
        rightContent.appendTo(rightCol);
        mainCol.addClass('col-lg-6').removeClass('col-lg-9');
        mainContent.appendTo(mainCol);
    }
    else if(mode == '1')
    {
        leftCol.show();
        rightCol.hide();
        mainCol.show();
        
        leftContent.appendTo(tmp);
        rightContent.appendTo(tmp);
        mainContent.appendTo(tmp);
        
        leftCol.empty();
        rightCol.empty();
        mainCol.empty();
        
        leftContent.appendTo(leftCol);
        rightContent.appendTo(leftCol);
        mainCol.addClass('col-lg-9').removeClass('col-lg-6');
        mainContent.appendTo(mainCol);
		
    }
    else if(mode == '2')
    {
        //console.log('resetLayout: ' + mode);
        leftCol.hide();
        rightCol.show();
        mainCol.show();
        
        leftContent.appendTo(tmp);
        rightContent.appendTo(tmp);
        mainContent.appendTo(tmp);
        
        leftCol.empty();
        rightCol.empty();
        mainCol.empty();
        
        leftContent.appendTo(rightCol);
        rightContent.appendTo(rightCol);
        mainCol.addClass('col-lg-9').removeClass('col-lg-6');
        mainContent.appendTo(mainCol);
    }
}
/*-----------------------------------------------------------*/
var tourPos = 0;
var tourON = false;
var story = [
  {
    selector: '#icon_btn_gallery',
    title:tr('Откройте Галерею','Open Gallery'),
    position: 'left'
  },
  {
    selector: '#dialog-window',
    title:tr('Кликните проект для редактирования','Ckick a project to edit'),
    position: 'left'
  }
];
function stopATour(){
    tourPos = 0;
    tourON = false;
    $(window).off('resize',updCurtain);
    $('.curtain').hide();
    for(let v=0;v<story.length;v++){
        $(story[v].selector).off('click',curtainClickItem);
    }
}
function curtainClickItem(){
    if(tourON)
    {
        setTimeout(function(){
            tourPos++;
            setCurtain(tourPos);    
        },500);
    }else{
        stopATour();
    }
}
function setCurtain(indx){
    if(indx < story.length)
    {
        let query = story[indx].selector;
        let align = story[indx].position;
        let title = story[indx].title;
        let window_Width = $(window).width();
        let el = $(query);
        el.each(function(){
            let al = $(this);
            al.on('click',curtainClickItem);
            let pos = al.offset();
            let w = al.width();
            let h = al.height();
            $('.curtain-top').css({'left':pos.left,'height':pos.top,'width':w});
            $('.curtain-bottom').css({'left':pos.left,'top':pos.top + h,'width':w});
            $('.curtain-left').css({'width': pos.left});
            if(align == 'left'){
                $('.curtain-left').find('span').empty().css({'top':pos.top,'text-align':'right'}).append(title);
            }
            $('.curtain-right').css({'width':window_Width - (pos.left + w)});
            if(align == 'right'){
                $('.curtain-right').find('span').empty().css({'top':pos.top,'text-align':'left'}).append(title);
            }        
            $('.curtain').show();
        });
    }else{
        tourPos = 0;
        tourON = false;
        console.log(indx);
        stopATour();
    }
}
function updCurtain() {
    setCurtain(tourPos);
}
function makeATour(){
    tourON = true;
    tourPos = 0;
    $(window).off('resize',updCurtain);
    $(window).on('resize',updCurtain);
    setCurtain(tourPos);
}
/*-----------------------------------------------------------*/
function getNewFileHandle(){
  if ('showSaveFilePicker' in window){

    return window.showSaveFilePicker(zipopts);// For Chrome 86 and later...
  }
  const opts = {
    type: 'save-file',
    accepts: [{
      description: 'Zip file',
      extensions: ['zip'],
      mimeTypes: ['application/zip'],
    }],
  };
  return window.chooseFileSystemEntries(opts);// For Chrome 85 and earlier...
}
/*-----------------------------------------------------------*/
function getFileHandle() {
  if ('showOpenFilePicker' in window){//// For Chrome 86 and later...
    return window.showOpenFilePicker(jsonopts).then((handles) => handles[0]);
  }
  return window.chooseFileSystemEntries(jsonopts);// For Chrome 85 and earlier...
}
/*-----------------------------------------------------------*/
async function writeFile(fileHandle, contents) {
  // Support for Chrome 82 and earlier.
  if (fileHandle.createWriter){
    const writer = await fileHandle.createWriter();
    await writer.write(0, contents);
    await writer.close();
    return;
  }
  const writable = await fileHandle.createWritable();// For Chrome 83 and later
  await writable.write(contents);
  await writable.close();
  hideDialog();
}
/*-----------------------------------------------------------*/
async function saveFileAs(content){
  try{
    let fileHandle;
    fileHandle = await getNewFileHandle();
    await writeFile(fileHandle,content);
  }catch(e){
      console.log(e);
  }
}
/*-----------------------------------------------------------*/
function readFile(file){
  if (file.text) {
    return file.text();// If the new .text() reader is available, use it.
  }
  return _readFileLegacy(file);// Otherwise use the traditional file reading technique.
}
/*-----------------------------------------------------------*/
function _readFileLegacy(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      const text = e.srcElement.result;
      resolve(text);
    });
    reader.readAsText(file);
  });
}