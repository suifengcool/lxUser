Number.prototype.toFixed = function(s)  
{   
    var num = this>0 ? 0.5 : -0.5
    return (parseInt(this * Math.pow( 10, s ) + num)/ Math.pow( 10, s )).toString()
}  
export function formatMoney (num) {
	var money =Number(num).toFixed(2);
    if(money == 'NaN') return '0.00';
    var now =  money.replace(/(\d{1,3})(?=(\d{3})+(?:$|\D))/g,'$1,');
    return  now;
}

export function formatMoneyPercent (num) {
  	var money = Number(num).toFixed(2);
    if(money == 'NaN') return '0.00';
    var now =  money.replace(/(\d{1,3})(?=(\d{3})+(?:$|\D))/g,'$1,')+'%';
    return  now;
}

export function formatMoneyPercentABS (num) {
    var money = Math.abs(num).toFixed(2);
    if(money == 'NaN') return '0.00';
    var now =  money.replace(/(\d{1,3})(?=(\d{3})+(?:$|\D))/g,'$1,')+'%';
    return  now;
}

export function formatMoneyOne (money) {
    var money = Number(money).toFixed(0);
    if(money == 'NaN') return '0';
    var now =  money.replace(/(\d{1,3})(?=(\d{3})+(?:$|\D))/g,'$1,');
    return  now;
}

export function formatMoneyPercentOne (money) {
    var money = Number(money).toFixed(0);
    if(money == 'NaN') return '0';
    var now =  money.replace(/(\d{1,3})(?=(\d{3})+(?:$|\D))/g,'$1,')+'%';
    return  now;
}

export function formatMoneyNull (money) {
    var money = Number(money).toFixed(2);
    if(money == 'NaN') return '0.00';
    var now =  (money === '0.00' ? '-' : (money.replace(/(\d{1,3})(?=(\d{3})+(?:$|\D))/g,'$1,')));
    return  now;
}

export function formatDate (str) {
  	if(!str) return '-'
  	return str.replace(/(\d{4})(\d{2})(\d{2})/g,'$1-$2-$3')
}

export function formatDateTime (str) {
    if(!str) return '-'
    return moment(str,["YYYYMMDDhhmmss", "YYYY-MM-DD HH:mm:ss"]).format('YYYY-MM-DD HH:mm:ss')
}
