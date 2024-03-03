mainObject.news =
{
	initSlider()
	{
		const swiper = new Swiper('._news__slider', {
			slidesPerView: 1,
			spaceBetween: 40,
			pagination:
			{
				el: '.swiper-pagination',
			},
			breakpoints:
			{
				900:
				{
					slidesPerView: 2,
				},
			}
			
		});
	}
}