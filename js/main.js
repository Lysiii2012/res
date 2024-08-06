var pathEls = document.querySelectorAll('path');
for (var i = 0; i < pathEls.length; i++) {
  var pathEl = pathEls[i];
  var offset = anime.setDashoffset(pathEl);
  pathEl.setAttribute('stroke-dashoffset', offset);
  anime({
    targets: pathEl,
    strokeDashoffset: [offset, 0],
    duration: anime.random(3000, 3000),
    delay: anime.random(0, 5000),
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine',
    autoplay: true
  });
}

let listItems = document.querySelectorAll('ul li');
let images = document.querySelectorAll('.content-link img');
 
images.forEach(img => img.style.display = 'none');
 
if (images.length > 0) {
    images[0].style.display = 'block';
}

listItems.forEach(function(item) {
    item.addEventListener('click', function() {
        let imgIndex = parseInt(item.getAttribute('data-img-index'));
 
        listItems.forEach(function(li) {
            li.classList.remove('active');
        });
 
        item.classList.add('active');
 
        if (imgIndex >= 0 && imgIndex < images.length) {
            images.forEach(function(img) {
                img.style.display = 'none';
            });

            images[imgIndex].style.display = 'block';
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('investmentChart').getContext('2d');

    var investmentChart = new Chart(ctx, {
        type: 'bar',  
        data: {
            labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'],  
            datasets: [
                {
                    label: 'Доход от займов (CNY)',
                    data: [5000, 6000, 7000, 8000, 7500, 8500],  
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',  
                    borderColor: 'rgba(75, 192, 192, 1)',  
                    borderWidth: 1
                },
                {
                    label: 'Проценты по займам (CNY)',
                    data: [1000, 1200, 1500, 1700, 1600, 1800],  
                    backgroundColor: 'rgba(255, 159, 64, 0.6)',  
                    borderColor: 'rgba(255, 159, 64, 1)',  
                    borderWidth: 1
                },
                {
                    label: 'Общие инвестиции (CNY)',
                    data: [8000, 9000, 9500, 10000, 10500, 11000],  
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',  
                    borderColor: 'rgba(153, 102, 255, 1)', 
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Сумма (CNY)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Месяц'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    enabled: true
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
});

document.getElementById('calculate').addEventListener('click', calculate);
document.getElementById('clear').addEventListener('click', clearFields);

function calculate() {
    const yuanToRubRate = 1;  
    
    const initialAmountCNY = parseFloat(document.getElementById('initial_amount').value) || 0;
    const investmentPeriodMonths = parseInt(document.getElementById('investment_period').value, 10) || 0;
    const monthlyContributionCNY = parseFloat(document.getElementById('monthly_contribution').value) || 0;
    const interestRate = parseFloat(document.getElementById('interest_rate').value) || 0;
 
    const initialAmountRUB = initialAmountCNY * yuanToRubRate;
    const monthlyContributionRUB = monthlyContributionCNY * yuanToRubRate;
 
    let totalAmount = initialAmountRUB;
    let totalContributions = initialAmountRUB;
    let totalInterest = 0;

    for (let month = 1; month <= investmentPeriodMonths; month++) {
        const interest = totalAmount * (interestRate / 12); 
        totalInterest += interest;
        totalAmount += interest;
        
        if (monthlyContributionRUB > 0) {
            totalAmount += monthlyContributionRUB;  
            totalContributions += monthlyContributionRUB;
        }
    }
 
    document.getElementById('total_balance').textContent = `${totalAmount.toFixed(2)} ₽`;
    document.getElementById('total_payment').textContent = `${totalContributions.toFixed(2)} ₽`;
    document.getElementById('total_percent').textContent = `${totalInterest.toFixed(2)} ₽`;
}

function clearFields() { 
    document.getElementById('initial_amount').value = '';
    document.getElementById('investment_period').value = '';
    document.getElementById('monthly_contribution').value = '';
    document.getElementById('interest_rate').value = '';
 
    document.getElementById('total_balance').textContent = '0 ₽';
    document.getElementById('total_payment').textContent = '0 ₽';
    document.getElementById('total_percent').textContent = '0 ₽';
}


document.addEventListener("DOMContentLoaded", () => {
    const countersCurrent = document.querySelectorAll('.num-current');
    const countersNums = document.querySelectorAll('.nums');
    const speed = 2000;  

    const animateCount = (counter) => {
        const target = +counter.getAttribute('data-target');
        const increment = target / (speed / 20);

        let count = 0;
        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.textContent = Math.round(count).toLocaleString();
                setTimeout(updateCount, 20);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        updateCount();
    };

    const observeOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);  
            }
        });
    }, observeOptions);
 
    countersCurrent.forEach(counter => {
        observer.observe(counter);
    });
 
    countersNums.forEach(counter => {
        observer.observe(counter);
    });
});

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 20,
    loop:true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        575: {
            slidesPerView: 3,
        }
    }
  });

  const videos = document.querySelectorAll('video');
  let currentVideo = null;
  
  videos.forEach((vid) => {
      vid.addEventListener('click', () => {
          if (vid === currentVideo) { 
              vid.pause();
              currentVideo = null;
          } else { 
              if (currentVideo) {
                  currentVideo.pause();
                  currentVideo.currentTime = 0;  
              } 
              vid.play();
              currentVideo = vid;
          }
      });
  });
  
  const btnForm =  document.querySelectorAll('.form-btn');
  const boxForm = document.querySelector('.pop-up-form');
  const popUpBox = document.querySelector('.pop-up-box');
  const body = document.body;
  const closePop = document.querySelector('.close-pop');

  btnForm.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        boxForm.classList.add('show');
        body.classList.add('show');
    })
  })
  
  function closePopup() { 
    boxForm.classList.remove('show');
    body.classList.remove('show');
}

closePop.addEventListener('click', (e) => {
    e.preventDefault();
    closePopup();
});

document.addEventListener('click', (e) => {
    if (boxForm.classList.contains('show') && !popUpBox.contains(e.target) && !e.target.closest('.form-btn')) {
        closePopup();
    }
});


const navMob = document.querySelector('.nav-list')
const icons = document.querySelectorAll('.icon');
icons.forEach (icon => {  
  icon.addEventListener('click', (event) => {
    icon.classList.toggle("open");
    navMob.classList.toggle('open')
  });
});

const btnCoc = document.querySelector('.btn-ok');
const cocBox = document.querySelector('.cocies-block');

btnCoc.addEventListener('click', (e) => {
    e.preventDefault();
    cocBox.style = 'display: none'
})