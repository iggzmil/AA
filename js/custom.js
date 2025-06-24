

//AAACITY var
var AAACITY = {};

 (function($){
  "use strict";

/*************************
      Predefined Variables
*************************/
   var $window = $(window),
        $document = $(document);

    //Check if function exists
     $.fn.exists = function () {
        return this.length > 0;
    };

/*************************
        Preloader
*************************/
  AAACITY.preloader = function () {
       $("#loading").fadeOut();
       $('#loading').delay(0).fadeOut('slow');
   };

/*************************
       owl carousel
*************************/
    AAACITY.carousel = function () {
     $(".owl-carousel").each(function () {
        var $this = $(this),
            $items = ($this.data('items')) ? $this.data('items') : 1,
            $loop = ($this.data('loop')) ? $this.data('loop') : true,
            $navdots = ($this.data('nav-dots')) ? $this.data('nav-dots') : false,
            $navarrow = ($this.data('nav-arrow')) ? $this.data('nav-arrow') : false,
            $autoplay = ($this.attr('data-autoplay')) ? $this.data('autoplay') : true,
            $space = ($this.attr('data-space')) ? $this.data('space') : 30;
            
            $(this).owlCarousel({
                loop: $loop,
                items: $items,
                responsive: {
                  0:{items: $this.data('xx-items') ? $this.data('xx-items') : 1},
                  480:{items: $this.data('xs-items') ? $this.data('xs-items') : 2},
                  768:{items: $this.data('sm-items') ? $this.data('sm-items') : 3},
                  980:{items: $this.data('md-items') ? $this.data('md-items') : 4},
                  1200:{items: $items}
                },
                dots: $navdots,
                margin:$space,
                nav: $navarrow,
                navText:["<i class='fa fa-angle-left fa-2x'></i>","<i class='fa fa-angle-right fa-2x'></i>"],
                autoplay: $autoplay,
                autoplayHoverPause: true
            });
    });
    }

/*************************
      Colour Variant
*************************/
  AAACITY.colourvariant = function () {
    $(function () {
      $("#variant-colors img:eq(0)").nextAll().hide();
      $(".car-variant-colors .variant-type-color").click(function (e) {
        var index = $(this).index();
        $(".car-variant-colors .variant-type-color").removeClass('active');
        $(this).addClass('active');
        $("#variant-colors img").eq(index).show().siblings().hide();
      });
    });
  }

/*************************
    Enhanced Smooth Scrolling
*************************/
AAACITY.pniceScroll = function () {
    // Smooth scroll for all anchor links
    $('a[href*="#"]:not([href="#"])').on('click', function(e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 60
            }, {
                duration: 800,
                easing: 'swing'
            });
        }
    });
    
    // Add scroll momentum for better mobile experience
    if ('ontouchstart' in window) {
        document.body.style.webkitOverflowScrolling = 'touch';
    }
    
    // Optimize scroll performance during scroll events
    let scrollTimeout;
    $(window).on('scroll', function() {
        if (!$('body').hasClass('is-scrolling')) {
            $('body').addClass('is-scrolling');
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            $('body').removeClass('is-scrolling');
        }, 150);
    });
}

/*************************
     Original Contact form (Legacy)
*************************/
	function isNotEmpty( element ) {
		return ( ( $(element).val() != $(element).attr("placeholder") ) && ( $(element).val().length > 0 ) );
	}

	AAACITY.contactform = function () {
		// Legacy contact form handler - DISABLED
		// All contact form functionality is now handled by AAACITY.autoAcousticsContactForm
		// This function is kept for compatibility but does nothing
		return;
    }

/*************************
        Toast Notifications
 *************************/
