// ==UserScript==
// @name     Ebay Price is Right quiz
// @version  1
// @grant    none
// ==/UserScript==

/**
 * Ebay Price is Right quiz - Greasemonkey script, tested in Firefox
 *
 * Installation (Firefox)
 * ----------------------
 * - Install Greasemonkey plugin (https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
 * - Install this script into Greasemonkey, to run on the domain `ebay.co.uk`
 *
 * How it works
 * ------------
 * - The script checks if the current URL is part of the quiz
 * - If it is, the script injects some CSS
 * - The CSS simplifies the UI and hides the selling price
 * - The script then creates a panel in which players' guesses can be entered
 * - Once all the guesses are in a button can be pressed to reveal the answer & the winner
 * - The panel also provides navigation for the next (and previous) question
 *
 * How to run the quiz
 * -------------------
 * - Open the first link to start the quiz:
 *   https://www.ebay.co.uk/itm/Fabulous-Vintage-Christmas-Ornament-nylon-face-lot-of-4-Angel-Gnome-Santa-/264559622370?hash=item3d98fb78e2%3Ag%3ACqoAAOSwihtd4svs&LH_ItemCondition=4&nma=true&si=8LbPGEUJeG6IYX66F5Lz9jDjf4M%253D&orig_cvip=true&nordt=true&rt=nc&_trksid=p2047675.l2557
 * - Players guess how much the item sold for (in GBP)
 * - Enter their guesses in the panel, then click the `Reveal Price` button
 * - The closest guess will be highlighted and the price revealed
 * - Click the right arrow to continue to the next round (there are 12)
 *
 * Make your own quiz!
 * -------------------
 * Just replace the links below with your own grotesque ebay finds!
 */
