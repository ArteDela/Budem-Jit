mainObject.aboutUs =
{
	initSlider()
	{
		const swiper = new Swiper('._about-us', {
			slidesPerView: 2,
			spaceBetween: 45,
			pagination:
			{
				el: '.swiper-pagination',
			},
			navigation:
			{
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints:
			{
				808:
				{
					slidesPerView: 3,
				},
				320:
				{
					slidesPerView: 1,
				},
			}
		});
	}
}