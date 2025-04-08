document.addEventListener('DOMContentLoaded', function() {
    // Live updates simulation
    const updatesData = [
      {
        title: "Platform Changes",
        content: "Mumbai Express now departing from Platform 3 instead of 5",
        icon: "bi-signpost-split"
      },
      {
        title: "Facility Alert",
        content: "Northside restrooms temporarily closed for maintenance",
        icon: "bi-exclamation-triangle"
      },
      {
        title: "New Service",
        content: "Food court now open near Platform 1",
        icon: "bi-cup-hot"
      }
    ];
  
    const updatesContainer = document.getElementById('liveUpdates');
    
    updatesData.forEach(update => {
      const updateCol = document.createElement('div');
      updateCol.className = 'col-md-4 mb-4';
      updateCol.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <i class="bi ${update.icon} fs-3 text-primary me-3"></i>
              <h5 class="card-title mb-0">${update.title}</h5>
            </div>
            <p class="card-text">${update.content}</p>
            <small class="text-muted">Updated just now</small>
          </div>
        </div>
      `;
      updatesContainer.appendChild(updateCol);
    });
  
    // Animate elements on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.service-card, .station-features li');
      elements.forEach(el => {
        const elementPosition = el.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    };
  
    // Set initial state
    document.querySelectorAll('.service-card, .station-features li').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
  
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
  });