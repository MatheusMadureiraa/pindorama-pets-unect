
document.addEventListener('DOMContentLoaded', function () {
	const slidesContainer = document.querySelector('.carousel-slides');
	const slides = Array.from(document.querySelectorAll('.carousel-slide'));
	const prevBtn = document.querySelector('.carousel-control.prev');
	const nextBtn = document.querySelector('.carousel-control.next');
	const indicators = Array.from(document.querySelectorAll('.indicator'));
	let current = 0;
	const total = slides.length;

	function goTo(index) {
		current = (index + total) % total;
		slides.forEach((s, i) => {
			const isActive = i === current;
			s.classList.toggle('active', isActive);
		});
		indicators.forEach((ind, i) => {
			const selected = i === current;
			ind.classList.toggle('active', selected);
			ind.setAttribute('aria-selected', selected ? 'true' : 'false');
			ind.setAttribute('tabindex', selected ? '0' : '-1');
		});

		const content = slideContents[current] || { title: '', ctaText: 'Saiba mais', ctaHref: '#contato', show: false };
		const overlaySubtitle = overlay.querySelector('.carousel-overlay-subtitle');
		if (content.show) {
			overlayTitle.textContent = content.title;
			if (overlayCta) {
				overlayCta.textContent = content.ctaText;
				overlayCta.setAttribute('href', content.ctaHref);
				overlayCta.style.display = '';
				overlayCta.setAttribute('aria-hidden', 'false');
			}
			// subtitle (opcional)
			if (overlaySubtitle) {
				overlaySubtitle.textContent = content.subtitle || '';
				overlaySubtitle.style.display = content.subtitle ? '' : 'none';
			}
			overlay.style.display = '';
			overlay.setAttribute('aria-hidden', 'false');
		} else {
			overlay.style.display = 'none';
			overlay.setAttribute('aria-hidden', 'true');
			if (overlaySubtitle) overlaySubtitle.style.display = 'none';
			if (overlayCta) {
				overlayCta.style.display = 'none';
				overlayCta.setAttribute('aria-hidden', 'true');
			}
		}

		overlay.setAttribute('data-slide', String(current));

		if (overlayCta) {
			if (current === 1) {
				overlayCta.style.position = 'absolute';
				overlayCta.style.left = '21.5%';
				overlayCta.style.top = '55%';
				overlayCta.style.transform = 'translate(-50%, -0%)';
				// traz para frente
				overlayCta.style.zIndex = '14';
			} else {
				overlayCta.style.left = '';
				overlayCta.style.top = '';
				overlayCta.style.transform = '';
				overlayCta.style.position = '';
				overlayCta.style.zIndex = '';
			}
		}
	}

	function next() { goTo(current + 1); }
	function prev() { goTo(current - 1); }

	prevBtn.addEventListener('click', prev);
	nextBtn.addEventListener('click', next);

	indicators.forEach(ind => {
		ind.addEventListener('click', () => {
			const idx = parseInt(ind.getAttribute('data-index'), 10);
			goTo(idx);
		});
	});

	const carousel = document.querySelector('.carousel-container');
	const overlay = document.querySelector('.carousel-overlay');
	const overlayTitle = overlay.querySelector('.carousel-overlay-title');
	const overlayCta = document.querySelector('.carousel-cta-floating');
	const slideContents = [
		{
			subtitle: 'Nos dias 19 a 28 de novembro',
			title: 'Campanha de vacinação',
			ctaText: 'Saiba mais',
			ctaHref: '#contato',
			show: true
		},
		{
			title: 'Campanha de adoção',
			subtitle: 'Dê um lar cheio de amor a quem só quer te fazer feliz!\nAdote um amigo de quatro patas e transforme sua\nvida e a dele',
			ctaText: 'Saiba mais',
			ctaHref: '#servicos',
			show: true
		},
		{
			title: 'Banho e tosa: cuidado e saúde para seu pet',
			subtitle: 'Nossa clínica dispõe do serviço de higiene para seu Pet \npermanecer limpo, cheiroso e longe de parasitas\n.',
			ctaText: 'Saiba mais',
			ctaHref: '#contato',
			show: true
		}
	];


	carousel.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
	});

	const menuToggle = document.getElementById('menu-toggle');
	const navMenu = document.querySelector('.nav-menu');
	const navLinks = Array.from(document.querySelectorAll('.nav-list a'));

	if (menuToggle && navMenu) {
		menuToggle.addEventListener('click', (e) => {
			e.stopPropagation();
			navMenu.classList.toggle('open');
		});

		navLinks.forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));
		document.addEventListener('click', (ev) => {
			if (!navMenu.contains(ev.target) && !menuToggle.contains(ev.target)) {
				navMenu.classList.remove('open');
			}
		});
	}

	goTo(0);
});


//teste 