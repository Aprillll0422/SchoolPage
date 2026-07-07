import type { SchoolData, PromotionContent } from "@/types";

export function generatePromotionHTML(
  school: SchoolData,
  content: PromotionContent
): string {
  const { name, logo, horizontalImage, verticalImage } = school;
  const { slogan, description, features, history, contact } = content;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} - 官方宣传网站</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.7;
      color: #2c3e50;
      background: #fff;
    }

    h1, h2, h3, h4 {
      font-family: 'Noto Serif SC', serif;
      font-weight: 700;
    }

    /* 导航栏 */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
      z-index: 1000;
      transition: all 0.3s ease;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 30px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .nav-logo img {
      height: 48px;
      width: 48px;
      object-fit: contain;
    }

    .nav-logo-text {
      font-family: 'Noto Serif SC', serif;
      font-size: 20px;
      font-weight: 700;
      color: #1a365d;
      letter-spacing: 1px;
    }

    .nav-links {
      display: flex;
      gap: 36px;
      list-style: none;
    }

    .nav-links a {
      text-decoration: none;
      color: #4a5568;
      font-weight: 500;
      font-size: 15px;
      transition: color 0.3s;
      position: relative;
    }

    .nav-links a:hover {
      color: #c9a227;
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: #c9a227;
      transition: width 0.3s;
    }

    .nav-links a:hover::after {
      width: 100%;
    }

    /* Hero区域 */
    .hero {
      margin-top: 70px;
      position: relative;
      height: calc(100vh - 70px);
      min-height: 600px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #1a365d 100%);
    }

    .hero-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.35;
      background-size: cover;
      background-position: center;
      background-image: url('${horizontalImage}');
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(26, 54, 93, 0.9) 0%, rgba(44, 82, 130, 0.6) 100%);
    }

    .hero-content {
      position: relative;
      z-index: 10;
      text-align: center;
      color: #fff;
      padding: 0 30px;
      max-width: 900px;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 24px;
      background: rgba(201, 162, 39, 0.2);
      border: 1px solid rgba(201, 162, 39, 0.4);
      border-radius: 50px;
      margin-bottom: 30px;
      font-size: 14px;
      letter-spacing: 2px;
    }

    .hero-title {
      font-size: 56px;
      font-weight: 900;
      margin-bottom: 24px;
      line-height: 1.2;
      text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    }

    .hero-slogan {
      font-size: 24px;
      font-weight: 300;
      margin-bottom: 40px;
      opacity: 0.9;
      letter-spacing: 4px;
      font-family: 'Noto Serif SC', serif;
    }

    .hero-buttons {
      display: flex;
      gap: 20px;
      justify-content: center;
    }

    .btn {
      padding: 14px 40px;
      border-radius: 50px;
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      cursor: pointer;
      border: none;
    }

    .btn-primary {
      background: linear-gradient(135deg, #c9a227, #d4af37);
      color: #1a365d;
      box-shadow: 0 4px 20px rgba(201, 162, 39, 0.4);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 30px rgba(201, 162, 39, 0.6);
    }

    .btn-secondary {
      background: transparent;
      color: #fff;
      border: 2px solid rgba(255, 255, 255, 0.5);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: #fff;
    }

    .scroll-indicator {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      text-align: center;
      animation: bounce 2s infinite;
    }

    .scroll-indicator span {
      display: block;
      font-size: 12px;
      letter-spacing: 2px;
      margin-bottom: 10px;
      opacity: 0.7;
    }

    .scroll-arrow {
      width: 24px;
      height: 24px;
      border-right: 2px solid #fff;
      border-bottom: 2px solid #fff;
      transform: rotate(45deg);
      margin: 0 auto;
      opacity: 0.7;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
      40% { transform: translateX(-50%) translateY(-10px); }
      60% { transform: translateX(-50%) translateY(-5px); }
    }

    /* 通用区块样式 */
    section {
      padding: 100px 30px;
    }

    .section-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .section-label {
      display: inline-block;
      color: #c9a227;
      font-size: 14px;
      letter-spacing: 3px;
      font-weight: 600;
      margin-bottom: 16px;
      text-transform: uppercase;
    }

    .section-title {
      font-size: 40px;
      color: #1a365d;
      margin-bottom: 16px;
    }

    .section-subtitle {
      font-size: 17px;
      color: #718096;
      max-width: 600px;
      margin: 0 auto;
    }

    /* 学校简介 */
    .about {
      background: #f8fafc;
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }

    .about-image {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    }

    .about-image img {
      width: 100%;
      height: 450px;
      object-fit: cover;
      display: block;
    }

    .about-image::before {
      content: '';
      position: absolute;
      top: -20px;
      left: -20px;
      right: 20px;
      bottom: 20px;
      border: 3px solid #c9a227;
      border-radius: 16px;
      z-index: -1;
    }

    .about-text h2 {
      font-size: 36px;
      color: #1a365d;
      margin-bottom: 24px;
      line-height: 1.3;
    }

    .about-text p {
      font-size: 16px;
      color: #4a5568;
      line-height: 1.9;
      margin-bottom: 20px;
      text-align: justify;
    }

    .about-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin-top: 40px;
      padding-top: 40px;
      border-top: 1px solid #e2e8f0;
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      font-size: 36px;
      font-weight: 900;
      color: #c9a227;
      font-family: 'Noto Serif SC', serif;
    }

    .stat-label {
      font-size: 14px;
      color: #718096;
      margin-top: 8px;
    }

    /* 办学特色 */
    .features {
      background: #fff;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
    }

    .feature-card {
      background: #fff;
      border-radius: 16px;
      padding: 40px 30px;
      text-align: center;
      transition: all 0.4s ease;
      border: 1px solid #e2e8f0;
      position: relative;
      overflow: hidden;
    }

    .feature-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #c9a227, #d4af37);
      transform: scaleX(0);
      transition: transform 0.4s ease;
    }

    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
      border-color: transparent;
    }

    .feature-card:hover::before {
      transform: scaleX(1);
    }

    .feature-icon {
      width: 70px;
      height: 70px;
      margin: 0 auto 24px;
      background: linear-gradient(135deg, #1a365d, #2c5282);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #c9a227;
      font-size: 28px;
      transition: all 0.4s ease;
    }

    .feature-card:hover .feature-icon {
      background: linear-gradient(135deg, #c9a227, #d4af37);
      color: #1a365d;
      transform: scale(1.1);
    }

    .feature-card h3 {
      font-size: 20px;
      color: #1a365d;
      margin-bottom: 12px;
    }

    .feature-card p {
      font-size: 15px;
      color: #718096;
      line-height: 1.7;
    }

    /* 历史沿革 */
    .history {
      background: #f8fafc;
    }

    .history-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }

    .history-text h2 {
      font-size: 36px;
      color: #1a365d;
      margin-bottom: 24px;
    }

    .history-text p {
      font-size: 16px;
      color: #4a5568;
      line-height: 1.9;
      text-align: justify;
    }

    .history-image {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    }

    .history-image img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      display: block;
    }

    /* Footer */
    footer {
      background: #1a365d;
      color: #fff;
      padding: 80px 30px 30px;
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 50px;
      margin-bottom: 50px;
    }

    .footer-brand {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
    }

    .footer-brand img {
      height: 50px;
      width: 50px;
      object-fit: contain;
    }

    .footer-brand h3 {
      font-size: 22px;
      color: #fff;
    }

    .footer-desc {
      color: #a0aec0;
      font-size: 14px;
      line-height: 1.8;
      margin-bottom: 20px;
    }

    .footer-title {
      font-size: 16px;
      color: #fff;
      margin-bottom: 20px;
      font-weight: 600;
    }

    .footer-list {
      list-style: none;
    }

    .footer-list li {
      margin-bottom: 12px;
    }

    .footer-list a {
      color: #a0aec0;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s;
    }

    .footer-list a:hover {
      color: #c9a227;
    }

    .footer-contact li {
      color: #a0aec0;
      font-size: 14px;
      margin-bottom: 12px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 30px;
      text-align: center;
      color: #718096;
      font-size: 14px;
    }

    /* 响应式 */
    @media (max-width: 1024px) {
      .about-grid,
      .history-content {
        grid-template-columns: 1fr;
      }

      .features-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .footer-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .hero-title {
        font-size: 42px;
      }
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }

      .hero-title {
        font-size: 32px;
      }

      .hero-slogan {
        font-size: 18px;
      }

      .section-title {
        font-size: 28px;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }

      .footer-grid {
        grid-template-columns: 1fr;
      }

      section {
        padding: 60px 20px;
      }

      .about-stats {
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
      }

      .stat-number {
        font-size: 28px;
      }

      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
    }
  </style>
