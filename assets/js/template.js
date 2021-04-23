checkIfPro();
function svgHamburger(val){ 
    return 'background-image: url("data:image/svg+xml,%3csvg viewBox=\'0 0 30 30\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cpath stroke=\'['+val+']\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-miterlimit=\'10\' d=\'M4 7h22M4 15h22M4 23h22\'/%3e%3c/svg%3e")';
}
function svgClose(val){
    return 'background-image: url("data:image/svg+xml,%3csvg viewBox=\'0 0 30 30\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cpath fill=\'['+val+']\' stroke-width=\'0\' stroke-linecap=\'round\' stroke-miterlimit=\'10\' d=\'m3.0972 0.20527c-0.68126 0-1.3633 0.26257-1.8854 0.78459-1.044 1.044-1.044 2.7247 0 3.7687l10.093 10.093-10.093 10.093c-1.044 1.044-1.044 2.7267 0 3.7707 1.044 1.044 2.7247 1.044 3.7687 0l10.095-10.093 10.093 10.093c1.044 1.044 2.7247 1.044 3.7687 0 1.044-1.044 1.044-2.7267 0-3.7707l-10.093-10.093 10.093-10.093c1.044-1.044 1.044-2.7247 0-3.7687-1.044-1.044-2.7247-1.044-3.7687 0l-10.093 10.093-10.095-10.093c-0.52202-0.52201-1.2021-0.78459-1.8834-0.78459z\'/%3e%3c/svg%3e")';
}
var animations = [
    ['none',        tr('Нет анимации','No animation')],
    ['fadeIn',      tr('Появление','Fade in')],
    ['flipInX',     tr('Кувырок по оси X','Flip-in X')],
    ['slideInDown', tr('Скольжение вниз','Slide-in down')],
    ['zoomIn',      tr('Увеличение','Zoom-in')],
    ['zoomInDown',  tr('Прилёт вниз','Zoom-in down')],
    ['rubberBand',  tr('Резинка','Rubber band')],
    ['jello',       tr('Желе','Jello')]
];
var textAlign = [
    ['left',tr('Влево','Left')],
    ['center',tr('По центру','Center')],
    ['right',tr('Вправо','Right')]
];
var horPos = [
    ['auto',tr('Влево','Left')],
    ['0',tr('Вправо','Right')]
];
var masks = [
        [btoa('M 0,0 H 1 V 1.0 L 1.0,1 0,1.0 Z'),tr('Нет','No')],
        [btoa('M 0,0 H 1 V 0.8 L 0.5,1 0,0.8 Z'),tr('Шеврон','Chevron')],
        [btoa('M 0,0 H 1 V 0.8 C 0.51876777,1.141751 0.43568325,0.66046554 0,0.91917373 Z'),tr('Волна','Wave')],
        [btoa('M 0 0 L 0 0.9296875 C 0.0088074931 0.93084726 0.017902966 0.93718005 0.0234375 0.94921875 C 0.02719676 0.92533575 0.04035262 0.90827041 0.0546875 0.90820312 C 0.06489786 0.90827507 0.074125255 0.91731748 0.080078125 0.93164062 C 0.081975945 0.91039922 0.09301784 0.89460628 0.10546875 0.89453125 C 0.11547335 0.89458655 0.12487625 0.90410557 0.12890625 0.91992188 C 0.13478605 0.91394887 0.1416135 0.91213205 0.1484375 0.91210938 C 0.1602381 0.91209837 0.17045438 0.9214625 0.17773438 0.9375 C 0.18944668 0.9077071 0.20961035 0.88864385 0.23046875 0.88867188 C 0.25513065 0.88874387 0.27694638 0.9143327 0.28710938 0.953125 C 0.29470158 0.9408661 0.30413023 0.93379763 0.31445312 0.93164062 C 0.31997592 0.91362153 0.3319378 0.90231664 0.34375 0.90234375 C 0.3525612 0.90228855 0.35919238 0.90884307 0.36523438 0.91992188 C 0.36990488 0.89848697 0.38321787 0.88279775 0.39648438 0.8828125 C 0.40361258 0.8829047 0.41044263 0.88686225 0.41601562 0.89453125 C 0.41923362 0.89325388 0.42248025 0.89271121 0.42578125 0.89257812 C 0.43842455 0.89260572 0.44987138 0.90088143 0.45898438 0.91601562 C 0.47084597 0.88965332 0.4884769 0.87512313 0.5078125 0.875 C 0.5319702 0.8750997 0.55402772 0.8998801 0.56445312 0.9375 C 0.57302533 0.9259055 0.58481633 0.91803733 0.59570312 0.91796875 C 0.61102462 0.91798905 0.62551062 0.932044 0.63476562 0.953125 C 0.64366712 0.9279148 0.65868305 0.91208597 0.67578125 0.91210938 C 0.69460055 0.91214077 0.71255413 0.92970027 0.72070312 0.95898438 C 0.72995033 0.93858358 0.7428124 0.92782895 0.7578125 0.92773438 C 0.7713595 0.92775097 0.78566687 0.9360367 0.79492188 0.953125 C 0.80273717 0.9405145 0.81156823 0.93367725 0.82226562 0.93359375 C 0.82795683 0.93364875 0.83461775 0.93556313 0.83984375 0.93945312 C 0.84294688 0.91412883 0.85597803 0.89448381 0.87109375 0.89453125 C 0.88475265 0.89468605 0.89805975 0.90924902 0.90234375 0.93164062 C 0.91033415 0.91744672 0.92017602 0.91016362 0.93164062 0.91015625 C 0.94744843 0.91021535 0.961454 0.92500415 0.96875 0.94921875 C 0.9739267 0.94549575 0.98071613 0.94335828 0.98632812 0.94335938 C 0.991261 0.94339143 0.99537655 0.946292 1 0.94921875 L 1 0 L 0 0 z'),tr('Облака','Clouds')],
        [btoa('M 0,0 H 1 V 0.82019127 L 0,0.99597252 Z'),tr('Левый наклон','Left tilt')],
        [btoa('M 0,0 H 1 V 0.996094 L 0,0.820312 Z'),tr('Правый налон','Right tilt')]
    ];