AAACITY.showToast = function (message, type = 'info', duration = 5000) {
    // Create toast container if it doesn't exist
    if (!$('#toast-container').length) {
        $('body').append('<div id="toast-container" style="position: fixed; top: 20px; right: 20px; z-index: 9999;"></div>');
    }
    
    // Define toast types and their styles
    var toastTypes = {
        'success': { icon: 'fa-check-circle', bgColor: '#28a745', textColor: '#fff' },
        'error': { icon: 'fa-exclamation-triangle', bgColor: '#dc3545', textColor: '#fff' },
        'warning': { icon: 'fa-exclamation-circle', bgColor: '#ffc107', textColor: '#212529' },
        'info': { icon: 'fa-info-circle', bgColor: '#17a2b8', textColor: '#fff' }
    };
    
    var toastStyle = toastTypes[type] || toastTypes['info'];
    var toastId = 'toast-' + Date.now();
    
    // Create toast HTML
    var toastHtml = '<div id="' + toastId + '" class="toast-notification" style="' +
        'background-color: ' + toastStyle.bgColor + '; ' +
        'color: ' + toastStyle.textColor + '; ' +
        'padding: 12px 16px; ' +
        'margin-bottom: 10px; ' +
        'border-radius: 4px; ' +
        'box-shadow: 0 4px 12px rgba(0,0,0,0.15); ' +
        'display: flex; ' +
        'align-items: center; ' +
        'min-width: 300px; ' +
        'max-width: 400px; ' +
        'opacity: 0; ' +
        'transform: translateX(100%); ' +
        'transition: all 0.3s ease; ' +
        'cursor: pointer; ' +
        'font-size: 14px; ' +
        'line-height: 1.4;">' +
        '<i class="fa ' + toastStyle.icon + '" style="margin-right: 8px; font-size: 16px;"></i>' +
        '<span style="flex: 1;">' + message + '</span>' +
        '<i class="fa fa-times" style="margin-left: 12px; opacity: 0.7; font-size: 12px;"></i>' +
    '</div>';
    
    // Add toast to container
    $('#toast-container').append(toastHtml);
    var $toast = $('#' + toastId);
    
    // Animate in
    setTimeout(function() {
        $toast.css({
            'opacity': '1',
            'transform': 'translateX(0)'
        });
    }, 50);
    
    // Auto remove after duration
    var autoRemoveTimer = setTimeout(function() {
        AAACITY.removeToast(toastId);
    }, duration);
    
    // Manual remove on click
    $toast.on('click', function() {
        clearTimeout(autoRemoveTimer);
        AAACITY.removeToast(toastId);
    });
};

AAACITY.removeToast = function (toastId) {
    var $toast = $('#' + toastId);
    if ($toast.length) {
        $toast.css({
            'opacity': '0',
            'transform': 'translateX(100%)'
        });
        setTimeout(function() {
            $toast.remove();
        }, 300);
    }
};

/*************************
        Placeholder
 *************************/
  AAACITY.placeholder = function () {
       var $placeholder = $('[placeholder]');
           $placeholder.focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
              input.val('');
              input.removeClass('placeholder');
            }
          }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
              input.addClass('placeholder');
              input.val(input.attr('placeholder'));
            }
          }).blur().parents('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
              var input = $(this);
              if (input.val() == input.attr('placeholder')) {
                input.val('');
              }
          })
      });
  }

/*************************
         Isotope
*************************/
 AAACITY.Isotope = function () {
      var $isotope = $(".isotope"),
          $itemElement = '.grid-item',
          $filters = $('.isotope-filters');
        if ($isotope.exists()) {
            $isotope.isotope({
            resizable: true,
            itemSelector: $itemElement,
              masonry: {
                gutterWidth: 10
              }
            });
       $filters.on( 'click', 'button', function() {
         var $val = $(this).attr('data-filter');
             $isotope.isotope({ filter: $val });
             $filters.find('.active').removeClass('active');
             $(this).addClass('active');
      });
    }
 }

