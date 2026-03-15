import React from 'react';

const BookReviewsFull = () => {
  // 模拟单本书评数据
  const bookReviews = [
    {
      id: 1,
      title: '1453：君士坦丁堡之战',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=book%20cover%201453%20constantinople%20battle%2C%20historical%20non-fiction%2C%20dark%20blue%20cover&image_size=portrait_4_3',
      content: '这本书详细描述了1453年奥斯曼帝国攻陷拜占庭帝国首都君士坦丁堡的历史事件。作者通过丰富的史料和生动的叙述，展现了这场战役的全过程，包括双方的战略部署、武器装备、战斗过程以及历史影响。这本书不仅是一部军事史，也是一部关于文明冲突和历史变迁的重要著作。',
    },
    {
      id: 2,
      title: '人间失格',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=book%20cover%20no%20longer%20human%2C%20japanese%20literature%2C%20dark%20mood%2C%20minimalist%20design&image_size=portrait_4_3',
      content: '《人间失格》是太宰治的代表作之一，讲述了主人公叶藏从童年到青年的经历，以及他如何逐渐失去做人的资格。这本书以第一人称叙述，深刻揭示了人性的阴暗面和社会的冷漠。太宰治的文字细腻而犀利，让人在阅读过程中感受到强烈的共鸣和震撼。',
    },
    {
      id: 3,
      title: '翦商',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=book%20cover%20jian%20shang%2C%20chinese%20history%2C%20ancient%20china%2C%20red%20and%20black%20cover&image_size=portrait_4_3',
      content: '《翦商》是一部关于中国古代历史的著作，主要讲述了商朝的历史和文化。作者通过考古发现和文献资料，还原了商朝的社会结构、宗教信仰、政治制度等方面的情况。这本书不仅是一部历史著作，也是一部关于中国古代文明起源的重要研究成果。',
    },
    {
      id: 4,
      title: '杀死一只知更鸟',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=book%20cover%20to%20kill%20a%20mockingbird%2C%20american%20literature%2C%20classic%20cover%2C%20small%20town%20setting&image_size=portrait_4_3',
      content: '《杀死一只知更鸟》是哈珀·李的代表作，讲述了一个关于种族歧视和正义的故事。小说以一个小女孩的视角，展现了20世纪30年代美国南部小镇的社会风貌和种族问题。这本书通过生动的人物形象和感人的故事情节，传递了对正义、平等和善良的追求。',
    },
    {
      id: 5,
      title: '枪炮、病菌和钢铁',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=book%20cover%20guns%20germs%20and%20steel%2C%20scientific%20non-fiction%2C%20world%20history%2C%20earth%20from%20space&image_size=portrait_4_3',
      content: '《枪炮、病菌和钢铁》是贾雷德·戴蒙德的代表作，探讨了人类社会发展的差异和原因。作者认为，地理环境、生物因素和技术进步是导致不同地区发展差异的主要原因。这本书通过跨学科的研究方法，为我们理解人类历史的发展提供了新的视角。',
    },
    {
      id: 6,
      title: '看不见的城市',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=book%20cover%20invisible%20cities%2C%20italian%20literature%2C%20magical%20realism%2C%20dreamlike%20city%20landscape&image_size=portrait_4_3',
      content: '《看不见的城市》是卡尔维诺的代表作，讲述了马可·波罗向忽必烈汗描述他所见过的各种城市的故事。这本书通过虚构的城市形象，探讨了城市与记忆、欲望、时间等主题。卡尔维诺的文字优美而富有想象力，让读者在阅读过程中感受到一种梦幻般的体验。',
    },
    {
      id: 7,
      title: '百年孤独',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=book%20cover%20one%20hundred%20years%20of%20solitude%2C%20magical%20realism%2C%20colombian%20literature%2C%20yellow%20cover&image_size=portrait_4_3',
      content: '《百年孤独》是加西亚·马尔克斯的代表作，讲述了布恩迪亚家族七代人的传奇故事。这本书通过魔幻现实主义的手法，展现了拉丁美洲的历史、文化和社会现实。马尔克斯的文字瑰丽而富有想象力，让读者在阅读过程中感受到一种独特的魅力。',
    },
    {
      id: 8,
      title: '追风筝的人',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=book%20cover%20the%20kite%20runner%2C%20afghan%20literature%2C%20friendship%2C%20red%20kite%20on%20blue%20sky&image_size=portrait_4_3',
      content: '《追风筝的人》是卡勒德·胡赛尼的代表作，讲述了阿富汗男孩阿米尔和他的仆人哈桑之间的故事。这本书通过细腻的描写，展现了友谊、背叛、救赎等主题。胡赛尼的文字真挚而感人，让读者在阅读过程中感受到强烈的情感共鸣。',
    },
    {
      id: 9,
      title: '红楼梦',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=book%20cover%20dream%20of%20the%20red%20chamber%2C%20chinese%20classic%2C%20red%20cover%2C%20traditional%20chinese%20design&image_size=portrait_4_3',
      content: '《红楼梦》是中国古典文学的巅峰之作，讲述了贾宝玉、林黛玉、薛宝钗等人的爱情故事和贾府的兴衰。这本书通过细腻的描写，展现了中国封建社会的方方面面。曹雪芹的文字优美而深刻，让读者在阅读过程中感受到中国古典文学的魅力。',
    },
  ];

  return (
    <section className="book-reviews">
      <div className="container">
        <h2 className="section-title">单本札记</h2>
        <div className="reviews-grid">
          {bookReviews.map((review) => (
            <div key={review.id} className="book-card">
              <img src={review.cover} alt={review.title} className="book-cover" />
              <div className="book-content">
                <h3>{review.title}</h3>
                <p>{review.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookReviewsFull;