document.querySelectorAll(".book").forEach(book=>book.addEventListener("click",()=>{document.querySelectorAll(".book").forEach(b=>b.classList.remove("selected"));book.classList.add("selected");const panel=document.querySelector(".book-detail");panel.innerHTML=`<span class="detail-label">FROM THE SHELF</span><h3>${book.dataset.title}</h3><p>${book.dataset.copy}</p>`;}));

// Keep the customer story library focused: one expanded story at a time.
document.querySelectorAll(".story-card").forEach(card=>card.addEventListener("toggle",()=>{
  if(card.open) document.querySelectorAll(".story-card[open]").forEach(other=>{if(other!==card) other.open=false;});
}));

// Respect reduced-motion preferences for in-page navigation.
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener("click",()=>{
  const target=document.querySelector(link.getAttribute("href"));
  if(target) target.setAttribute("tabindex","-1");
}));
