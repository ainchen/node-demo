const time = (value, format) => {
	format = format || 'YYYY-MM-DD HH:mm:ss';
	if (typeof format !== 'string') {
		return value;
	}
	let f = format;
	const r = /yyyy|YYYY|MM|dd|DD|hh|HH|mm|ss|SS/g;
	const d = value ? new Date(value) : new Date();
	let temp;
	while (temp = r.exec(format)) {
		switch (temp[0]) {
			case 'yyyy':
			case 'YYYY':
				f = f.replace(/yyyy|YYYY/, d.getFullYear());
				break;
			case 'MM':
				f = f.replace(/MM/, d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1);
				break;
			case 'dd':
			case 'DD':
				f = f.replace(/dd|DD/, d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
				break;
			case 'hh':
				f = f.replace(/hh/, d.getHours() < 10 ? 'A0' + d.getHours()
					: (d.getHours() < 12 ? 'A' + d.getHours() : 'P' + (d.getHours() - 12)));
				break;
			case 'HH':
				f = f.replace(/HH/, d.getHours() < 10 ? '0' + d.getHours() : d.getHours());
				break;
			case 'mm':
				f = f.replace(/mm/, d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
				break;
			case 'ss':
			case 'SS':
				f = f.replace(/ss|SS/, d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
				break;
		}
	}
	return f;
}

module.exports = time;