/*************************
      Scroll to Top
*************************/
  AAACITY.scrolltotop = function () {
      var $scrolltop = $('.car-top');

      $scrolltop.on('click', function () {
          $('html,body').animate({
                    scrollTop: 0
             }, 800);
          $(this).addClass("car-run");
          setTimeout(function(){ $scrolltop.removeClass('car-run');},1000);
          return false;
      });
      $window.on('scroll', function () {
          if($window.scrollTop() >= 200) {
              $scrolltop.addClass("show");
              $scrolltop.addClass("car-down");
             } else {
               $scrolltop.removeClass("show");
               setTimeout(function(){ $scrolltop.removeClass('car-down');},300);
            }
       });
  }

/*************************
  Reset Loading States
*************************/
AAACITY.resetLoadingStates = function() {
    console.log('Resetting all loading states');
    
    // Reset cursor for all elements
    $('body, html, *').css('cursor', 'auto');
    
    // Reset form states
    $('#submit').prop('disabled', false);
    $('.btn-loader, .spinner').hide();
    
    // Clear any processing flags
    if (window.contactform_submit_disabled) {
        window.contactform_submit_disabled = false;
    }
    
    // Remove any loading classes
    $('body').removeClass('loading processing submitting');
    
    console.log('Loading states reset complete');
};

// Make reset function globally available
window.resetContactForm = AAACITY.resetLoadingStates;

