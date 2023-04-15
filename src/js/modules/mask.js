const mask = (selector) => {
	let setCursosPosition = (pos, element) => {
		element.focus();

		if (element.setSelectionRange) {
			element.setSelectionRange(pos, pos);
		} else if (element.createTextRange) {
			let range = element.createTextRange();

			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	};

	function createMask(event) {
		let matrix = '+7 (___) ___ __ __',
			i = 0,
			def = matrix.replace(/\D/g, ''),
			value = this.value.replace(/\D/g, '');

		if (def.length >= value.length) {
			value = def;
		}

		this.value = matrix.replace(/./g, function (symb) {
			return /[_\d]/.test(symb) && i < value.length
				? value.charAt(i++)
				: i >= value.length
				? ''
				: symb;
		});

		if (event.type === 'blur') {
			if (this.value.length == 2) {
				this.value = '';
			}
		} else {
			setCursosPosition(this.value.length, this);
		}
	}

	let inputs = document.querySelectorAll(selector);

	inputs.forEach((input) => {
		input.addEventListener('input', createMask);
		input.addEventListener('focus', createMask);
		input.addEventListener('blur', createMask);
	});
};

export default mask;
