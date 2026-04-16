// ─── Mobile hamburger nav ───────────────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', function() {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', function() {
    navLinks.classList.remove('open');
  });
});

// ─── Language selector ──────────────────────────────────────────────────────
const langBtn  = document.getElementById('lang-btn');
const langMenu = document.getElementById('lang-menu');

langBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  langMenu.classList.toggle('open');
});

document.addEventListener('click', function() {
  langMenu.classList.remove('open');
});

langMenu.addEventListener('click', function(e) {
  e.stopPropagation();
  const btn = e.target.closest('.lang-option');
  if (!btn) return;
  setLanguage(btn.dataset.lang);
  langMenu.classList.remove('open');
});

// Load saved language on page start
(function() {
  try {
    const saved = localStorage.getItem('velira-lang');
    if (saved && typeof translations !== 'undefined' && translations[saved]) {
      setLanguage(saved);
    }
  } catch(e) {}
})();

// ─── Form submit handlers with honeypot check ───────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const honeypot = e.target.querySelector('input[name="website"]');
  if (honeypot && honeypot.value) return; // bot detected — silent reject
  const btn = e.target.querySelector('button');
  const input = e.target.querySelector('input[type="email"]');
  btn.textContent = 'Subscribed ✓';
  btn.style.background = '#2a5240';
  input.value = '';
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
  }, 3000);
}

function handleWhatsApp(e) {
  e.preventDefault();
  const honeypot = e.target.querySelector('input[name="website"]');
  if (honeypot && honeypot.value) return; // bot detected — silent reject
  const btn = e.target.querySelector('button');
  const hiddenCode = e.target.querySelector('.nl-country-value');
  const input = e.target.querySelector('input[type="tel"]');
  btn.textContent = 'Joined ✓';
  btn.style.background = '#2a5240';
  if (input) input.value = '';
  setTimeout(() => {
    btn.textContent = 'Join on WhatsApp';
    btn.style.background = '';
  }, 3000);
}

