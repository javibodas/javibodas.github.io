document.querySelectorAll('header .navigation-button').forEach((navigationButton) => {
        navigationButton.addEventListener('click', function(event) {
            event.preventDefault()
            
            const buttonMenuClicked = event.target
            const activeMenu = document.querySelector('header button.active')

            const idMenudClicked = buttonMenuClicked.id
            const idCurrentActiveMenu = activeMenu.id

            const currentActiveMenu = document.querySelector('.' + idCurrentActiveMenu)
            const menuForActivating = document.querySelector('.' + idMenudClicked)

            currentActiveMenu.classList.add('hidden')
            menuForActivating.classList.remove('hidden')

            activeMenu.classList.remove('active')
            buttonMenuClicked.classList.add('active')

            console.log('Executed change of menu')
        })
    })
