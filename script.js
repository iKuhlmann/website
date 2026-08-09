const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector("#site-nav");
if (menuButton && siteNav) {
  const header = menuButton.closest(".site-header");
  const closeMenu = () => {
    header.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  menuButton.addEventListener("click", () => {
    const open = header.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  siteNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
      menuButton.focus();
    }
  });
}


document.querySelector('#year').textContent = new Date().getFullYear();

if (document.querySelector('.page-content .pub-years')) {
  const style = document.createElement('style');
  style.textContent = '.publication-section{padding-top:clamp(2.5rem,4vw,4rem);padding-bottom:clamp(2.5rem,4vw,4rem)}.publication-section .section-number{font-family:var(--serif);font-size:clamp(1.5rem,2.4vw,2.1rem);letter-spacing:-.02em;line-height:1;color:var(--accent)}.publication-section .pub-year{display:block;border-top:0;padding:0}.publication-section .pub-year>h3{display:none}.publication-section .pub-year li{padding-left:0;padding-bottom:1.15rem}.publication-section .pub-year li::before{display:none}.publication-legend{display:flex;flex-wrap:wrap;gap:.45rem;margin:1.5rem 0}.pub-type{display:inline-block;font-family:var(--mono);font-size:.61rem;line-height:1;text-transform:uppercase;letter-spacing:.06em;padding:.42rem .55rem;border-left:3px solid currentColor;background:#ffffff66}.pub-type.journal{color:#8a3f35}.pub-type.conference{color:#28607b}.pub-type.workshop{color:#697b35}.pub-type.dissertation{color:#76528a}.pub-type.handbook{color:#8a6934}.pub-year li>.pub-type{margin-bottom:.55rem}.self-name{font-weight:600}.pub-venue{font-style:italic;color:var(--muted)}';
  document.head.append(style);
  style.textContent += '.pub-year .self-name{font-family:var(--sans);font-size:1em;font-weight:600}';

  const originalSection = document.querySelector('.page-content');
  const publicationYears = [...originalSection.querySelectorAll('.pub-year')];
  publicationYears.forEach((yearBlock, index) => {
    const year = yearBlock.querySelector('h3').textContent;
    const section = document.createElement('section');
    section.className = 'section publication-section' + (index % 2 === 0 ? ' news' : '') + (index === 0 ? ' page-content' : '');
    section.innerHTML = '<p class="section-number">' + year + '</p><div class="pub-years"></div>';
    section.querySelector('.pub-years').append(yearBlock);
    originalSection.before(section);
  });
  originalSection.remove();
}

if (document.querySelector('.thesis-type')) {
  const thesisStyle = document.createElement('style');
  thesisStyle.textContent = '.teaching-section .content-group{margin-bottom:0}.thesis-legend{display:flex;align-items:center;flex-wrap:wrap;gap:.55rem;margin:-1rem 0 2rem;color:var(--muted);font-size:.75rem}.thesis-legend .thesis-type:not(:first-child){margin-left:1rem}.thesis-type{display:inline-block;font-family:var(--mono);font-size:.61rem;line-height:1;text-transform:uppercase;letter-spacing:.06em;padding:.42rem .55rem;border-left:3px solid currentColor;background:#ffffff66;margin-right:.55rem}.thesis-type.master{color:#28607b}.thesis-type.bachelor{color:#8a6934}';
  document.head.append(thesisStyle);
}

if (document.querySelector('.activity-section')) {
  const activityStyle = document.createElement('style');
  activityStyle.textContent = '.activity-section{padding-top:clamp(2.5rem,4vw,4rem);padding-bottom:clamp(2.5rem,4vw,4rem)}.activity-section .content-group{margin-bottom:0}.activity-section .activity-row strong{line-height:1.5}.activity-detail{font-weight:400;color:var(--muted);margin-left:.65rem}';
  document.head.append(activityStyle);
}

document.querySelectorAll('.teaching-section, .activity-section').forEach((section, index) => {
  section.classList.toggle('news', index % 2 === 0);
});

document.querySelectorAll('.pub-year li').forEach(item => {
  const paragraph = item.querySelector('p');
  paragraph.querySelectorAll('u').forEach(name => {
    const emphasizedName = document.createElement('strong');
    emphasizedName.className = 'self-name';
    emphasizedName.textContent = name.textContent;
    name.replaceWith(emphasizedName);
  });
  paragraph.innerHTML = paragraph.innerHTML.replace(/\. (Proceedings of|Joint Proceedings|Journal of|Information Systems|Doctoral dissertation|Online Handbook)([\s\S]*)$/, '. <span class="pub-venue">$1$2</span>');
  const venue = paragraph.querySelector(".pub-venue");
  if (venue) {
    venue.innerHTML = venue.innerHTML.replace(/, (20\d{2})(\.)(?=(?:\s*<em>[\s\S]*<\/em>)?$)/, (_, year, period) => ', <span class="pub-entry-year">' + year + '</span>' + period);
  }
  const text = item.textContent;
  let type = 'conference';
  if (/JAIR|Information Systems/.test(text)) type = 'journal';
  else if (/dissertation/i.test(text)) type = 'dissertation';
  else if (/Handbook/.test(text)) type = 'handbook';
  else if (/Workshop|ArgML|Arg&App|NMR 20|FATIL|ECSQARU Workshops/.test(text)) type = 'workshop';
  const badge = document.createElement('span');
  badge.className = 'pub-type ' + type;
  badge.textContent = type;
  item.prepend(badge);
});