/*************************
  Auto Acoustics Contact Form Handler
*************************/
AAACITY.autoAcousticsContactForm = function () {
    var $contactForm = $('#contactform');
    
    // Reset any stuck loading states on page load
    $('body').css('cursor', 'auto');
    $('#submit').prop('disabled', false);
    $('.btn-loader').hide();
    
    if ($contactForm.length) {
        
        // Add CSS for validation styling if not already present
        if (!$('#contact-form-validation-styles').length) {
            $('<style id="contact-form-validation-styles">' +
                '.form-control.is-invalid { border-color: #dc3545; box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25); }' +
                '.form-control.is-valid { border-color: #28a745; box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25); }' +
                '.invalid-feedback { display: block; width: 100%; margin-top: 0.25rem; font-size: 0.875em; color: #dc3545; }' +
                '.valid-feedback { display: block; width: 100%; margin-top: 0.25rem; font-size: 0.875em; color: #28a745; }' +
            '</style>').appendTo('head');
        }
        
        // Client-side validation functions
        var validation = {
            clearFieldValidation: function($field) {
                $field.removeClass('is-valid is-invalid');
                $field.siblings('.invalid-feedback, .valid-feedback').remove();
            },
            
            setFieldInvalid: function($field, message) {
                $field.removeClass('is-valid').addClass('is-invalid');
                $field.siblings('.invalid-feedback').remove();
                $field.after('<div class="invalid-feedback">' + message + '</div>');
            },
            
            setFieldValid: function($field) {
                $field.removeClass('is-invalid').addClass('is-valid');
                $field.siblings('.invalid-feedback, .valid-feedback').remove();
            },
            
            validateName: function(name) {
                var errors = [];
                var trimmedName = name.trim();
                
                if (trimmedName === '') {
                    errors.push('Name is required');
                } else {
                    if (trimmedName.length < 2) {
                        errors.push('Name must be at least 2 characters');
                    } else if (trimmedName.length > 60) {
                        errors.push('Name must be no more than 60 characters');
                    }
                    if (!/^[A-Za-z\s\-']+$/.test(trimmedName)) {
                        errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
                    }
                }
                return errors;
            },
            
            validateEmail: function(email) {
                var errors = [];
                var trimmedEmail = email.trim();
                
                if (trimmedEmail === '') {
                    errors.push('Email is required');
                } else {
                    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(trimmedEmail)) {
                        errors.push('Please enter a valid email address');
                    }
                    if (trimmedEmail.length > 254) {
                        errors.push('Email address is too long');
                    }
                }
                return errors;
            },
            
            validatePhone: function(phone) {
                var errors = [];
                var trimmedPhone = phone.trim();
                
                if (trimmedPhone === '') {
                    errors.push('Phone is required');
                } else {
                    var numericPhone = trimmedPhone.replace(/[^0-9]/g, '');
                    if (numericPhone.length < 8) {
                        errors.push('Phone number must be at least 8 digits');
                    } else if (numericPhone.length > 15) {
                        errors.push('Phone number must be no more than 15 digits');
                    }
                }
                return errors;
            },
            
            validateMessage: function(message) {
                var errors = [];
                var trimmedMessage = message.trim();
                
                if (trimmedMessage === '') {
                    errors.push('Message is required');
                } else {
                    if (trimmedMessage.length < 10) {
                        errors.push('Message must be at least 10 characters');
                    } else if (trimmedMessage.length > 2000) {
                        errors.push('Message must be no more than 2000 characters');
                    }
                }
                return errors;
            },
            
            validateForm: function(formData) {
                var allErrors = [];
                var hasErrors = false;
                
                var nameErrors = this.validateName(formData.name);
                var emailErrors = this.validateEmail(formData.email);
                var phoneErrors = this.validatePhone(formData.phone);
                var messageErrors = this.validateMessage(formData.message);
                
                // Handle name validation
                var $nameField = $('#contactform_name');
                if (nameErrors.length > 0) {
                    this.setFieldInvalid($nameField, nameErrors[0]);
                    allErrors = allErrors.concat(nameErrors);
                    hasErrors = true;
                } else {
                    this.setFieldValid($nameField);
                }
                
                // Handle email validation
                var $emailField = $('#contactform_email');
                if (emailErrors.length > 0) {
                    this.setFieldInvalid($emailField, emailErrors[0]);
                    allErrors = allErrors.concat(emailErrors);
                    hasErrors = true;
                } else {
                    this.setFieldValid($emailField);
                }
                
                // Handle phone validation
                var $phoneField = $('#contactform_phone');
                if (phoneErrors.length > 0) {
                    this.setFieldInvalid($phoneField, phoneErrors[0]);
                    allErrors = allErrors.concat(phoneErrors);
                    hasErrors = true;
                } else {
                    this.setFieldValid($phoneField);
                }
                
                // Handle message validation
                var $messageField = $('#contactform_message');
                if (messageErrors.length > 0) {
                    this.setFieldInvalid($messageField, messageErrors[0]);
                    allErrors = allErrors.concat(messageErrors);
                    hasErrors = true;
                } else {
                    this.setFieldValid($messageField);
                }
                
                return {
                    isValid: !hasErrors,
                    errors: allErrors
                };
            }
        };
        
        // Real-time validation on field blur
        $('#contactform_name').on('blur', function() {
            var errors = validation.validateName($(this).val());
            if (errors.length > 0) {
                validation.setFieldInvalid($(this), errors[0]);
            } else {
                validation.setFieldValid($(this));
            }
        });
        
        $('#contactform_email').on('blur', function() {
            var errors = validation.validateEmail($(this).val());
            if (errors.length > 0) {
                validation.setFieldInvalid($(this), errors[0]);
            } else {
                validation.setFieldValid($(this));
            }
        });
        
        $('#contactform_phone').on('blur', function() {
            var errors = validation.validatePhone($(this).val());
            if (errors.length > 0) {
                validation.setFieldInvalid($(this), errors[0]);
            } else {
                validation.setFieldValid($(this));
            }
        });
        
        $('#contactform_message').on('blur', function() {
            var errors = validation.validateMessage($(this).val());
            if (errors.length > 0) {
                validation.setFieldInvalid($(this), errors[0]);
            } else {
                validation.setFieldValid($(this));
            }
        });
        
        // Clear validation when user starts typing
        $contactForm.find('input, textarea').on('input', function() {
            if ($(this).hasClass('is-invalid') || $(this).hasClass('is-valid')) {
                validation.clearFieldValidation($(this));
            }
        });
        
        // Form submission handler
        $contactForm.on('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Contact form submit event triggered');
            
            // Ensure we're not already processing
            var $submitBtn = $('#submit');
            if ($submitBtn.prop('disabled')) {
                console.log('Form submission already in progress, ignoring');
                return false;
            }
            
            var formData = {
                name: $('#contactform_name').val(),
                email: $('#contactform_email').val(),
                phone: $('#contactform_phone').val(),
                message: $('#contactform_message').val()
            };
            
            console.log('Form data collected:', formData);
            
            $('#formmessage').hide().removeClass('success error').text('');
            
            var validationResult = validation.validateForm(formData);
            
            if (!validationResult.isValid) {
                var errorMsg = 'Please correct the following issues:';
                if (validationResult.errors.length > 0) {
                    errorMsg += '<ul>';
                    validationResult.errors.forEach(function(error) {
                        errorMsg += '<li>' + error + '</li>';
                    });
                    errorMsg += '</ul>';
                }
                
                $('#formmessage')
                    .addClass('error')
                    .html('<div class="alert alert-danger">' + errorMsg + '</div>')
                    .show();
                
                var $firstInvalid = $contactForm.find('.is-invalid').first();
                if ($firstInvalid.length) {
                    $('html, body').animate({
                        scrollTop: $firstInvalid.offset().top - 100
                    }, 500);
                    $firstInvalid.focus();
                }
                
                return false;
            }
            
            var $submitBtn = $('#submit');
            var $spinner = $submitBtn.find('.btn-loader');
            
            $submitBtn.prop('disabled', true);
            $spinner.show();
            
            $.ajax({
                url: 'script/email/aa-contact-form-handler.php',
                type: 'POST',
                dataType: 'json',
                data: formData,
                timeout: 30000, // 30 second timeout
                success: function(response) {
                    console.log('Contact form response:', response);
                    
                    if (response.success) {
                        $contactForm.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
                        $contactForm.find('.invalid-feedback, .valid-feedback').remove();
                        
                        $('#formmessage')
                            .removeClass('error').addClass('success')
                            .html('<div class="alert alert-success">' + response.message + '</div>')
                            .show();
                        
                        $contactForm[0].reset();
                        
                        $('html, body').animate({
                            scrollTop: $('#formmessage').offset().top - 100
                        }, 500);
                        
                    } else {
                        var errorMsg = response.message;
                        if (response.errors && response.errors.length > 0) {
                            errorMsg += '<ul>';
                            response.errors.forEach(function(error) {
                                errorMsg += '<li>' + error + '</li>';
                            });
                            errorMsg += '</ul>';
                        }
                        
                        $('#formmessage')
                            .removeClass('success').addClass('error')
                            .html('<div class="alert alert-danger">' + errorMsg + '</div>')
                            .show();
                    }
                },
                error: function(xhr, status, error) {
                    console.log('Contact form error:', {xhr: xhr, status: status, error: error});
                    
                    var errorMessage = 'Sorry, there was a problem sending your message. Please try again later.';
                    
                    if (status === 'timeout') {
                        errorMessage = 'The request timed out. Please check your internet connection and try again.';
                    } else if (status === 'parsererror') {
                        errorMessage = 'There was an error processing the server response. Please try again.';
                    } else if (xhr.status === 404) {
                        errorMessage = 'Contact form handler not found. Please contact us directly.';
                    } else if (xhr.status === 500) {
                        errorMessage = 'Server error occurred. Please try again later or contact us directly.';
                    }
                    
                    $('#formmessage')
                        .removeClass('success').addClass('error')
                        .html('<div class="alert alert-danger">' + errorMessage + '</div>')
                        .show();
                },
                complete: function() {
                    console.log('AJAX request completed, resetting form state');
                    $submitBtn.prop('disabled', false);
                    $spinner.hide();
                    
                    // Ensure cursor is reset
                    $('body').css('cursor', 'auto');
                    $contactForm.css('cursor', 'auto');
                    
                    // Scroll to message if visible
                    if ($('#formmessage').is(':visible')) {
                        $('html, body').animate({
                            scrollTop: $('#formmessage').offset().top - 100
                        }, 500);
                    }
                }
            });
        });
    }
};