// ─── Country code combobox ───────────────────────────────────────────────────
const COUNTRIES = [
  { name: 'Afghanistan',           flag: '🇦🇫', code: '+93'   },
  { name: 'Albania',               flag: '🇦🇱', code: '+355'  },
  { name: 'Algeria',               flag: '🇩🇿', code: '+213'  },
  { name: 'Andorra',               flag: '🇦🇩', code: '+376'  },
  { name: 'Angola',                flag: '🇦🇴', code: '+244'  },
  { name: 'Argentina',             flag: '🇦🇷', code: '+54'   },
  { name: 'Armenia',               flag: '🇦🇲', code: '+374'  },
  { name: 'Australia',             flag: '🇦🇺', code: '+61'   },
  { name: 'Austria',               flag: '🇦🇹', code: '+43'   },
  { name: 'Azerbaijan',            flag: '🇦🇿', code: '+994'  },
  { name: 'Bahrain',               flag: '🇧🇭', code: '+973'  },
  { name: 'Bangladesh',            flag: '🇧🇩', code: '+880'  },
  { name: 'Belarus',               flag: '🇧🇾', code: '+375'  },
  { name: 'Belgium',               flag: '🇧🇪', code: '+32'   },
  { name: 'Bolivia',               flag: '🇧🇴', code: '+591'  },
  { name: 'Bosnia & Herzegovina',  flag: '🇧🇦', code: '+387'  },
  { name: 'Brazil',                flag: '🇧🇷', code: '+55'   },
  { name: 'Bulgaria',              flag: '🇧🇬', code: '+359'  },
  { name: 'Cambodia',              flag: '🇰🇭', code: '+855'  },
  { name: 'Cameroon',              flag: '🇨🇲', code: '+237'  },
  { name: 'Canada',                flag: '🇨🇦', code: '+1'    },
  { name: 'Chile',                 flag: '🇨🇱', code: '+56'   },
  { name: 'China',                 flag: '🇨🇳', code: '+86'   },
  { name: 'Colombia',              flag: '🇨🇴', code: '+57'   },
  { name: 'Costa Rica',            flag: '🇨🇷', code: '+506'  },
  { name: 'Croatia',               flag: '🇭🇷', code: '+385'  },
  { name: 'Cuba',                  flag: '🇨🇺', code: '+53'   },
  { name: 'Cyprus',                flag: '🇨🇾', code: '+357'  },
  { name: 'Czech Republic',        flag: '🇨🇿', code: '+420'  },
  { name: 'Denmark',               flag: '🇩🇰', code: '+45'   },
  { name: 'Dominican Republic',    flag: '🇩🇴', code: '+1809' },
  { name: 'Ecuador',               flag: '🇪🇨', code: '+593'  },
  { name: 'Egypt',                 flag: '🇪🇬', code: '+20'   },
  { name: 'Estonia',               flag: '🇪🇪', code: '+372'  },
  { name: 'Ethiopia',              flag: '🇪🇹', code: '+251'  },
  { name: 'Finland',               flag: '🇫🇮', code: '+358'  },
  { name: 'France',                flag: '🇫🇷', code: '+33'   },
  { name: 'Georgia',               flag: '🇬🇪', code: '+995'  },
  { name: 'Germany',               flag: '🇩🇪', code: '+49'   },
  { name: 'Ghana',                 flag: '🇬🇭', code: '+233'  },
  { name: 'Greece',                flag: '🇬🇷', code: '+30'   },
  { name: 'Guatemala',             flag: '🇬🇹', code: '+502'  },
  { name: 'Honduras',              flag: '🇭🇳', code: '+504'  },
  { name: 'Hong Kong',             flag: '🇭🇰', code: '+852'  },
  { name: 'Hungary',               flag: '🇭🇺', code: '+36'   },
  { name: 'Iceland',               flag: '🇮🇸', code: '+354'  },
  { name: 'India',                 flag: '🇮🇳', code: '+91'   },
  { name: 'Indonesia',             flag: '🇮🇩', code: '+62'   },
  { name: 'Iran',                  flag: '🇮🇷', code: '+98'   },
  { name: 'Iraq',                  flag: '🇮🇶', code: '+964'  },
  { name: 'Ireland',               flag: '🇮🇪', code: '+353'  },
  { name: 'Israel',                flag: '🇮🇱', code: '+972'  },
  { name: 'Italy',                 flag: '🇮🇹', code: '+39'   },
  { name: 'Jamaica',               flag: '🇯🇲', code: '+1876' },
  { name: 'Japan',                 flag: '🇯🇵', code: '+81'   },
  { name: 'Jordan',                flag: '🇯🇴', code: '+962'  },
  { name: 'Kazakhstan',            flag: '🇰🇿', code: '+7'    },
  { name: 'Kenya',                 flag: '🇰🇪', code: '+254'  },
  { name: 'Kuwait',                flag: '🇰🇼', code: '+965'  },
  { name: 'Latvia',                flag: '🇱🇻', code: '+371'  },
  { name: 'Lebanon',               flag: '🇱🇧', code: '+961'  },
  { name: 'Libya',                 flag: '🇱🇾', code: '+218'  },
  { name: 'Lithuania',             flag: '🇱🇹', code: '+370'  },
  { name: 'Luxembourg',            flag: '🇱🇺', code: '+352'  },
  { name: 'Malaysia',              flag: '🇲🇾', code: '+60'   },
  { name: 'Maldives',              flag: '🇲🇻', code: '+960'  },
  { name: 'Malta',                 flag: '🇲🇹', code: '+356'  },
  { name: 'Mexico',                flag: '🇲🇽', code: '+52'   },
  { name: 'Moldova',               flag: '🇲🇩', code: '+373'  },
  { name: 'Monaco',                flag: '🇲🇨', code: '+377'  },
  { name: 'Morocco',               flag: '🇲🇦', code: '+212'  },
  { name: 'Mozambique',            flag: '🇲🇿', code: '+258'  },
  { name: 'Myanmar',               flag: '🇲🇲', code: '+95'   },
  { name: 'Nepal',                 flag: '🇳🇵', code: '+977'  },
  { name: 'Netherlands',           flag: '🇳🇱', code: '+31'   },
  { name: 'New Zealand',           flag: '🇳🇿', code: '+64'   },
  { name: 'Nicaragua',             flag: '🇳🇮', code: '+505'  },
  { name: 'Nigeria',               flag: '🇳🇬', code: '+234'  },
  { name: 'Norway',                flag: '🇳🇴', code: '+47'   },
  { name: 'Oman',                  flag: '🇴🇲', code: '+968'  },
  { name: 'Pakistan',              flag: '🇵🇰', code: '+92'   },
  { name: 'Panama',                flag: '🇵🇦', code: '+507'  },
  { name: 'Paraguay',              flag: '🇵🇾', code: '+595'  },
  { name: 'Peru',                  flag: '🇵🇪', code: '+51'   },
  { name: 'Philippines',           flag: '🇵🇭', code: '+63'   },
  { name: 'Poland',                flag: '🇵🇱', code: '+48'   },
  { name: 'Portugal',              flag: '🇵🇹', code: '+351'  },
  { name: 'Qatar',                 flag: '🇶🇦', code: '+974'  },
  { name: 'Romania',               flag: '🇷🇴', code: '+40'   },
  { name: 'Russia',                flag: '🇷🇺', code: '+7'    },
  { name: 'Saudi Arabia',          flag: '🇸🇦', code: '+966'  },
  { name: 'Senegal',               flag: '🇸🇳', code: '+221'  },
  { name: 'Serbia',                flag: '🇷🇸', code: '+381'  },
  { name: 'Singapore',             flag: '🇸🇬', code: '+65'   },
  { name: 'Slovakia',              flag: '🇸🇰', code: '+421'  },
  { name: 'Slovenia',              flag: '🇸🇮', code: '+386'  },
  { name: 'South Africa',          flag: '🇿🇦', code: '+27'   },
  { name: 'South Korea',           flag: '🇰🇷', code: '+82'   },
  { name: 'Spain',                 flag: '🇪🇸', code: '+34'   },
  { name: 'Sri Lanka',             flag: '🇱🇰', code: '+94'   },
  { name: 'Sudan',                 flag: '🇸🇩', code: '+249'  },
  { name: 'Sweden',                flag: '🇸🇪', code: '+46'   },
  { name: 'Switzerland',           flag: '🇨🇭', code: '+41'   },
  { name: 'Syria',                 flag: '🇸🇾', code: '+963'  },
  { name: 'Taiwan',                flag: '🇹🇼', code: '+886'  },
  { name: 'Tanzania',              flag: '🇹🇿', code: '+255'  },
  { name: 'Thailand',              flag: '🇹🇭', code: '+66'   },
  { name: 'Tunisia',               flag: '🇹🇳', code: '+216'  },
  { name: 'Turkey',                flag: '🇹🇷', code: '+90'   },
  { name: 'Uganda',                flag: '🇺🇬', code: '+256'  },
  { name: 'Ukraine',               flag: '🇺🇦', code: '+380'  },
  { name: 'United Arab Emirates',  flag: '🇦🇪', code: '+971'  },
  { name: 'United Kingdom',        flag: '🇬🇧', code: '+44'   },
  { name: 'United States',         flag: '🇺🇸', code: '+1'    },
  { name: 'Uruguay',               flag: '🇺🇾', code: '+598'  },
  { name: 'Uzbekistan',            flag: '🇺🇿', code: '+998'  },
  { name: 'Venezuela',             flag: '🇻🇪', code: '+58'   },
  { name: 'Vietnam',               flag: '🇻🇳', code: '+84'   },
  { name: 'Yemen',                 flag: '🇾🇪', code: '+967'  },
  { name: 'Zimbabwe',              flag: '🇿🇼', code: '+263'  },
];

