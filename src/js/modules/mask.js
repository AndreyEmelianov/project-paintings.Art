const mask = (selector) => {
	function createMask(event) {
		let matrix = '+7 (___) ___ __ __',
			i = 0,
			def = matrix.replace(/\D/g, ''),
			value = this.value.replace(/\D/g, '');

		if (def.length >= value.length) {
			val = def;
		}

		this.value = matrix.replace(/./g, function (symb) {
			return /[_\d]/.test(symb) && i < value.length
				? value.charAt(i++)
				: i >= value.length
				? ''
				: symb;
		});

		
	}
};

export default mask;