function initEbayQuiz(){

   const items = [
      "https://www.ebay.co.uk/itm/Fabulous-Vintage-Christmas-Ornament-nylon-face-lot-of-4-Angel-Gnome-Santa-/264559622370?hash=item3d98fb78e2%3Ag%3ACqoAAOSwihtd4svs&LH_ItemCondition=4&nma=true&si=8LbPGEUJeG6IYX66F5Lz9jDjf4M%253D&orig_cvip=true&nordt=true&rt=nc&_trksid=p2047675.l2557",
      "https://www.ebay.co.uk/itm/Vintage-Pinecone-Elf-Santa-Gnome-Dwarfs-Christmas-Lights-w-Box-Italy-Set-of-10-/224201172520?hash=item34336e6628%3Ag%3A8ToAAOSwc2dfjiBC&LH_ItemCondition=4&nma=true&si=8LbPGEUJeG6IYX66F5Lz9jDjf4M%253D&orig_cvip=true&nordt=true&rt=nc&_trksid=p2047675.l2557",
      "https://www.ebay.co.uk/itm/Vtg-Western-Germany-Cardboard-Candy-Container-Fuzzy-Nodder-Santa-Gnome-amp-Lantern-/333430134607?hash=item4da1fc174f%3Ag%3AS18AAOSwawZbUQaD&LH_ItemCondition=4&nma=true&si=8LbPGEUJeG6IYX66F5Lz9jDjf4M%253D&orig_cvip=true&nordt=true&rt=nc&_trksid=p2047675.l2557",
      "https://www.ebay.co.uk/itm/Vintage-Wood-Christmas-Doll-Elf-Gnome-Santa-Tomte-Sweden-Figure-/114487848031?hash=item1aa801ec5f%3Ag%3AsvEAAOSwoJBfmgvh&LH_ItemCondition=4&nma=true&si=8LbPGEUJeG6IYX66F5Lz9jDjf4M%253D&orig_cvip=true&nordt=true&rt=nc&_trksid=p2047675.l2557",
      "https://www.ebay.co.uk/itm/VINTAGE-SPUN-COTTON-SANTA-GNOME-ELF-WESTERN-GERMANY-MINT-/154021485478?hash=item23dc655ba6%3Ag%3AEdgAAOSwx3RfHZN9&LH_ItemCondition=4&nma=true&si=8LbPGEUJeG6IYX66F5Lz9jDjf4M%253D&orig_cvip=true&nordt=true&rt=nc&_trksid=p2047675.l2557",
      "https://www.ebay.co.uk/itm/Tanglewood-Forest-Marci-Wolfe-Brumble-Santa-Claus-Mrs-Claus-Gnome-Figures-Dolls-/324331698759?hash=item4b83acfa47%3Ag%3Aj-IAAOSwa1xfhPIb&LH_ItemCondition=4&nma=true&si=8LbPGEUJeG6IYX66F5Lz9jDjf4M%253D&orig_cvip=true&nordt=true&rt=nc&_trksid=p2047675.l2557",
      "https://www.ebay.co.uk/itm/Vintage-Well-Worn-Plush-Creepy-Rubber-Face-Santa-Claus-Christmas-Decor-22-Prop-/233708629296?hash=item366a1ead30%3Ag%3AxHEAAOSw2dlfWCVd&nma=true&si=8LbPGEUJeG6IYX66F5Lz9jDjf4M%253D&orig_cvip=true&nordt=true&rt=nc&_trksid=p2047675.l2557",
      "https://www.ebay.co.uk/itm/27-Mid-Century-Creepy-Santa-Claus-Doll-1950-039-s-Vintage-Christmas-Decoration-/114320524401?hash=item1a9e08c471%3Ag%3AbOgAAOSwqktdN8mm&nma=true&si=8LbPGEUJeG6IYX66F5Lz9jDjf4M%253D&orig_cvip=true&nordt=true&rt=nc&_trksid=p2047675.l2557",
      "https://www.ebay.co.uk/itm/Vintage-Antique-Father-Christmas-Mask-40s-50s-Creepy-Santa-/133524027824?hash=item1f16a6f9b0%3Ag%3AoP8AAOSwrF1fZlFG&nma=true&si=8LbPGEUJeG6IYX66F5Lz9jDjf4M%253D&orig_cvip=true&nordt=true&rt=nc&_trksid=p2047675.l2557",
      "https://www.ebay.co.uk/itm/BEAUTIFUL-12-antique-poured-wax-Jesus-baby-French-mid-19th-century-creche-doll-/143758808311?hash=item2178b154f7%3Ag%3AZ%7EsAAOSwv11fcNv7&nma=true&si=8LbPGEUJeG6IYX66F5Lz9jDjf4M%253D&orig_cvip=true&nordt=true&rt=nc&_trksid=p2047675.l2557",
      "https://www.ebay.co.uk/itm/Kneeling-Santa-Praying-Santa-24-in-Statue-Adoring-Baby-Jesus-Indestructible-Poly-/402442125420?hash=item5db36b806c%3Ag%3A-pcAAOSwIulfZAum&nma=true&si=8LbPGEUJeG6IYX66F5Lz9jDjf4M%253D&orig_cvip=true&nordt=true&rt=nc&_trksid=p2047675.l2557",
      "https://www.ebay.co.uk/itm/Vintage-Baby-Jesus-Nativity-Figurine-Italy-2-034-l-b-sb-/372973770258?hash=item56d6f81612%3Ag%3AxTUAAOSwhaZeVu%7EB&nma=true&si=8LbPGEUJeG6IYX66F5Lz9jDjf4M%253D&orig_cvip=true&nordt=true&rt=nc&_trksid=p2047675.l2557"
   ];

   // Get URL of next location
   let nextLocation,
      previousLocation,
      currentItem,
      pageIndicator,
      locationFound = false;

   for(let i = 0; i < items.length; i++){
      if( items[i] == window.location) {
         currentItem = items[i];
         nextLocation = items[i+1];
         previousLocation = items[i-1];
         locationFound = true;
         pageIndicator = `${i+1} / ${items.length}`;
         break;
      }
   }
   if (!locationFound) return; // Page is not part of the quiz

   // Blur prices
   const blurPriceStyles = document.createElement( 'style' );
   document.body.appendChild(blurPriceStyles);
   blurPriceStyles.innerHTML = `
/* Hide header bars */
#gh-top,
#gh-gb {
   display: none;
}

/* Blur selling prices */
.mainPrice,
.val.vi-price,
.discountPrice {
   filter: blur(100px);
   transform: rotate(720deg);
}

/* Unblur selling prices ~~on hover~~ */
/*
.lbl-value-set:hover .mainPrice,
.lbl-value-set:hover .val.vi-price,
.lbl-value-set:hover .mainPrice + .discountPrice,
.mainPrice:hover,
.val.vi-price:hover,
.mainPrice:hover + .discountPrice
*/

.lbl-value-set.revealPrice .mainPrice,
.lbl-value-set.revealPrice .val.vi-price,
.lbl-value-set.revealPrice .mainPrice + .discountPrice {
   transform-origin: 20% center;
   transform: rotate(0);
   transition: all 2s ease-out;
   filter: blur(0);
}

/* Hide right panel */
#RightSummaryPanel,
#merch_html_100011,
.mfe-card.first.last {
   display: none;
}

/* Make page narrower */
#Body {
   width: 60vw !important;
}

/* Widen summary panel */
#LeftSummaryPanel {
   padding-left: 20px;
   margin-right: 0;
}

/* Make title bigger */
#itemTitle {
   font-size: 30px;
}

/* Style calculation panel */
#calculationPanel {
   background-color: #ddd;
   border-radius: 5%;
   font-family: monospace;
   right: 2vw;
   padding: 1em;
   position: fixed;
   bottom: 5vh;
   width: 150px;
}
   `;

   // Create answers panel
   const panel = document.createElement('div'),
      btnNext = document.createElement('button'),
      btnPrevious = document.createElement('button');

   // Generate input fields HTML
   let count = 5, guessFields = "";
   while(count--) guessFields += `<input type="text" style="max-width: 100%; margin-bottom: 0.4em; border: none;" class="guess" /><br />`;

   // Generate panel HTML
   panel.setAttribute('id','calculationPanel');
   panel.innerHTML = `
<form id="calculateWinner">
   ${guessFields}
   <button id="findWinner" style="width: 100%; margin-bottom: 0.4em">Reveal price</button>
   <input type="hidden" style="max-width: 100%; margin-bottom: 0.4em" id="targetPrice" />
</form>
   ${pageIndicator}`;
   document.body.appendChild(panel);

   // Populate targetPrice field with price from page
   const priceEl = document.querySelector("#convbidPrice,#convbinPrice,#prcIsum_bidPrice");

   if (priceEl) {
      const regex = /£([\d.]*)/,
         match = regex.exec(priceEl.innerHTML),
         sellingPrice = match[1];

      if (sellingPrice) {
         document.getElementById('targetPrice').value = sellingPrice;
      } else {
         // Show target price field if no price found
         document.getElementById('targetPrice').setAttribute('type','text');
      }
   } else {
      // Show target price field if no price found
      document.getElementById('targetPrice').setAttribute('type','text');
   }

   // Prevent accidental form submission by enter key
   const form = document.getElementById("calculateWinner");
   form.addEventListener('keydown',(e)=>{if(e.key === "Enter") e.preventDefault()});

   // Add script to calculate winning guess
   document.getElementById('findWinner').addEventListener("click",(ev)=>{
      ev.preventDefault();
      const targetPrice = parseFloat( document.getElementById("targetPrice").value ),
         inputs = document.querySelectorAll(".guess");
      let smallestDiff = 99999999;

      console.log( targetPrice, smallestDiff, inputs.length );

      // Calcuale smallest guess
      for(let i = 0; i < inputs.length; i++){
         inputs[i].style.outline = "none";
         const diff = Math.abs( parseFloat( inputs[i].value ) - targetPrice );
         if( diff < smallestDiff ) smallestDiff = diff;

      }

      // Highlight smallest guess fields
      for(let i = 0; i < inputs.length; i++){
         const diff = Math.abs( parseFloat( inputs[i].value ) - targetPrice );
         if( smallestDiff === diff ){
            inputs[i].style.outline = "3px solid green";
         }
      }

      // Reveal price
      const priceEl = document.querySelector(".lbl-value-set");
      if (priceEl) priceEl.classList.add("revealPrice");

   })

   if( nextLocation ){
      btnNext.innerText = "❱";
      btnNext.style.float = "right";
      panel.appendChild(btnNext);
      btnNext.addEventListener("click",()=>{window.location = nextLocation})
   }
}

window.addEventListener( 'DOMContentLoaded', initEbayQuiz );