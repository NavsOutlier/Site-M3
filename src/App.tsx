import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Phone, Mail, ChevronRight, MessageCircle, Shield, Lock, Zap, CheckCheck, MapPin, User, ChevronLeft, CreditCard, Barcode, Truck, ShieldCheck, ChevronDown, Clock, Globe } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const whatsappUrl = "https://wa.me/5511999999999?text=Olá! Gostaria de solicitar um orçamento direto da fábrica.";

const App = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeCarousels, setActiveCarousels] = useState<number[]>(new Array(3).fill(0));
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top } = containerRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - left, y: e.clientY - top });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  const updateCarousel = (idx: number, next: boolean, max: number) => {
    setActiveCarousels(prev => {
      const newState = [...prev];
      if (next) {
        newState[idx] = (newState[idx] + 1) % max;
      } else {
        newState[idx] = (newState[idx] - 1 + max) % max;
      }
      return newState;
    });
  };

  const choiceGuide = [
    {
      icon: <Shield size={32} />,
      title: "Máxima Segurança",
      subtitle: "Indústrias e Presídios",
      desc: "Recomendamos a **Malha 2\" (50mm)** com **Fio 12 (2,77mm)**. É a opção mais robusta contra invasões e cortes.",
      tag: "ALTA DENSIDADE",
      cases: [
        { img: "https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&q=80&w=1000", owner: "Ricardo S.", location: "Sorocaba / SP" },
        { img: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1000", owner: "Construtora Alfa", location: "Barueri / SP" }
      ]
    },
    {
      icon: <Zap size={32} />,
      title: "Melhor Custo-Benefício",
      subtitle: "Condomínios e Residências",
      desc: "A **Malha 3\" (76mm)** com **Fio 14 (2,11mm)** oferece o equilíbrio perfeito entre visibilidade, proteção e economia.",
      tag: "SÉRIE OURO",
      cases: [
        { img: "https://images.unsplash.com/photo-1510627489930-0c50697b31ff?auto=format&fit=crop&q=80&w=1000", owner: "Ana Paula", location: "Indaiatuba / SP" },
        { img: "https://images.unsplash.com/photo-1542662565-7e4b66bae529?auto=format&fit=crop&q=80&w=1000", owner: "Residencial Viver", location: "Campinas / SP" }
      ]
    },
    {
      icon: <Lock size={32} />,
      title: "Áreas Esportivas",
      subtitle: "Quadras e Campos",
      desc: "Telas com revestimento em PVC são ideais. Oferecem proteção contra impactos e durabilidade extrema sob sol e chuva.",
      tag: "PROTEÇÃO EXTRA",
      cases: [
        { img: "https://images.unsplash.com/photo-1459865264687-595d654df77e?auto=format&fit=crop&q=80&w=1000", owner: "Marcos Oliveira", location: "Itu / SP" },
        { img: "https://images.unsplash.com/photo-1597466765990-64ad1c35dafc?auto=format&fit=crop&q=80&w=1000", owner: "Clube Campestre", location: "Tatuí / SP" }
      ]
    }
  ];

  const chatGroups = [
    {
      contact: "Ricardo Silva",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      messages: [
        { text: "A qualidade das telas da Metaltres é impressionante. O material é visivelmente superior.", type: "received", time: "10:24" },
        { text: "Fico feliz em ajudar! Nossa galvanização a fogo garante essa durabilidade.", type: "sent", time: "10:26" }
      ]
    },
    {
      contact: "Ana Paula",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      messages: [
        { text: "Comprar direto da fábrica reduziu nosso custo em 35%. Acabamento impecável!", type: "received", time: "14:15" },
        { text: "Excelente! Economia de fábrica é o nosso diferencial.", type: "sent", time: "14:18" }
      ]
    },
    {
      contact: "Marcos Oliveira",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      messages: [
        { text: "Fizemos o cercamento de todo o pátio industrial. O atendimento técnico foi nota 10.", type: "received", time: "16:42" },
        { text: "Obrigado, Marcos! Conte conosco para as próximas etapas.", type: "sent", time: "16:45" }
      ]
    }
  ];

  return (
    <div className="site-wrapper" ref={containerRef} style={{ '--mouse-x': `${mousePos.x}px`, '--mouse-y': `${mousePos.y}px` } as any}>
      <div className="spotlight-bg" />

      {/* Navigation */}
      <nav className="navbar">
        <div className="page-container nav-content">
          <motion.img
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            src="/logo.png"
            alt="Metaltres Logo"
            className="footer-logo"
            style={{ marginBottom: 0 }}
          />

          <div className="nav-links">
            <a href="#inicio">Início</a>
            <a href="#depoimentos">Depoimentos</a>
            <a href="#servicos">Produtos</a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.75rem' }}>
              ORÇAMENTO RÁPIDO
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="inicio" className="hero">
        <motion.div style={{ scale, opacity }} className="hero-bg" />
        <div className="hero-overlay" />

        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-content"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="badge"
            >
              Líder em Segurança Perimetral
            </motion.span>
            <h1 className="hero-title text-gradient">
              COMPRE TELAS <br />
              <span>DIRETO DA FÁBRICA</span>
            </h1>
            <p className="hero-description">
              Economize até 40% em cercamentos de alta resistência com Galvanização Hot Dip. Direto da Metaltres para sua obra ou condomínio.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "var(--energy-glow)" }}
                whileTap={{ scale: 0.95 }}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                PREÇO DE FÁBRICA <ChevronRight size={18} />
              </motion.a>
              <a href="#precos" className="btn btn-outline" style={{ border: '2px solid white' }}>
                VER PREÇOS
              </a>
            </div>
          </motion.div>
        </div>

        {/* Trust Ribbon (First Fold Content) */}
        <div className="trust-ribbon">
          <div className="page-container trust-ribbon-container">
            <div className="trust-item">
              <div className="trust-icon"><CreditCard size={28} /></div>
              <div className="trust-text">
                <span className="trust-title">PARCELE EM 12X</span>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><Barcode size={28} /></div>
              <div className="trust-text">
                <span className="trust-title">5% DE DESCONTO</span>
                <span className="trust-subtitle">Depósito, boleto ou PIX</span>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><ShieldCheck size={28} /></div>
              <div className="trust-text">
                <span className="trust-title">QUALIDADE NOS PRODUTOS</span>
                <span className="trust-subtitle">Matéria prima Gerdau</span>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><Truck size={28} /></div>
              <div className="trust-text">
                <span className="trust-title">TRANSPORTADORA</span>
                <span className="trust-subtitle">envio rápido e seguro</span>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><MapPin size={28} /></div>
              <div className="trust-text">
                <span className="trust-title">ARMAZÉM</span>
                <span className="trust-subtitle">RS e MG</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 2. Testimonials Section (2nd Fold) */}
      <section id="depoimentos" className="section" style={{ backgroundColor: 'var(--bg-dark)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '0.2rem', textTransform: 'uppercase' }}>O que nossos clientes dizem</span>
            <h2 className="text-gradient" style={{ fontSize: '3rem', marginTop: '1rem' }}>Feedback via WhatsApp</h2>
          </div>

          <div className="whatsapp-chat-grid">
            {chatGroups.map((group, groupIdx) => (
              <motion.div
                key={groupIdx}
                className="whatsapp-chat-frame"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIdx * 0.2, duration: 0.6 }}
              >
                <div className="chat-header">
                  <div className="chat-avatar">
                    <img src={group.avatar} alt={group.contact} />
                  </div>
                  <div className="chat-header-info">
                    <h3>{group.contact}</h3>
                    <p>online</p>
                  </div>
                  <div className="chat-header-actions">
                    <Phone size={16} />
                    <ChevronRight size={16} style={{ transform: 'rotate(90deg)' }} />
                  </div>
                </div>

                <div className="whatsapp-chat-container" style={{ minHeight: '300px' }}>
                  {group.messages.map((m, i) => (
                    <div key={i} className={`chat-bubble ${m.type}`}>
                      <p style={{ margin: 0 }}>{m.text}</p>
                      <div className="bubble-time">
                        {m.time}
                        {m.type === 'sent' && <CheckCheck size={14} className="whatsapp-double-check" />}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Especialidades Section (3rd Fold) */}
      <section id="servicos" className="section">
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '0.2rem', textTransform: 'uppercase' }}>Catálogo Metaltres</span>
            <h2 className="text-gradient" style={{ fontSize: '3.5rem', marginTop: '1rem' }}>Especialidades</h2>
          </div>

          <div className="services-grid">
            <motion.div
              className="card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="card-img-wrapper">
                <img src="/concertinas.png" className="card-img" alt="Concertinas Metaltres" />
              </div>
              <div className="card-content">
                <span className="card-tag">SEGURANÇA MÁXIMA</span>
                <h3 className="card-title">Concertinas</h3>
                <p className="card-desc">Barreiras de aço galvanizado com alto poder dissuasório. Ideal para proteção de muros e perímetros industriais.</p>
                <a href={whatsappUrl} className="btn btn-outline" style={{ padding: '12px 24px', width: '100%', justifyContent: 'center' }}>
                  SOLICITAR COTAÇÃO
                </a>
              </div>
            </motion.div>

            <motion.div
              className="card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="card-img-wrapper">
                <img src="/telas.png" className="card-img" alt="Telas Metaltres" />
              </div>
              <div className="card-content">
                <span className="card-tag">RESISTÊNCIA INDUSTRIAL</span>
                <h3 className="card-title">Telas e Alambrados</h3>
                <p className="card-desc">Cercamentos estruturados para áreas rurais, esportivas e industriais. Durabilidade contra corrosão garantida.</p>
                <a href={whatsappUrl} className="btn btn-outline" style={{ padding: '12px 24px', width: '100%', justifyContent: 'center' }}>
                  SOLICITAR COTAÇÃO
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Selection Guide (4th Fold) */}
      <section id="guia" className="section" style={{ background: 'linear-gradient(180deg, var(--bg-dark) 0%, #111 100%)' }}>
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '0.2rem', textTransform: 'uppercase' }}>Qual a tela ideal?</span>
            <h2 className="text-gradient" style={{ fontSize: '3rem', marginTop: '1rem' }}>Guia Rápido de Escolha</h2>
            <p style={{ color: 'var(--text-dim)', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto' }}>
              Veja casos reais de instalação e escolha a melhor opção para seu projeto.
            </p>
          </div>

          <div className="guide-zigzag-container">
            {choiceGuide.map((item, i) => (
              <div key={i} className={`guide-row ${i % 2 !== 0 ? 'reverse' : ''}`}>
                <motion.div
                  className="guide-info"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="guide-icon-box" style={{ width: '60px', height: '60px', background: 'rgba(var(--primary-rgb), 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: '700' }}>{item.tag}</span>
                  <h3 style={{ fontSize: '2rem', margin: '0.5rem 0 0.5rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '1rem', marginBottom: '1.2rem', fontWeight: '600' }}>{item.subtitle}</p>
                  <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#ccc' }} dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                </motion.div>

                <motion.div
                  className="guide-visual"
                  initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="case-carousel">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeCarousels[i]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="carousel-content"
                        style={{ position: 'relative', width: '100%', height: '100%' }}
                      >
                        <img src={item.cases[activeCarousels[i]].img} alt="Caso Real" className="case-img" />
                        <div className="case-badge">CASO REAL</div>
                        <div className="case-metadata">
                          <div className="case-owner"><User size={14} style={{ display: 'inline', marginRight: '5px' }} /> {item.cases[activeCarousels[i]].owner}</div>
                          <div className="case-location"><MapPin size={12} style={{ display: 'inline', marginRight: '5px' }} /> {item.cases[activeCarousels[i]].location}</div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <button
                      onClick={() => updateCarousel(i, false, item.cases.length)}
                      style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', padding: '10px', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => updateCarousel(i, true, item.cases.length)}
                      style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', padding: '10px', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }}
                    >
                      <ChevronRight size={20} />
                    </button>

                    <div className="carousel-dots">
                      {item.cases.map((_, dotIdx) => (
                        <div
                          key={dotIdx}
                          className={`dot ${activeCarousels[i] === dotIdx ? 'active' : ''}`}
                          onClick={() => {
                            const newState = [...activeCarousels];
                            newState[i] = dotIdx;
                            setActiveCarousels(newState);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Telas pra Comprar (Pricing Grid - 5th Fold) */}
      <section id="precos" className="section" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="page-container">
          <h2 className="pricing-header-title">Tela alambrado</h2>

          <div className="pricing-grid">
            {[
              { title: "Tela Alambrado - Fio 14 (2,11mm) MALHA 2.1/2\" Rolo 20m largura x...", price: "650,00", inst: "108,33" },
              { title: "Tela Alambrado - Fio 12 (2,77mm) malha 3\" Rolo 20m largura x 1,80m...", price: "828,00", inst: "138,00" },
              { title: "Tela Alambrado - Fio 12 (2,77mm) malha 3\" Rolo 20m largura x 2m...", price: "920,00", inst: "153,33" },
              { title: "Tela Alambrado - Fio 14 (2,11mm) malha 3\" Rolo 20m largura x 1,80m...", price: "540,00", inst: "90,00" }
            ].map((prod, i) => (
              <motion.div
                key={i}
                className="product-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="product-img-box">
                  <img src="/telas.png" alt="Rolo de Tela" className="product-img" />
                </div>
                <h3 className="product-title">{prod.title}</h3>
                <div className="product-price">R${prod.price}</div>
                <div className="product-installments">6x de R${prod.inst} sem juros</div>
                <div className="product-actions">
                  <a
                    href={`https://wa.me/5511999999999?text=Olá! Tenho interesse na ${prod.title} por R$${prod.price}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-buy"
                    style={{ textDecoration: 'none' }}
                  >
                    COMPRAR
                  </a>
                  <button className="btn-spy"><span style={{ fontSize: '1.2rem' }}>👁</span> ESPIAR</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits (Existing) */}
      <section className="section" style={{ padding: '60px 0', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="page-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            {[
              { icon: <Shield size={32} />, title: "Resistência Máxima", desc: "Aço de alta densidade" },
              { icon: <Zap size={32} />, title: "Agilidade", desc: "Entrega direta em tempo recorde" },
              { icon: <Lock size={32} />, title: "Segurança Total", desc: "Padrão industrial certificado" }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
              >
                <div style={{ color: 'var(--primary)', padding: '1rem', background: 'rgba(var(--primary-rgb), 0.1)', borderRadius: '12px' }}>
                  {benefit.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{benefit.title}</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre a Empresa Section */}
      <section id="sobre" className="about-section">
        <div className="page-container">
          <div className="about-grid">
            <motion.div
              className="about-image-column"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000" alt="Fábrica Metaltres" className="about-img" />
            </motion.div>

            <motion.div
              className="about-content"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="about-tag">NOSSA HISTÓRIA</span>
              <h2 className="about-title">AUTORIDADE EM <br /><span style={{ color: 'var(--primary)' }}>CERCAMENTOS INDUSTRIAIS</span></h2>
              <p className="about-text">
                Com sede estrategicamente localizada para atender todo o Brasil, a **Metaltres** nasceu da necessidade de entregar cercamentos que unem resistência extrema e preço justo. Atuamos com distribuição direta da fábrica, eliminando intermediários e garantindo que você receba o melhor material pelo menor custo possível.
                <br /><br />
                Utilizamos exclusivamente aço **Gerdau** e processos de galvanização de última geração, garantindo que nossas telas suportem as condições climáticas mais adversas sem perder a integridade.
              </p>

              <div className="about-stats">
                <div className="stat-item">
                  <h4>+10</h4>
                  <p>Anos de Experiência</p>
                </div>
                <div className="stat-item">
                  <h4>100%</h4>
                  <p>Aço Gerdau</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section" style={{ backgroundColor: '#050505' }}>
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">PERGUNTAS <span style={{ color: 'var(--primary)' }}>FREQUENTES</span></h2>
            <p style={{ color: 'var(--text-dim)' }}>Tudo o que você precisa saber sobre nossos cercamentos.</p>
          </div>

          <div className="faq-container">
            {[
              { q: "Qual o prazo de entrega para minha região?", a: "Entregamos em todo o Brasil. O prazo médio varia de 3 a 10 dias úteis dependendo da localização e do volume do pedido." },
              { q: "As telas possuem garantia contra ferrugem?", a: "Sim! Nossas telas passam pelo processo de Galvanização Hot Dip (a fogo), o que garante uma proteção superior contra corrosão mesmo em áreas litorâneas." },
              { q: "Quais as formas de pagamento aceitas?", a: "Aceitamos parcelamento em até 12x no cartão de crédito, boleto bancário, depósito identificado e PIX (com 5% de desconto extra)." },
              { q: "Vocês realizam a instalação das telas?", a: "Somos fabricantes e distribuidores. Embora não realizemos a instalação direta, temos uma rede de parceiros instaladores em diversos estados para indicar." }
            ].map((item, i) => (
              <div key={i} className={`faq-item ${activeFaq === i ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  {item.q}
                  <ChevronDown className="faq-icon" size={20} />
                </button>
                <div className="faq-answer">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Banner Section (Existing) */}
      <section className="cta-banner">
        <div className="page-container cta-content">
          <h2 className="cta-text">FALE COM UM ESPECIALISTA <br />E PAGUE MENOS HOJE!</h2>
          <motion.a
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.9 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ backgroundColor: 'black', color: 'white', border: '2px solid var(--primary)' }}
          >
            <MessageCircle /> CHAT VIA WHATSAPP
          </motion.a>
        </div>
      </section>

      {/* Redesigned Footer */}
      <footer id="contato" className="main-footer">
        <div className="page-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo-text">METAL<span>TRES</span></div>
              <p>Excelência em cercamentos industriais e residenciais. Qualidade que protege seu patrimônio diretamente da fábrica.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" className="stat-item" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}><Globe size={20} /></a>
                <a href="#" className="stat-item" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}><Clock size={20} /></a>
              </div>
            </div>

            <div>
              <h4 className="footer-column-title">LINKS ÚTEIS</h4>
              <ul className="footer-links">
                <li><a href="#inicio">Início</a></li>
                <li><a href="#servicos">Produtos</a></li>
                <li><a href="#sobre">Nossa Empresa</a></li>
                <li><a href="#faq">Dúvidas</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-column-title">CONTATO RÁPIDO</h4>
              <div className="footer-contact-item">
                <Phone size={20} />
                <div>
                  <div style={{ fontWeight: 700, color: 'white' }}>Telefone / WhatsApp</div>
                  <div>(11) 9999-9999</div>
                </div>
              </div>
              <div className="footer-contact-item">
                <Mail size={20} />
                <div>
                  <div style={{ fontWeight: 700, color: 'white' }}>E-mail de Vendas</div>
                  <div>vendas@metaltres.com.br</div>
                </div>
              </div>
              <div className="footer-contact-item">
                <MapPin size={20} />
                <div>
                  <div style={{ fontWeight: 700, color: 'white' }}>Centros de Distribuição</div>
                  <div>Rio Grande do Sul | Minas Gerais</div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            © {new Date().getFullYear()} METALTRES CERADOS E TELAS. TODOS OS DIREITOS RESERVADOS. PROIBIDA A REPRODUÇÃO TOTAL OU PARCIAL.
          </div>
        </div>
      </footer>

      {/* Floating Action */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-float">
        <MessageCircle size={32} />
      </a>
    </div>
  );
};

export default App;
