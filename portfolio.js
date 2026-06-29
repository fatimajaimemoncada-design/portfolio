// ------------ Custom cursor ------------
(function(){
  const dot = document.getElementById('cursorDot');
  if (!dot) return;
  let x = window.innerWidth/2, y = window.innerHeight/2;
  let tx = x, ty = y;
  window.addEventListener('mousemove', (e)=>{ tx = e.clientX; ty = e.clientY; });
  window.addEventListener('mouseout', (e)=>{ if (!e.relatedTarget) dot.style.opacity = '0'; });
  window.addEventListener('mouseover', ()=>{ dot.style.opacity = '1'; });
  window.addEventListener('mousedown', ()=>dot.classList.add('click'));
  window.addEventListener('mouseup',   ()=>dot.classList.remove('click'));
  function frame(){
    x += (tx - x) * 0.28;
    y += (ty - y) * 0.28;
    dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%,-50%)`;
    requestAnimationFrame(frame);
  }
  frame();
  // hover grow on interactive elements
  const hoverSel = 'a, button, .tile, input, select, textarea, [role=button]';
  document.addEventListener('mouseover', e=>{
    if (e.target.closest && e.target.closest(hoverSel)) dot.classList.add('hover');
  });
  document.addEventListener('mouseout', e=>{
    if (e.target.closest && e.target.closest(hoverSel)) dot.classList.remove('hover');
  });
})();

// ------------ Placeholder SVG generator ------------
// A subtle diagonal-striped placeholder. Monospace label tells Fati what to drop in.
function placeholder({label, tone = 'warm', accent = false}){
  // tone = warm | cool | neutral — slight hue shifts w/in near-white range
  const bases = {
    warm:   ['#f5f2ee', '#ebe6df'],
    cool:   ['#eef1f4', '#e4e9ee'],
    neutral:['#f2f2f2', '#e6e6e6'],
    dark:   ['#141414', '#1e1e1e'],
  };
  const [bg1, bg2] = bases[tone] || bases.neutral;
  const fg = tone === 'dark' ? '#eaeaea' : '#9a9a9a';
  const id = 'p' + Math.random().toString(36).slice(2, 8);
  return `
  <svg class="ph" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="${id}" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)">
        <rect width="14" height="14" fill="${bg1}"/>
        <line x1="0" y1="0" x2="0" y2="14" stroke="${bg2}" stroke-width="6"/>
      </pattern>
    </defs>
    <rect width="400" height="300" fill="url(#${id})"/>
    <text x="20" y="280" font-family="JetBrains Mono, monospace" font-size="11" fill="${fg}" letter-spacing="1">[${label}]</text>
  </svg>`;
}

// ------------ Data for branches ------------
const data = {
  editorial: [
    {
      title: 'Catálogo AIS',
      year: '2024',
      subtitle: 'Price rate catalog',
      description: 'Price-rate catalog for AIS Plumbing and Air-Conditioning Services.',
      cover: 'assets/editorial/ais/cover.jpg',
      images: [
        'assets/editorial/ais/cover.jpg',
        'assets/editorial/ais/interior-1.jpg',
        'assets/editorial/ais/interior-2.jpg',
        'assets/editorial/ais/interior-3.jpg',
      ],
    },
    {
      title: 'Revista Rubik',
      year: '2026',
      subtitle: '7-page feature insert · February 2026',
      description: 'A 7-page feature insert for the February 2026 issue of Rubik magazine — elevating ISII Group\'s brand presence within Spain\'s audiovisual industry, plus the back cover for the 2026 Berlin Film Festival.',
      cover: 'assets/editorial/rubik/cover.jpg',
      images: [
        'assets/editorial/rubik/cover.jpg',
        'assets/editorial/rubik/interior-2.jpg',
        'assets/editorial/rubik/interior-3.jpg',
      ],
    },
    {
      title: 'Revela Magazine',
      year: '2025',
      subtitle: 'Analog photography magazine',
      description: 'Internal layout, cover, and back-cover design for an analog photography magazine — produced as part of an Editorial Design Workshop.',
      cover: 'assets/editorial/revela/cover.jpg',
      images: [
        'assets/editorial/revela/cover.jpg',
        'assets/editorial/revela/cover-alt.jpg',
        'assets/editorial/revela/interior-1.jpg',
        'assets/editorial/revela/interior-2.jpg',
        'assets/editorial/revela/interior-3.jpg',
        'assets/editorial/revela/interior-4.jpg',
        'assets/editorial/revela/interior-5.jpg',
      ],
    },
    {
      title: 'ISII Group Brochure',
      year: '2025',
      subtitle: 'Tri-fold · Málaga Film Festival',
      description: 'Tri-fold brochure promoting the ISII audiovisual group at the Málaga Film Festival.',
      cover: 'assets/editorial/isii/cover.jpg',
      images: [
        'assets/editorial/isii/cover.jpg',
      ],
    },
    {
      title: 'Drifting Through Carabanchel',
      year: '2024',
      subtitle: 'Editorial · Paco Pinton fashion',
      description: 'Editorial layout for a fashion photoshoot featuring the Spanish clothing and textile brand Paco Pinton.',
      cover: 'assets/editorial/carabanchel/cover.jpg',
      images: [
        'assets/editorial/carabanchel/cover.jpg',
        'assets/editorial/carabanchel/interior-1.jpg',
        'assets/editorial/carabanchel/interior-2.jpg',
      ],
    },
  ],
  social: [
    {
      title: 'Veluto',
      year: '2025',
      subtitle: 'Social media · Skincare brand',
      description: 'Social media content design for a skincare brand — post system and campaign visuals.',
      cover: 'assets/social/veluto-cover.jpg',
      images: [
        'assets/social/veluto-cover.jpg',
        'assets/social/veluto-1.jpg',
        'assets/social/veluto-2.jpg',
      ],
    },
    {
      title: 'Crosscountry Adventure',
      year: '2025',
      subtitle: 'Social media · American shoe brand',
      description: 'Social media and content design for Crosscountry Adventure, an American footwear brand.',
      cover: 'assets/social/crosscountry-cover.jpg',
      images: [
        'assets/social/crosscountry-cover.jpg',
        'assets/social/crosscountry-1.jpg',
        'assets/social/crosscountry-2.jpg',
      ],
    },
    {
      title: 'llaollao',
      year: '2024',
      subtitle: 'Social · Fidelity club campaign',
      description: 'Social media and content design for a fidelity club campaign for llaollao.',
      cover: 'assets/social/llaollao-cover.jpg',
      images: [
        'assets/social/llaollao-cover.jpg',
        'assets/social/llaollao-1.jpg',
      ],
    },
    {
      title: 'ASISA',
      year: '2024',
      subtitle: 'Social templates · Insurance',
      description: 'Social media templates designed for ASISA, a Spanish insurance company.',
      cover: 'assets/social/asisa-cover.jpg',
      images: [
        'assets/social/asisa-cover.jpg',
        'assets/social/asisa-1.jpg',
        'assets/social/asisa-2.jpg',
      ],
    },
    {
      title: 'Others',
      year: '2023—2025',
      subtitle: 'Assorted content work',
      description: 'Diverse content creation, ranging from fashion and accessories brands to the automotive industry.',
      cover: 'assets/social/others-cover.jpg',
      images: [
        'assets/social/others-cover.jpg',
        'assets/social/others-1.jpg',
        'assets/social/others-2.jpg',
        'assets/social/others-3.jpg',
      ],
    },
  ],
  branding: [
    {
      title: 'KBCF',
      year: '2025',
      subtitle: 'Rebrand · Audiovisual investment',
      description: 'Rebranding for a consulting firm focused on audiovisual investment.',
      cover: 'assets/branding/kbcf-cover.jpg',
      images: [
        'assets/branding/kbcf-cover.jpg',
        'assets/branding/kbcf-1.jpg',
        'assets/branding/kbcf-2.jpg',
        'assets/branding/kbcf-3.jpg',
        'assets/branding/kbcf-4.jpg',
        'assets/branding/kbcf-5.jpg',
        'assets/branding/kbcf-6.jpg',
      ],
    },
    {
      title: 'ISII Group',
      year: '2024',
      subtitle: 'Brand guidelines · Applications',
      description: 'Brand guidelines development and applications for ISII Group.',
      cover: 'assets/branding/isii-cover.jpg',
      images: [
        'assets/branding/isii-cover.jpg',
        'assets/branding/isii-2.jpg',
        'assets/branding/isii-3.jpg',
        'assets/branding/isii-6.jpg',
      ],
    },
    {
      title: 'Materia Prima',
      year: '2024',
      subtitle: 'Identity · Pottery collective',
      description: 'Concept and identity development for a pottery collective in Spain.',
      cover: 'assets/branding/materia-cover.jpg',
      images: [
        'assets/branding/materia-cover.jpg',
        'assets/branding/materia-2.jpg',
        'assets/branding/materia-3.jpg',
        'assets/branding/materia-4.jpg',
        'assets/branding/materia-5.jpg',
        'assets/branding/materia-6.jpg',
        'assets/branding/materia-7.jpg',
        'assets/branding/materia-9.jpg',
        'assets/branding/materia-10.jpg',
        'assets/branding/materia-11.jpg',
        'assets/branding/materia-12.jpg',
        'assets/branding/materia-13.jpg',
        'assets/branding/materia-14.jpg',
        'assets/branding/materia-16.jpg',
        'assets/branding/materia-18.jpg',
        'assets/branding/materia-19.jpg',
        'assets/branding/materia-20.jpg',
      ],
    },
    {
      title: 'Cata la Lata',
      year: '2024',
      subtitle: 'Packaging · Competition',
      description: 'Packaging development and design for the Cata la Lata competition.',
      cover: 'assets/branding/cata-cover.jpg',
      images: [
        'assets/branding/cata-cover.jpg',
        'assets/branding/cata-1.jpg',
      ],
    },
    {
      title: 'Sendeero',
      year: '2024',
      subtitle: 'Identity · Handmade candles',
      description: 'Identity development and merchandise design for a handmade candle brand.',
      cover: 'assets/branding/sendeero-cover.jpg',
      images: [
        'assets/branding/sendeero-cover.jpg',
        'assets/branding/sendeero-1.jpg',
        'assets/branding/sendeero-2.jpg',
        'assets/branding/sendeero-3.jpg',
      ],
    },
  ],
  campaigns: [
    {
      title: 'Break on Time',
      year: '2024',
      subtitle: 'Stationery · Annual screenplay competition',
      description: 'Stationery and design for an annual screenplay competition.',
      cover: 'assets/campaigns/breakontime-cover.jpg',
      images: [
        'assets/campaigns/breakontime-cover.jpg',
        'assets/campaigns/breakontime-1.jpg',
        'assets/campaigns/breakontime-2.jpg',
        'assets/campaigns/breakontime-3.jpg',
      ],
    },
    {
      title: 'MIISTA — A Puzzle',
      year: '2024',
      subtitle: 'Creative direction · Master\u2019s project',
      description: 'Creative direction and campaign design "A Puzzle" for my own footwear brand (Master\u2019s project).',
      cover: 'assets/campaigns/miista-cover.jpg',
      images: [
        'assets/campaigns/miista-cover.jpg',
        'assets/campaigns/miista-1.jpg',
        'assets/campaigns/miista-story-1.mp4',
        'assets/campaigns/miista-story-2.mp4',
        'assets/campaigns/miista-story-3.mp4',
        'assets/campaigns/miista-story-4.mp4',
      ],
    },
    {
      title: 'Bibilou × Costa Club',
      year: '2024',
      subtitle: 'Event design · Footwear collab',
      description: 'Design and concept development for a Bibilou event, a Spanish footwear brand, in collaboration with the local restaurant Costa Club.',
      cover: 'assets/campaigns/bibilou-cover.jpg',
      images: [
        'assets/campaigns/bibilou-cover.jpg',
        'assets/campaigns/bibilou-1.jpg',
        'assets/campaigns/bibilou-2.jpg',
      ],
    },
    {
      title: 'Festival de Cine de Málaga',
      year: '2024',
      subtitle: 'Creative direction · Festival campaign',
      description: 'Creative direction and campaign design for the Málaga Film Festival.',
      cover: 'assets/campaigns/malaga-cover.jpg',
      images: [
        'assets/campaigns/malaga-cover.jpg',
        'assets/campaigns/malaga-1.jpg',
        'assets/campaigns/malaga-2.jpg',
        'assets/campaigns/malaga-3.jpg',
        'assets/campaigns/malaga-4.jpg',
        'assets/campaigns/malaga-5.jpg',
      ],
    },
    {
      title: 'SIA Production Systems',
      year: '2024',
      subtitle: 'Brand application · Architecture & fleet',
      description: 'Branding adaptation and application for the building exterior and vehicle fleet of a production company in Gran Canaria.',
      cover: 'assets/campaigns/sia-cover.jpg',
      images: [
        'assets/campaigns/sia-cover.jpg',
        'assets/campaigns/sia-3.jpg',
        'assets/campaigns/sia-4.jpg',
      ],
    },
    {
      title: 'Festival de Cine de Berlín',
      year: '2024',
      subtitle: 'Creative direction · Festival campaign',
      description: 'Creative direction and campaign design for the Berlin International Film Festival.',
      cover: 'assets/campaigns/berlin-cover.jpg',
      images: [
        'assets/campaigns/berlin-cover.jpg',
        'assets/campaigns/berlin-1.jpg',
        'assets/campaigns/berlin-2.jpg',
        'assets/campaigns/berlin-3.jpg',
      ],
    },
  ]
};

// ------------ Blog (Design Scroll of the Month) ------------
// Bilingual: each translatable field has {es, en} keys.
// English translations are drafts — review before publishing.
// `accent` is the colored backdrop behind images for that post.
// `breaks` places images between paragraphs: { afterPara: <1-indexed>, images: [src...] }
// Newest editions first — dropdown order follows this array.
const blog = [
  {
    month: '2026-06',
    label: { es: 'Junio 2026', en: 'June 2026' },
    posts: [
      {
        title: { es: 'Fennuala Belle', en: 'Fennuala Belle' },
        accent: '#f6dde6',
        body: {
          es: [
            'En medio de un scroll bastante habitual, me encontré con Fennuala Belle, y me atrapó desde el primer segundo. Su estética llamó mi atención porque, además de ser algo que personalmente siempre me ha gustado, se siente distinta a gran parte del contenido que consumimos hoy en día, especialmente dentro de ese universo más alineado con el minimalismo, el clean girl look y el “less is more”.',
            'Desde el inicio, me dio la sensación de ser un espacio visual donde conviven la ternura y el poder, dos cualidades con las que muchas mujeres suelen identificarse y que a menudo se entienden como opuestas cuando en realidad no lo son.',
            'Fennuala Belle es una artista, ilustradora y creativa nacida en Yorkshire, Inglaterra, que ha desarrollado una marca con su mismo nombre. Más que una marca tradicional, lo que ha construido es un universo gráfico muy definido, donde conviven la ilustración, la papelería y algunas piezas textiles. Todo parte de una identidad visual clara que se siente coherente en cada uno de los formatos en los que trabaja.',
            'Aunque a primera vista podría relacionarse con tendencias actuales como la estética “coquette”, este proyecto no nace como respuesta a una tendencia, sino como una identidad que lleva desarrollándose desde 2020 y que se ha mantenido consistente en el tiempo. En ese sentido, es interesante cómo su marca se siente casi como una extensión directa de su identidad personal: mismo nombre, mismo lenguaje visual y mismo tono. Primero construye su estilo personal como artista, y después lo expande hacia una marca que conecta con un público que se identifica con esa estética.',
            'En su tienda, el foco principal está en los objetos gráficos prints, ilustraciones, stickers y piezas de papelería (personalmente, mi parte favorita). A esto se suman algunas prendas, como camisetas o corsés, que mantienen el mismo lenguaje y funcionan como una extensión natural de la marca.',
            'También es importante destacar que, dentro de este tipo de proyectos pequeños, hay un esfuerzo consciente por trabajar de forma más ética y sostenible. En el caso de las prendas, la marca tiene una política bastante clara. Utilizan telas ecológicas, materiales sobrantes y textiles vintage reciclados, desde manteles y tapices hasta cortinas, dándoles una nueva vida y reduciendo residuos. Además, apuestan por mantener una huella eléctrica más baja y utilizan materiales de embalaje sostenibles.',
            'Creo que, como artistas, diseñadores o emprendedores, es importante poner atención en este tipo de proyectos que no solo son fieles a una estética propia, sino que también consideran el impacto de lo que producen. La sostenibilidad y la ética deberían ser parte de cualquier proceso creativo. Diseñar no es solo crear algo visualmente atractivo, sino también entender el contexto en el que existe y las consecuencias que puede tener.',
            'Volviendo a la tienda, algo interesante es cómo funcionan algunos de sus productos de papelería. En muchos casos, puedes comprar los diseños en formato digital y recibir un PDF listo para imprimir en casa. Esto no solo reduce la necesidad de envíos innecesarios, sino que también plantea una relación más directa con el objeto. A la vez, se apela a la honestidad del comprador, ya que estos archivos son para uso personal y no están pensados para ser redistribuidos.',
            'En general, Fennuala Belle se siente como un proyecto muy bien construido. Es una marca coherente que se ha ido desarrollando con el tiempo y que sigue creciendo sin perder su esencia.',
          ],
          en: [
            'In the middle of a pretty ordinary scroll, I came across Fennuala Belle, and it caught me from the first second. Her aesthetic stood out because — beyond being something I’ve always personally loved — it feels different from most of what we consume today, especially within that world leaning toward minimalism, the clean-girl look, and “less is more”.',
            'From the start, it felt like a visual space where tenderness and power coexist — two qualities many women identify with, and that are often read as opposites when they really aren’t.',
            'Fennuala Belle is an artist, illustrator, and creative born in Yorkshire, England, who has built a brand under her own name. More than a traditional brand, what she’s created is a very defined graphic universe where illustration, stationery, and a few textile pieces live together. It all stems from a clear visual identity that feels coherent across every format she works in.',
            'Although at first glance it might be tied to current trends like the “coquette” aesthetic, this project wasn’t born as a response to a trend, but as an identity she’s been developing since 2020 and has kept consistent over time. In that sense, it’s interesting how her brand feels almost like a direct extension of her personal identity: same name, same visual language, same tone. First she builds her personal style as an artist, then expands it into a brand that connects with an audience who identifies with that aesthetic.',
            'In her shop, the focus is mainly on graphic objects — prints, illustrations, stickers, and stationery (personally, my favorite part). Alongside these are a few garments, like T-shirts or corsets, that keep the same language and work as a natural extension of the brand.',
            'It’s also worth noting that, within this kind of small project, there’s a conscious effort to work more ethically and sustainably. With the garments, the brand has a pretty clear policy. They use eco-friendly fabrics, leftover materials, and recycled vintage textiles — from tablecloths and tapestries to curtains — giving them a new life and reducing waste. They also aim for a lower energy footprint and use sustainable packaging.',
            'I think that as artists, designers, or entrepreneurs, it’s important to pay attention to projects like this — ones that aren’t only true to their own aesthetic but also consider the impact of what they make. Sustainability and ethics should be part of any creative process. Designing isn’t just about making something visually appealing, but also understanding the context it exists in and the consequences it can have.',
            'Back to the shop, one interesting thing is how some of her stationery works. In many cases, you can buy the designs digitally and get a PDF ready to print at home. This not only cuts down on unnecessary shipping but also sets up a more direct relationship with the object. At the same time, it relies on the buyer’s honesty, since these files are for personal use and aren’t meant to be redistributed.',
            'Overall, Fennuala Belle feels like a very well-built project. It’s a coherent brand that has developed over time and keeps growing without losing its essence.',
          ],
        },
        breaks: [
          { afterPara: 1, images: ['assets/blog/2026-06/fennuala-belle/01.jpg'] },
          { afterPara: 3, images: [
            'assets/blog/2026-06/fennuala-belle/02.avif',
            'assets/blog/2026-06/fennuala-belle/03.avif',
          ]},
          { afterPara: 5, images: [
            'assets/blog/2026-06/fennuala-belle/04.avif',
            'assets/blog/2026-06/fennuala-belle/05.jpg',
          ]},
          { afterPara: 7, images: ['assets/blog/2026-06/fennuala-belle/06.avif'] },
          { afterPara: 8, images: [
            'assets/blog/2026-06/fennuala-belle/07.jpg',
            'assets/blog/2026-06/fennuala-belle/08.avif',
          ]},
        ],
        links: [],
      },
      {
        title: { es: 'Ale Sketch', en: 'Ale Sketch' },
        accent: '#efd9c6',
        body: {
          es: [
            'Ale Sketch es una ilustradora y artista mexicana cuyo trabajo gira en torno al papel como medio principal. No hay demasiada información personal disponible sobre ella en internet, pero en este caso tampoco parece necesaria, ya que su trabajo comunica lo suficiente por sí solo.',
            'La descubrí en TikTok hace unos dos años, en vísperas de Día de Muertos. Como suele pasar, al ser mexicana, el algoritmo estaba completamente volcado hacia contenido relacionado con esta fecha, y fue ahí donde vi uno de sus videos construyendo un mini altar hecho completamente de papel. Fue uno de esos contenidos que se quedan contigo y te hacen pensar ojalá se me hubiera ocurrido hacer algo así.',
            'Tiempo después volvió a aparecer en mis redes, y fue entonces cuando decidí incluirla en esta edición de Scroll of the Month.',
            'A diferencia de otros perfiles, Ale no vende un producto como tal, sino un servicio. Su trabajo se centra en la creación de piezas de papelería y estructuras hechas en papel para distintos tipos de eventos o contextos, desde intervenciones para bodas hasta instalaciones para stands, pop-ups, piezas decorativas para espacios personales o incluso ramos de novia. Más que un catálogo cerrado, lo que ofrece es la posibilidad de adaptar el papel a distintas necesidades, incluso a aquellas que en un principio no parecen evidentes.',
            'Más allá del formato, lo interesante está en cómo lleva este material a otro nivel. No se queda en lo bidimensional o en lo funcional, sino que lo utiliza para construir experiencias.',
            'Este texto no es especialmente largo, pero sí busca destacar proyectos como el de Ale, artistas que logran transformar su práctica en un servicio manteniendo una identidad clara y apostando por explorar a fondo su medio.',
            'A partir de este proyecto me surge la inspiración para cuestionar materiales cotidianos que usamos durante el día a día sin cuestionarnos realmente ¿hasta dónde pueden llegar? ¿Cuántas posibilidades tiene algo tan común? ¿Qué se puede hacer con ellos más allá de lo que ya se hace?',
          ],
          en: [
            'Ale Sketch is a Mexican illustrator and artist whose work revolves around paper as its main medium. There isn’t much personal information about her online, but in this case it doesn’t really seem necessary — her work says enough on its own.',
            'I discovered her on TikTok about two years ago, right around Día de Muertos. As usually happens, being Mexican, my algorithm was completely tilted toward content about the holiday, and that’s where I saw one of her videos building a mini altar made entirely of paper. It was one of those things that stays with you and makes you think, I wish I’d thought of doing something like that.',
            'A while later she showed up in my feed again, and that’s when I decided to include her in this edition of Scroll of the Month.',
            'Unlike other profiles, Ale doesn’t sell a product as such, but a service. Her work centers on creating stationery pieces and paper structures for different kinds of events or contexts — from wedding installations to setups for stands, pop-ups, decorative pieces for personal spaces, or even bridal bouquets. More than a fixed catalog, what she offers is the ability to adapt paper to different needs, even ones that aren’t obvious at first.',
            'Beyond the format, what’s interesting is how she takes this material to another level. She doesn’t stop at the two-dimensional or the functional — she uses it to build experiences.',
            'This piece isn’t especially long, but it does aim to highlight projects like Ale’s — artists who manage to turn their practice into a service while keeping a clear identity and committing to fully explore their medium.',
            'This project sparks the inspiration to question everyday materials we use without really asking ourselves: how far can they go? How many possibilities does something so ordinary hold? What can be done with them beyond what’s already being done?',
          ],
        },
        breaks: [
          { afterPara: 2, images: ['assets/blog/2026-06/ale-sketch/01.jpg'] },
          { afterPara: 4, images: [
            'assets/blog/2026-06/ale-sketch/02.jpg',
            'assets/blog/2026-06/ale-sketch/03.jpg',
          ]},
          { afterPara: 5, images: [
            'assets/blog/2026-06/ale-sketch/04.jpg',
            'assets/blog/2026-06/ale-sketch/05.jpg',
          ]},
          { afterPara: 6, images: ['assets/blog/2026-06/ale-sketch/06.jpg'] },
        ],
        links: [
          { label: 'Instagram', href: 'https://www.instagram.com/ale_sketch' },
        ],
      },
    ],
  },
  {
    month: '2026-04',
    label: { es: 'Abril 2026', en: 'April 2026' },
    posts: [
      {
        title: { es: 'CORTA Lab', en: 'CORTA Lab' },
        accent: '#f4e8d6',
        body: {
          es: [
            'CORTA Lab nace de una idea muy clara dentro del diseño contemporáneo. Su creadora, la arquitecta chilena conocida como @lafran en TikTok, inicia el proyecto a partir de la exploración del acrílico como material base, que con el tiempo se convierte en su sello característico. Todo comienza durante su Trabajo Final de Grado en arquitectura, donde desarrolla una maqueta utilizando este material. Lo que en principio era un ejercicio académico termina evolucionando hacia un proyecto mucho más amplio.',
            'Conocí CORTA Lab a través de su kit de reglas de diseño, una pieza que destaca por condensar distintas disciplinas en un solo objeto. Más allá de su función como herramienta, lo interesante está en cómo reúne referencias del diseño gráfico, la tipografía y la arquitectura.',
            'Lo relevante de este tipo de propuestas no está solo en su función, sino en la construcción de un lenguaje propio. Un sistema en el que cada pieza cobra sentido en relación con las demás y donde el conjunto tiene más peso que el objeto aislado.',
            'Aquí aparece lo que creo que es una de las ideas centrales del proyecto, el diseño modular. Este enfoque entiende el diseño como la construcción de sistemas y no de objetos cerrados. Cada elemento cumple un rol dentro de una estructura mayor, una lógica que se repite en disciplinas como la tipografía, la arquitectura o el diseño editorial, donde el foco se desplaza desde la pieza individual hacia las relaciones entre partes.',
            'Esta lógica no se ve solo en los resultados, sino también en la experiencia de uso. Sus productos, como el joyero o la lámpara NYC, se entregan sin ensamblar, invitando al usuario a participar en su construcción. El montaje deja de ser un paso secundario para convertirse en parte del diseño mismo, incorporando al usuario dentro del sistema en lugar de posicionarlo como un simple receptor.',
            'El proyecto funciona como un ejemplo claro de cómo el diseño puede plantearse como un sistema abierto, más que como un objeto cerrado. Una forma de entender el objeto no como resultado final, sino como parte de un proceso y encaja con una forma de entender el diseño que comparto, donde no se trata solo de resolver, sino de construir algo en lo que objeto, proceso y usuario forman parte de una misma estructura.',
          ],
          en: [
            'CORTA Lab grows out of a very clear idea within contemporary design. Its founder, the Chilean architect known on TikTok as @lafran, started the project by exploring acrylic as a base material — over time, it became her signature. It all began during her thesis, where she built a model using this material. What started as an academic exercise eventually evolved into something much broader.',
            'I came across CORTA Lab through her design-rules kit, a piece that stands out for condensing several disciplines into a single object. Beyond its function as a tool, what’s interesting is how it pulls together references from graphic design, typography, and architecture.',
            'What’s relevant about this kind of work isn’t just its function, but the construction of its own language. A system in which each piece earns meaning in relation to the others, where the whole carries more weight than any object on its own.',
            'This is where what I think is one of the project’s central ideas appears: modular design. This approach treats design as the construction of systems rather than closed objects. Each element plays a role within a larger structure — a logic that repeats across disciplines like typography, architecture, or editorial design, where the focus shifts from the individual piece to the relationships between parts.',
            'This logic shows up not only in the results, but in the experience of using the products. Pieces like the jewelry box or the NYC lamp ship unassembled, inviting the user to take part in their construction. Assembly stops being a secondary step and becomes part of the design itself, bringing the user into the system instead of leaving them as a passive recipient.',
            'The project works as a clear example of how design can be approached as an open system rather than a closed object — a way of understanding the object not as a final result but as part of a process, and one that fits with a way of understanding design that I share, where it isn’t just about solving but about building something where object, process, and user are all part of the same structure.',
          ],
        },
        breaks: [
          { afterPara: 2, images: ['assets/blog/2026-04/corta-lab/01.jpg'] },
          { afterPara: 4, images: ['assets/blog/2026-04/corta-lab/02.jpg'] },
          { afterPara: 5, images: ['assets/blog/2026-04/corta-lab/03.jpg'] },
        ],
        links: [
          { label: 'Web', href: 'https://www.cortalab.cl/' },
          { label: 'Instagram', href: 'https://www.instagram.com/corta.lab' },
        ],
      },
      {
        title: {
          es: 'Galeano Poggi y el diseño a través del gesto',
          en: 'Galeano Poggi and design through gesture',
        },
        accent: '#dde5d0',
        body: {
          es: [
            'Este mes descubrí Galeano Poggi, un estudio donde el diseño no se entiende solo desde el objeto, sino también desde la idea que lo origina. En su etapa actual está impulsado por Tomás Galeano, quien retoma el legado familiar para continuar con el estudio.',
            'El origen del proyecto es significativo. Todo comienza con el diseño de una cuna para el propio Tomás cuando nació. Con el tiempo, sus padres, los arquitectos Carolina Galeano y Francisco Poggi, fundan el estudio en 2002 y desarrollan una trayectoria reconocida dentro del panorama del diseño en Argentina, consolidando una identidad clara que hoy funciona como base para esta nueva etapa.',
            'Más que una simple continuación, lo que plantea Tomás es una forma de emprender que nace desde algo que siempre ha estado presente en su entorno. Esa relación entre herencia y decisión personal da forma a esta nueva fase del estudio.',
            'En la base de su propuesta hay una idea que considero clave para entender el estudio. El diseño no se queda en la forma final del objeto, sino en la capacidad de una idea para mantenerse en el tiempo. Cuando una solución está bien planteada, su relevancia no depende de modas ni de contextos puntuales.',
            'Hay algo especialmente interesante en este tipo de proyectos familiares dentro del diseño. Me resulta inevitable pensar en figuras como Charles and Ray Eames, donde el contexto compartido influye directamente en la manera de diseñar.',
            'A través del contenido que comparte Tomás, se pueden ver distintas ideas del estudio en formato breve, lo que permite entender tanto los objetos como el planteamiento que hay detrás. Dentro de todo ese conjunto, hay una línea de trabajo que me interesa especialmente, la de sus lámparas.',
            'La Dimmerlamp, diseñada en 2004, parte de una idea muy concreta. En lugar de encender la luz, la libera. El objeto funciona como una caja de madera de MDF que, al tirar de su parte superior, se abre ligeramente y permite que la luz aparezca a través de esa separación. Más adelante aparece la Dimmerpack, que traslada esa misma lógica a un tubo de cartón, manteniendo el mismo gesto pero desde otro material y otra forma.',
            'Lo que conecta ambos diseños no es tanto su forma o su material, sino el movimiento. Encender una lámpara deja de ser un gesto automático para convertirse en una acción física y consciente. No existe un interruptor convencional, sino una interacción que redefine la relación con el objeto.',
          ],
          en: [
            'This month I discovered Galeano Poggi, a studio where design isn’t understood only through the object, but also through the idea that gives rise to it. In its current chapter, it’s led by Tomás Galeano, who has taken up the family legacy to carry the studio forward.',
            'The origin of the project is meaningful. It all begins with the design of a crib for Tomás himself when he was born. Over time, his parents — architects Carolina Galeano and Francisco Poggi — founded the studio in 2002 and built a recognized practice within Argentina’s design landscape, consolidating a clear identity that now serves as the foundation for this new chapter.',
            'More than a simple continuation, what Tomás proposes is a way of building something that grows from what has always been part of his surroundings. That relationship between inheritance and personal decision shapes this new phase of the studio.',
            'At the base of his proposal is an idea I think is key to understanding the studio. Design doesn’t end at the final form of the object, but in an idea’s ability to last over time. When a solution is well-conceived, its relevance doesn’t depend on trends or specific contexts.',
            'There’s something particularly interesting about this kind of family-led project in design. I can’t help but think of figures like Charles and Ray Eames, where a shared context directly influences the way design is made.',
            'Through the content Tomás shares, you can see different ideas from the studio in short form — which lets you understand both the objects and the thinking behind them. Within all of that, there’s one line of work that interests me especially: their lamps.',
            'The Dimmerlamp, designed in 2004, comes from a very concrete idea. Instead of turning the light on, it releases it. The object works as a wooden MDF box that, when you pull on its top, opens slightly and lets the light come through that gap. Later comes the Dimmerpack, which carries the same logic over to a cardboard tube — keeping the same gesture but in another material and another form.',
            'What connects both designs isn’t so much their form or material, but movement. Turning on a lamp stops being an automatic gesture and becomes a physical, conscious action. There’s no conventional switch — only an interaction that redefines the relationship with the object.',
          ],
        },
        breaks: [
          { afterPara: 2, images: ['assets/blog/2026-04/galeano-poggi/01.webp'] },
          { afterPara: 7, images: [
            'assets/blog/2026-04/galeano-poggi/02.webp',
            'assets/blog/2026-04/galeano-poggi/03.webp',
          ]},
        ],
        links: [],
      },
    ],
  },
];

let blogLang = (function(){
  try { return localStorage.getItem('blogLang') || 'es'; } catch(e){ return 'es'; }
})();

function renderBlog(monthKey){
  const feed = document.getElementById('blog-feed');
  if (!feed) return;
  const month = blog.find(m => m.month === monthKey) || blog[0];
  if (!month) return;
  const lang = blogLang;
  const isVideo = (s) => /\.(mp4|webm|mov)$/i.test(s || '');
  const renderBreak = (images, alt) => `
    <div class="blog-break">
      ${images.map(src => isVideo(src)
        ? `<div class="blog-break-img"><video src="${src}" muted loop playsinline preload="metadata" autoplay></video></div>`
        : `<div class="blog-break-img"><img src="${src}" alt="${alt}" loading="lazy"/></div>`
      ).join('')}
    </div>
  `;
  feed.innerHTML = month.posts.map(p => {
    const title = p.title[lang] || p.title.es;
    const paras = p.body[lang] || p.body.es;
    const breaksByPara = {};
    (p.breaks || []).forEach(b => { breaksByPara[b.afterPara] = b.images; });
    const flow = [];
    paras.forEach((para, i) => {
      flow.push(`<p>${para}</p>`);
      const n = i + 1;
      if (breaksByPara[n]) flow.push(renderBreak(breaksByPara[n], title));
    });
    const linksHTML = p.links && p.links.length
      ? `<div class="blog-links">${p.links.map(l => `<a href="${l.href}" target="_blank" rel="noopener">${l.label} →</a>`).join('')}</div>`
      : '';
    const accentStyle = p.accent ? ` style="--break-color:${p.accent}"` : '';
    return `
      <article class="blog-post" data-reveal${accentStyle}>
        <h3 class="blog-post-title">${title}</h3>
        ${flow.join('')}
        ${linksHTML}
      </article>
    `;
  }).join('');
  feed.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('in'));
}

function refreshMonthOptions(){
  const sel = document.getElementById('blog-month');
  if (!sel) return;
  const prev = sel.value;
  sel.innerHTML = blog.map(m => `<option value="${m.month}">${m.label[blogLang] || m.label.es}</option>`).join('');
  if (prev) sel.value = prev;
}

function setBlogLang(lang){
  blogLang = lang;
  document.documentElement.setAttribute('data-blog-lang', lang);
  document.querySelectorAll('.lang-toggle [data-lang]').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  refreshMonthOptions();
  const sel = document.getElementById('blog-month');
  renderBlog(sel ? sel.value : (blog[0] && blog[0].month));
  try { localStorage.setItem('blogLang', lang); } catch(e){}
}

function initBlog(){
  const sel = document.getElementById('blog-month');
  if (!sel) return;
  document.documentElement.setAttribute('data-blog-lang', blogLang);
  refreshMonthOptions();
  sel.addEventListener('change', e => renderBlog(e.target.value));
  document.querySelectorAll('.lang-toggle [data-lang]').forEach(btn => {
    btn.addEventListener('click', () => setBlogLang(btn.dataset.lang));
    btn.classList.toggle('active', btn.dataset.lang === blogLang);
  });
  renderBlog(sel.value);
}
initBlog();

function renderBranch(id, items){
  const grid = document.getElementById('grid-' + id);
  if (!grid) return;
  grid.innerHTML = items.map((it, idx) => {
    const wClass = it.w ? `w${it.w}` : '';
    const sizeClass = it.size || '';
    const isVideo = (s) => /\.(mp4|webm|mov)$/i.test(s || '');
    const media = it.cover
      ? (isVideo(it.cover)
          ? `<video src="${it.cover}" muted loop playsinline preload="metadata" autoplay></video>`
          : `<img src="${it.cover}" alt="${it.title}" loading="lazy"/>`)
      : placeholder({label: it.ph, tone: it.tone});
    const caption = it.subtitle
      ? `<span class="yr">${it.subtitle} · ${it.year}</span>`
      : `<span class="yr">${it.year}</span>`;
    return `
      <a class="tile ${wClass} ${sizeClass}" href="#" data-branch="${id}" data-idx="${idx}" data-reveal>
        <div class="media">
          ${media}
        </div>
        <div class="cap">
          <h3>${it.title}<span class="arr">→</span></h3>
          ${caption}
        </div>
      </a>
    `;
  }).join('');

  // Attach click handlers directly on each tile
  grid.querySelectorAll('.tile[data-branch]').forEach(tile => {
    tile.addEventListener('click', (e) => {
      const branch = tile.dataset.branch;
      const idx = parseInt(tile.dataset.idx, 10);
      const p = data[branch] && data[branch][idx];
      if (p && p.images){
        e.preventDefault();
        e.stopPropagation();
        window.__lbOpen(branch, idx);
      }
    });
  });
}

Object.keys(data).forEach(k => renderBranch(k, data[k]));

// ------------ Lightbox ------------
(function initLightbox(){
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const stage = lb.querySelector('.lb-stage');
  const meta  = lb.querySelector('.lb-meta');
  let cur = null;
  let i = 0;

  function render(){
    const p = cur;
    const isVideo = (s) => /\.(mp4|webm|mov)$/i.test(s || '');
    stage.innerHTML = p.images.map((src, n) => {
      const cls = n === i ? 'active' : '';
      return isVideo(src)
        ? `<video src="${src}" class="${cls}" muted loop playsinline preload="metadata" ${n===i?'autoplay':''} controls></video>`
        : `<img src="${src}" alt="${p.title} — ${n+1}" class="${cls}"/>`;
    }).join('');
    meta.innerHTML =
      `<div class="lb-head">
        <div>
          <div class="lb-title">${p.title}</div>
          <div class="lb-sub">${p.subtitle || ''} · ${p.year}</div>
        </div>
        <div class="lb-nav">
          <button class="lb-btn lb-x" data-lb-close type="button" aria-label="Close">×</button>
        </div>
      </div>
      <p class="lb-desc">${p.description || ''}</p>`;
  }
  function open(branch, idx){
    cur = data[branch][idx];
    i = 0;
    render();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    lb.classList.remove('open');
    document.body.style.overflow = '';
    cur = null;
  }
  function go(d){
    if (!cur) return;
    i = (i + d + cur.images.length) % cur.images.length;
    render();
  }

  // Single delegated handler on the lightbox itself — survives every re-render
  lb.addEventListener('click', (e) => {
    const dirBtn = e.target.closest('[data-lb-dir]');
    if (dirBtn){
      e.preventDefault();
      e.stopPropagation();
      go(parseInt(dirBtn.dataset.lbDir, 10));
      return;
    }
    if (e.target.closest('[data-lb-close]')){
      e.preventDefault();
      e.stopPropagation();
      close();
      return;
    }
    // Backdrop click closes
    if (e.target === lb) close();
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });

  // Expose for tile click
  window.__lbOpen = open;
})();

// ------------ Scroll reveal ------------
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if (e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
},{threshold:.12, rootMargin:'0px 0px -40px 0px'});

document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));

// ------------ Auto-hide nav on scroll-down, reveal on scroll-up or mouse-near-top ------------
(function(){
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const TOP_GUARD = 80;        // never hide while within this many px of the top
  const SCROLL_DELTA = 6;      // ignore tiny jitter
  const REVEAL_BAND = 80;      // reveal when cursor is within this many px of the top
  let lastY = window.scrollY;
  let ticking = false;
  function update(){
    const y = window.scrollY;
    const dy = y - lastY;
    if (y < TOP_GUARD){
      nav.classList.remove('nav-hidden');
      nav.classList.remove('is-scrolled');
    } else {
      nav.classList.add('is-scrolled');
      if (dy > SCROLL_DELTA) nav.classList.add('nav-hidden');
      else if (dy < -SCROLL_DELTA) nav.classList.remove('nav-hidden');
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking){ requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  window.addEventListener('mousemove', (e) => {
    if (e.clientY <= REVEAL_BAND) nav.classList.remove('nav-hidden');
  });
})();

// ------------ Madrid clock ------------
function tick(){
  const now = new Date();
  // show Madrid time (Europe/Madrid)
  const opts = {timeZone:'Europe/Madrid', hour:'2-digit', minute:'2-digit', hour12:false};
  const t = new Intl.DateTimeFormat('en-GB', opts).format(now);
  const el = document.getElementById('clock');
  if (el) el.textContent = 'MAD · ' + t;
}
tick(); setInterval(tick, 30_000);

// ------------ Tweaks ------------
const tweaksState = Object.assign({}, window.TWEAKS_DEFAULTS || {
  heroStyle:'stacked', workLayout:'uniform', showMarquee:true
});

const heroCopy = {
  stacked: `Brand<br/>identity, <span class="it">editorial</span><br/>&amp; everything<br/>in between.`,
  short:   `Designer<br/>of <span class="it">good</span><br/>brands.`,
  quiet:   `A quiet studio<br/>for <span class="it">brand</span>,<br/>editorial &amp;<br/>campaign design.`
};

function applyTweaks(s){
  // hero copy
  const h = document.getElementById('heroTitle');
  if (h) h.innerHTML = heroCopy[s.heroStyle] || heroCopy.stacked;
  // marquee
  const m = document.getElementById('marquee');
  if (m) m.style.display = (s.showMarquee === true || s.showMarquee === 'true') ? '' : 'none';
  // layout
  const ed = document.getElementById('grid-editorial');
  const br = document.getElementById('grid-branding');
  const sc = document.getElementById('grid-social');
  const cp = document.getElementById('grid-campaigns');
  [ed,br,sc,cp].forEach(g=>{ if(!g) return; g.classList.remove('cols-2','cols-3','cols-mixed'); });
  if (s.workLayout === 'uniform'){
    ed&&ed.classList.add('cols-3'); br&&br.classList.add('cols-3'); sc&&sc.classList.add('cols-3'); cp&&cp.classList.add('cols-3');
    document.querySelectorAll('.tile').forEach(t=>{t.classList.remove('w2','w3','w4','w6','tall','wide','square');});
  } else if (s.workLayout === 'tall'){
    ed&&ed.classList.add('cols-3'); br&&br.classList.add('cols-3'); sc&&sc.classList.add('cols-3'); cp&&cp.classList.add('cols-2');
    document.querySelectorAll('#grid-editorial .tile, #grid-branding .tile, #grid-social .tile').forEach(t=>{
      t.classList.remove('w2','w3','w4','w6','wide','square'); t.classList.add('tall');
    });
  } else {
    // mixed: reset and re-render from data
    ed&&ed.classList.add('cols-mixed');
    br&&br.classList.add('cols-mixed');
    sc&&sc.classList.add('cols-3');
    cp&&cp.classList.add('cols-2');
    Object.keys(data).forEach(k => renderBranch(k, data[k]));
    document.querySelectorAll('[data-reveal]').forEach(el=>{el.classList.add('in')});
  }
}

applyTweaks(tweaksState);

// ------------ Edit mode protocol ------------
const panel = document.getElementById('tweaks');
const twHero = document.getElementById('tw-hero');
const twLayout = document.getElementById('tw-layout');
const twMarquee = document.getElementById('tw-marquee');

function syncPanel(){
  twHero.value = tweaksState.heroStyle;
  twLayout.value = tweaksState.workLayout;
  twMarquee.value = String(tweaksState.showMarquee);
}
syncPanel();

function post(edits){
  Object.assign(tweaksState, edits);
  applyTweaks(tweaksState);
  try{ window.parent.postMessage({type:'__edit_mode_set_keys', edits}, '*'); }catch(e){}
}

twHero.addEventListener('change', e=>post({heroStyle:e.target.value}));
twLayout.addEventListener('change',e=>post({workLayout:e.target.value}));
twMarquee.addEventListener('change',e=>post({showMarquee: e.target.value === 'true'}));

document.getElementById('closeTweaks').addEventListener('click', ()=>{
  panel.classList.remove('open');
});

window.addEventListener('message', (ev)=>{
  const d = ev.data || {};
  if (d.type === '__activate_edit_mode')   panel.classList.add('open');
  if (d.type === '__deactivate_edit_mode') panel.classList.remove('open');
});

// must be after the listener is attached
try{ window.parent.postMessage({type:'__edit_mode_available'}, '*'); }catch(e){}
