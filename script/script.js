const user = document.querySelector('.con-user')
  const menu = document.querySelector('.con-menu')
  const contents = document.querySelector('.con-contents')
  const links = document.querySelector('.con-contents .con-links')
  const posts = document.querySelector('.con-contents .con-posts')
  window.addEventListener("load", function(event) {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)

      setTimeout(function () {
      window.scrollTo(0, 1)
      }, 0)
      const h = window.innerHeight - menu.clientHeight - user.clientHeight
      contents.style.height = `${h}px`
      links.style.height = `${h}px`
      posts.style.height = `${h}px`
  })


  function handleClick(evt, name) {
      const items = document.querySelectorAll('.con-menu button')
      const el = evt.target
      items.forEach((item) => {
          item.classList.remove('active')
      })
      el.classList.add('active')
      const elScroll = document.querySelector(`.${name}`)
      contents.scrollTo(elScroll.offsetLeft, 0)
  }

  contents.addEventListener('scroll', (evt) => {
      if (evt.target.scrollLeft > window.innerWidth / 2 && evt.target.scrollLeft < window.innerWidth + (window.innerWidth / 2)) {
          menu.querySelector('button:nth-child(1)').classList.remove('active')
          menu.querySelector('button:nth-child(2)').classList.add('active')
          menu.querySelector('button:nth-child(3)').classList.remove('active')
      } else if (evt.target.scrollLeft < window.innerWidth / 2) {
          menu.querySelector('button:nth-child(1)').classList.add('active')
          menu.querySelector('button:nth-child(2)').classList.remove('active')
          menu.querySelector('button:nth-child(3)').classList.remove('active')
      } else if (evt.target.scrollLeft > window.innerWidth + (window.innerWidth / 2)) {
          menu.querySelector('button:nth-child(2)').classList.remove('active')
          menu.querySelector('button:nth-child(3)').classList.add('active')
      }
  });


  var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function() {
      that.tick();
    }, delta);
  };

  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };
