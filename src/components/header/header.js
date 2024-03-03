mainObject.header =
{
	show(instance)
	{
		let list = instance.closest('header').querySelector('._header__list')
		let body = document.querySelector('body')
		instance.classList.toggle('active')	
		body.classList.toggle('active')	
		list.classList.toggle('active')	
	}
}