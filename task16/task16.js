/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
window.onload=function(){
  var apiData = {};
  var oBtn1=document.getElementById("add-btn");
  var oBtn2=document.getElementById("remove-btn");
  var oTab=document.getElementById("aqi-table");
  var oP1=document.getElementById("city");
  var oP2=document.getElementById("api");

  var aTr=oTab.children;

  /**
   * 从用户输入中获取数据，向aqiData中增加一条数据
   * 然后渲染aqi-list列表，增加新增的数据
   */
  function addAqiData() {
    var c=a=true;
    var oCity=document.getElementById("aqi-city-input");
    var oApi=document.getElementById("aqi-value-input");
    var oName=oCity.value.replace(/\s+/g,"");
    var oValue=oApi.value.replace(/\s+/g,"");



    //城市名必须为中英文字符(以下为不符合的情况)
    var re_c=/[^a-zA-Z\u4e00-\u9fa5]/g;
    //空气质量指数必须为整数（一下为不符合的情况）
    var re_a=/^[^1-9]|[^\d*]/g;

    //城市名称不能为空
    if(oCity.value==""){

      oP1.innerHTML='城市名称不能为空';
      oP1.style.color="red";
      c=false;
    }
    //城市格式错误
    else if(re_c.test(oName)){
      oP1.innerHTML='城市名称格式不是中英文字符';
      oP1.style.color="red";
      c=false;
    }else{
      oP1.innerHTML="城市名称输入正确";
      oP1.style.color="green";
    }
    //指数不能为空
    if(oApi.value==""){
      oP2.innerHTML='空气质量指数不能为空';
      oP2.style.color="red";
      a=false;
    }
    //指数格式错误
    else if(re_a.test(oValue)){
      oP2.innerHTML='空气质量指数不是整数';
      oP2.style.color="red";
      a=false;
    }else{
      oP2.innerHTML="空气质量指数输入正确";
      oP2.style.color="green";
    }
    //传入数据
    if(a&&c){
      apiData[oName]=oValue;
      console.log(apiData);

    }
  }



  /**
   * 渲染aqi-table表格
   */
  //数据更新
  function renderAqiList() {
      oTab.innerHTML="<td>城市</td><td>空气质量</td><td>操作</td>";
      if(apiData){
        for(var key in apiData){
          //创建元素
          oTr=document.createElement("tr");
          //将数据添加到表格中
          oTr.innerHTML="<td>"+ key +"</td><td>"+ apiData[key] +"</td><td><button>删除</button></td>";
            oTab.appendChild(oTr);
        }
      }
  }



  /**
   * 点击add-btn时的处理逻辑
   * 获取用户输入，更新数据，并进行页面呈现的更新
   */
  function addBtnHandle() {
    addAqiData();
    renderAqiList();
  }






  /**
   * 点击各个删除按钮的时候的处理逻辑
   * 获取哪个城市数据被删，删除数据，更新表格显示
   */
  function delBtnHandle(ev) {
    // do sth.
    var oEvt = ev || window.event;
    var obj= oEvt.srcElement||oEvt.target;
    if(obj.tagName=='BUTTON'){
      //将要移除的项的json值设为undefined，通过JSON.stringify方法，将json转换为字符串（该过程中会忽略值为undefined的项），再通过JSON.parse将字符串转回json，达到删除数据的效果。
/*    apiData[obj.parentNode.parentNode.children[0].innerHTML]=undefined;
      apiData=JSON.stringify(apiData);
      apiData=JSON.parse(apiData);*/
      delete apiData[obj.parentNode.parentNode.children[0].innerHTML];
      console.log(apiData);
    }
    renderAqiList();
  }





  function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    if(oBtn1.addEventListener){
      oBtn1.addEventListener('click',addBtnHandle,false);

     }else{
      oBtn1.attachEvent('onclick',addBtnHandle);

    }

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    // 利用事件委托，将点击时间委托给父级，再通过oEvt.srcElement判断和冒泡原理实现功能
    oTab.onclick=delBtnHandle;

  }

  init();


}
