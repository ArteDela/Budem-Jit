mainObject.interaction =
{
	initSlider()
	{
		const swiper = new Swiper('._interaction__slider', {
			// slidesPerView: 2,
			spaceBetween: 45,
			pagination:
			{
				el: '.swiper-pagination',
			},
			breakpoints:
			{
				808:
				{
					slidesPerView: 3,
				},
				520:
				{
					slidesPerView: 2,
				},
				320:
				{
					slidesPerView: 1,
				},
			}
		});
	}
}