var fontMenu = [
    [tr('Лого','Logo'),'logofontset'],
    [tr('Заголовки','Headings'),'headfontset'],
    [tr('Текст','Text'),'mainfontset']
];
var socialicons = [
    ['m43.922 12.915q0.5167 1.4376-3.3694 6.604-0.539 0.71881-1.46 1.9094-1.7521 2.2462-2.0216 2.9426-0.38195 0.92094 0.31448 1.8194 0.38185 0.47175 1.8194 1.842h0.02278l0.02277 0.0223 0.02278 0.02258 0.04555 0.04489q3.1672 2.9426 4.2903 4.9643 0.06737 0.1123 0.14604 0.28075 0.07876 0.16851 0.15724 0.59528 0.07876 0.42678-0.01139 0.76374-0.09015 0.33697-0.56149 0.61771-0.47172 0.28081-1.3253 0.28081l-5.7504 0.08986q-0.53909 0.11229-1.2579-0.1123-0.71882-0.22467-1.168-0.49417l-0.44932-0.26956q-0.67375-0.47176-1.5723-1.4376-0.89846-0.96593-1.5387-1.7408-0.64025-0.77498-1.3703-1.3029-0.73002-0.52783-1.2691-0.34814-0.06737 0.0224-0.17963 0.07867-0.11236 0.05618-0.38195 0.32566-0.2695 0.26958-0.48292 0.66268-0.21342 0.39304-0.38185 1.168-0.16844 0.77499-0.14595 1.7409 0 0.33689-0.07876 0.6177-0.07876 0.28075-0.16863 0.41553l-0.09015 0.11231q-0.40425 0.42684-1.1905 0.49423h-2.5831q-1.5949 0.08987-3.2796-0.37069-1.6847-0.46044-2.9537-1.1905-1.2692-0.73001-2.3138-1.4825-1.0445-0.75248-1.5835-1.2916l-0.56168-0.53907q-0.22452-0.2246-0.61757-0.67385-0.39324-0.44927-1.6062-2.0441-1.2129-1.5948-2.381-3.3919-1.168-1.797-2.7517-4.7396-1.5836-2.9426-2.9314-6.1098-0.13484-0.35942-0.13484-0.60652 0-0.24707 0.067375-0.35939l0.090149-0.13479q0.33697-0.42677 1.2805-0.42677l6.1547-0.04488q0.2694 0.04488 0.51651 0.14597 0.2471 0.10107 0.35946 0.19093l0.11235 0.06747q0.35936 0.24708 0.53909 0.71878 0.44923 1.1232 1.0332 2.3249 0.58407 1.2018 0.92095 1.8307l0.35955 0.65141q0.65135 1.3478 1.2579 2.3362 0.60637 0.98834 1.0894 1.5387 0.48292 0.55032 0.93214 0.86477 0.44923 0.31453 0.76371 0.31453 0.31448 0 0.60656-0.11234 0.0446-0.02258 0.11226-0.11233 0.06737-0.08986 0.2695-0.49417 0.20222-0.40434 0.30338-1.0557 0.10097-0.65144 0.21332-1.8195 0.11226-1.1681 0-2.8078-0.04555-0.89848-0.20212-1.6397-0.15733-0.74127-0.31457-1.0333l-0.13465-0.26954q-0.56158-0.7637-1.9094-0.96591-0.29199-0.04489 0.11226-0.53909 0.38185-0.42678 0.85357-0.67391 1.1905-0.58402 5.3686-0.53904 1.8419 0.0223 3.0324 0.29199 0.44923 0.11229 0.75251 0.30321 0.30319 0.19096 0.46052 0.53913 0.15714 0.34818 0.23581 0.71881 0.07876 0.37064 0.07876 1.022 0 0.65145-0.02183 1.2355-0.02277 0.58399-0.05599 1.5836-0.03416 0.99959-0.03416 1.8532 0 0.24707-0.02277 0.94341-0.02277 0.69635-0.01139 1.0782 0.01139 0.38186 0.07876 0.90971 0.06737 0.52791 0.2583 0.87605 0.19102 0.34821 0.50541 0.55035 0.17973 0.04488 0.38195 0.08986 0.20212 0.04489 0.58398-0.24714 0.38185-0.29199 0.85357-0.77491 0.47172-0.48295 1.168-1.505 0.69633-1.022 1.5274-2.4147 1.3478-2.3361 2.4036-5.0541 0.09015-0.22464 0.22461-0.39311 0.13475-0.16846 0.2471-0.23586l0.09015-0.06738 0.11235-0.05608 0.29199-0.06747 0.44923-0.0112 6.4693-0.04489q0.87606-0.11228 1.4375 0.05608 0.56158 0.16848 0.69633 0.37061z','VKontakte'],
    ['m27.305 31.095v4.9946q0 1.586-0.9231 1.586-0.5445 0-1.0653-0.52074v-7.125q0.5208-0.52083 1.0653-0.52083 0.9231 0 0.9231 1.5861zm8.0008 0.0235v1.0888h-2.1303v-1.0888q0-1.6097 1.0652-1.6097 1.0651 0 1.0651 1.6097zm-22.866-5.1604h2.5329v-2.2251h-7.3855v2.2251h2.4856v13.469h2.367zm6.8174 13.469h2.1067v-11.694h-2.1067v8.9477q-0.7102 0.99418-1.3494 0.99418-0.426 0-0.497-0.49709-0.024-0.0713-0.024-0.82851v-8.6163h-2.1067v9.2555q0 1.1598 0.1893 1.728 0.2841 0.87583 1.373 0.87583 1.1362 0 2.4145-1.444v1.2783zm10.155-3.5034v-4.6632q0-1.728-0.213-2.3434-0.4023-1.3257-1.6807-1.3257-1.1835 0-2.2014 1.2783v-5.1367h-2.1067v15.694h2.1067v-1.1362q1.0653 1.3019 2.2014 1.3019 1.2784 0 1.6807-1.3019 0.213-0.63918 0.213-2.3672zm8.0009-0.23672v-0.30777h-2.1541q0 1.2073-0.048 1.444-0.1657 0.85217-0.9467 0.85217-1.0889 0-1.0889-1.6334v-2.0593h4.2371v-2.4381q0-1.87-0.6391-2.7458-0.9232-1.2073-2.5091-1.2073-1.6097 0-2.5329 1.2073-0.6628 0.87582-0.6628 2.7458v4.0952q0 1.87 0.6865 2.7459 0.9232 1.2072 2.5565 1.2072 1.7043 0 2.5565-1.2546 0.4261-0.6391 0.4971-1.2783 0.047-0.21298 0.047-1.3729zm-14.392-21.612v-4.9711q0-1.6333-1.0177-1.6333-1.0179 0-1.0179 1.6333v4.9711q0 1.6569 1.0179 1.6569 1.0177 0 1.0177-1.6569zm17.02 17.777q0 5.5391-0.6154 8.285-0.3314 1.3966-1.3729 2.3434-1.0416 0.94678-2.4145 1.0889-4.3556 0.49709-13.138 0.49709t-13.138-0.49709q-1.3729-0.1421-2.4262-1.0889-1.0534-0.94687-1.3611-2.3434-0.6154-2.6512-0.6154-8.285 0-5.539 0.6154-8.285 0.3314-1.3966 1.3729-2.3435 1.0415-0.94678 2.4382-1.1125 4.3318-0.47343 13.114-0.47343t13.138 0.47343q1.3729 0.16576 2.4263 1.1125 1.0534 0.94687 1.3611 2.3435 0.6154 2.6511 0.6154 8.285zm-23.624-30.205h2.4144l-2.8642 9.4448v6.4149h-2.3671v-6.4149q-0.3315-1.7517-1.4441-5.0183-0.8757-2.4381-1.5385-4.4265h2.5091l1.6806 6.2255zm8.7583 7.8826v4.1424q0 1.9174-0.6628 2.7932-0.8758 1.2072-2.5091 1.2072-1.586 0-2.4855-1.2072-0.6629-0.89948-0.6629-2.7932v-4.1424q0-1.8937 0.6629-2.7696 0.8995-1.2072 2.4855-1.2072 1.6333 0 2.5091 1.2072 0.6628 0.87582 0.6628 2.7696zm7.9298-3.8348v11.812h-2.154v-1.3019q-1.2546 1.4676-2.4381 1.4676-1.0889 0-1.3966-0.87582-0.1895-0.56814-0.1895-1.7753v-9.3265h2.1541v8.6874q0 0.78112 0.024 0.82843 0.071 0.52074 0.4971 0.52074 0.6391 0 1.3493-1.0178v-9.0188h2.1541z','YouTube']
];
var borderStyles = [
    ['none',tr('Нет бордюра','No border')],
    ['solid',tr('Непрерывный бордюр','Solid border')],
    ['dotted',tr('Бордюр точками','Dotted border')],
    ['dashed',tr('Бордюр тире','Dashed border')]
];
var paddings = [
    ['0.1rem 0.2rem',tr('Минимум','Minimal')],
    ['0.22rem 0.5rem',tr('Средний','Medium')],
    ['0.5rem 0.9rem',tr('Большой','Big')],
    ['0.8rem 1.6rem',tr('Огромный','Huge')]
];
var bannerHeights = [
    ['4rem',tr('Нормальный','Normal')],
    ['5rem',tr('Большой','Big')],
    ['2.5rem',tr('Тонкий','Thin')]
];
var commonBorderRadiuses = [
    ['0',tr('Нет','None')],
    ['0.25rem',tr('Малое','Small')],
    ['0.36rem',tr('Среднее','Middle')],
    ['0.5rem',tr('Большое','Big')],
    ['0.8rem',tr('Еще больше','Even bigger')],
    ['1.4rem',tr('И еще больше','A way bigger')],
    ['2rem',tr('Максимальное','Max')]
];
var sizeMediaQuery = [
    ['',tr('По умолчанию','Default') + '  (1140px)'],
    ['@media (min-width: 1300px){.container{max-width: 1240px;} body.nav-position-fixed nav#topnav.container{margin: 0 calc((100% - 1240px)/2);}}',tr('Широкая','Wide') + ' (1240px)'],
    ['@media (min-width: 1400px){.container{max-width: 1380px;} body.nav-position-fixed nav#topnav.container{margin: 0 calc((100% - 1380px)/2);}}',tr('Очень широкая','Extra wide')  + ' (1380px)']
];
var colemnsLayout = [
    ['0',tr('Левая | Главная | Правая','Left | Main | Right')],
    ['1',tr('Левая | Главная','Left | Main')],
    ['2',tr('Главная | Правая','Main | Right')],
];
var gaugeLayout = [
    ['0',tr('Вверху окна','At window top')],
    ['1',tr('Внизу баннера','At navbar bottom')]
];
var styles = [
    {
        icon:'settings',
        name:tr('Общие настройки','Common settings'),
        hash:'',
        items:[
        	{
        		hash:'myBody',
        		css:'.sideshadows #contentMain.container:before, .sideshadows #topnav.container:not(.position-fixed):before,.sideshadows #subbarnav.container:before,.sideshadows #footer.container:before,.sideshadows #carouselMain.container:before{box-shadow:-15px 0 15px -15px inset [color1];} .sideshadows #contentMain.container:after, .sideshadows #topnav.container:not(.position-fixed):after, .sideshadows #subbarnav.container:after,.sideshadows #footer.container:after,.sideshadows #carouselMain.container:after{box-shadow:15px 0 15px -15px inset [color1];}',
        		vars:[
        			['switchSideshadows','sideshadows',tr('Тени у блоков','Side shadows')],
        			['color1','#cdcdcd',tr('Цвет теней','Shadows color')]
        		]
            },
            {
                name:'',
                hash:'myBody',
                css:'',
                vars:[
                    ['switchSmoothAnimation','smooth',tr('Анимация состояний','Animated transitions')],
                ]                
            },
            {
                name:'',
                hash:'topnav',
                css:'',
                vars:[
                    ['fontList','',tr('Настроить шрифты','Set up fonts')]
                ]
            },
        	{
        	    hash:'bodyContainer',
        	    css:'body{background:[color90];}',
        	    vars:[			
        			['color90','#ffffff',tr('Фон страницы','Body background')]
        		]
        	},
        	{
                name:tr('Скругление элементов','Border radius'),
        		hash:'myBody',
        		css:'#contentMain ul.list-group, #coverlead span, a.ebutton, input[type="file"]:before, fieldset, .borderFrame .borderMiddle, .widgetbox, table.doctable,.btn-lg, .btn-group-lg > .btn,input[type="submit"],input[type=text], input[type=password], textarea, select,.button,button{border-radius:[listCommonBorderRadius];} .list-group-item:first-child{border-top-right-radius:[listCommonBorderRadius];border-top-left-radius:[listCommonBorderRadius];min-height:[listCommonBorderRadius];} .list-group-item:last-child,.list-group-item:last-of-type{border-bottom-right-radius:[listCommonBorderRadius];border-bottom-left-radius:[listCommonBorderRadius];}',
        		vars:[
        			['listCommonBorderRadius',commonBorderRadiuses,''],
        		]
            },
        	{
                name:tr('Ширина страницы','Page width'),
        		hash:'myBody',
        		css:'[listSizeMediaQuery]',
        		vars:[
        			['listSizeMediaQuery',sizeMediaQuery,''],
        		]
            },
            {
                name:tr('Индикатор прокрутки','Scroll indicator'),
                hash:'page-scoll-indi',
                css:'.progress-bar{background-color:[colorA9];} .progress-container .progress-bar:after{background:[color78];} .progress-container .progress-bar{box-shadow: inset -82px 0px 42px -35px [color78];}',
                vars:[
                    ['colorA9','#cdcdcd',tr('Скрол индикатор','Scroll indicator')],
                    ['color78','transparent',tr('Точка индикатора','Indicator head')],
                    ['switchScrollInd','hidden',tr('Индикатор скрыт','Indicator is hidden')],
                    ['listGaugeLayout',gaugeLayout,tr('Расположение','Position')]
                ]
            }
        ]
    },
    {
        icon:'banner',
        name:tr('Панель навигации (Баннер)','Navigation Bar'),
        onoffkey:'navbaron',
        hash:'topnav',
        items:[
            {
                name:tr('Цвета','Colors'),
        		hash:'topnav',
        		css:'body #topnav.navbar-box{background-color: [color0];} body.wscrolled #topnav.navbar-box{background-color:[color9B]!important;} #topnav .navbar-nav .nav-link{color:[color2]!Important;} #topnav .navbar-nav .nav-link:hover{color:[color3]!Important;} #topnav .disabled{opacity:0.4;} #topnav .navbar-toggler-icon{' + svgHamburger('color2') + ';} #topnavMenuClose{' + svgClose('color2') +'} @media (max-width: 61.95rem){#topnav .navbar-nav{background-color:[color0];}}',
        		vars:[		
        			['color0','#393939',tr('Фон','Background')],
        			['color9B','transparent',tr('Фон (прокручен)','Background (scrolled)')],
        			['color2','#FFFFFF',tr('Ссылка норм.','Link normal')],
        			['color3','#FFFFFF',tr('Ссылка акт.','Link hover')]
        		]
            },
            {
                name:tr('Меню','Menu'),
        		hash:'topnavMenu',
        		css:'#topnav .dropdown-menu{background-color: [color12]!important;} #topnav .dropdown-item{color:[color3]} #topnav .dropdown-item:hover, #topnav .dropdown-item:focus{color:[color9];text-decoration:none;background-color:[color4];} #topnav .dropdown-menu{box-shadow:0 0.5rem 1rem [color5];}',
        		vars:[		
        			['color12','#f3f3f3',tr('Фон','Background')],
        			['color3','#212121',tr('Текст пункта','Item text')],
        			['color4','#cdcdcd',tr('Фон акт.пункта','Active item bg')],
        			['color9','#212121',tr('Текст акт.пункта','Active item text')],
        			['color5','rgba(0, 0, 0, 0.38)',tr('Цвет тени','Shadow color')],
        			['switchTopnavMenuBold','textbold',tr('Текст жирным','Font bold')],
        			['switchTopnavMenuItal','textitalic',tr('Курсив','Font italic')],
        			['switchTopnavMenuHidden','hidden',tr('Меню скрыто','Menu is hidden')]
        			//['switchTopnavMenuTrans','transition',tr('Без перехода','No transition')]
        		]
            },            
            {
                name:tr('Геометрия','Geometry'),
        		hash:'topnav',
        		css:'nav#topnav.navbar{height:[listBannerHeights]!Important;} body.nav-position-fixed #carouselMargin{height:[listBannerHeights];}   @media (max-width: 61.95rem){#topnav .navbar-nav:target,#subbarnav .navbar-nav:target{top:[listBannerHeights];}}',
        		vars:[
        			['switchTopnavWidth','container',tr('Фикс.ширина','Fixed width')],
        			['listBannerHeights',bannerHeights,tr('Высота','Height')]
        		]
            },
            {
                name:tr('Положение','Position'),
        		hash:'myBody',
        		css:'',
        		vars:[
        			['switchTopnavFixed','nav-position-fixed',tr('Неподвижный','Fixed')]
        		]
            },   
            {
                name:tr('При загрузке','Onload animation'),
        		hash:'topnav',
        		css:'#topnav{-webkit-animation-name:[listQW];animation-name:[listQW];}',
        		vars:[
        			['listQW',animations,'']
        		]
            },			
            {
                name:tr('Анимация меню','Menu animation'),
        		hash:'topnav',
        		css:'#topnav .dropdown-menu.show{-webkit-animation-name:[listZ];animation-name:[listZ];}',
        		vars:[
        			['listZ',animations,'']
        		]
            },
            {
                name:tr('Выравнивание меню','Menu alignment'),
                hash:'topnav',
                css:'#topnav .navbar-nav{margin-right:[list1]!important;}',
                vars:[
        			['list1',horPos,'']
        		]
            },
            {
                name:tr('Лого','Logo'),
                hash:'brand',
                css:'#topnav .navbar-brand{color:[color0];} #slogan{color:[color1];max-width:[sizeOfBox];} #brandtext{font-size:[sizeOfLogo];max-width:[sizeOfLogoBox];}',
                vars:[
                    ['color0','#f3f3f3',tr('Текст лого','Logo text')],
                    ['sizeOfLogo','80,100,200,%,' + tr('Размер лого','Logo size')],
                    ['sizeOfLogoBox','15,40,80,rem,' + tr('Поле лого','Logo area')],
                    ['color1','#f3f3f3',tr('Текст слогана','Slogan text')],
                    ['sizeOfBox','8,10,100,rem,' + tr('Поле слогана','Slogan area')],
                    ['switchLogoImage','hidden-logo-image',tr('Скрыть изображение','Hide Logo image')],
                    ['switchLogoText','hidden-logo-text',tr('Скрыть текст лого','Hide Logo text')],
                ]
            },
            {
                hash:'sitelogoimage',
                css:'',
                vars:[
                    ['imageBase64','data:image/svg+xml,<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"/>',tr('Логотип','Logo image') + '<br><sup>SVG, PNG, JPG</sup>']
                ]
            },
            {
                name:'',
        		hash:'topnav',
        		css:'',
                vars:[
                  ['switchTopnav','hidden',tr('Скрыть панель','Hidden')]
                ]  
            },
        ]
	},	
	{
	    icon:'cover',
        name:tr('Обложка','Cover'),
        onoffkey:'carouselon',
        hash:'carouselMain',
        items:[
            {
        	    name:tr('Общие','Common'),
        		hash:'carouselMain',
        		css:'#carouselMain{background-color:[color88]!Important;}',
        		vars:[			
        			['color88','#FFFFFF',tr('Фон','Background')],
        			['switchCarouselNoMarg','no-margin',tr('Прилипает к верху','Stick to the top')],
        			['listAZ',animations,tr('При загрузке','Onload animation')]
        		]
        	},
        	{
        		hash:'carouselMain',
        		name:tr('Градиент обложки','Cover gradient'),
        		css:'.carousel-inner:after{background-image: linear-gradient(to bottom, [color0], [color1]);} #carouselMain{box-shadow:inset 0 0 0 1px [color1];}',
        		vars:[
        			['color0','rgba(100, 100, 100, .15)',tr('Верхний цвет','Top color')],
        			['color1','rgba(100, 100, 100, .45)',tr('Нижний цвет','Bottom color')]
        		]		
            },
            (proMode?{
        	    hash:'cover-buttons',
        	    name:tr('Кнопки обложки','Cover buttons'),
        	    css:'.cover-btn,.cover-btn:visited{color:[color0];background-color:[color2];border-color:[color4];} .cover-btn:hover{color:[color1];background-color:[color3];border-color:[color5];}',
        	    vars:[			
        			['color0','#ffffff',tr('Текст','Text')],
        			['color1','#ffffff',tr('Текст акт.','Text active')],
        			['color2','#404040',tr('Фон','Background')],
        			['color3','#404040',tr('Фон акт.','Background active')],
        			['color4','#404040',tr('Бордюр','Border')],
        			['color5','#404040',tr('Бордюр акт.','Border active')],
        			['switchCoverBtnsBold','textbold',tr('Текст жирным','Font bold')],
        			['switchCoverBtnsItal','textitalic',tr('Курсив','Font italic')],
        			['switchCoverBtns3D','effect3D',tr('Объемные','3D effect')]
        			//['switchCoverBtnsTrans','transition',tr('Без перехода','No transition')]
        		]
        	}:undefined),
        	{
        	    separator:true,
        	    name:tr('Содержимое','Text contents'),
        	}, 
        	{
        	    name:tr('Заголовок обложки','Cover title'),
        		hash:'covertitle',
        		css:'#covertitle{font-size:[sizeOfCoverTitle]} .carousel-inner .container h1,.carousel-inner .container h2,.carousel-inner .container h3{color:[color9]!Important; --cover-tile-color:[color299];} .text3D{text-shadow: 0 1px 0 var(--cover-tile-color), 0 2px 0 var(--cover-tile-color), 0 3px 0 var(--cover-tile-color), 0 4px 0 var(--cover-tile-color), 0 5px 0 var(--cover-tile-color), 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.15);}',
        		vars:[
        		    ['switchCoverTitleOn','hidden',tr('Скрыть заголовок','Hidden')],
        		    ['sizeOfCoverTitle','2,3,5,rem,' + tr('Размер заголовка','Cover title size')],
        			['color9','#333',tr('Цвет','Color')],
        			['color299','rgba(0,0,0,0.7)',tr('Тень','Shadow')],
        			['switchCoverTitleBold','textbold',tr('Текст жирным','Font bold')],
        			['switchCoverTitleItal','textitalic',tr('Курсив','Font italic')],
        			['switch3DEffect','text3D','3D'],
        			['switchChannelGlitchEffect','channel-glitch-effect',tr('Смещение','Channel glitch')],
        			['switchSquiggleEffect','squiggle-effect',tr('Грубый','Rough')]
        		]
        	},
        	{
        	    name:tr('Текст обложки','Cover text'),
        		hash:'coverlead',
        		css:'.carousel-inner .container .lead{color:[color12]!Important;} #coverlead span{background:[colorA7];padding:[listСoverleadPaddings]!Important;}',
        		vars:[			
        		    ['switchCoverLeadOn','hidden',tr('Скрыть текст обложки','Disabled')],
        			['color12','#202020',tr('Текст','Text')],
        			['colorA7','rgba(255,255,255,0)',tr('Подложка','Background')],
        			['listСoverleadPaddings',paddings,tr('Отступы','Paddings')],
        			['switchCoverTextItal','textitalic',tr('Курсив','Font italic')]
        		]
        	},
        	{
        	    hash:'cover-content',
        	    name:tr('Выравнивание','Text align'),
        	    css:'#carouselMain #cover-content{text-align:[listTextAlign]!important;}',
        	    vars:[
        			['listTextAlign',textAlign,'']
        		]
        	},
        	{
        	    separator:true,
        	    name:tr('Геометрия','Geometry'),
        	},
        	{
        	    hash:'carouselMain',
        	    name:tr('Высота на главной','Height on Homepage'),
        	    onoffkey:'carousel-height-on',
        	    css:'#carouselMain, .carousel-inner{max-height:[height0];}',
        	    vars:[			
        			['height0','160,600,680']
        		]
        	},
        	{
        	    hash:'myBody',
        	    name:tr('Высота на внутренних страницах','Height on internal pages'),
        	    css:'body.nothomepage.on #carouselMain, body.nothomepage.on #carouselMain .carousel-inner{max-height:[height33];transition: all 0.2s ease;}',
        	    vars:[
        			['height33','0,200,680'],
        			['switchCoverMinimizable','nothomepage',tr('Включено','Enabled')],
        			['switchCoverMiniPreview','on',tr('Предпросмотр','Preiew')]
        		]
        	}, 
        	{
                name:tr('Геометрия обложки','Cover geometry'),
                hash:'museMaskPath',
                css:'.carousel-inner{clip-path:url(\'#museMask\');}',
                vars:[
        			['setPath-list',masks,'']
        		]
            },
            {
        	    name:tr('Ширина','Width'),
        		hash:'carouselMain',
        		css:'',
        		vars:[
        			['switchCarouselWidth','container',tr('Фикс.ширина','Fixed width')]
        		]
        	},            
        	{
        	    separator:true,
        	    name:tr('Слайды','Slides'),
        	},        	
        	{
        	    hash:'carouselMain',
        	    name:'',
        	    css:'.carousel-control-prev-icon {background-image: url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'[colorArrws0]\' viewBox=\'0 0 8 8\'%3e%3cpath d=\'M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z\'/%3e%3c/svg%3e");} .carousel-control-next-icon {background-image: url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'[colorArrws0]\' viewBox=\'0 0 8 8\'%3e%3cpath d=\'M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z\'/%3e%3c/svg%3e"); }',
        	    vars:[
        	        ['showdialog','slides',tr('Слайды','Slides')],
        	        ['colorArrws0','rgba(255,255,255,1)',tr('Цвет стрелок','Arrows color')]
        	    ]
        	},
        	{
        	    hash:'carouselMain',
        	    name:tr('Масштаб слайдов','Slides zoom'),
        	    css:'.scalable .carousel-item img.w-100{transform: scale([heightSlideScale]);} ',
        	    vars:[			
        	        ['switchSlidesScalable','scalable',tr('Включено','Enabled')],
        			['heightSlideScale','0.5,1.0,3.0, ']
        		]
        	},
        	{
        	    hash:'carouselMain',
        	    name:tr('Смещение слайдов','Slides shift'),
        	    css:'.shiftable .carousel-item{margin-bottom:[heightSlideShift];}',
        	    vars:[			
        	        ['switchSlidesShiftable','shiftable',tr('Включено','Enabled')],
        			['heightSlideShift','-100,0,100,%']
        		]
        	},        	
        	{
        	    hash:'carouselMain',
        	    name:tr('Индикаторы слайдов','Slides indicators'),
        	    css:'.carousel-indicators li{width:[heightLi];border-radius:[listLi];height:[heightLi];background-color:[colorInd0];}',
        	    vars:[			
        			['heightLi','3,30,80'],
        			['colorInd0','#CDCDCD',tr('Цвет','Color')],
        			['listLi',[
        			    ['50%',tr('Круглые','Circle')],
        			    ['0%',tr('Квадратные','Square')]
        			],''],
        		]
        	},
        	(proMode?{
        	    hash:'carouselMain',
        	    name:'',
        	    css:'',
        	    vars:[
        	        ['showdialog','covercontents',tr('Кнопки обложки','Cover buttons'),]
        	    ]
        	}:undefined),        	
            {
                name:'',
        		hash:'carouselMain',
        		css:'',
                vars:[
                  ['switchCarouselMain','hidden',tr('Скрыть обложку','Hidden')]
                ]  
            }        	
        ]
	},
    {
        icon:'hmenu',
        onoffkey:'subbaron',
        hash:'subbarnav',
        name:tr('Горизонтальное меню','Horizontal menu'),
        items:[
            {
                name:tr('Основное','Common'),
        		hash:'subbarnav',
        		css:'#subbarnav .dropdown-menu{box-shadow:0 0.5rem 1rem [color5];} #subbarnav.navbar-box{background-color: [color0]!important;} #subbarnav .navbar-nav .nav-link{color:[color2]!Important;} #subbarnav .navbar-nav .nav-link:hover{color:[color3]!Important;} #subbarnav .disabled{opacity:0.4;} #subbarnav .dropdown-menu{background-color: [color0]!important;} #subbarnav .dropdown-item:hover, #subbarnav .dropdown-item{color:[color2]} #subbarnav .dropdown-item:hover, #subbarnav .dropdown-item:focus{color:[color3];text-decoration:none;background-color:[color4];} #subbarnav .navbar-toggler-icon{' + svgHamburger('color2') + ';} #subbarnavMenuClose{' + svgClose('color2') + ';} @media (max-width: 61.95rem){#subbarnav .navbar-nav{background-color:[color0];}}',
        		vars:[		
        			['color0','#404040',tr('Фон','Background')],
        			['color2','#FFFFFF',tr('Ссылка норм.','Link normal')],
        			['color3','#FFFFFF',tr('Ссылка акт.','Link hover')],
        			['color4','#cdcdcd',tr('Пункт меню акт.','Menu item hover')],
        			['color5','rgba(0, 0, 0, 0.38)',tr('Цвет тени меню','Menu shadow color')],
        			['switchSubbarnavWidth','container',tr('Фикс.ширина','Fixed width')]
        		]
            },
			{
                name:tr('При загрузке','Onload animation'),
        		hash:'subbarnav',
        		css:'#subbarnav{-webkit-animation-name:[listFt];animation-name:[listFt];}',
        		vars:[
        			['listFt',animations,'']
        		]
            },			
            {
                name:tr('Анимация меню','Menu animation'),
        		hash:'subbarnav',
        		css:'#subbarnav .dropdown-menu.show{-webkit-animation-name:[list0];animation-name:[list0];}',
        		vars:[
        			['list0',animations,'']
        		]
            },
            {
                name:tr('Выравнивание меню','Menu alignment'),
                hash:'subbarnav',
                css:'#subbarnav .navbar-nav{margin-right:[list1]!important;}',
                vars:[
        			['list1',horPos,'']
        		]
            },
            {
                name:'',
        		hash:'subbarnav',
        		css:'',
                vars:[
                  ['switchSubbarnav','hidden',tr('Скрыть меню','Hidden')]
                ]  
            }            
		]
	},
	{
	    icon:'page',
	    hash:'bodyContainer',
        name:tr('Контент','Page contents'),
        items:[
        	{
        	    name:tr('Основное','Common'),
        	    hash:'bodyContainer',
        	    css:'a{color:[colorA];}a:hover{color:[colorB];} #contentMain{color:[color91];background:[color92];}',
        	    vars:[			
        			['color92','#ffffff',tr('Фон','Background')],
        			['color91','#212121',tr('Текст','Text')],
        			['colorA','#0791f9',tr('Ссылка норм.','Anchor normal')],
        			['colorB','#007cda',tr('Ссылка поверх','Anchor hover')]
        		]
        	},
        	{
        	  name:tr('Заголовки','Headings'),  
        	  hash:'bodyContainer',
        	  css:'#main_content_place h1,#main_content_place h2,#main_content_place h3,#main_content_place h4,#main_content_place h5,#main_content_place h6{color:[colorHS9];}',
        	  vars:[
        			['colorHS9','inherit',tr('Цвет','Color')],
        			['switchContentsTitlesItal','headersitalic',tr('Курсивом','Font italic')]
        	    ]  
        	},
        	{
        	  name:tr('Геометрия','Geometry'),  
        	  hash:'contentMain',
        	  css:'',
        	  vars:[
        	        ['switchContentWidth','container',tr('Фикс.ширина','Fixed width')],  
        	    ]  
        	},
        	{
        	    name:tr('Меню','Menu'),
        	    hash:'leftmenu',
        	    css:'.list-group-item{background-color:[color2];border-color:[color4];border-style:[listLeftmenuBorders];} .list-group-item a, .list-group-item a:visited{color:[color0]} .list-group-item.active,.list-group-item:hover{background-color:[color3];} .list-group-item:hover a, .list-group-item:hover a:visited{color:[color1];} #contentMain ul.list-group{box-shadow: 0px 0px 9px [colorZ0];}',
        	    vars:[
        	        ['color0','#212121',tr('Ссылка','Link')],
        	        ['color1','#181818',tr('Ссылка акт.','Link hover')],
        	        ['color2','#CDCDCD',tr('Фон пункта','Item background')],
        	        ['color3','#CDCDCD',tr('Фон пункта акт.','Item background hover')],
        	        ['colorZ0','rgba(0,0,0,0)',tr('Тень','Shadow')],
        	        ['color4','#404040',tr('Бордюр','Border')],
        	        ['listLeftmenuBorders',borderStyles,tr('Стиль бордюра','Border style')]
        	    ]
        	},
        	{
        	    name:tr('Всплыв.меню','Popup menu'),
        	    hash:'leftmenu',
                css:'.prototip .content,.prototip .title{color:[color1Z]!Important;}.prototip_StemImage{background:[colorP0]!Important;}.borderFrame a:not(.editor):hover{color:[colorP2]!Important;}.borderFrame a:not(.editor){color:[colorP1]!Important;}.borderFrame .borderMiddle{background-color:[colorP0]!Important;box-shadow: 0px 0px 9px [colorPA];}',
                vars:[
                    ['colorP0','#212121',tr('Фон','Background')],
					['color1Z','#212121',tr('Текст','Text')],
                    ['colorP1','#212121',tr('Ссылка','Link')],
                    ['colorP2','#212121',tr('Ссылка поверх','Link hover')],
                    ['colorPA','rgba(0,0,0,0.7)',tr('Тень','Shadow')]
                ]
        	},
        	{
        	    name:tr('Кнопки','Buttons'),
        	    hash:'controls',//#contentMain //controls //butto
        	    css:'input[type="file"]:before{content:"' + tr('Выберите файл','Select file(s)') + '";} a.ebutton, button:not([type="button"]), input[type="submit"],input[type="file"]:before{color:[colorZ7];box-shadow:[listBtns3D];background:[color57];border: 2px [listBtnBorders] [color59];padding:[listBtnPaddings]!Important;} a.ebutton:hover, button:not([type="button"]):hover, input[type="submit"]:hover, input[type="file"]:hover:before,input[type="file"]:active:before{color:[colorZ8];background:[color58];border: 2px [listBtnBorders] [color60];} ',
        	    vars:[
        	        ['color57','#cdcdcd',tr('Фон','Background')],
        	        ['color58','#cfcfcf',tr('Фон поверх','Background hover')],
        	        ['colorZ7','#212121',tr('Текст','Text normal')],
        	        ['colorZ8','#212121',tr('Текст поверх','Text hover')],
        	        ['color59','#212121',tr('Бордюр','Border normal')],
        	        ['color60','#282828',tr('Бордюр поверх','Border hover')],
        	        ['listBtnBorders',borderStyles,tr('Стиль бордюра','Border style')],
        	        ['listBtnPaddings',paddings,tr('Отступы','Paddings')],
        	        ['listBtns3D',[
        	                ['none',tr('Плоские','Flat')],
        	                ['inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 1px rgba(0, 0, 0, 0.3)',tr('Объемные','3D effect')]
        	            ],
        	        tr('Геометрия','Geometry')],
        	    ]
        	},
        	{
        	    name:tr('Блоки в колонках','Boxes'),
        	    hash:'widget',
        	    css:'.widgetbox{border: 2px [listWidgetBorders0] [color9];box-shadow:0 0 12px [color8];background:[colorS8]!Important;} #colRight h1,#colRight h2,#colRight h3,#colRight h4,#colRight h5,#colRight h6,#colLeft h1,#colLeft h2,#colLeft h3,#colLeft h4,#colLeft h5,#colLeft h6{color:[colorA9];font-size:[sizeBoxHeadings]}',
        	    vars:[
        	        ['colorS8','#FFFFFF',tr('Цвет фона','Background')],
        	        ['color8','#cdcdcd',tr('Цвет тени','Shadow color')],
        	        ['colorA9','inherit',tr('Цвет заголовка','Headings color')],
        	        ['sizeBoxHeadings','0.95,1.75,2.3,rem,' + tr('Размер заголовка','Headings size')],
        	        ['color9','#ababab',tr('Цвет бордюра','Border color')],
        	        ['listWidgetBorders0',borderStyles,tr('Стиль бордюра','Border style')]
        	    ]
        	},    
            {
        	    name:tr('Таблицы','Tables'),
        	    hash:'contentTable',
        	    css:'table.doctable td{padding:[listTablePaddings]!Important;} table.doctable{border:[listTableBordersOuter] 2px [colorT9]!Important;} table.doctable td{border:none!Important; background:transparent!Important; border-top:[listTableBordersInner] 2px [colorT12]!Important; border-right:[listTableBordersInner] 2px [colorT12]!Important;} table.doctable tr:last-child td:last-child, table.doctable tr:first-child td:last-child{border-right:none!Important;} table.doctable tr:first-child td{border-top:none!Important;}',
        	    vars:[
        	        ['colorT9','#505050',tr('Внеш.бордюр','Outer border')],
        	        ['listTableBordersOuter',borderStyles,tr('Стиль внеш.бордюра','Outer border style')],
        	        ['colorT12','#505050',tr('Внутр.бордюр','Inner border')],
        	        ['listTableBordersInner',borderStyles,tr('Стиль внутр. бордюра','Inner border style')],
        	        ['listTablePaddings',paddings,tr('Отступы','Paddings')]
        	    ]
        	},        	
            {
        	    name:tr('Текстовые поля','Text fields'),
        	    hash:'controls',
        	    css:'select, textarea, input[type="text"]{color:[colorB7];border-width:2px!Important;border-style:[listFieldBorders]!Important;border-color:[colorA9]!Important;} select:hover,select:focus,textarea:hover,textarea:focus,input[type="text"]:hover,input[type="text"]:focus{border-width:2px!Important;border-style:[listFieldBorders]!Important;border-color:[colorA7]!Important;box-shadow:0 0 12px [colorA8]!Important;} ',
        	    vars:[
        	        ['colorA8','#212121',tr('Тень','Shadow')],
        	        ['colorA9','#505050',tr('Бордюр','Border normal')],
        	        ['colorA7','#212121',tr('Бордюр поверх','Border hover')],
        	        ['colorB7','#212121',tr('Текст','Text')],
        	        ['listFieldBorders',borderStyles,tr('Стиль бордюра','Border style')]
        	    ]
        	},
        	{
        	    name:tr('Макет колонок','Columns layout'),
        	    hash:'bodyContainer',
        	    css:'',
        	    vars:[
        	        ['listColumnsLayout',colemnsLayout,'']
        	    ]
        	}
        ]
	},	
    {
        icon:'footer',
        hash:'footer',
        name:tr('Футер','Footer'),
        items:[
        	{
        	    name:tr('Цвета','Colors'),
        	    hash:'footerBoxContainer',
        	    css:'.footer-box{background-color: [color00] !important;} .footer-box h5,.footer-box h6,.footer-box h4,.footer-box h3,.footer-box h2,.footer-box h1{color:[color70];}#footerBoxContainer div p{color:[color71];} .footer-box a,.footer-box a:visited{color:[color72];} .footer-box a:hover{color:[color73];}',
        	    vars:[			
        	        ['color00','#393939',tr('Фон футера','Footer background')],
        			/*['color70','#404040',tr('Заголовки футера','Footer titles')],*/
        			['color71','#FFFFFF',tr('Текст','Text')],
        			['color72','#FFFFFF',tr('Ссылка норм.','Link normal')],
        			['color73','#FFFFFF',tr('Ссылка акт.','Link hover')],
        			
        		]
        	},
            {
                name:tr('Основное','Common'),
        		hash:'footer',
        		css:'',
                vars:[
                    ['switchFooterWidth','container',tr('Фикс.ширина','Fixed width')]
                ]  
            },
            (standaloneMode?{
                name:tr('Шрифт','Font'),
        		hash:'footer',
        		css:'',
                vars:[
                    ['switchFooterTitlesBold','headersbold',tr('Заголовки жирным','Headers bold')],
                    ['switchCoverTitlesItal','headersitalic',tr('Заголовки курсивом','Headers italic')],
                    ['switchCoverTextItal','textitalic',tr('Текст курсивом','Text italic')]
                ]  
            }:undefined),            
            (standaloneMode?{
                name:tr('Контент футера','Footer content'),
                hash:'footer-row',
                css:'',
                vars:[
                    ['switchFooterFuncHidden','hidden',tr('Скрыть','Hidden')]
                ]
            }:undefined),
            (standaloneMode?{
        	    hash:'',
        	    name:tr('Выравнивание','Text align'),
        	    css:'#footer-row{text-align:[listTextAlign]!important;}',
        	    vars:[
        			['listTextAlign',textAlign,'']
        		]
        	}:undefined),
            (standaloneMode?{
        	    hash:'gototop',
        	    name:tr('Кнопка "Вверх"','"Go to top" button'),
        	    css:'#gototop{background:[color7399]!important;box-shadow:0 0 1rem [colorJ645];} #gototop:before{box-shadow:inset -0.35rem -0.35rem 0 0 [colorA345];}',
        	    vars:[
        			['color7399','#cdcdcd',tr('Цвет фона','Background color')],
        			['colorA345','#ffffff',tr('Цвет стрелки','Arrow color')],
        			['colorJ645','rgba(0,0,0,0.1)',tr('Цвет тени','Shadow color')],
        			['switchGototopButton','hidden',tr('Скрыть кнопку','Hide button')],
        		]
        	}:undefined),        	
        ]
	}
];