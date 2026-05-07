const fetchEventsData = async () => {
    const response = await fetch("http://localhost/api/events");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    let cards = "";
    data.forEach((card) => {
      cards += `<div class="event-card"> 
  <img src="./public/images/events/event.jpg" class="event-img" />

  <div class="event-content">
    <span class="badge">Talk</span>

    <h3 class="title">${card.title}</h3>

    <p class="desc">
      ${card.description}
    </p>

    <div class="meta">
      <div>📅 ${card.start_date}</div>
      <div>📍 ${card.location_type}</div>
    </div>

    <div class="extra">
      <span>👩‍🏫 ${card.instructor_name}</span>
      <span>👥 ${card.capacity} spots</span>
    </div>

    <button class="btn !bg-[#0056b3]">Register</button>
  </div>
</div>`;
    })

    console.log(data);

  document.getElementById("events_container").innerHTML = cards;
}

fetchEventsData();