// ─── Country combobox — global functions called via inline onclick ───────────
function toggleCountryDropdown(e) {
  e.stopPropagation();
  var cb = document.getElementById('nl-country-combobox');
  if (cb.classList.contains('open')) {
    closeCountryDropdown();
  } else {
    openCountryDropdown();
  }
}

function openCountryDropdown() {
  var cb     = document.getElementById('nl-country-combobox');
  var search = document.getElementById('nl-country-search');
  cb.classList.add('open');
  filterCountries('');
  if (search) { search.value = ''; search.focus(); }
}

function closeCountryDropdown() {
  var cb = document.getElementById('nl-country-combobox');
  if (cb) cb.classList.remove('open');
}

function filterCountries(q) {
  var list   = document.getElementById('nl-country-list');
  var hidden = document.getElementById('nl-country-value');
  if (!list) return;
  var query = (q || '').toLowerCase();
  list.innerHTML = '';
  COUNTRIES
    .filter(function(c) { return !query || c.name.toLowerCase().indexOf(query) !== -1 || c.code.indexOf(query) !== -1; })
    .forEach(function(c) {
      var li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.textContent = c.flag + ' ' + c.name + '  ' + c.code;
      if (hidden && hidden.value === c.code) li.classList.add('selected');
      li.addEventListener('click', function(e) {
        e.stopPropagation();
        selectCountry(c);
      });
      list.appendChild(li);
    });
}

function selectCountry(country) {
  var trigger = document.getElementById('nl-country-trigger');
  var hidden  = document.getElementById('nl-country-value');
  if (trigger) trigger.textContent = country.flag + ' ' + country.code;
  if (hidden)  hidden.value = country.code;
  closeCountryDropdown();
}

// Close on outside click or ESC
document.addEventListener('click', function() { closeCountryDropdown(); });
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeCountryDropdown(); });

// ─── Scroll animations ──────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.pillars, .resources, .newsletter, .notes').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});