</head>
<body>
  <!-- 导航栏 -->
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo">
        <img src="${logo}" alt="${name}校徽">
        <span class="nav-logo-text">${name}</span>
      </div>
      <ul class="nav-links">
        <li><a href="#home">首页</a></li>
        <li><a href="#about">学校简介</a></li>
        <li><a href="#features">办学特色</a></li>
        <li><a href="#history">历史沿革</a></li>
        <li><a href="#contact">联系我们</a></li>
      </ul>
    </div>
  </nav>

  <!-- Hero区域 -->
  <section class="hero" id="home">
    <div class="hero-bg"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="hero-badge">
        <span>✦</span>
        <span>立德树人 追求卓越</span>
        <span>✦</span>
      </div>
      <h1 class="hero-title">${name}</h1>
      <p class="hero-slogan">${slogan}</p>
      <div class="hero-buttons">
        <a href="#about" class="btn btn-primary">了解更多</a>
        <a href="#contact" class="btn btn-secondary">联系我们</a>
      </div>
    </div>
    <div class="scroll-indicator">
      <span>向下滚动</span>
      <div class="scroll-arrow"></div>
    </div>
  </section>

  <!-- 学校简介 -->
  <section class="about" id="about">
    <div class="section-container">
      <div class="section-header">
        <span class="section-label">ABOUT US</span>
        <h2 class="section-title">学校简介</h2>
        <p class="section-subtitle">了解我们的办学理念和教育追求</p>
      </div>
      <div class="about-grid">
        <div class="about-image">
          <img src="${verticalImage}" alt="校园风光">
        </div>
        <div class="about-text">
          <h2>百年树人，教育为本</h2>
          <p>${description}</p>
          <div class="about-stats">
            <div class="stat-item">
              <div class="stat-number">50+</div>
              <div class="stat-label">办学历史</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">200+</div>
              <div class="stat-label">优秀教师</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">10000+</div>
              <div class="stat-label">校友遍布</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 办学特色 -->
  <section class="features" id="features">
    <div class="section-container">
      <div class="section-header">
        <span class="section-label">OUR FEATURES</span>
        <h2 class="section-title">办学特色</h2>
        <p class="section-subtitle">独特的教育优势，助力每一位学子成长</p>
      </div>
      <div class="features-grid">
        ${features
          .map(
            (feature, index) => `
          <div class="feature-card">
            <div class="feature-icon">${["📚", "👨‍🏫", "🎯", "🌟", "🌍", "💡"][index % 6]}</div>
            <h3>特色${index + 1}</h3>
            <p>${feature}</p>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  </section>

  <!-- 历史沿革 -->
  <section class="history" id="history">
    <div class="section-container">
      <div class="section-header">
        <span class="section-label">OUR HISTORY</span>
        <h2 class="section-title">历史沿革</h2>
        <p class="section-subtitle">传承历史，开创未来</p>
      </div>
      <div class="history-content">
        <div class="history-text">
          <h2>薪火相传，砥砺前行</h2>
          <p>${history}</p>
        </div>
        <div class="history-image">
          <img src="${horizontalImage}" alt="学校历史">
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer id="contact">
    <div class="footer-container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">
            <img src="${logo}" alt="${name}校徽">
            <h3>${name}</h3>
          </div>
          <p class="footer-desc">${slogan}</p>
        </div>
        <div>
          <h4 class="footer-title">快速链接</h4>
          <ul class="footer-list">
            <li><a href="#home">首页</a></li>
            <li><a href="#about">学校简介</a></li>
            <li><a href="#features">办学特色</a></li>
            <li><a href="#history">历史沿革</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-title">教学资源</h4>
          <ul class="footer-list">
            <li><a href="#">师资队伍</a></li>
            <li><a href="#">课程设置</a></li>
            <li><a href="#">校园设施</a></li>
            <li><a href="#">学生活动</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-title">联系我们</h4>
          <ul class="footer-list footer-contact">
            <li>📍 ${contact.address}</li>
            <li>📞 ${contact.phone}</li>
            <li>✉️ ${contact.email}</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 ${name} 版权所有 | ${slogan}</p>
      </div>
    </div>
  </footer>

  <script>
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
      } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
      }
    });
  </script>
</body>
</html>`;
}

export function downloadHTML(html: string, filename: string): void {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
