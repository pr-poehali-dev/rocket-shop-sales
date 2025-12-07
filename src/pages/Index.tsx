import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Product {
  id: number;
  title: string;
  price: number;
  amount: string;
  discount?: string;
  popular?: boolean;
  category: string;
  image: string;
  description: string;
  deliveryTime?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface User {
  name: string;
  email: string;
  createdAt: string;
  purchases: Array<{
    id: string;
    date: string;
    items: string[];
    total: number;
  }>;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Пополнение Steam',
    price: 0,
    amount: 'RUB, USD, KZT',
    category: 'steam',
    image: '🎮',
    description: 'Пополнение баланса Steam на любую сумму',
    popular: true
  },
  {
    id: 100,
    title: 'Робуксы 100 (гейм пасс)',
    price: 120,
    amount: '100',
    category: 'roblox',
    image: '🎮',
    description: 'Робуксы через гейм пасс',
    deliveryTime: '5 дней'
  },
  {
    id: 101,
    title: 'Робуксы 200 (гейм пасс)',
    price: 200,
    amount: '200',
    category: 'roblox',
    image: '🎮',
    description: 'Робуксы через гейм пасс',
    deliveryTime: '5 дней'
  },
  {
    id: 102,
    title: 'Робуксы 500 (гейм пасс)',
    price: 440,
    amount: '500',
    category: 'roblox',
    image: '🎮',
    description: 'Робуксы через гейм пасс',
    deliveryTime: '5 дней',
    popular: true
  },
  {
    id: 103,
    title: 'Робуксы 1000 (гейм пасс)',
    price: 820,
    amount: '1000',
    category: 'roblox',
    image: '🎮',
    description: 'Робуксы через гейм пасс',
    deliveryTime: '5 дней'
  },
  {
    id: 110,
    title: 'Робуксы 100 (моментально)',
    price: 160,
    amount: '100',
    category: 'roblox',
    image: '⚡',
    description: 'Робукс паки моментально',
    popular: true
  },
  {
    id: 111,
    title: 'Робуксы 400 (моментально)',
    price: 600,
    amount: '400',
    category: 'roblox',
    image: '⚡',
    description: 'Робукс паки моментально'
  },
  {
    id: 112,
    title: 'Робуксы 800 (моментально)',
    price: 1000,
    amount: '800',
    category: 'roblox',
    image: '⚡',
    description: 'Робукс паки моментально',
    popular: true
  },
  {
    id: 200,
    title: 'Brawl Pass (скидка)',
    price: 360,
    amount: 'Pass',
    category: 'brawl',
    image: '⭐',
    description: 'Особая скидка',
    discount: '-40%',
    popular: true
  },
  {
    id: 201,
    title: 'Brawl Pass',
    price: 640,
    amount: 'Pass',
    category: 'brawl',
    image: '⭐',
    description: 'Обычный'
  },
  {
    id: 202,
    title: 'Brawl Pass Plus',
    price: 1000,
    amount: 'Plus',
    category: 'brawl',
    image: '💎',
    description: 'Расширенный'
  },
  {
    id: 203,
    title: 'Pro Pass',
    price: 2500,
    amount: 'Pro',
    category: 'brawl',
    image: '👑',
    description: 'Профессиональный'
  },
  {
    id: 300,
    title: 'Apple Store 500₽',
    price: 660,
    amount: '500₽',
    category: 'apple',
    image: '🍎',
    description: 'Россия'
  },
  {
    id: 301,
    title: 'Apple Store 1000₽',
    price: 1350,
    amount: '1000₽',
    category: 'apple',
    image: '🍎',
    description: 'Россия',
    popular: true
  },
  {
    id: 302,
    title: 'Apple Store 2000₽',
    price: 2600,
    amount: '2000₽',
    category: 'apple',
    image: '🍎',
    description: 'Россия'
  },
  {
    id: 303,
    title: 'Apple Store 3$',
    price: 330,
    amount: '3$',
    category: 'apple',
    image: '🇺🇸',
    description: 'США'
  },
  {
    id: 304,
    title: 'Apple Store 6$',
    price: 650,
    amount: '6$',
    category: 'apple',
    image: '🇺🇸',
    description: 'США'
  },
  {
    id: 400,
    title: 'Spotify 1 месяц',
    price: 250,
    amount: '1 мес',
    category: 'spotify',
    image: '🎵',
    description: 'Premium Individual',
    popular: true
  },
  {
    id: 401,
    title: 'Spotify 3 месяца',
    price: 750,
    amount: '3 мес',
    category: 'spotify',
    image: '🎵',
    description: 'Premium Individual'
  },
  {
    id: 402,
    title: 'Spotify 12 месяцев',
    price: 2150,
    amount: '12 мес',
    category: 'spotify',
    image: '🎵',
    description: 'Premium Individual',
    discount: '-15%'
  },
  {
    id: 500,
    title: 'PUBG 60 UC',
    price: 100,
    amount: '60',
    category: 'pubg',
    image: '🔫',
    description: 'UC'
  },
  {
    id: 501,
    title: 'PUBG 300 UC + 🎁25',
    price: 430,
    amount: '325',
    category: 'pubg',
    image: '🔫',
    description: 'UC с бонусом',
    popular: true
  },
  {
    id: 502,
    title: 'PUBG 600 UC + 🎁60',
    price: 850,
    amount: '660',
    category: 'pubg',
    image: '🔫',
    description: 'UC с бонусом'
  },
  {
    id: 503,
    title: 'PUBG Prime 1 мес',
    price: 140,
    amount: '1 мес',
    category: 'pubg',
    image: '👑',
    description: 'Подписка'
  },
  {
    id: 504,
    title: 'PUBG Prime 6 мес',
    price: 640,
    amount: '6 мес',
    category: 'pubg',
    image: '👑',
    description: 'Подписка'
  },
  {
    id: 600,
    title: 'Standoff 2 - 100 Gold',
    price: 130,
    amount: '100',
    category: 'standoff',
    image: '💰',
    description: 'Gold'
  },
  {
    id: 601,
    title: 'Standoff 2 - 1000 Gold',
    price: 1000,
    amount: '1000',
    category: 'standoff',
    image: '💰',
    description: 'Gold',
    popular: true
  },
  {
    id: 602,
    title: 'Standoff 2 - Gold Pass',
    price: 900,
    amount: 'Pass',
    category: 'standoff',
    image: '🎖️',
    description: 'Pass'
  },
  {
    id: 700,
    title: 'Valorant 240 VP (РФ)',
    price: 300,
    amount: '240',
    category: 'valorant',
    image: '🎯',
    description: 'Россия'
  },
  {
    id: 701,
    title: 'Valorant 1000 VP (РФ)',
    price: 900,
    amount: '1000',
    category: 'valorant',
    image: '🎯',
    description: 'Россия',
    popular: true
  },
  {
    id: 702,
    title: 'Valorant 475 VP (TR)',
    price: 300,
    amount: '475',
    category: 'valorant',
    image: '🇹🇷',
    description: 'Турция'
  },
  {
    id: 703,
    title: 'Valorant 1000 VP (TR)',
    price: 640,
    amount: '1000',
    category: 'valorant',
    image: '🇹🇷',
    description: 'Турция',
    discount: '-30%'
  },
  {
    id: 800,
    title: 'Telegram 100 звезд',
    price: 180,
    amount: '100',
    category: 'telegram',
    image: '✈️',
    description: 'Звезды'
  },
  {
    id: 801,
    title: 'Telegram 500 звезд',
    price: 830,
    amount: '500',
    category: 'telegram',
    image: '✈️',
    description: 'Звезды',
    popular: true
  },
  {
    id: 802,
    title: 'Telegram Premium 1 мес',
    price: 310,
    amount: '1 мес',
    category: 'telegram',
    image: '⭐',
    description: 'Premium',
    popular: true
  },
  {
    id: 803,
    title: 'Telegram Premium 12 мес',
    price: 2570,
    amount: '12 мес',
    category: 'telegram',
    image: '⭐',
    description: 'Premium'
  },
  {
    id: 900,
    title: 'GTA V Premium',
    price: 1200,
    amount: 'Game',
    category: 'games',
    image: '🚗',
    description: 'Rockstar',
    popular: true
  },
  {
    id: 901,
    title: 'Red Dead 2',
    price: 1100,
    amount: 'Game',
    category: 'games',
    image: '🤠',
    description: 'Steam',
    popular: true
  },
  {
    id: 902,
    title: 'Metro Exodus Gold',
    price: 650,
    amount: 'Game',
    category: 'games',
    image: '🚇',
    description: 'Steam'
  },
  {
    id: 903,
    title: 'AC Valhalla',
    price: 580,
    amount: 'Game',
    category: 'games',
    image: '⚔️',
    description: 'Ubisoft'
  },
  {
    id: 904,
    title: 'AC Odyssey',
    price: 450,
    amount: 'Game',
    category: 'games',
    image: '🏛️',
    description: 'Ubisoft'
  },
  {
    id: 905,
    title: 'BioShock Remastered',
    price: 200,
    amount: 'Game',
    category: 'games',
    image: '🌊',
    description: 'Steam'
  },
  {
    id: 906,
    title: 'Hollow Knight Silksong',
    price: 800,
    amount: 'Game',
    category: 'games',
    image: '🦋',
    description: 'Steam'
  }
];

