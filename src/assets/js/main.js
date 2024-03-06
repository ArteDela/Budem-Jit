window.onload = function()
{
	mainObject.init();
}

const mainObject =
{
	init()
	{
		this.aboutUs.initSlider()
		this.projects.initSlider()
		this.interaction.initSlider()
		this.news.initSlider()
	},
	scrollUp()
	{
		window.scrollTo(
		{
			top: 0,
			behavior: "smooth",
		});
	}
}
