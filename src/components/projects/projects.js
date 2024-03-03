mainObject.projects =
{
	initSlider()
	{
		const swiper = new Swiper('._projects__slider', {
			slidesPerView: 1,
			autoHeight: true,
			spaceBetween: 15,
			pagination:
			{
				el: '.swiper-pagination',
			},
			navigation:
			{
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}
}