/*************************
       Global Chatbot
*************************/
AAACITY.globalChatbot = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const shouldOpenChat = urlParams.get('openChat') === 'true' || urlParams.get('chat') === 'open';

    if (shouldOpenChat) {
        setTimeout(function() {
            if (window.autoAcousticsChat && typeof window.autoAcousticsChat.toggle === 'function') {
                window.autoAcousticsChat.toggle();
            }
        }, 1000);
    }
};

/*************************
     Gallery Zoom & Overlay
*************************/
AAACITY.galleryZoom = function () {
    // Optimized Configuration
    const CONFIG = {
        selectors: {
            gallery: '.car-listing-sidebar',
            isotope: '.isotope',
            gridItem: '.grid-item',
            carImage: '.car-image',
            carImg: '.car-image img'
        },
        classes: {
            zoomOverlay: 'zoom-overlay',
            zoomClose: 'zoom-close',
            dateOverlay: 'date',
            initialized: 'gallery-initialized'
        },
        timing: {
            checkInterval: 100,
            maxChecks: 50,
            initDelay: 500
        },
        styles: {
            overlay: 'position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.9);z-index:9999;display:none;justify-content:center;align-items:center;cursor:zoom-out',
            overlayImg: 'max-width:90%;max-height:90%;object-fit:contain;border:5px solid #fff;box-shadow:0 0 20px rgba(0,0,0,0.5)',
            closeBtn: 'position:absolute;top:20px;right:20px;color:#fff;font-size:30px;cursor:pointer;z-index:10000;background-color:rgba(0,0,0,0.5);width:40px;height:40px;border-radius:50%;display:flex;justify-content:center;align-items:center;transition:background-color 0.3s ease',
            dateContainer: 'position:absolute;left:20px;top:20px;z-index:5;transition:all 0.3s ease;opacity:1;transform:translateY(0);pointer-events:none',
            dateSpan: 'padding:8px 16px;background:#db2d2e;line-height:18px;color:#ffffff;font-weight:600;display:block;text-align:center;text-transform:uppercase;border-radius:3px;box-shadow:0 2px 10px rgba(0,0,0,0.2)'
        }
    };

    // State management
    let isInitialized = false;
    let overlay = null;
    let overlayImg = null;
    let closeBtn = null;

    /**
     * Create the zoom overlay elements
     */
    function createOverlay() {
        if (overlay) return;

        // Create main overlay
        overlay = document.createElement('div');
        overlay.className = CONFIG.classes.zoomOverlay;
        overlay.style.cssText = CONFIG.styles.overlay;

        // Create image element
        overlayImg = document.createElement('img');
        overlayImg.style.cssText = CONFIG.styles.overlayImg;

        // Create close button
        closeBtn = document.createElement('div');
        closeBtn.className = CONFIG.classes.zoomClose;
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = CONFIG.styles.closeBtn;

        // Assemble overlay
        overlay.appendChild(overlayImg);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);

        // Add event listeners
        overlay.addEventListener('click', closeZoom);
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeZoom();
        });

        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.style.display === 'flex') {
                closeZoom();
            }
        });

        // Hover effect for close button
        closeBtn.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(219, 45, 46, 0.8)';
        });
        closeBtn.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        });
    }

    /**
     * Show zoom overlay with image
     */
    function showZoom(imgSrc, imgAlt) {
        if (!overlay || !overlayImg) return;

        overlayImg.src = imgSrc;
        overlayImg.alt = imgAlt || 'Auto Acoustics Installation';
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close zoom overlay
     */
    function closeZoom() {
        if (!overlay) return;
        
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    /**
     * Add date overlay to image if it doesn't exist
     */
    function addDateOverlay(carImage) {
        if (carImage.querySelector('.' + CONFIG.classes.dateOverlay)) {
            return; // Already has overlay
        }

        const dateDiv = document.createElement('div');
        dateDiv.className = CONFIG.classes.dateOverlay;
        dateDiv.style.cssText = CONFIG.styles.dateContainer;

        const span = document.createElement('span');
        span.textContent = 'Auto Acoustics';
        span.style.cssText = CONFIG.styles.dateSpan;

        dateDiv.appendChild(span);
        carImage.appendChild(dateDiv);
    }

    /**
     * Initialize gallery functionality for a single image
     */
    function initializeGalleryImage(carImage, index) {
        const img = carImage.querySelector('img');
        if (!img) return;

        // Add zoom cursor and click handler
        carImage.style.cursor = 'zoom-in';
        carImage.addEventListener('click', function(e) {
            e.preventDefault();
            showZoom(img.src, img.alt);
        });

        // Add date overlay if not present
        addDateOverlay(carImage);
        
        // Mark as initialized
        carImage.classList.add(CONFIG.classes.initialized);
    }

    /**
     * Initialize all gallery images
     */
    function initializeAllImages() {
        const carImages = document.querySelectorAll(CONFIG.selectors.carImage);
        
        carImages.forEach((carImage, index) => {
            if (!carImage.classList.contains(CONFIG.classes.initialized)) {
                initializeGalleryImage(carImage, index);
            }
        });
    }

    /**
     * Check if Isotope is ready and initialized
     */
    function isIsotopeReady() {
        const isotopeElement = document.querySelector(CONFIG.selectors.isotope);
        if (!isotopeElement) return false;
        
        // Check if images are loaded and positioned
        const gridItems = isotopeElement.querySelectorAll(CONFIG.selectors.gridItem);
        if (gridItems.length === 0) return false;
        
        // Check if items have been positioned by Isotope (non-zero width/height)
        const firstItem = gridItems[0];
        const rect = firstItem.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
    }

    /**
     * Initialize gallery functionality
     */
    function initializeGallery() {
        if (isInitialized) return;
        
        createOverlay();
        initializeAllImages();
        isInitialized = true;
        
        // Mark gallery as initialized
        const gallery = document.querySelector(CONFIG.selectors.gallery);
        if (gallery) {
            gallery.classList.add(CONFIG.classes.initialized);
        }
    }

    /**
     * Wait for Isotope to initialize, then setup gallery
     */
    function waitForIsotopeAndInitialize() {
        let checkCount = 0;
        
        function checkAndInit() {
            checkCount++;
            
            if (isIsotopeReady()) {
                // Wait a bit more for Isotope to settle
                setTimeout(initializeGallery, CONFIG.timing.initDelay);
            } else if (checkCount < CONFIG.timing.maxChecks) {
                setTimeout(checkAndInit, CONFIG.timing.checkInterval);
            } else {
                // Fallback: initialize anyway
                initializeGallery();
            }
        }
        
        checkAndInit();
    }

    /**
     * DOM ready initialization
     */
    function onDOMReady() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', waitForIsotopeAndInitialize);
        } else {
            waitForIsotopeAndInitialize();
        }
    }

    /**
     * Window load initialization (fallback)
     */
    function onWindowLoad() {
        if (!isInitialized) {
            setTimeout(initializeGallery, 100);
        }
    }

    // Initialize on DOM ready
    onDOMReady();
    
    // Fallback initialization on window load
    if (document.readyState === 'loading') {
        window.addEventListener('load', onWindowLoad);
    } else {
        setTimeout(onWindowLoad, 100);
    }
};

/****************************************************
     AAACITY Window load and functions
****************************************************/

//Window load functions
$window.on("load",function(){
    AAACITY.preloader();
    AAACITY.Isotope();
    AAACITY.resetLoadingStates(); // Reset any stuck loading states
});

//Document ready functions  
$document.ready(function () {
    // Reset any stuck loading states immediately
    AAACITY.resetLoadingStates();
    
    AAACITY.carousel();
    AAACITY.colourvariant();
    AAACITY.pniceScroll();
    AAACITY.contactform();
    AAACITY.placeholder();
    AAACITY.scrolltotop();
    AAACITY.autoAcousticsContactForm();
    AAACITY.globalChatbot();
    AAACITY.galleryZoom();
});

})(jQuery);
