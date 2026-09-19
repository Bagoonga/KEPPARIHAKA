// Kaikki tallin kepparit ovat tässä yhdessä listassa.
const kepparit = [
  { nimi: "Tulikärpänen", rotu: "lipizzanhevonen", sukupuoli: "ruuna", ika: 6, kuva: "kuvat/tulikarpanen.jpg" },
  { nimi: "Esteri", rotu: "suomenhevonen", sukupuoli: "tamma", ika: 5, kuva: "kuvat/esteri.jpg" },
  { nimi: "Luumu", rotu: "islanninhevonen", sukupuoli: "tamma", ika: 11, kuva: "kuvat/luumu.jpg" },
  { nimi: "Batman", rotu: "islanninhevonen", sukupuoli: "ori", ika: 2, kuva: "kuvat/batman.jpg" },
  { nimi: "Keijo", rotu: "islanninhevonen", sukupuoli: "ori", ika: 8, kuva: "kuvat/keijo.jpg" },
  { nimi: "Ròse", rotu: "quarterhevonen", sukupuoli: "tamma", ika: 4, kuva: "kuvat/rose.jpg" },
  { nimi: "Korppi", rotu: "friisiläishevonen", sukupuoli: "ori", ika: 7, kuva: "kuvat/korppi.jpg" },
  { nimi: "Sylvi", rotu: "welshponi", sukupuoli: "tamma", ika: 7, kuva: "kuvat/sylvi.jpg" }
];

const galleria = document.querySelector("#kepparit");
const tiedot = document.querySelector("#tiedot");
const tietoKuva = document.querySelector("#tieto-kuva");
const tietoNimi = document.querySelector("#tieto-nimi");
const tietoRotu = document.querySelector("#tieto-rotu");
const tietoSukupuoli = document.querySelector("#tieto-sukupuoli");
const tietoIka = document.querySelector("#tieto-ika");
const sulje = document.querySelector("#sulje");

const valikkoNappi = document.querySelector("#valikko-nappi");
const paavalikko = document.querySelector("#paavalikko");
const nakymat = document.querySelectorAll(".nakyma");
const valikkoPainikkeet = document.querySelectorAll("[data-nakyma]");

// Tehdään etusivun kepparikortit.
kepparit.forEach((keppari) => {
  const kortti = document.createElement("button");
  kortti.className = "keppari-kortti";
  kortti.type = "button";
  kortti.innerHTML = `
    <img src="${keppari.kuva}" alt="${keppari.nimi}">
    <strong>${keppari.nimi}</strong>
  `;
  kortti.addEventListener("click", () => naytaTiedot(keppari));
  galleria.appendChild(kortti);
});

function naytaTiedot(keppari) {
  tietoKuva.src = keppari.kuva;
  tietoKuva.alt = keppari.nimi;
  tietoNimi.textContent = keppari.nimi;
  tietoRotu.textContent = keppari.rotu;
  tietoSukupuoli.textContent = keppari.sukupuoli;
  tietoIka.textContent = `${keppari.ika} vuotta`;
  tiedot.classList.remove("piilossa");
  tiedot.scrollIntoView({ behavior: "smooth", block: "center" });
}

sulje.addEventListener("click", () => tiedot.classList.add("piilossa"));

// Hampurilaisvalikko auki ja kiinni.
valikkoNappi.addEventListener("click", () => {
  const avautuu = paavalikko.classList.contains("piilossa");
  paavalikko.classList.toggle("piilossa");
  valikkoNappi.setAttribute("aria-expanded", String(avautuu));
});

// Valikosta vaihdetaan näkyviin vain valittu osa.
valikkoPainikkeet.forEach((painike) => {
  painike.addEventListener("click", () => {
    const kohde = painike.dataset.nakyma;

    nakymat.forEach((nakyma) => {
      nakyma.classList.toggle("piilossa", nakyma.id !== kohde);
    });

    paavalikko.classList.add("piilossa");
    valikkoNappi.setAttribute("aria-expanded", "false");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Klikkaus valikon ulkopuolelle sulkee valikon.
document.addEventListener("click", (tapahtuma) => {
  if (!paavalikko.contains(tapahtuma.target) && !valikkoNappi.contains(tapahtuma.target)) {
    paavalikko.classList.add("piilossa");
    valikkoNappi.setAttribute("aria-expanded", "false");
  }
});
