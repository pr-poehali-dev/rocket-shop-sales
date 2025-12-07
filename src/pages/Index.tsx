import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const games = [
  {
    id: 1,
    title: 'Fortnite V-Bucks',
    price: '499₽',
    amount: '1000',
    discount: '-20%',
    popular: true,
    image: '🎮'
  },
  {
    id: 2,
    title: 'CS:GO Skins',
    price: '1299₽',
    amount: 'Random',
    discount: '-15%',
    popular: true,
    image: '🔫'
  },
  {
    id: 3,
    title: 'GTA 5 Money',
    price: '799₽',
    amount: '10M',
    discount: '',
    popular: false,
    image: '💰'
  },
  {
    id: 4,
    title: 'League of Legends RP',
    price: '599₽',
    amount: '1580 RP',
    discount: '',
    popular: false,
    image: '⚔️'
  },
  {
    id: 5,
    title: 'Valorant Points',
    price: '699₽',
    amount: '1000 VP',
    discount: '-10%',
    popular: true,
    image: '🎯'
  },
  {
    id: 6,
    title: 'Minecraft Minecoins',
    price: '399₽',
    amount: '1720',
    discount: '',
    popular: false,
    image: '⛏️'
  }
];

const faqs = [
  {
    question: 'Как происходит доставка валюты?',
    answer: 'Доставка осуществляется в течение 5-15 минут после оплаты. Вы получите код активации на указанную почту или валюта будет зачислена напрямую на ваш аккаунт.'
  },
  {
    question: 'Безопасна ли покупка валюты?',
    answer: 'Да, мы используем только официальные способы пополнения. Все транзакции защищены, а ваши данные не передаются третьим лицам.'
  },
  {
    question: 'Можно ли вернуть деньги?',
    answer: 'Возврат возможен в течение 24 часов, если валюта не была активирована или зачислена на аккаунт. Свяжитесь с поддержкой для оформления возврата.'
  },
  {
    question: 'Какие способы оплаты доступны?',
    answer: 'Мы принимаем банковские карты, электронные кошельки (Qiwi, YooMoney), криптовалюту и платежные системы (PayPal, Apple Pay, Google Pay).'
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🚀</div>
            <h1 className="text-2xl font-bold neon-text">Rocket Shop</h1>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Главная
            </button>
            <button 
              onClick={() => scrollToSection('catalog')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Каталог
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              О нас
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Контакты
            </button>
          </div>
          <Button className="gradient-primary neon-glow hover:scale-105 transition-transform">
            <Icon name="User" className="mr-2" size={18} />
            Войти
          </Button>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-text">
              Игровая валюта<br />
              <span className="gradient-primary bg-clip-text text-transparent">мгновенно</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Покупай валюту для любимых игр быстро и безопасно. Доставка за 5 минут!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="gradient-primary neon-glow text-lg px-8 py-6 hover:scale-105 transition-transform"
                onClick={() => scrollToSection('catalog')}
              >
                <Icon name="Rocket" className="mr-2" size={20} />
                Купить валюту
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-primary/50 hover:border-primary hover:neon-glow transition-all"
              >
                <Icon name="Play" className="mr-2" size={20} />
                Как это работает
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <Card className="gradient-card border-primary/30 hover:neon-glow transition-all">
              <CardHeader>
                <div className="text-4xl mb-2">⚡</div>
                <CardTitle>Быстро</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Доставка валюты за 5-15 минут</p>
              </CardContent>
            </Card>
            <Card className="gradient-card border-secondary/30 hover:neon-glow-pink transition-all">
              <CardHeader>
                <div className="text-4xl mb-2">🔒</div>
                <CardTitle>Безопасно</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">100% защита ваших данных</p>
              </CardContent>
            </Card>
            <Card className="gradient-card border-accent/30 hover:border-accent transition-all">
              <CardHeader>
                <div className="text-4xl mb-2">💎</div>
                <CardTitle>Выгодно</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Лучшие цены и скидки до 30%</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 neon-text">
            Каталог валюты
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Выбери свою игру и получи валюту мгновенно
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card 
                key={game.id} 
                className="gradient-card border-primary/20 hover:border-primary/50 hover:neon-glow transition-all group"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-5xl">{game.image}</div>
                    {game.popular && (
                      <Badge className="gradient-primary neon-glow">
                        <Icon name="TrendingUp" size={14} className="mr-1" />
                        Популярно
                      </Badge>
                    )}
                    {game.discount && (
                      <Badge variant="destructive" className="bg-accent">
                        {game.discount}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {game.title}
                  </CardTitle>
                  <CardDescription>Количество: {game.amount}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-primary">{game.price}</div>
                  <Button className="gradient-primary neon-glow hover:scale-105 transition-transform">
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Купить
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 neon-text">
            О Rocket Shop
          </h2>
          <Card className="gradient-card border-primary/30">
            <CardContent className="pt-6 space-y-4 text-lg">
              <p>
                <span className="text-primary font-semibold">Rocket Shop</span> — это ваш надежный партнер в мире игровой валюты. 
                Мы работаем с 2020 года и обслужили более 50,000 довольных геймеров.
              </p>
              <p>
                Наша миссия — сделать покупку игровой валюты максимально простой, быстрой и безопасной. 
                Мы предлагаем лучшие цены на рынке и гарантируем моментальную доставку.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">24/7</div>
                  <div className="text-sm text-muted-foreground">Поддержка</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">5 мин</div>
                  <div className="text-sm text-muted-foreground">Доставка</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Безопасно</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="faq" className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 neon-text">
            Вопросы и ответы
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Всё о доставке и покупке валюты
          </p>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="gradient-card border border-primary/20 rounded-lg px-6 hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left hover:text-primary text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text">
            Контакты и поддержка
          </h2>
          <p className="text-muted-foreground mb-12 text-lg">
            Мы всегда на связи и готовы помочь
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="gradient-card border-primary/30 hover:neon-glow transition-all">
              <CardHeader>
                <Icon name="MessageCircle" size={40} className="mx-auto text-primary mb-2" />
                <CardTitle>Онлайн-чат</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Быстрая поддержка 24/7</p>
                <Button className="gradient-primary neon-glow">
                  Написать
                </Button>
              </CardContent>
            </Card>
            <Card className="gradient-card border-secondary/30 hover:neon-glow-pink transition-all">
              <CardHeader>
                <Icon name="Mail" size={40} className="mx-auto text-secondary mb-2" />
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">support@rocketshop.ru</p>
                <Button variant="outline" className="border-secondary/50 hover:border-secondary">
                  Отправить письмо
                </Button>
              </CardContent>
            </Card>
            <Card className="gradient-card border-accent/30 hover:border-accent transition-all">
              <CardHeader>
                <Icon name="Send" size={40} className="mx-auto text-accent mb-2" />
                <CardTitle>Telegram</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">@rocketshop_support</p>
                <Button variant="outline" className="border-accent/50 hover:border-accent">
                  Открыть Telegram
                </Button>
              </CardContent>
            </Card>
          </div>
          <Card className="gradient-card border-primary/30 mt-8 neon-glow animate-glow-pulse">
            <CardHeader>
              <CardTitle className="text-2xl">Вход через игровые платформы</CardTitle>
              <CardDescription>Быстрая авторизация через ваш игровой аккаунт</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" variant="outline" className="hover:border-primary hover:text-primary">
                  <Icon name="Gamepad2" className="mr-2" size={20} />
                  Steam
                </Button>
                <Button size="lg" variant="outline" className="hover:border-secondary hover:text-secondary">
                  <Icon name="Gamepad2" className="mr-2" size={20} />
                  Epic Games
                </Button>
                <Button size="lg" variant="outline" className="hover:border-accent hover:text-accent">
                  <Icon name="Gamepad2" className="mr-2" size={20} />
                  Battle.net
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="text-3xl">🚀</div>
            <h3 className="text-2xl font-bold neon-text">Rocket Shop</h3>
          </div>
          <p className="text-muted-foreground mb-6">
            Твой надежный магазин игровой валюты
          </p>
          <div className="flex gap-6 justify-center text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Пользовательское соглашение</a>
            <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-primary transition-colors">Способы оплаты</a>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            © 2024 Rocket Shop. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
