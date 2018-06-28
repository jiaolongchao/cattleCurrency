
var httpApi="http://currency-dev.0606.com.cn/";
var httpApi2 = 'http://advisor-test.0606.com.cn:5000/';
var httpApi3 = 'http://123.56.30.141:9600/';
var httpApi4='http://currency-test.0606.com.cn/';
//var Http='http://101.201.237.183:5700/
//生产环境
//var Http = 'http://101.201.237.183:8000/';
//测试环境
var Http='http://buss.0606.com.cn:8080/';
 window.userInfo={};
//正式环境
//document.write(111);
$(function() {

  	login(function(){
  		getTotal();
  	});

})

function login(callback){
	window.refreshtoken=function(result){
		delete window.refreshtoken;
		try{
			result = result;
		}catch(e){
			console.log('出错！');
		}
		
		if(result){
			window.userInfo.access_token=result;
		}
		
		if(callback){
			callback();
		}
		
			
	}
	
	return nativeFunLogin();
}

function nativeFunLogin(){
	 if (typeof window.webkit != 'undefined') {
        window.webkit.messageHandlers.jsCallNative.postMessage({"nativeCallJS":"refreshtoken"});
    }else if(/Android/i.test(window.navigator.userAgent)) {				       //android
        window.haina.pushEvent('{"nativecalljs":"refreshtoken"}');
    }
}

//document.write(accessToken);
function getTotal(){  //获取牛币总数
    $.ajax({
        type: "get",
        url: httpApi4 + 'currency/info.jspa?access_token='+userInfo.access_token,
        dataType: 'json',
        success: function (datas) {
            if(datas.code == 200){
                var data = datas.data;
                $('.HeadNums').html(data.total + '<small>个</small>'); //牛币总数
                $('.HeadNuma').html('<em>' + data.inviteReAmount + data.inviteBuyAmount + '</em>' + '<small>个</small>');
                $('.inviteFirend').html(data.inviteReTimes);
                $('.invitetake').html(data.inviteBuyTimes);
                 
            }else{
              
            }
        },
        error: function (e) {
            console.log("error")
        }
    })
}

