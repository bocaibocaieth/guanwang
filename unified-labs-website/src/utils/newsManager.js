// 新闻数据管理工具 - 使用 localStorage 存储

const NEWS_STORAGE_KEY = 'unified_labs_news';

// 获取所有新闻
export const getNewsList = () => {
  try {
    const data = localStorage.getItem(NEWS_STORAGE_KEY);
    if (!data) {
      // 初始化示例数据
      const defaultNews = getDefaultNews();
      localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(defaultNews));
      return defaultNews;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to get news list:', error);
    return [];
  }
};

// 获取单条新闻
export const getNewsById = (id) => {
  const newsList = getNewsList();
  return newsList.find(news => news.id === id) || null;
};

// 添加新闻
export const addNews = (news) => {
  const newsList = getNewsList();
  const newNews = {
    ...news,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  newsList.unshift(newNews);
  localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(newsList));
  return newNews;
};

// 更新新闻
export const updateNews = (id, updates) => {
  const newsList = getNewsList();
  const index = newsList.findIndex(news => news.id === id);
  if (index === -1) return null;

  newsList[index] = {
    ...newsList[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(newsList));
  return newsList[index];
};

// 删除新闻
export const deleteNews = (id) => {
  const newsList = getNewsList();
  const filtered = newsList.filter(news => news.id !== id);
  localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

// 格式化日期
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 默认示例新闻数据
const getDefaultNews = () => [
  {
    id: '1',
    title: 'Unified Labs Announces Strategic Partnership with Major DeFi Protocol',
    summary: 'We are excited to announce a new partnership that will enhance liquidity across multiple blockchain networks.',
    content: `We are thrilled to announce a strategic partnership that marks a significant milestone in our mission to bridge traditional finance and decentralized finance.

This collaboration will enable us to:
- Expand our liquidity provision across additional blockchain networks
- Introduce new risk-curated vault strategies
- Enhance our market-making capabilities in the Asia-Pacific region

Our team has been working diligently to ensure this partnership delivers maximum value to our stakeholders while maintaining the rigorous risk management standards that define Unified Labs.

Stay tuned for more details in the coming weeks.`,
    category: 'Partnership',
    author: 'Unified Labs Team',
    createdAt: '2025-01-02T10:00:00.000Z',
    updatedAt: '2025-01-02T10:00:00.000Z',
  },
  {
    id: '2',
    title: 'Q4 2024 Performance Report: Record-Breaking Results',
    summary: 'Our latest quarterly report showcases exceptional growth and strong risk-adjusted returns across all strategies.',
    content: `We are pleased to share our Q4 2024 performance highlights:

**Key Achievements:**
- Total Value Locked (TVL) increased by 150%
- Risk-adjusted returns exceeded industry benchmarks
- Zero security incidents across all managed vaults
- Successful launch of 5 new curated vault strategies

**Looking Ahead:**
As we enter 2025, we remain committed to delivering institutional-grade DeFi infrastructure while continuously innovating our Agent-Based Simulation technology.

Thank you to our partners and stakeholders for your continued trust in Unified Labs.`,
    category: 'Report',
    author: 'Unified Labs Team',
    createdAt: '2024-12-28T09:00:00.000Z',
    updatedAt: '2024-12-28T09:00:00.000Z',
  },
  {
    id: '3',
    title: 'Introducing Enhanced Risk Curation Framework',
    summary: 'Our new risk curation framework leverages advanced ABS technology for improved parameter optimization.',
    content: `Today, we are introducing our enhanced Risk Curation Framework, a significant upgrade to our existing infrastructure.

**What's New:**
- Real-time parameter optimization using Agent-Based Simulation
- Enhanced oracle deviation detection
- Automated circuit breakers with faster response times
- Multi-chain risk aggregation capabilities

This framework represents months of research and development, incorporating feedback from our institutional partners and lessons learned from market events.

Our goal remains unchanged: to provide the most sophisticated risk management infrastructure in the DeFi space.`,
    category: 'Technology',
    author: 'Technology Team',
    createdAt: '2024-12-20T14:30:00.000Z',
    updatedAt: '2024-12-20T14:30:00.000Z',
  },
];

export default {
  getNewsList,
  getNewsById,
  addNews,
  updateNews,
  deleteNews,
  formatDate,
};
