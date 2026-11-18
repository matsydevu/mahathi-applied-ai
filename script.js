document.querySelectorAll(".book").forEach(book=>book.addEventListener("click",()=>{
  document.querySelectorAll(".book").forEach(b=>b.classList.remove("selected"));
  book.classList.add("selected");
  const panel=document.querySelector(".book-detail");
  panel.innerHTML=`<span class="detail-label">FROM THE SHELF</span><h3>${book.dataset.title}</h3><p>${book.dataset.copy}</p>`;
}));

// Story library: combine free-text search with mission-area filters.
const storyCards=[...document.querySelectorAll(".story-card")];
const searchInput=document.querySelector("#story-search");
const filterButtons=[...document.querySelectorAll(".story-filter")];
const resultsLabel=document.querySelector(".story-results");
let activeFilter="all";
function filterStories(){
  const query=(searchInput?.value||"").trim().toLowerCase();
  let visible=0;
  storyCards.forEach(card=>{
    const category=(card.querySelector(".story-category")?.textContent||"").toLowerCase();
    const searchable=card.textContent.toLowerCase();
    const categoryMatch=activeFilter==="all" ||
      category.includes(activeFilter) ||
      (activeFilter==="grants" && searchable.includes("grant")) ||
      (activeFilter==="investigations" && searchable.includes("investigat"));
    const textMatch=!query || searchable.includes(query);
    const show=categoryMatch && textMatch;
    card.hidden=!show;
    if(!show) card.open=false;
    if(show) visible++;
  });
  if(resultsLabel) resultsLabel.textContent=`Showing ${visible} of ${storyCards.length} stories`;
}
filterButtons.forEach(button=>button.addEventListener("click",()=>{
  activeFilter=button.dataset.filter||"all";
  filterButtons.forEach(item=>{
    const selected=item===button;
    item.classList.toggle("active",selected);
    item.setAttribute("aria-pressed",String(selected));
  });
  filterStories();
}));
searchInput?.addEventListener("input",filterStories);

// Keep one story open at a time to make long case studies easier to scan.
storyCards.forEach(card=>card.addEventListener("toggle",()=>{
  if(card.open) storyCards.forEach(other=>{if(other!==card) other.open=false;});
}));

// Respect reduced-motion preferences for in-page navigation.
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener("click",()=>{
  const target=document.querySelector(link.getAttribute("href"));
  if(target) target.setAttribute("tabindex","-1");
}));
