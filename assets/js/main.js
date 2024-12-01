/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

})(jQuery);

// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const openModalButtons = document.querySelectorAll('.open-modal');
    const iframe = document.getElementById('sitePreview');
    const deviceButtons = document.querySelectorAll('.device');
    const deviceFrame = document.getElementById('device-frame');

    // Ensure the modal is hidden initially
    modal.style.display = 'none';

    openModalButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            const projectUrl = getProjectUrl(this.dataset.project);
            iframe.src = projectUrl;
            modal.style.display = 'flex'; // Show the modal
            // Set the default device size to "phone"
            setDeviceSize('phone');
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none'; // Hide the modal
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none'; // Hide the modal
        }
    });

    deviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const size = this.dataset.size;
            setDeviceSize(size);
        });
    });

    function getProjectUrl(project) {
        // Map project names to their URLs
        const projectUrls = {
            'guitar-lessons': 'https://georgecaponguitarlessons.com/index.html',
            'sports-mind-mastered': 'https://joeeeeca.github.io/New-version/',
            'health-education': 'https://joeeeeca.github.io/delete/'
        };
        return projectUrls[project] || '';
    }

    function setDeviceSize(device) {
        // Remove all device size classes from deviceFrame
        deviceFrame.classList.remove('phone', 'tablet', 'desktop');
        
        // Add the selected device class
        deviceFrame.classList.add(device);
        
        // Ensure the device frame is visible
        deviceFrame.style.display = 'flex';

        // Update button states
        deviceButtons.forEach(button => {
            button.classList.remove('active'); // Remove active class from all buttons
        });
        // Add active class to the selected button
        const activeButton = Array.from(deviceButtons).find(button => button.dataset.size === device);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }
});

document.getElementById('sitePreview').onload = function() {
    const iframe = document.getElementById('sitePreview');
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    if (iframeDocument) {
        // Ensure the content remains scrollable inside the iframe
        iframeDocument.body.style.overflowY = 'scroll';
        iframeDocument.documentElement.style.overflowY = 'scroll';
        
        // Optional: Ensure that the content takes the full height
        iframeDocument.body.style.height = '100%';
        iframeDocument.documentElement.style.height = '100%';
    }
};