const faqs = [
  {
    question: 'Как происходит доставка валюты?',
    answer: 'Доставка осуществляется в течение 5-15 минут после оплаты. Инструкции предоставляются в чате с продавцом после оплаты.'
  },
  {
    question: 'Безопасна ли покупка?',
    answer: 'Да, все покупки проводятся официально. Все транзакции защищены, ваши данные не передаются третьим лицам.'
  },
  {
    question: 'Можно ли вернуть деньги?',
    answer: 'Если вас не устроит заказ - вернем деньги. Возврат возможен в течение 7 дней. Свяжитесь с поддержкой.'
  },
  {
    question: 'Способы оплаты?',
    answer: 'СберБанк (комиссия 2%). Скоро T-Bank и СБП.'
  },
  {
    question: 'Часы работы?',
    answer: 'Ежедневно с 3:00 до 18:00 МСК. Telegram: @RocketShopSeller'
  },
  {
    question: 'Как получить скидку 20%?',
    answer: 'Скидка автоматически активируется на первый заказ.'
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountActivated, setDiscountActivated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedDiscount = localStorage.getItem('discountActivated');
    const savedUser = localStorage.getItem('user');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedDiscount) setDiscountActivated(JSON.parse(savedDiscount));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    toast.success('Товар добавлен в корзину!');
    
    if (!discountActivated && !localStorage.getItem('hasCompletedOrder')) {
      activateDiscount();
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const activateDiscount = () => {
    if (!discountActivated && !localStorage.getItem('hasCompletedOrder')) {
      setDiscountActivated(true);
      localStorage.setItem('discountActivated', 'true');
      toast.success('🎉 Скидка 20% активирована!');
    }
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = discountActivated && !localStorage.getItem('hasCompletedOrder') ? subtotal * 0.2 : 0;
    const commission = subtotal * 0.02;
    return {
      subtotal,
      discount,
      commission,
      total: subtotal - discount + commission
    };
  };

  const handleLogin = (name: string, email: string) => {
    const newUser: User = {
      name,
      email,
      createdAt: new Date().toISOString(),
      purchases: []
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoginOpen(false);
    toast.success(`Добро пожаловать, ${name}!`);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Корзина пуста!');
      return;
    }
    setShowPaymentDetails(true);
  };

  const completeOrder = () => {
    if (!user) {
      toast.error('Войдите в аккаунт');
      setIsLoginOpen(true);
      return;
    }

    const { total } = calculateTotal();
    const newPurchase = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: cart.map(item => `${item.title} x${item.quantity}`),
      total
    };

    const updatedUser = {
      ...user,
      purchases: [...user.purchases, newPurchase]
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    localStorage.setItem('hasCompletedOrder', 'true');
    
    setCart([]);
    setShowPaymentDetails(false);
    setIsCartOpen(false);
    
    toast.success('Заказ оформлен!');
  };

  const categories = [
    { id: 'all', name: 'Все' },
    { id: 'steam', name: 'Steam' },
    { id: 'roblox', name: 'Roblox' },
    { id: 'brawl', name: 'Brawl Stars' },
    { id: 'apple', name: 'Apple' },
    { id: 'spotify', name: 'Spotify' },
    { id: 'pubg', name: 'PUBG' },
    { id: 'standoff', name: 'Standoff 2' },
    { id: 'valorant', name: 'Valorant' },
    { id: 'telegram', name: 'Telegram' },
    { id: 'games', name: 'Игры' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const { subtotal, discount, commission, total } = calculateTotal();

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🚀</div>
            <h1 className="text-2xl font-bold neon-text">Rocket Shop</h1>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-primary transition-colors">Главная</button>
            <button onClick={() => scrollToSection('catalog')} className="text-sm font-medium hover:text-primary transition-colors">Каталог</button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors">О нас</button>
            <button onClick={() => scrollToSection('faq')} className="text-sm font-medium hover:text-primary transition-colors">FAQ</button>
            <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:text-primary transition-colors">Контакты</button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
              <Icon name="ShoppingCart" size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
            {user ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gradient-primary neon-glow">
                    <Icon name="User" className="mr-2" size={18} />
                    {user.name}
                  </Button>
                </DialogTrigger>
                <DialogContent className="gradient-card max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl neon-text">Профиль</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div><Label>Имя</Label><p className="text-lg font-semibold text-primary">{user.name}</p></div>
                    <div><Label>Email</Label><p>{user.email}</p></div>
                    <div><Label>Дата создания</Label><p>{new Date(user.createdAt).toLocaleDateString('ru-RU')}</p></div>
                    <Separator />
                    <div>
                      <Label className="text-lg mb-2 block">История покупок</Label>
                      {user.purchases.length === 0 ? (
                        <p className="text-muted-foreground">Пока нет покупок</p>
                      ) : (
                        <ScrollArea className="h-64">
                          {user.purchases.map(purchase => (
                            <Card key={purchase.id} className="mb-2">
                              <CardContent className="pt-4">
                                <p className="text-sm text-muted-foreground">{new Date(purchase.date).toLocaleString('ru-RU')}</p>
                                <ul className="mt-2 space-y-1">{purchase.items.map((item, i) => <li key={i} className="text-sm">{item}</li>)}</ul>
                                <p className="mt-2 font-bold text-primary">{purchase.total.toFixed(0)}₽</p>
                              </CardContent>
                            </Card>
                          ))}
                        </ScrollArea>
                      )}
                    </div>
                    <Button variant="destructive" onClick={() => { setUser(null); localStorage.removeItem('user'); toast.success('Вышли'); }}>Выйти</Button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button className="gradient-primary neon-glow"><Icon name="User" className="mr-2" size={18} />Войти</Button>
                </DialogTrigger>
                <DialogContent className="gradient-card">
                  <DialogHeader>
                    <DialogTitle className="text-2xl neon-text">Создать аккаунт</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); handleLogin(fd.get('name') as string, fd.get('email') as string); }}>
                    <div className="space-y-4">
                      <div><Label htmlFor="name">Имя</Label><Input id="name" name="name" required /></div>
                      <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
                      <Button type="submit" className="w-full gradient-primary">Создать</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </nav>

      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="gradient-card max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl neon-text">Корзина</DialogTitle></DialogHeader>
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Корзина пуста</p>
            </div>
          ) : (
            <div className="space-y-4">
              {discountActivated && !localStorage.getItem('hasCompletedOrder') && (
                <Alert className="border-primary/50 bg-primary/10"><Icon name="Tag" size={16} /><AlertDescription>🎉 Скидка 20% активирована!</AlertDescription></Alert>
              )}
              <ScrollArea className="h-64">
                {cart.map(item => (
                  <Card key={item.id} className="mb-2">
                    <CardContent className="pt-4 flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.price}₽</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, -1)}><Icon name="Minus" size={16} /></Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, 1)}><Icon name="Plus" size={16} /></Button>
                        <Button size="icon" variant="destructive" onClick={() => removeFromCart(item.id)}><Icon name="Trash2" size={16} /></Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between"><span>Сумма:</span><span>{subtotal}₽</span></div>
                {discount > 0 && <div className="flex justify-between text-primary"><span>Скидка 20%:</span><span>-{discount.toFixed(0)}₽</span></div>}
                <div className="flex justify-between text-sm"><span>Комиссия 2%:</span><span>+{commission.toFixed(0)}₽</span></div>
                <div className="flex justify-between text-lg font-bold"><span>Итого:</span><span className="text-primary">{total.toFixed(0)}₽</span></div>
              </div>
              {showPaymentDetails ? (
                <div className="space-y-4">
                  <Alert className="border-primary">
                    <Icon name="CreditCard" size={16} />
                    <AlertDescription>
                      <div className="space-y-2">
                        <p className="font-bold">Реквизиты:</p>
                        <p>СберБанк: <strong>2202 2083 9585 3485</strong></p>
                        <p>Получатель: <strong>Никита Владимирович Т.</strong></p>
                        <p className="text-primary">Сумма: {total.toFixed(0)}₽</p>
                        <p className="text-sm text-muted-foreground mt-2">После перевода нажмите "Подтвердить" и свяжитесь с @RocketShopSeller</p>
                      </div>
                    </AlertDescription>
                  </Alert>
                  <div className="flex gap-2">
                    <Button onClick={() => setShowPaymentDetails(false)} variant="outline" className="flex-1">Назад</Button>
                    <Button onClick={completeOrder} className="flex-1 gradient-primary neon-glow">Подтвердить оплату</Button>
                  </div>
                </div>
              ) : (
                <Button onClick={handleCheckout} className="w-full gradient-primary neon-glow" size="lg">
                  <Icon name="CreditCard" className="mr-2" size={20} />Оформить заказ
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-text">
              Игровая валюта<br /><span className="gradient-primary bg-clip-text text-transparent">мгновенно</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              В RocketShop вы можете купить игровую валюту по самым выгодным ценам! 
              Широкий ассортимент валют для популярных MMORPG, MOBA, шутеров и мобильных игр.
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Быстрая доставка, безопасные транзакции. Все честно и безопасно. Не устроит заказ - вернем деньги.
            </p>
            <div className="flex gap-4 justify-center flex-wrap mb-6">
              <Button size="lg" className="gradient-primary neon-glow text-lg px-8 py-6 hover:scale-105 transition-transform" onClick={() => scrollToSection('catalog')}>
                <Icon name="Rocket" className="mr-2" size={20} />Купить валюту
              </Button>
              {!discountActivated && !localStorage.getItem('hasCompletedOrder') && (
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-secondary/50 hover:border-secondary hover:neon-glow-pink" onClick={activateDiscount}>
                  <Icon name="Gift" className="mr-2" size={20} />Скидка 20% на первый заказ
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground"><Icon name="Clock" className="inline mr-1" size={16} />Часы работы: 3:00-18:00 МСК</p>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 neon-text">Каталог</h2>
          <p className="text-center text-muted-foreground mb-8">Широкий выбор валют</p>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent">
              {categories.map(cat => (
                <TabsTrigger key={cat.id} value={cat.id} className="data-[state=active]:gradient-primary data-[state=active]:neon-glow">{cat.name}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="gradient-card border-primary/20 hover:border-primary/50 hover:neon-glow transition-all group">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-5xl">{product.image}</div>
                    <div className="flex flex-col gap-1">
                      {product.popular && <Badge className="gradient-primary neon-glow"><Icon name="TrendingUp" size={14} className="mr-1" />Популярно</Badge>}
                      {product.discount && <Badge variant="destructive" className="bg-accent">{product.discount}</Badge>}
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors text-base">{product.title}</CardTitle>
                  <CardDescription className="text-sm">{product.description}</CardDescription>
                  {product.deliveryTime && <p className="text-xs text-muted-foreground mt-1"><Icon name="Clock" size={12} className="inline mr-1" />Доставка: {product.deliveryTime}</p>}
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  {product.price > 0 ? (
                    <>
                      <div className="text-xl font-bold text-primary">{product.price}₽</div>
                      <Button className="gradient-primary neon-glow hover:scale-105 transition-transform" onClick={() => addToCart(product)}>
                        <Icon name="ShoppingCart" size={16} className="mr-1" />Купить
                      </Button>
                    </>
                  ) : (
                    <Button className="w-full gradient-primary neon-glow" onClick={() => scrollToSection('contact')}>Уточнить цену</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 neon-text">Почему RocketShop?</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="gradient-card border-primary/30"><CardHeader><div className="text-3xl mb-2">🎮</div><CardTitle>Широкий выбор</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Валюта для большинства популярных игр</p></CardContent></Card>
            <Card className="gradient-card border-primary/30"><CardHeader><div className="text-3xl mb-2">💰</div><CardTitle>Выгодные цены</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Конкурентные цены и регулярные акции</p></CardContent></Card>
            <Card className="gradient-card border-primary/30"><CardHeader><div className="text-3xl mb-2">⚡</div><CardTitle>Быстрая доставка</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Валюта в кратчайшие сроки</p></CardContent></Card>
            <Card className="gradient-card border-primary/30"><CardHeader><div className="text-3xl mb-2">🛡️</div><CardTitle>Безопасность</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Проверенные методы доставки</p></CardContent></Card>
          </div>
          <div className="text-center mt-12">
            <Card className="gradient-card border-primary/30 inline-block">
              <CardContent className="pt-6">
                <p className="text-xl mb-4"><span className="text-primary font-bold">RocketShop</span> — ваш ракетный двигатель в мире онлайн-игр!</p>
                <p className="text-muted-foreground">Заряжайте аккаунты и достигайте высот! 🚀</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-6 neon-text">Отзывы</h3>
            <Card className="gradient-card border-secondary/30 text-center">
              <CardContent className="pt-6">
                <Icon name="MessageCircle" size={48} className="mx-auto text-secondary mb-4" />
                <p className="text-lg mb-4">Все актуальные отзывы:</p>
                <Button className="gradient-primary neon-glow" onClick={() => window.open('https://t.me/RocketShopRate', '_blank')}>
                  <Icon name="ExternalLink" className="mr-2" size={18} />@RocketShopRate
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-4 neon-text">FAQ</h2>
          <p className="text-center text-muted-foreground mb-12">Частые вопросы</p>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="gradient-card border border-primary/20 rounded-lg px-6 hover:border-primary/50 transition-colors">
                <AccordionTrigger className="text-left hover:text-primary text-lg font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4 neon-text">Контакты</h2>
          <p className="text-muted-foreground mb-2 text-lg">Мы всегда на связи</p>
          <p className="text-sm text-muted-foreground mb-12"><Icon name="Clock" className="inline mr-1" size={16} />3:00-18:00 МСК</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="gradient-card border-primary/30 hover:neon-glow transition-all">
              <CardHeader><Icon name="Send" size={40} className="mx-auto text-primary mb-2" /><CardTitle>Продавец</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">@RocketShopSeller</p>
                <Button className="gradient-primary neon-glow" onClick={() => window.open('https://t.me/RocketShopSeller', '_blank')}>Написать</Button>
              </CardContent>
            </Card>
            <Card className="gradient-card border-secondary/30 hover:neon-glow-pink transition-all">
              <CardHeader><Icon name="Headphones" size={40} className="mx-auto text-secondary mb-2" /><CardTitle>Поддержка</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">@RocketShopAdmin</p>
                <Button variant="outline" className="border-secondary/50 hover:border-secondary" onClick={() => window.open('https://t.me/RocketShopAdmin', '_blank')}>Написать</Button>
              </CardContent>
            </Card>
          </div>
          <Card className="gradient-card border-primary/30 mb-8">
            <CardHeader><CardTitle className="text-2xl">Способы оплаты</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-4 max-w-2xl mx-auto">
                <Card className="gradient-card border-primary/50">
                  <CardContent className="pt-6 text-left">
                    <div className="flex items-start gap-4">
                      <Icon name="CreditCard" size={32} className="text-primary" />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">СберБанк</h3>
                        <p className="text-sm text-muted-foreground mb-2">2202 2083 9585 3485</p>
                        <p className="text-sm text-muted-foreground mb-2">Никита Владимирович Т.</p>
                        <Badge variant="outline" className="text-xs">Комиссия 2%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="gradient-card border-muted opacity-60">
                  <CardContent className="pt-6 text-left">
                    <div className="flex items-start gap-4">
                      <Icon name="Wallet" size={32} className="text-muted-foreground" />
                      <div className="flex-1"><h3 className="font-bold text-lg mb-2">T-Bank</h3><Badge>Скоро</Badge></div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="gradient-card border-muted opacity-60">
                  <CardContent className="pt-6 text-left">
                    <div className="flex items-start gap-4">
                      <Icon name="Smartphone" size={32} className="text-muted-foreground" />
                      <div className="flex-1"><h3 className="font-bold text-lg mb-2">СБП</h3><Badge>Скоро</Badge></div>
                    </div>
                  </CardContent>
                </Card>
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
          <p className="text-muted-foreground mb-6">Твой надежный магазин игровой валюты</p>
          <p className="text-sm text-muted-foreground mb-4">⚠️ Инструкции предоставляются в чате с продавцом после оплаты</p>
          <p className="text-sm text-muted-foreground mb-4">Все покупки проводятся официально. Уточняйте актуальность цен.</p>
          <p className="text-lg mb-6">Приятных покупок. С уважением <span className="text-primary font-bold">RocketShop</span> ❤️</p>
          <p className="text-xs text-muted-foreground">© 2024 Rocket Shop</p>
        </div>
      </footer>
    </div>
  );
}
