mainObject.header =
{
	list: document.querySelector('._header__list'),
	body: document.querySelector('body'),
	burger: document.querySelector('._burger'),
	show(instance)
	{
		let list = instance.closest('header').querySelector('._header__list')
		instance.classList.toggle('active')	
		this.body.classList.toggle('active')	
		list.classList.toggle('active')	
	},
	closeEl()
	{
		this.body.classList.remove('active')	
		this.list.classList.remove('active')	
		this.burger.classList.remove('active')	
	}
}