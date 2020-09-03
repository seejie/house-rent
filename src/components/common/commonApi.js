function getRequest() {
  var url = window.location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {

      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);

    }
  }
  return theRequest;
}


function formatNumber(num) {
  var decimalPart = '';
  num = num.toString();
  if (num.indexOf('.') != -1) {
    decimalPart = '.' + num.split('.')[1];
    num = parseInt(num.split('.')[0]);
  }
  var array = num.toString().split('');
  var index = -3;
  while (array.length + index > 0) {
    array.splice(index, 0, ',');
    index -= 4;
  }
  return array.join('') + decimalPart;
}

function init() {
  // var language = getRequest().language;
  // var language = 'Mandarin';
  // localStorage.setItem("lang", language);
  // this.$i18n.locale = language;
  // console.log(language);
};
export default {
  getRequest,
  formatNumber,
  init
}
