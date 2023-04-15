// import checkNumberInputs from './checkNumberInputs';

const forms = () => {
	const formes = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		upload = document.querySelectorAll('[name="upload"]');

	// checkNumberInputs('input[name="user_phone"]');

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Мы скоро с вами свяжемся',
		failure: 'Что-то пошло не так...',
		spinner: 'assets/img/spinner.gif',
		ok: 'assets/img/ok.png',
		fail: 'assets/img/fail.png',
	};

	const path = {
		designer: 'assets/server.php',
		question: 'assets/question.php',
	};

	const postData = async (url, data) => {
		let res = await fetch(url, {
			method: 'POST',
			body: data,
		});

		return await res.text();
	};

	const clearInputs = () => {
		inputs.forEach((input) => {
			input.value = '';
		});

		upload.forEach((item) => {
			item.previousElementSibling.textContent = 'Файл не выбран';
		});
	};

	upload.forEach((item) => {
		item.addEventListener('input', () => {
			console.log(item.files[0]);
			let dots;
			const arr = item.files[0].name.split('.');

			arr[0].length > 6 ? (dots = '...') : (dots = '.');
			const name = arr[0].substring(0, 6) + dots + arr[1];
			item.previousElementSibling.textContent = name;
		});
	});

	formes.forEach((form) => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			form.parentNode.appendChild(statusMessage);

			form.classList.add('animated', 'fadeOutUp');
			setTimeout(() => {
				form.style.display = 'none';
			}, 400);

			let statusImg = document.createElement('img');
			statusImg.setAttribute('src', message.spinner);
			statusImg.classList.add('animated', 'fadeInUp');
			statusMessage.appendChild(statusImg);

			let textMessage = document.createElement('div');
			textMessage.textContent = message.loading;
			statusMessage.appendChild(textMessage);

			const formData = new FormData(form);
			let api;

			form.closest('.popup-design') || form.classList.contains('calc_form')
				? (api = path.designer)
				: path.question;

			postData(api, formData)
				.then((res) => {
					statusImg.setAttribute('src', message.ok);
					textMessage.textContent = message.success;
				})
				.catch(() => {
					statusImg.setAttribute('src', message.fail);
					textMessage.textContent = message.failure;
				})
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
						form.style.display = 'block';
						form.classList.remove('fadeOutUp');
						form.classList.add('fadeInUp');
					}, 5000);
				});
		});
	});
};

export default forms;