function getUrlParam(name) {  //获取url的code
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function getRecord(filtter,page,pageSize) {
    $.ajax({  //牛币记录
        type: "get",
        url: httpApi4+ 'currency/record.jspa?access_token=' + userInfo.access_token + '&type='+ filtter +'&pageNo='+ page +'&pageSize='+ pageSize ,
        dataType: 'json',
        success: function (datas) {
            console.log(datas)
            if(datas.code == 200){
                var data = datas.data.records;
                /*var data = [{amounts: "-50", remark: "descdescdesc", time: '1506139931'},
                 {amounts: "+1000", remark: "好友购买智选组合5号获得", time: '1506139931'},
                 {amounts: "+1000", remark: "好友购买智选组合2号获得", time: '1506139931'},
                 {amounts: "+500", remark: "购买智选组合2号获得", time: '1507139931'},
                 {amounts: "+5", remark: "购买智选组合2号获得", time: '1507139931'},
                 {amounts: "+2", remark: "购买智选组合一号获得", time: '21507139931'},
                 {amounts: "+500", remark: "注册奖励", time: '21508139931'},
                 {amounts: "+5", remark: "购买智选组合2号获得", time: '21508139931'},
                 {amounts: "+2", remark: "购买智选组合一号获得", time: '21508139931'},
                 {amounts: "+500", remark: "注册奖励", time: '21508139931'}]*/
                /*var newary = [];
                function filterAry(data){
                    var temp = [];
                    if(data.length == 0) return false;
                    for(var i = 0; i < data.length; i++){
                        temp.push(data[i])
                        if(timestamp(data[i].time,'-') == timestamp(data[data.length - 1].time,'-')) return;  //保留数组中最后一项
                        if(timestamp(data[i].time,'-') != timestamp(data[i+1].time,'-')) break;
                    }
                    newary.push(temp);
                    data.splice(0,temp.length);  //删除已经过滤的项
                    filterAry(data);
                }
                filterAry(data)
                newary.push(data)*/

                function o(data) {
                    let obj={};
                    data.map((item)=>{
                        if(!obj[ timestamp(item.time,'-') ]){
                            obj[ timestamp(item.time,'-') ]=[];
                        }
                        obj[ timestamp(item.time,'-') ].push(item)
                    })
                    let ary=[];
                    for(let k in obj){
                        ary.push(obj[k])
                    }
                    return ary;
                }
                var newary = o(data);

                var html = '';
                var oPart = '';
                for(var i = 0;i < newary.length;i++){
                    var oLi = '';
                    for(var j = 0; j < newary[i].length;j++){
                        oLi +=  '<li><div class="inviteTop"><span>'+ timestamp(newary[i][j].time,'ch') +'</span><span>'+ newary[i][j].amounts +'牛币</span></div><span class="inviteBot">'+ newary[i][j].remark +'</span></li>'
                        oPart = '<div class="dataTime">'+ timestamp(newary[i][0].time,'-') +'</div><ul class="inviteRecord">' +  oLi + '</ul>';
                    }
                    html += oPart;
                }
                $('.recordList').html(html);
            }else{
                console.log(datas.message)
            }
        },
        error: function (e) {
            console.log("error")
        }
    })
}

function colsedpop (obj){  //关闭pop
    $(obj).parents('.pop_box').hide()
}
//时间戳转换成  年-月-日
function timestamp(date,separator){
    if(date===""){
        return "--";
    }else{
        var date =new Date(date*1000);
        var Y = date.getFullYear();
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        var D = date.getDate();
        var h=(date.getHours()<10 ? "0"+(date.getHours()) : date.getHours())+':';
        var m=(date.getMinutes()<10 ? "0"+(date.getMinutes()) : date.getMinutes())+':';
        var s=(date.getSeconds()<10 ? "0"+(date.getSeconds()) : date.getSeconds());
        if(D<10){
            D=0+D;
        }
        if(separator == '-'){
            return ( Y+ '-' + M);
        }else if(separator == 'ch'){
            return ( Y+ '年' + M + '月' + D + '日');
        }else{
            return ( Y + M + D);
        }

    }
}

function check_name() {
    var phone = document.getElementById("phone").value;
    if (phone) {
        if (!check_phone(phone)) {
            //showError("请输入正确的手机号！");
            layer.open({
                btn: ['<span class="single">确定</span>'],
                shadeClose: false,
                content: '请输入正确的手机号'
            });
            return false;
        }
    } else {
        //showError("请输入手机号！");
        layer.open({
            btn: ['<span class="single">确定</span>'],
            shadeClose: false,
            content: '请输入手机号'
        });
        document.getElementById("phone").focus(); //手机号input获得焦点
        return false;
    }
    return true;
}

function check_phone_keyup(e){ /*手机号非字符验证*/
    var e = $(this);
    e.val(e.val().replace(/\s|[^\d]/g,''));
}

function check_phone(phone) {  /*手机号码验证*/
    var reg = /^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
    if (!reg.test(phone)) {
        return false;
    }
    return true;
}

function showError(msg) {  //错误提示
    var showDiv = $('.error_timeout')[0], bgDiv = $('.mask')[0];
    var wHeight = $(window).height();
    var showDivHeighr = $(showDiv).height();
    $(showDiv).css('top', (wHeight - showDivHeighr) / 2);
    $(bgDiv).show();
    $(showDiv).html(msg).show();
    window.setTimeout(function(){
        $(bgDiv).hide();
        $(showDiv).hide();
    },1000)
}

//倒计时功能  按钮ID，秒+1，显示文字
function _clocking(id,i){
    var btn = document.getElementById(id);
    btn.setAttribute("onclick","");
    btn.style.backgroundColor="#fff";
    btn.style.borderColor="#999999";
    btn.style.color="#999999";
    document.getElementById("phonetext").innerHTML="";
    _timeSet(id,i);
}
function _timeSet(id,i){
    i--;
    if(i==0){
        document.getElementById("phoneCodeSent").innerHTML="";
        document.getElementById("phonetext").innerHTML="重新获取";
        document.getElementById(id).setAttribute("onclick","getRecode()");
        document.getElementById(id).style.backgroundColor="#fff";
        document.getElementById(id).style.borderColor="#FF5A1C";
        document.getElementById(id).style.color="#FF5A1C";
    }
    else{
        document.getElementById("phoneCodeSent").innerHTML = i+ "s重新获取";
        setTimeout("_timeSet(\""+id+"\","+i+")",1000);
    }
}
function getRecode(){
    if(!check_name()) return;
    var client_id = getUrlParam('_id');
    $.ajax({
        type: "get",
        url : httpApi3 + 'api/v2/security/authorize?response_type=base&client_id='+ client_id,
        dataType: 'json',
        success: function (datas) {
            if(datas.code == 200){
                var data = datas.data;
                console.log(data.auth_code)
                var auth_code = data.auth_code;
                var auth_message = {
                    "mobile": $('#phone').val(),
                    "auth_code":data.auth_code,
                    "type":1
                }
                auth_message = JSON.stringify(auth_message);
                $.ajax({
                    type: "post",
                    url : httpApi3 + 'api/v2/security/sms/send?response_type=base&client_id=' + client_id,
                    dataType: 'json',
                    data: auth_message,
                    success: function (datas) {
                        console.log(datas)
                        if(datas.code == 200){
                            console.log('获取验证码成功')
                            _clocking("getRecode",60);
                        }else if(datas.code == 41015){
                            layer.open({
                                btn: ['<span class="single">确定</span>'],
                                shadeClose: false,
                                content: '手机验证码错误'
                            });
                        }else if(datas.code == 41016){
                            layer.open({
                                btn: ['<span class="single">确定</span>'],
                                shadeClose: false,
                                content: '手机号码已经被绑定'
                            });
                        }else if(datas.code == 41018){
                            layer.open({
                                btn: ['<span class="single">确定</span>'],
                                shadeClose: false,
                                content: '验证码过期'
                            });
                        }else{
                            console.log('获取验证码失败');
                        }
                    },
                    error: function (e) {
                        console.log("error")
                    }
                })

            }else{
                console.log('获取授权码失败')
            }
        },
        error: function (e) {
            console.log("error")
        }
    })
}

function check_phone_keyup(e){ //正则验证手机号输入
    var e = $(e);
    e.val(e.val().replace(/\s|[^\d]/g,''));
}

//		更新下载次数
function downloadCont(source,channel){
    //1:IOS,2android
    $.ajax({
        type:"post",
        url: Http + 'StatisticsLog/addLog ',
        dataType:'json',
        data:'{"Source":'+source+',"Channel":"'+channel+'","Download":1}',
        success:function(datas){
            if(datas.code==200){
                console.log("更新下载次数");
            }else{
                console.log("数据返回错误乱码");
            }
        },
        error:function(e){
            console.log("error")
        }
    });
}

function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

//判断ios系统版本号
function iosEdition(){
    var ver = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    ver = parseInt(ver[1], 10);
    return ver;
}


//分享微信
function shareWeiXin(){
    var shareValue = {
        "title": "牛币分享微信",
        "desc": "牛币分享微信11111111",
        "imageUrl": "http://dev.0606.com.cn:8085/cattleCurrency/images/close.png",
        "url": window.location.href + '&from=share',
        "site": "海纳牛牛",
        "siteUrl": window.location.href + '?from=share',
        "titleUrl": window.location.href + '?from=share',
        "shareType": "all"
    };
    if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
        console.log("ios")
        //ios
        window.webkit.messageHandlers.jsCallNative.postMessage({"nativeCallJS":"shareWeiXin","sharevalue":shareValue});
    }else {
        //android
        var value= JSON.stringify(shareValue);
        window.haina.pushEvent('{"nativecalljs":"shareWeiXin", "sharevalue":'+value+'}');
    }

}
//分享朋友圈
function shareFriends(){
    var shareValue = {
        "title": "牛币分享微信朋友圈",
        "desc": "牛币分享微信朋友圈11111111",
        "imageUrl": "http://dev.0606.com.cn:8085/cattleCurrency/images/close.png",
        "url": window.location.href + '&from=share',
        "site": "海纳牛牛",
        "siteUrl": window.location.href + '?from=share',
        "titleUrl": window.location.href + '?from=share',
        "shareType": "all"
    };
    if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
        console.log("ios")
        //ios
        window.webkit.messageHandlers.jsCallNative.postMessage({"nativeCallJS":"shareFriends","sharevalue":shareValue});
    }else {
        //android
        var value= JSON.stringify(shareValue);
        window.haina.pushEvent('{"nativecalljs":"shareFriends", "sharevalue":'+value+'}');
    }

}
//返回上一级

function backtofinish(){
    if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
        console.log("ios")
        //ios
        window.webkit.messageHandlers.jsCallNative.postMessage({"nativeCallJS":"backtofinish"});
    }else {
        //android
        window.haina.pushEvent('{"nativecalljs":"backtofinish"}');
    }

}





